import type { PropsWithChildren, ReactNode } from "react";

interface SectionProps extends PropsWithChildren {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  action,
  className = "",
  children,
}: SectionProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      {(title || action) && (
        <div className="flex items-end justify-between gap-4">
          <div>
            {title && (
              <h2 className="text-xl font-bold">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-1 text-sm text-muted">
                {description}
              </p>
            )}
          </div>

          {action}
        </div>
      )}

      {children}
    </section>
  );
}