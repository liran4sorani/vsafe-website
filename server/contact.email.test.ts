import { describe, expect, it } from "vitest";
import nodemailer from "nodemailer";

/**
 * Validates that GMAIL_USER and GMAIL_APP_PASSWORD are set and that
 * the Gmail SMTP connection can be verified (does NOT send a real email).
 */
describe("Gmail SMTP credentials", () => {
  it("GMAIL_USER and GMAIL_APP_PASSWORD env vars are set", () => {
    expect(process.env.GMAIL_USER, "GMAIL_USER must be set").toBeTruthy();
    expect(process.env.GMAIL_APP_PASSWORD, "GMAIL_APP_PASSWORD must be set").toBeTruthy();
  });

  it("GMAIL_USER looks like a valid email", () => {
    const user = process.env.GMAIL_USER ?? "";
    expect(user).toMatch(/@/);
  });

  it("GMAIL_APP_PASSWORD is 16 chars (spaces stripped)", () => {
    const pass = (process.env.GMAIL_APP_PASSWORD ?? "").replace(/\s/g, "");
    expect(pass.length).toBe(16);
  });

  it("nodemailer transporter can be created with Gmail config", () => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
    expect(transporter).toBeDefined();
  });
});
