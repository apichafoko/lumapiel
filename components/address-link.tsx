import { cn } from "@/lib/utils";

type Props = {
  address: string;
  mapsUrl: string;
  className?: string;
};

export function AddressLink({ address, mapsUrl, className }: Props) {
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "underline-offset-4 hover:text-primary hover:underline",
        className,
      )}
    >
      {address}
    </a>
  );
}
