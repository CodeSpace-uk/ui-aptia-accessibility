import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Contact Aptia Pensions | Welcome" },
      {
        name: "description",
        content:
          "Welcome to Aptia Pensions. An accessible starting point to tell us who you are contacting us about and find useful pension support.",
      },
      { property: "og:title", content: "Contact Aptia Pensions" },
      {
        property: "og:description",
        content:
          "An accessible welcome page for contacting Aptia Pensions and finding pension support.",
      },
    ],
  }),
  component: Index,
});

type Option = {
  icon: string;
  title: string;
  description?: string;
  href: string;
};

const contactOptions: Option[] = [
  { icon: "me", title: "Me", description: "I am a pension scheme member", href: "#" },
  { icon: "adviser", title: "My client", description: "I am an adviser", href: "#" },
  {
    icon: "bereavement",
    title: "Bereavement",
    description: "Inform us of a bereavement",
    href: "#",
  },
  {
    icon: "friend",
    title: "Friend or family member",
    description: "I am helping someone else",
    href: "#",
  },
  {
    icon: "faq",
    title: "Frequently asked questions",
    description: "Find answers to common questions",
    href: "#",
  },
  {
    icon: "jargon",
    title: "Jargon buster",
    description: "Pension terms explained simply",
    href: "#",
  },
];

const usefulLinks: Option[] = [
  {
    icon: "moneyhelper",
    title: "MoneyHelper",
    description: "Free, impartial money and pensions guidance",
    href: "https://www.moneyhelper.org.uk/en",
  },
  {
    icon: "pensionwise",
    title: "Pension Wise",
    description: "Free guidance on your pension options",
    href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/pension-wise",
  },
  {
    icon: "findpension",
    title: "Find pension scheme contact details",
    description: "Search the government pension tracing service",
    href: "https://www.gov.uk/find-pension-contact-details",
  },
  {
    icon: "midlife",
    title: "Digital Midlife MOT",
    description: "Review your work, health and money plans",
    href: "https://jobhelp.campaign.gov.uk/midlifemot/home-page/",
  },
];

function useAccessibilityControls() {
  const [scale, setScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    const stored = Number(localStorage.getItem("a11y-scale"));
    const hc = localStorage.getItem("a11y-hc") === "true";
    const lt = localStorage.getItem("a11y-light") === "true";
    if (stored) setScale(stored);
    if (hc) setHighContrast(true);
    if (lt) setLight(true);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", String(scale));
    localStorage.setItem("a11y-scale", String(scale));
  }, [scale]);

  useEffect(() => {
    document.documentElement.classList.toggle("hc", highContrast);
    localStorage.setItem("a11y-hc", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.setItem("a11y-light", String(light));
  }, [light]);

  const dec = () => setScale((s) => Math.max(0.85, Math.round((s - 0.1) * 100) / 100));
  const inc = () => setScale((s) => Math.min(1.5, Math.round((s + 0.1) * 100) / 100));
  const reset = () => setScale(1);

  return { scale, highContrast, setHighContrast, light, setLight, dec, inc, reset };
}

function AccessibilityToolbar() {
  const { scale, highContrast, setHighContrast, dec, inc, reset } =
    useAccessibilityControls();

  return (
    <div
      role="group"
      aria-label="Accessibility settings"
      className="flex flex-wrap items-center gap-2"
    >
      <span className="sr-only">Adjust text size</span>
      <div
        className="flex items-center gap-1 rounded-full border border-white/25 bg-white/5 p-1"
        aria-label={`Text size ${Math.round(scale * 100)} percent`}
      >
        <button
          type="button"
          onClick={dec}
          aria-label="Decrease text size"
          className="grid size-9 place-items-center rounded-full text-sm font-bold text-white hover:bg-white/15 focus-visible:bg-white/15"
        >
          A<span aria-hidden="true">−</span>
        </button>
        <button
          type="button"
          onClick={reset}
          aria-label="Reset text size"
          className="grid size-9 place-items-center rounded-full text-base font-bold text-white hover:bg-white/15 focus-visible:bg-white/15"
        >
          A
        </button>
        <button
          type="button"
          onClick={inc}
          aria-label="Increase text size"
          className="grid size-9 place-items-center rounded-full text-lg font-bold text-white hover:bg-white/15 focus-visible:bg-white/15"
        >
          A<span aria-hidden="true">+</span>
        </button>
      </div>
      <button
        type="button"
        onClick={() => setHighContrast(!highContrast)}
        aria-pressed={highContrast}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 text-sm font-semibold text-white hover:bg-white/15 focus-visible:bg-white/15"
      >
        <span
          aria-hidden="true"
          className="grid size-5 place-items-center rounded-full border-2 border-white"
          style={{ background: "linear-gradient(90deg,#fff 50%, transparent 50%)" }}
        />
        High contrast: {highContrast ? "On" : "Off"}
      </button>
    </div>
  );
}

function OptionCard({ option }: { option: Option }) {
  const external = option.href.startsWith("http");
  return (
    <a
      href={option.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="card-link group flex items-center gap-4 rounded-2xl bg-card p-5 text-card-foreground shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md sm:gap-5 sm:p-6"
    >
      <span
        aria-hidden="true"
        className="grid size-14 shrink-0 place-items-center rounded-xl"
        style={{ backgroundColor: "var(--brand-mint-soft)" }}
      >
        <img src={`/icons/${option.icon}.png`} alt="" className="size-9" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-semibold leading-snug sm:text-xl">
          {option.title}
        </span>
        {option.description && (
          <span className="mt-0.5 block text-sm text-card-foreground/70">
            {option.description}
            {external && <span className="sr-only"> (opens in a new tab)</span>}
          </span>
        )}
      </span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-6 shrink-0 text-card-foreground/50 transition-transform group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only rounded-md bg-primary px-4 py-2 font-semibold text-primary-foreground focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Skip to main content
      </a>

      <header className="border-b border-white/10 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <a href="#" aria-label="Aptia home" className="inline-flex">
            <img src="/icons/logo-dark.png" alt="Aptia" className="h-12 w-auto" />
          </a>
          <AccessibilityToolbar />
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section
          aria-labelledby="page-title"
          className="mx-auto max-w-6xl px-4 pb-4 pt-10 sm:px-6 sm:pt-14 lg:px-8"
        >
          <p className="text-base font-semibold uppercase tracking-wide text-primary">
            Welcome to
          </p>
          <h1
            id="page-title"
            className="mt-2 text-4xl font-bold leading-tight text-primary sm:text-5xl md:text-6xl"
          >
            Contact Aptia Pensions
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-foreground/90 sm:text-xl">
            To get started, please tell us who you are contacting us about. Every
            option leads to the right team and guidance for you.
          </p>
        </section>

        {/* Contact options */}
        <section
          aria-labelledby="options-heading"
          className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
        >
          <h2 id="options-heading" className="sr-only">
            Who are you contacting us about?
          </h2>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {contactOptions.map((option) => (
              <li key={option.title}>
                <OptionCard option={option} />
              </li>
            ))}
          </ul>
        </section>

        {/* Important notice */}
        <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div
            role="note"
            aria-label="Important notice about fraud"
            className="flex items-start gap-4 rounded-2xl border-2 p-5 sm:p-6"
            style={{
              borderColor: "var(--brand-green)",
              backgroundColor: "rgba(255,255,255,0.06)",
            }}
          >
            <img src="/icons/warning.png" alt="" className="mt-0.5 size-8 shrink-0" />
            <p className="text-base leading-relaxed text-foreground/95">
              <strong className="font-bold">Important notice:</strong> We are aware of
              fraudulent messages claiming to be from us and asking members to upload
              identification documents. We will never request personal documents, links
              to upload information, or send sign-in links by text or WhatsApp. If you
              receive an unexpected message, please contact us using the details on this
              site.
            </p>
          </div>
        </section>

        {/* Useful information */}
        <section
          aria-labelledby="useful-heading"
          className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
        >
          <h2 id="useful-heading" className="text-2xl font-bold sm:text-3xl">
            Other useful information
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            {usefulLinks.map((option) => (
              <li key={option.title}>
                <OptionCard option={option} />
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="mt-8 border-t border-white/10 bg-[var(--brand-dark-2)]">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <img
            src="/icons/logo-dark.png"
            alt="Aptia"
            className="h-10 w-auto rounded bg-white p-1.5"
          />
          <p className="mt-4 max-w-2xl text-lg font-semibold text-primary">
            We&rsquo;re changing things for the better.
          </p>

          <nav aria-label="Legal notices" className="mt-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/70">
              Notices
            </h2>
            <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:gap-6">
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline focus-visible:underline"
                  href="https://aptia-group.com/en-gb/privacy-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Notice
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a
                  className="text-foreground underline-offset-4 hover:underline focus-visible:underline"
                  href="https://aptia-group.com/en-gb/cookie-notice"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cookie Notice
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          <p className="mt-8 max-w-3xl text-sm text-foreground/70">
            Aptia Group Limited is the holding company of Aptia Insurance Services Group
            LLC that operates in the US, and Aptia UK Limited that operates in the UK.
          </p>
        </div>
      </footer>
    </div>
  );
}
