import Image from "next/image"

export function LogoPreview() {
  return (
    <div className="relative w-full max-w-lg px-2">
      <Image
        src="/logo-piel.svg"
        alt="Luma Piel — Dermatología Integral"
        width={800}
        height={262}
        className="h-auto w-full object-contain"
        priority
      />
    </div>
  )
}
