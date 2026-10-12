"use client";

import { useState } from "react";
import type { Language } from "./site-header";
import { site } from "@/lib/site";

const copy: Record<Language, Record<"name" | "contact" | "message" | "send" | "sending" | "sent" | "failed", string>> = {
  he: {
    name: "שם",
    contact: "טלפון או מייל",
    message: "הודעה",
    send: "שליחה",
    sending: "שולח...",
    sent: "תודה, ההודעה נשלחה. אחזור אליכם בהקדם.",
    failed: "משהו השתבש בשליחה. אפשר לנסות שוב בעוד רגע.",
  },
  en: {
    name: "Name",
    contact: "Phone or email",
    message: "Message",
    send: "Send",
    sending: "Sending...",
    sent: "Thank you, your message was sent. I'll get back to you soon.",
    failed: "Something went wrong. Please try again in a moment.",
  },
  de: {
    name: "Name",
    contact: "Telefon oder E-Mail",
    message: "Nachricht",
    send: "Senden",
    sending: "Wird gesendet...",
    sent: "Danke, Ihre Nachricht wurde gesendet. Ich melde mich bald bei Ihnen.",
    failed: "Etwas ist schiefgelaufen. Bitte versuchen Sie es gleich noch einmal.",
  },
};

// Messages go to Zvi's inbox through Web3Forms; his email and phone never appear on the site.
export function ContactForm({ language }: { language: Language }) {
  const text = copy[language];
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data.botcheck) return;
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          access_key: site.web3formsKey,
          subject: `פנייה חדשה מהאתר (${language.toUpperCase()})`,
          from_name: "אתר צבי בן-עמי",
        }),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent") return <p className="form-sent" role="status">{text.sent}</p>;

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        <span>{text.name}</span>
        <input name="name" autoComplete="name" required />
      </label>
      <label>
        <span>{text.contact}</span>
        <input name="contact" autoComplete="email" inputMode="email" required dir="auto" />
      </label>
      <label>
        <span>{text.message}</span>
        <textarea name="message" rows={4} required />
      </label>
      <input type="checkbox" name="botcheck" className="form-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <button type="submit" className="primary-button" disabled={status === "sending"}>
        {status === "sending" ? text.sending : text.send}
      </button>
      {status === "failed" && <p className="form-failed" role="alert">{text.failed}</p>}
    </form>
  );
}
