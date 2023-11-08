import { twMerge } from 'tailwind-merge'

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={twMerge('text-center text-black max-w-xs m-auto px-2 py-4', className)}>
      Made with ❤️ at{' '}
      <a
        href="https://ae.studio?utm_source=layoutcomparison.com"
        target="_blank"
        rel="noreferrer"
        className="hover:underline"
      >
        AE Studio
      </a>
    </footer>
  )
}
