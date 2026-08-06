import type { PropsWithChildren, ReactNode } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

type OverlayProps = PropsWithChildren<{
  open: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
}>

export function Modal({
  open,
  onClose,
  title,
  footer,
  children,
}: OverlayProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <motion.button
            aria-label="Close modal"
            className="absolute inset-0 bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.section
            aria-modal="true"
            role="dialog"
            className="angular-frame relative w-full max-w-lg border border-ink/15 bg-surface p-5 shadow-float sm:p-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18 }}
          >
            <header className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{title}</h2>

              <button
                className="icon-button"
                aria-label="Close modal"
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </header>

            <div className="mt-5">{children}</div>

            {footer && <footer className="mt-6">{footer}</footer>}
          </motion.section>
        </div>
      )}
    </AnimatePresence>
  )
}

export function Drawer({
  open,
  onClose,
  children,
}: Omit<OverlayProps, 'footer' | 'title'>) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.aside
            aria-modal="true"
            role="dialog"
            className="angular-frame absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-ink/15 bg-surface px-5 pt-4 pb-3 shadow-float"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}