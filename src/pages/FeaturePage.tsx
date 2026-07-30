import { motion } from 'framer-motion'
import { PageHeader } from '@/shared/ui/PageHeader'

type FeaturePageProps = { title: string; description: string }

export function FeaturePage({ title, description }: FeaturePageProps) {
  return (
    <motion.section
      className="mx-auto max-w-5xl"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <PageHeader
        eyebrow="Mobalith module"
        title={title}
        description={description}
      />
    </motion.section>
  )
}
