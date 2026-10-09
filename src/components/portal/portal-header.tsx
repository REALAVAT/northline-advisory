export function PortalHeader({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-navy-950 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-muted-foreground">{text}</p>
      </div>
      {action}
    </div>
  );
}
