import { describe, expect, it } from "vitest";
import { findPage } from "@/content/site";

describe("Fees enquiry selection", () => {
  it("uses the enquiry presentation rather than an admissions application", () => {
    const fees = findPage("admissions", "fees-and-payment-plans");
    const form = fees?.page.blocks.find((block) => block.type === "form");
    expect(form).toMatchObject({ form: "enquiry", category: "admissions", presentation: "plain-enquiry" });
  });
});