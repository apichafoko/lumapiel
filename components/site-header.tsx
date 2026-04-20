"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogoPreview } from "@/components/logo-preview";
import { TeamInstagramLink } from "@/components/team-instagram-link";
import { TratamientosNavMenu } from "@/components/tratamientos-nav-menu";
import type { SiteConfig, SiteNavItem } from "@/lib/site-config";

type Props = {
  site: SiteConfig;
  bookingUrl: string;
};

function splitNavForTeamInsert(nav: SiteNavItem[]) {
  const contactIdx = nav.findIndex((i) => i.href === "/contacto");
  const main =
    contactIdx >= 0 ? nav.slice(0, contactIdx) : [...nav];
  const contact =
    contactIdx >= 0 ? nav[contactIdx] : undefined;
  return { main, contact };
}

export function SiteHeader({ site, bookingUrl }: Props) {
  const [open, setOpen] = useState(false);
  const { main: navMain, contact: navContact } = splitNavForTeamInsert(
    site.nav,
  );

  const linkClass =
    "text-sm font-medium text-foreground/90 hover:text-primary";

  const equipoDropdownDesktop = (
    <DropdownMenu key="equipo">
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm font-medium text-foreground/90 hover:text-primary"
        >
          Equipo
          <ChevronDown className="size-4 opacity-70" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[14rem]">
        {site.team.map((p) => (
          <DropdownMenuItem
            key={p.href}
            className="flex cursor-default flex-col items-center gap-2 py-3 text-center"
          >
            <Link
              href={p.href}
              className="flex flex-col gap-0.5 text-center outline-none"
            >
              <span className="font-medium">{p.label}</span>
              <span className="text-xs text-muted-foreground">{p.role}</span>
            </Link>
            <TeamInstagramLink
              raw={p.instagramUrl}
              className="justify-center text-xs"
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const equipoDropdownMobile = (
    <DropdownMenu key="equipo-mobile">
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-between text-left text-sm font-medium text-foreground/90 hover:text-primary"
        >
          Equipo
          <ChevronDown className="size-4 opacity-70" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-[14rem]">
        {site.team.map((p) => (
          <DropdownMenuItem
            key={p.href}
            className="flex cursor-default flex-col items-center gap-2 py-3 text-center"
          >
            <Link
              href={p.href}
              className="flex flex-col gap-0.5 text-center outline-none"
            >
              <span className="font-medium">{p.label}</span>
              <span className="text-xs text-muted-foreground">{p.role}</span>
            </Link>
            <TeamInstagramLink
              raw={p.instagramUrl}
              className="justify-center text-xs"
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const desktopNav = (
    <>
      {navMain.map((item) =>
        item.href === "/tratamientos" ? (
          <TratamientosNavMenu key={item.href} label={item.label} />
        ) : (
          <Link key={item.href} href={item.href} className={linkClass}>
            {item.label}
          </Link>
        ),
      )}
      {equipoDropdownDesktop}
      {navContact ? (
        <Link key={navContact.href} href={navContact.href} className={linkClass}>
          {navContact.label}
        </Link>
      ) : null}
    </>
  );

  const mobileNav = (
    <>
      {navMain.map((item) =>
        item.href === "/tratamientos" ? (
          <TratamientosNavMenu
            key={item.href}
            label={item.label}
            closeMobile={() => setOpen(false)}
          />
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ),
      )}
      {equipoDropdownMobile}
      {navContact ? (
        <Link
          key={navContact.href}
          href={navContact.href}
          className={linkClass}
          onClick={() => setOpen(false)}
        >
          {navContact.label}
        </Link>
      ) : null}
    </>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
        <Link
          href="/"
          className="relative z-10 flex shrink-0 items-center gap-2"
        >
          <LogoPreview className="max-w-[220px]" />
        </Link>

        <nav
          aria-label="Principal"
          className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:flex"
        >
          {desktopNav}
        </nav>

        <div className="relative z-10 ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="text-foreground"
          >
            <Link href="/buscar" aria-label="Buscar en el sitio">
              <Search className="size-5" />
            </Link>
          </Button>

          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              Reservar
            </a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-[min(100vw-2rem,22rem)] flex-col gap-6 pt-10"
            >
              <nav className="flex flex-col gap-4">{mobileNav}</nav>
              <Button asChild className="w-full">
                <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                  Reservar turno
                </a>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
