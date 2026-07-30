import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-5xl">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-3xl font-semibold">This path is off the map.</h1>
      <Link className="mt-6 inline-block text-brand hover:underline" to="/">
        Return to dashboard
      </Link>
    </section>
  )
}
