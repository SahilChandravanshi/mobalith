type PageHeaderProps = { eyebrow: string; title: string; description: string }

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">
        {description}
      </p>
    </div>
  )
}
