/**
 * Shared contact-form provider helpers for build-time selection.
 * Provider is chosen via NEXT_PUBLIC_CONTACT_PROVIDER=formsubmit|web3forms
 * (default: formsubmit).
 */

export type ContactProvider = "formsubmit" | "web3forms";

export function resolveContactProvider(
  value = process.env.NEXT_PUBLIC_CONTACT_PROVIDER,
): ContactProvider {
  return value === "web3forms" ? "web3forms" : "formsubmit";
}

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "inquiries@pjbumitech.com";

export const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

export const CONTACT_PROVIDER = resolveContactProvider();

type SubmitPayload = {
  name: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  message: FormDataEntryValue | null;
};

export async function submitContactForm(payload: SubmitPayload): Promise<void> {
  if (CONTACT_PROVIDER === "web3forms") {
    if (!WEB3FORMS_ACCESS_KEY) {
      throw new Error(
        "Web3Forms is selected but NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is missing.",
      );
    }

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: payload.name,
        email: payload.email,
        message: payload.message,
        subject: "New inquiry from PJBUMI Tech website",
        from_name: "PJBUMI Tech Website",
      }),
    });

    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || !result?.success) {
      throw new Error(
        result?.message ?? "Unable to send your message right now.",
      );
    }
    return;
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        message: payload.message,
        _subject: "New inquiry from PJBUMI Tech website",
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const result = (await response.json().catch(() => null)) as {
    success?: string | boolean;
    message?: string;
  } | null;

  if (!response.ok) {
    throw new Error(
      result?.message ?? "Unable to send your message right now.",
    );
  }
}
