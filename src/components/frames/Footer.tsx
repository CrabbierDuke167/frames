import { Link } from "@tanstack/react-router";

import { brand, navItems } from "@/content/frames";

function getCurrentYear() {
  return new Date().getFullYear();
}

export function Footer() {
  return (
    <footer className="px-6 py-14 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="display-md">{brand.name}</p>
          <p className="mt-2 text-sm text-muted-foreground">{brand.tagline}</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-[0.78rem] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-3 border-t border-hairline pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {getCurrentYear()} {brand.name}
        </span>

        <div className="flex gap-6">
          <a
            href={brand.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            @{brand.instagram}
          </a>

          <a
            href={`mailto:${brand.email}`}
            className="transition-colors hover:text-foreground"
          >
            {brand.email}
          </a>
        </div>
      </div>
    </footer>
  );
}