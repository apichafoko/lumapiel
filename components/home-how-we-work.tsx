import Image from "next/image";

export type HowWeWorkStepImage = {
  src: string;
  alt: string;
};

export type HowWeWorkStep = {
  id: string;
  stepLabel: string;
  title: string;
  body: string;
  linkAlmaInBody?: boolean;
  /** Ruta bajo `public`, p. ej. `/images/como-trabajamos/paso-1.jpg` */
  image?: HowWeWorkStepImage;
};

export type HowWeWorkContent = {
  sectionTitle: string;
  almaLaserHref: string;
  steps: HowWeWorkStep[];
};

const ALMA_NEEDLE = "Alma Lasers";

function BodyWithOptionalAlmaLink({
  body,
  linkAlma,
  href,
}: {
  body: string;
  linkAlma: boolean;
  href: string;
}) {
  if (!linkAlma || !body.includes(ALMA_NEEDLE)) {
    return <>{body}</>;
  }
  const [before, afterFirst] = body.split(ALMA_NEEDLE);
  const rest = afterFirst ?? "";
  return (
    <>
      {before}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-[#d86448] underline-offset-4 hover:underline"
      >
        {ALMA_NEEDLE} ®
      </a>
      {rest}
    </>
  );
}

function StepImage({ image }: { image: HowWeWorkStepImage }) {
  return (
    <figure className="mt-5 overflow-hidden rounded-xl border border-border bg-muted/20">
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 896px"
        />
      </div>
    </figure>
  );
}

export function HomeHowWeWork({ content }: { content: HowWeWorkContent }) {
  const { steps, sectionTitle, almaLaserHref } = content;

  return (
    <section
      id="como-trabajamos"
      className="scroll-mt-28 border-y border-border bg-background py-16 lg:py-20"
      aria-labelledby="how-we-work-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            id="how-we-work-heading"
            className="font-heading text-3xl font-semibold text-primary"
          >
            {sectionTitle}
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-5xl space-y-12">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative border-l-[3px] border-primary/25 pl-8 sm:pl-11"
            >
              <span
                className="absolute -left-[15px] top-0 flex size-8 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold text-primary shadow-sm sm:-left-[17px] sm:size-9 sm:text-base"
                aria-hidden
              >
                {step.stepLabel}
              </span>
              <div className="min-w-0 space-y-2">
                <h3 className="font-heading text-xl font-semibold text-primary sm:text-2xl">
                  {step.title}
                </h3>
                <p className="whitespace-pre-line text-base leading-relaxed text-muted-foreground sm:text-lg sm:leading-relaxed">
                  <BodyWithOptionalAlmaLink
                    body={step.body}
                    linkAlma={Boolean(step.linkAlmaInBody)}
                    href={almaLaserHref}
                  />
                </p>
                {step.image?.src ? (
                  <StepImage image={step.image} />
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
