import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useToast } from '@/shared/model/useToast'

export function ToastRegion() {
  const { toasts, dismiss } = useToast()
  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-4 top-4 z-[60] mx-auto flex max-w-sm flex-col gap-2 sm:left-auto sm:right-4"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            className="angular-frame pointer-events-auto flex gap-3 border border-success/25 bg-surface p-3.5 shadow-float"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={18} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{toast.title}</p>
              {toast.message && (
                <p className="mt-0.5 text-xs leading-5 text-muted">
                  {toast.message}
                </p>
              )}
            </div>
            <button
              className="icon-button -mr-1 -mt-1 size-8"
              aria-label="Dismiss notification"
              onClick={() => dismiss(toast.id)}
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
