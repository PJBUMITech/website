/**
 * Static-site enhancements for cPanel / plain HTML hosting.
 * Runs from an external file so interactivity works even when React
 * hydration is blocked (e.g. CSP blocking inline scripts on shared hosting).
 *
 * Contact provider is selected at build time via data-contact-provider
 * on <body>: "formsubmit" (default) or "web3forms".
 */
(function () {
  const contactEmail =
    document.body.dataset.contactEmail || "inquiries@pjbumitech.com";
  const contactProvider =
    document.body.dataset.contactProvider === "web3forms"
      ? "web3forms"
      : "formsubmit";
  const web3formsKey = document.body.dataset.web3formsKey || "";

  const navLinks = [
    { href: "#capabilities", label: "Capabilities" },
    { href: "#products", label: "Products" },
    { href: "#news", label: "News" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const scrolledClasses = [
    "border-b",
    "border-white/10",
    "bg-navy/90",
    "backdrop-blur-xl",
    "shadow-[0_8px_30px_rgba(0,0,0,0.25)]",
  ];

  function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header || header.dataset.siteScroll === "1") return;
    header.dataset.siteScroll = "1";

    function update() {
      const scrolled = window.scrollY > 24;
      if (scrolled) {
        header.classList.remove("bg-transparent");
        scrolledClasses.forEach((cls) => header.classList.add(cls));
      } else {
        header.classList.add("bg-transparent");
        scrolledClasses.forEach((cls) => header.classList.remove(cls));
      }
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
  }

  function initMobileMenu() {
    const header = document.querySelector("header");
    const toggle = header?.querySelector('button[aria-label="Toggle menu"]');
    if (!header || !toggle || toggle.dataset.siteMenu === "1") return;
    toggle.dataset.siteMenu = "1";

    let panel = header.querySelector("[data-site-mobile-nav]");
    if (!panel) {
      panel = document.createElement("div");
      panel.dataset.siteMobileNav = "1";
      panel.hidden = true;
      panel.className =
        "border-t border-white/10 bg-navy/95 px-5 py-6 backdrop-blur-xl lg:hidden";
      panel.innerHTML = `<div class="flex flex-col gap-4">${navLinks
        .map(
          (link) =>
            `<a href="${link.href}" class="text-sm font-medium uppercase tracking-[0.14em] text-white/80">${link.label}</a>`,
        )
        .join("")}<a href="#contact" class="mt-2 inline-flex w-fit rounded-sm bg-brand px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-white">Partner With Us</a></div>`;
      header.appendChild(panel);

      panel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", close);
      });
    }

    const bars = toggle.querySelectorAll("span");

    function close() {
      toggle.setAttribute("aria-expanded", "false");
      panel.hidden = true;
      bars[0]?.classList.remove("translate-y-2", "rotate-45");
      bars[1]?.classList.remove("opacity-0");
      bars[2]?.classList.remove("-translate-y-2", "-rotate-45");
    }

    toggle.addEventListener("click", () => {
      const open = toggle.getAttribute("aria-expanded") === "true";
      if (open) {
        close();
        return;
      }
      toggle.setAttribute("aria-expanded", "true");
      panel.hidden = false;
      bars[0]?.classList.add("translate-y-2", "rotate-45");
      bars[1]?.classList.add("opacity-0");
      bars[2]?.classList.add("-translate-y-2", "-rotate-45");
    });
  }

  function setFormMessage(form, type, message) {
    form.querySelectorAll("[data-site-form-msg]").forEach((el) => el.remove());
    const p = document.createElement("p");
    p.dataset.siteFormMsg = "1";
    p.className =
      type === "success" ? "text-sm text-emerald-300" : "text-sm text-red-300";
    p.textContent = message;
    form.appendChild(p);
  }

  async function submitViaProvider(data) {
    if (contactProvider === "web3forms") {
      if (!web3formsKey) {
        throw new Error(
          "Web3Forms is selected but the access key is missing.",
        );
      }

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsKey,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          subject: "New inquiry from PJBUMI Tech website",
          from_name: "PJBUMI Tech Website",
        }),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message || "Unable to send your message right now.",
        );
      }
      return;
    }

    const response = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: "New inquiry from PJBUMI Tech website",
          _template: "table",
          _captcha: "false",
        }),
      },
    );

    const result = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(
        result?.message || "Unable to send your message right now.",
      );
    }
  }

  function initContactForm() {
    const form = document.querySelector("#contact form");
    if (!form || form.dataset.siteForm === "1") return;
    form.dataset.siteForm = "1";
    form.setAttribute("action", "javascript:void(0)");
    form.setAttribute("method", "post");

    const submitBtn = form.querySelector('button[type="submit"]');
    const defaultLabel = submitBtn?.textContent?.trim() || "Submit Inquiry";

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = new FormData(form);
      if (String(data.get("botcheck") ?? data.get("_gotcha") ?? "").trim()) {
        form.reset();
        setFormMessage(form, "success", "Thank you. Your message has been sent.");
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending…";
      }
      form.querySelectorAll("[data-site-form-msg]").forEach((el) => el.remove());

      try {
        await submitViaProvider(data);
        form.reset();
        setFormMessage(
          form,
          "success",
          "Thank you. Your message has been sent — our team will follow up shortly.",
        );
      } catch (error) {
        const msg =
          error instanceof Error
            ? error.message
            : "Unable to send your message right now.";
        setFormMessage(
          form,
          "error",
          `${msg} You can also email us directly at ${contactEmail}.`,
        );
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = defaultLabel;
        }
      }
    });
  }

  function init() {
    initHeaderScroll();
    initMobileMenu();
    initContactForm();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
