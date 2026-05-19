import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableTextLink } from "@/components/portable-text-link";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="font-heading mt-10 text-2xl font-semibold text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading mt-8 text-xl font-semibold text-primary">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-heading mt-6 text-lg font-semibold text-primary">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mt-4 leading-relaxed text-muted-foreground">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <>{children}</>;
      return <PortableTextLink href={href}>{children}</PortableTextLink>;
    },
  },
  types: {
    table: ({ value }) => {
      const rows = (value?.rows as Array<{ cells?: string[] }>) ?? [];
      if (!rows.length) return null;
      const [head, ...body] = rows;
      return (
        <div className="mt-6 w-full overflow-x-auto text-sm">
          <table className="w-full border-collapse border border-border">
            {head?.cells?.length ? (
              <thead>
                <tr className="bg-muted/50">
                  {head.cells.map((cell, i) => (
                    <th
                      key={i}
                      className="border border-border px-3 py-2 text-left font-medium text-foreground"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            ) : null}
            <tbody>
              {body.map((row, ri) => (
                <tr key={ri}>
                  {(row.cells ?? []).map((cell, ci) => (
                    <td
                      key={ci}
                      className="border border-border px-3 py-2 text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

type Props = {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
};

export function PortableTextBody({ value, className }: Props) {
  if (!value?.length) return null;
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}
