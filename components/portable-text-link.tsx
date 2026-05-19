"use client";

import Link from "next/link";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const InsideLinkContext = createContext(false);

const linkClass =
  "text-primary underline-offset-4 hover:underline";

type Props = {
  href: string;
  children: ReactNode;
};

/** Evita `<a>` dentro de `<a>` cuando Portable Text trae enlaces anidados. */
export function PortableTextLink({ href, children }: Props) {
  const nested = useContext(InsideLinkContext);

  if (nested) {
    return (
      <span className={cn(linkClass, "font-medium")}>{children}</span>
    );
  }

  const inner =
    href.startsWith("/") ? (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    ) : (
      <a
        href={href}
        className={linkClass}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );

  return (
    <InsideLinkContext.Provider value={true}>{inner}</InsideLinkContext.Provider>
  );
}
