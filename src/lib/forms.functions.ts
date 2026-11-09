import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

const LIMITS = {
  enquiry: { max: 5, windowMinutes: 60 },
  careers: { max: 3, windowMinutes: 60 },
  newsletter: { max: 5, windowMinutes: 60 },
  application: { max: 3, windowMinutes: 60 },
} satisfies Record<string, { max: number; windowMinutes: number }>;

type Result = { ok: true } | { ok: false; error: string };

async function clientKey() {
  const ip =
    getRequestHeader("cf-connecting-ip") ||
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    getRequestHeader("x-real-ip") ||
    "unknown";
  const ua = getRequestHeader("user-agent") || "";
  const bytes = new TextEncoder().encode(`${ip}|${ua}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getAdmin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

async function checkRateLimit(kind: keyof typeof LIMITS): Promise<string | null> {
  const admin = await getAdmin();
  const key = await clientKey();
  const { max, windowMinutes } = LIMITS[kind];
  const since = new Date(Date.now() - windowMinutes * 60_000).toISOString();
  const { count, error } = await admin
    .from("submission_attempts")
    .select("id", { count: "exact", head: true })
    .eq("client_key", key)
    .eq("kind", kind)
    .gte("created_at", since);
  if (error) {
    console.error("rate limit check failed", error.message);
    return "We couldn't process your submission right now. Please try again shortly.";
  }
  if ((count ?? 0) >= max) {
    return "You've sent several submissions recently. Please wait a while before trying again.";
  }
  await admin.from("submission_attempts").insert({ client_key: key, kind });
  return null;
}

const text = (max: number) => z.string().trim().max(max);

const enquirySchema = z.object({
  category: z.enum(["admissions", "boarding", "general", "careers"]),
  formLevel: z.enum(["", "Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6"]).default(""),
  fullName: text(120).min(2, "Please enter your full name"),
  email: text(255).email("Please enter a valid email address"),
  phone: text(40).optional().default(""),
  studentName: text(120).optional().default(""),
  message: text(2000).min(5, "Please add a short message"),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  website: z.string().max(0).optional().default(""),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }): Promise<Result> => {
    if (data.website) return { ok: true };
    const limited = await checkRateLimit("enquiry");
    if (limited) return { ok: false, error: limited };
    const admin = await getAdmin();
    const { error } = await admin.from("enquiries").insert({
      category: data.category,
      form_level: data.formLevel || null,
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      student_name: data.studentName || null,
      message: data.message,
      consent: true,
    });
    if (error) {
      console.error("enquiry insert failed", error.message);
      return { ok: false, error: "We couldn't save your enquiry. Please try again." };
    }
    return { ok: true };
  });

const newsletterSchema = z.object({
  email: text(255).email("Please enter a valid email address"),
  fullName: text(120).optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  website: z.string().max(0).optional().default(""),
});

export const submitNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => newsletterSchema.parse(data))
  .handler(async ({ data }): Promise<Result> => {
    if (data.website) return { ok: true };
    const limited = await checkRateLimit("newsletter");
    if (limited) return { ok: false, error: limited };
    const admin = await getAdmin();
    const { error } = await admin
      .from("newsletter_signups")
      .upsert({ email: data.email.toLowerCase(), full_name: data.fullName || null }, { onConflict: "email", ignoreDuplicates: true });
    if (error) {
      console.error("newsletter insert failed", error.message);
      return { ok: false, error: "We couldn't save your details. Please try again." };
    }
    return { ok: true };
  });

const MAX_CV_BYTES = 2 * 1024 * 1024;

const careersSchema = z.object({
  fullName: text(120).min(2, "Please enter your full name"),
  email: text(255).email("Please enter a valid email address"),
  phone: text(40).optional().default(""),
  position: text(160).min(2, "Please tell us the role you are interested in"),
  message: text(2000).optional().default(""),
  cvName: text(200),
  cvBase64: z.string().min(10).max(Math.ceil((MAX_CV_BYTES * 4) / 3) + 16),
  consent: z.boolean().optional().default(true),
  website: z.string().max(0).optional().default(""),
});

export const submitCareers = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => careersSchema.parse(data))
  .handler(async ({ data }): Promise<Result> => {
    if (data.website) return { ok: true };
    const binary = Uint8Array.from(atob(data.cvBase64), (c) => c.charCodeAt(0));
    if (binary.byteLength > MAX_CV_BYTES) return { ok: false, error: "Your CV must be 2MB or smaller." };
    const header = String.fromCharCode(...binary.slice(0, 5));
    const isPdf = header === "%PDF-";
    const isDocx = binary[0] === 0x50 && binary[1] === 0x4b && /\.docx$/i.test(data.cvName);
    const isDoc = binary[0] === 0xd0 && binary[1] === 0xcf && binary[2] === 0x11 && binary[3] === 0xe0 && /\.doc$/i.test(data.cvName);
    if (!isPdf && !isDocx && !isDoc) return { ok: false, error: "Your CV must be a PDF or Word file." };
    const ext = isPdf ? "pdf" : isDocx ? "docx" : "doc";
    const contentType = isPdf ? "application/pdf" : isDocx ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document" : "application/msword";
    const limited = await checkRateLimit("careers");
    if (limited) return { ok: false, error: limited };
    const admin = await getAdmin();
    const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
    const upload = await admin.storage.from("career-cvs").upload(path, binary, {
      contentType,
      upsert: false,
    });
    if (upload.error) {
      console.error("cv upload failed", upload.error.message);
      return { ok: false, error: "We couldn't upload your CV. Please try again." };
    }
    const { error } = await admin.from("career_applications").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone || null,
      position: data.position,
      message: data.message || null,
      cv_path: path,
      consent: true,
    });
    if (error) {
      console.error("careers insert failed", error.message);
      return { ok: false, error: "We couldn't save your application. Please try again." };
    }
    return { ok: true };
  });

const applicationSchema = z.object({
  parentFirstName: text(80).min(1, "Required"),
  parentLastName: text(80).min(1, "Required"),
  email: text(255).email("Please enter a valid email address"),
  phone: text(40).min(5, "Please enter a phone number"),
  relationship: z.enum(["Mother", "Father", "Guardian", "Other"]),
  childFirstName: text(80).min(1, "Required"),
  childLastName: text(80).min(1, "Required"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter a date of birth"),
  currentSchool: text(160).optional().default(""),
  formApplying: z.enum(["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6", "Other"]),
  admissionYear: z.enum(["2027", "2028", "2029"]),
  admissionTerm: z.enum(["Term 1", "Term 2", "Term 3"]),
  boardingOption: z.enum(["", "Boarding", "Day scholar", "Not sure yet"]).default(""),
  heardFrom: z.enum(["", "Google", "Social Media", "Friend or Family", "School Event", "Referral", "Other"]).default(""),
  message: text(2000).optional().default(""),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  website: z.string().max(0).optional().default(""),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => applicationSchema.parse(data))
  .handler(async ({ data }): Promise<Result> => {
    if (data.website) return { ok: true };
    const limited = await checkRateLimit("application");
    if (limited) return { ok: false, error: limited };
    const admin = await getAdmin();
    const { error } = await admin.from("admission_applications").insert({
      parent_first_name: data.parentFirstName,
      parent_last_name: data.parentLastName,
      email: data.email,
      phone: data.phone,
      relationship: data.relationship,
      child_first_name: data.childFirstName,
      child_last_name: data.childLastName,
      date_of_birth: data.dateOfBirth,
      current_school: data.currentSchool || null,
      form_applying: data.formApplying,
      admission_year: data.admissionYear,
      admission_term: data.admissionTerm,
      boarding_option: data.boardingOption || null,
      heard_from: data.heardFrom || null,
      message: data.message || null,
      consent: true,
    });
    if (error) {
      console.error("application insert failed", error.message);
      return { ok: false, error: "We couldn't save your application. Please try again." };
    }
    return { ok: true };
  });
