"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";

type Props = {
  items: Array<{ label: string; href: string }>;
  languages: Array<{ name: string; href: string; active: boolean }>;
  labels: { open: string; close: string; languages: string; whatsapp: string };
};

// Phone-width navigation: a labelled pill button that opens a sheet under the header.
export function MobileMenu({ items, languages, labels }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  const current = decodeURI(pathname).replace(/\/$/, "") || "/";

  return (
    <>
      <button
        type="button"
        className="menu-button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? labels.close : labels.open}</span>
        <span className={`menu-icon${open ? " is-open" : ""}`} aria-hidden="true"><i /><i /></span>
      </button>
      <div id={panelId} className="mobile-menu" hidden={!open}>
        <nav aria-label={labels.open}>
          {items.map(({ label, href }) => (
            <Link key={href} href={href} aria-current={decodeURI(href) === current ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-languages" aria-label={labels.languages}>
          {languages.map(({ name, href, active }) => (
            <Link key={name} href={href} className={active ? "active" : ""} aria-current={active ? "true" : undefined}>
              {name}
            </Link>
          ))}
        </div>
        <a className="primary-button dark" href="https://wa.me/972544899258">{labels.whatsapp}</a>
      </div>
    </>
  );
}
