export function SectionHeading({
  eyebrow,
  title,
  titleId,
}: {
  eyebrow: string;
  title: string;
  titleId?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-2 lg:mb-12">
      <p className="type-label text-muted">{eyebrow}</p>
      <h2 id={titleId} className="type-headline">
        {title}
      </h2>
    </div>
  );
}
