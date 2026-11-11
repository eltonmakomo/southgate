import { useState, type FormEvent, type ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, AlertCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submitApplication, submitCareers, submitEnquiry, submitNewsletter } from "@/lib/forms.functions";
import type { EnquiryCategory } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = { state: "idle" | "sending" | "done" } | { state: "error"; message: string };

const fieldBase =
  "w-full rounded-md border border-input bg-card px-3.5 py-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:border-sec";

function Field({ id, label, required, error, children }: { id: string; label: string; required?: boolean | undefined; error?: string | undefined; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {required && <span aria-hidden="true" className="text-sec"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

function Consent({ id, error, children }: { id: string; error?: string | undefined; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="flex items-start gap-3 text-sm leading-relaxed">
        <input id={id} name="consent" type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-[var(--sec)]" aria-invalid={!!error} />
        <span>{children}</span>
      </label>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
    </div>
  );
}

function StatusLine({ status, success }: { status: Status; success: string }) {
  if (status.state === "done")
    return (
      <div role="status" className="flex items-start gap-3 rounded-md bg-sec-soft p-4 text-sec-soft-foreground">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="text-sm font-medium">{success}</p>
      </div>
    );
  if (status.state === "error")
    return (
      <div role="alert" className="flex items-start gap-3 rounded-md border border-destructive p-4 text-destructive">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p className="text-sm font-medium">{status.message}</p>
      </div>
    );
  return null;
}

function SubmitButton({ sending, children, application = false }: { sending: boolean; children: ReactNode; application?: boolean }) {
  return (
    <Button
      type="submit"
      disabled={sending}
      className={cn("inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-sec px-6 py-3 text-base font-semibold text-sec-foreground transition-opacity hover:bg-sec hover:opacity-90 disabled:opacity-60", application && "mt-3 min-h-15 min-w-52 justify-between gap-4 rounded px-6 py-4 text-sm")}
    >
      {sending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {sending ? "Sending…" : children}
      {application && !sending && <ArrowRight className="text-sec-accent" aria-hidden="true" />}
    </Button>
  );
}

type Errs = Partial<Record<"fullName" | "email" | "message" | "consent" | "position" | "cv", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FORMS = ["Form 1", "Form 2", "Form 3", "Form 4", "Form 5", "Form 6"];

export function EnquiryForm({ defaultCategory = "admissions", plain = false }: { defaultCategory?: EnquiryCategory | undefined; plain?: boolean }) {
  const send = useServerFn(submitEnquiry);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Errs>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const errs: Errs = {};
    if (v("fullName").length < 2) errs.fullName = "Please enter your full name";
    if (!EMAIL_RE.test(v("email"))) errs.email = "Please enter a valid email address";
    if (v("message").length < 5) errs.message = "Please add a short message";
    if (!fd.get("consent")) errs.consent = "Please confirm consent so we can respond";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus({ state: "sending" });
    try {
      const res = await send({
        data: {
          category: v("category"),
          formLevel: v("formLevel"),
          fullName: v("fullName"),
          email: v("email"),
          phone: v("phone"),
          studentName: v("studentName"),
          message: v("message"),
          consent: true,
          website: v("website"),
        },
      });
      if (res.ok) {
        setStatus({ state: "done" });
        form.reset();
      } else setStatus({ state: "error", message: res.error });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Please check your details and try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
      <Honeypot />
      <EnquirySection plain={plain} title="Your Enquiry" subtitle="Tell us how we can help">
        <Field id="category" label="Enquiry type" required>
          <select id="category" name="category" defaultValue={defaultCategory} className={fieldBase}>
            <option value="admissions">Admissions enquiry</option>
            <option value="boarding">Boarding enquiry</option>
            <option value="general">General school office</option>
            <option value="careers">Careers and staff enquiry</option>
          </select>
        </Field>
        <Field id="formLevel" label="Form of interest">
          <select id="formLevel" name="formLevel" defaultValue="" className={fieldBase}>
            <option value="">Not applicable / not sure</option>
            {FORMS.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </Field>
      </EnquirySection>
      <EnquirySection plain={plain} title="Your Details" subtitle="Your contact information">
        <Field id="fullName" label="Your full name" required error={errors.fullName}>
          <input id="fullName" name="fullName" autoComplete="name" className={fieldBase} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
        </Field>
        <Field id="email" label="Email address" required error={errors.email}>
          <input id="email" name="email" type="email" autoComplete="email" className={fieldBase} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
        </Field>
        <Field id="phone" label="Phone number">
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldBase} />
        </Field>
        <Field id="studentName" label="Student’s name">
          <input id="studentName" name="studentName" className={fieldBase} />
        </Field>
      </EnquirySection>
      <EnquirySection plain={plain} title="Additional Information" subtitle="Anything else you'd like us to know?">
        <div className="sm:col-span-2">
          <Field id="message" label="Your message" required error={errors.message}>
            <textarea id="message" name="message" rows={5} className={fieldBase} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          </Field>
        </div>
      </EnquirySection>
      <Consent id="enquiry-consent" error={errors.consent}>
        I agree that Southgate Senior School may store these details and contact me about this enquiry.
      </Consent>
      <StatusLine status={status} success="Thank you — your enquiry has been received. Our team will be in touch." />
      <div><SubmitButton sending={status.state === "sending"}>Send enquiry</SubmitButton></div>
    </form>
  );
}

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const send = useServerFn(submitNewsletter);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Errs>({});
  const idp = compact ? "nl-footer" : "nl-page";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const errs: Errs = {};
    if (!EMAIL_RE.test(email)) errs.email = "Please enter a valid email address";
    if (!fd.get("consent")) errs.consent = "Please confirm consent";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus({ state: "sending" });
    try {
      const res = await send({
        data: { email, fullName: String(fd.get("fullName") ?? "").trim(), consent: true, website: String(fd.get("website") ?? "") },
      });
      if (res.ok) {
        setStatus({ state: "done" });
        form.reset();
      } else setStatus({ state: "error", message: res.error });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Please try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-4">
      <Honeypot />
      <div className={cn("grid gap-4", !compact && "sm:grid-cols-2")}>
        {!compact && (
          <Field id={`${idp}-name`} label="Your name">
            <input id={`${idp}-name`} name="fullName" autoComplete="name" className={fieldBase} />
          </Field>
        )}
        <Field id={`${idp}-email`} label="Email address" required error={errors.email}>
          <input id={`${idp}-email`} name="email" type="email" autoComplete="email" className={fieldBase} aria-invalid={!!errors.email} />
        </Field>
      </div>
      <Consent id={`${idp}-consent`} error={errors.consent}>
        I’d like to hear about Southgate news and admissions updates.
      </Consent>
      <StatusLine
        status={status}
        success="Thank you — your interest has been recorded. Newsletters will be sent once our mailing service is launched."
      />
      <div><SubmitButton sending={status.state === "sending"}>Register interest</SubmitButton></div>
    </form>
  );
}

const MAX_CV = 2 * 1024 * 1024;

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });
}

export function CareersForm() {
  const send = useServerFn(submitCareers);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Errs>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const file = fd.get("cv");
    const errs: Errs = {};
    if (v("fullName").length < 2) errs.fullName = "Please enter your full name";
    if (!EMAIL_RE.test(v("email"))) errs.email = "Please enter a valid email address";
    if (v("position").length < 2) errs.position = "Please tell us the role you are interested in";
    if (!(file instanceof File) || file.size === 0) errs.cv = "Please attach your CV";
    else if (!/\.(pdf|docx?)$/i.test(file.name)) errs.cv = "Your CV must be a PDF or Word file";
    else if (file.size > MAX_CV) errs.cv = "Your CV must be 2MB or smaller";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus({ state: "sending" });
    try {
      const cvBase64 = await toBase64(file as File);
      const res = await send({
        data: {
          fullName: v("fullName"),
          email: v("email"),
          phone: v("phone"),
          position: v("position"),
          message: v("message"),
          cvName: (file as File).name.slice(0, 200),
          cvBase64,
          consent: true,
          website: v("website"),
        },
      });
      if (res.ok) {
        setStatus({ state: "done" });
        form.reset();
      } else setStatus({ state: "error", message: res.error });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Please check your details and try again." });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative flex flex-col gap-5">
      <Honeypot />
      <div className="grid gap-5">
        <Field id="c-position" label="Position Applying For" required error={errors.position}>
          <input id="c-position" name="position" className={fieldBase} aria-invalid={!!errors.position} />
        </Field>
        <Field id="c-name" label="Full Name" required error={errors.fullName}>
          <input id="c-name" name="fullName" autoComplete="name" className={fieldBase} aria-invalid={!!errors.fullName} />
        </Field>
        <Field id="c-email" label="Email Address" required error={errors.email}>
          <input id="c-email" name="email" type="email" autoComplete="email" className={fieldBase} aria-invalid={!!errors.email} />
        </Field>
        <Field id="c-phone" label="Phone Number">
          <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={fieldBase} />
        </Field>
        <Field id="c-message" label="Cover Letter / Statement of Interest">
          <textarea id="c-message" name="message" rows={6} className={fieldBase} />
        </Field>
        <Field id="c-cv" label="Upload CV (PDF or Word)" required error={errors.cv}>
          <input id="c-cv" name="cv" type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className={cn(fieldBase, "file:mr-3 file:rounded file:border-0 file:bg-sec file:px-3 file:py-1.5 file:font-semibold file:text-sec-foreground")} aria-invalid={!!errors.cv} />
        </Field>
      </div>
      <StatusLine status={status} success="Thank you — your application and CV have been received." />
      <div><SubmitButton sending={status.state === "sending"}>Submit Application</SubmitButton></div>
    </form>
  );
}

export function FormSection({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">{title}</legend>
      <div className="mb-5 border-b border-border pb-4">
        <h3 className="font-display text-lg text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

function EnquirySection({ plain, title, subtitle, children }: { plain: boolean; title: string; subtitle: string; children: ReactNode }) {
  if (plain) return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
  return <FormSection title={title} subtitle={subtitle}>{children}</FormSection>;
}

type AppErrs = Record<string, string>;
const REQUIRED_APP: [string, string][] = [
  ["parentFirstName", "Please enter your first name"],
  ["parentLastName", "Please enter your last name"],
  ["relationship", "Please select your relationship to the child"],
  ["childFirstName", "Please enter the child's first name"],
  ["childLastName", "Please enter the child's last name"],
  ["dateOfBirth", "Please enter the date of birth"],
  ["formApplying", "Please select a form"],
  ["admissionYear", "Please select an admission year"],
  ["admissionTerm", "Please select an admission term"],
];

export function ApplicationForm() {
  const send = useServerFn(submitApplication);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<AppErrs>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const errs: AppErrs = {};
    for (const [k, m] of REQUIRED_APP) if (!v(k)) errs[k] = m;
    if (!EMAIL_RE.test(v("email"))) errs["email"] = "Please enter a valid email address";
    if (v("phone").length < 5) errs["phone"] = "Please enter a phone number";
    if (!fd.get("consent")) errs["consent"] = "Please confirm the information is accurate";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus({ state: "sending" });
    try {
      const keys = ["parentFirstName","parentLastName","email","phone","relationship","childFirstName","childLastName","dateOfBirth","currentSchool","formApplying","admissionYear","admissionTerm","boardingOption","heardFrom","message","website"];
      const data: Record<string, unknown> = { consent: true };
      for (const k of keys) data[k] = v(k);
      const res = await send({ data: data as never });
      if (res.ok) {
        setStatus({ state: "done" });
        setErrors({});
        form.reset();
      } else setStatus({ state: "error", message: res.error });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Please check your details and try again." });
    }
  }

  const input = (id: string, label: string, opts: { required?: boolean; type?: string; auto?: string } = {}) => (
    <Field id={`ap-${id}`} label={label} required={opts.required} error={errors[id]}>
      <input id={`ap-${id}`} name={id} type={opts.type ?? "text"} autoComplete={opts.auto} required={opts.required} maxLength={id === "email" ? 255 : id === "phone" ? 40 : id === "currentSchool" ? 160 : 80} className={fieldBase} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `ap-${id}-error` : undefined} />
    </Field>
  );
  const select = (id: string, label: string, placeholder: string, options: string[], required = false) => (
    <Field id={`ap-${id}`} label={label} required={required} error={errors[id]}>
      <select id={`ap-${id}`} name={id} defaultValue="" required={required} className={fieldBase} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `ap-${id}-error` : undefined}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Field>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="application-form relative flex flex-col gap-14">
      <Honeypot />
      <ApplicationSection title="Parent / Guardian Details" subtitle="Your contact information" paired>
        {input("parentFirstName", "First Name", { required: true, auto: "given-name" })}
        {input("parentLastName", "Last Name", { required: true, auto: "family-name" })}
        {input("email", "Email Address", { required: true, type: "email", auto: "email" })}
        {input("phone", "Phone Number", { required: true, type: "tel", auto: "tel" })}
        <div className="sm:col-span-2">{select("relationship", "Relationship to Child", "Select relationship", ["Mother", "Father", "Guardian", "Other"], true)}</div>
      </ApplicationSection>
      <ApplicationSection title="Child's Details" subtitle="Tell us about the child applying" paired>
        {input("childFirstName", "Child's First Name", { required: true })}
        {input("childLastName", "Child's Last Name", { required: true })}
        {input("dateOfBirth", "Date of Birth", { required: true, type: "date" })}
        {input("currentSchool", "Current School")}
      </ApplicationSection>
      <ApplicationSection title="Admission Details" subtitle="Tell us what you're looking for">
        {select("formApplying", "Form Applying For", "Select form", [...FORMS, "Other"], true)}
        {select("admissionYear", "Preferred Admission Year", "Select admission year", ["2027", "2028", "2029"], true)}
        {select("admissionTerm", "Preferred Admission Term", "Select admission term", ["Term 1", "Term 2", "Term 3"], true)}
        {select("heardFrom", "How did you hear about Southgate?", "Select an option", ["Google", "Social Media", "Friend or Family", "School Event", "Referral", "Other"])}
      </ApplicationSection>
      <ApplicationSection title="Additional Information" subtitle="Anything else you'd like us to know?">
        <Field id="ap-message" label="Message">
          <textarea id="ap-message" name="message" rows={10} maxLength={2000} placeholder="Tell us anything you feel would be helpful for our admissions team to know..." className={fieldBase} />
        </Field>
      </ApplicationSection>
      <Consent id="ap-consent" error={errors["consent"]}>
        I confirm that the information provided above is accurate and I consent to Southgate Senior School contacting me regarding this application.
      </Consent>
      <StatusLine status={status} success="Thank you — your application has been received. Our admissions team will be in touch regarding the next steps." />
      <div><SubmitButton sending={status.state === "sending"} application>Submit Application</SubmitButton></div>
    </form>
  );
}

function ApplicationSection({ title, subtitle, paired = false, children }: { title: string; subtitle: string; paired?: boolean; children: ReactNode }) {
  return (
    <fieldset className="min-w-0">
      <legend className="sr-only">{title}</legend>
      <div className="mb-8">
        <h3 className="font-display text-2xl leading-tight text-foreground sm:text-[28px]">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className={cn("grid gap-x-6 gap-y-6", paired && "sm:grid-cols-2 sm:gap-y-12")}>{children}</div>
    </fieldset>
  );
}
