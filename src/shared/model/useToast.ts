import { create } from 'zustand'

type Toast = { id: number; title: string; message?: string }
type ToastStore = {
  toasts: Toast[]
  push: (toast: Omit<Toast, 'id'>) => void
  dismiss: (id: number) => void
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  push: (toast) => {
    const id = Date.now()
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    window.setTimeout(
      () =>
        set((state) => ({
          toasts: state.toasts.filter((item) => item.id !== id),
        })),
      4500,
    )
  },
  dismiss: (id) =>
    set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) })),
}))
