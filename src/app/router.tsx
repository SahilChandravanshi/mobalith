import { createHashRouter, Navigate } from 'react-router-dom'
import { AppShell } from '@/shared/ui/AppShell'
import { DashboardPage } from '@/pages/DashboardPage'
import { FeaturePage } from '@/pages/FeaturePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { featureRoutes } from '@/shared/config/navigation'

export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <DashboardPage /> },
      ...featureRoutes.map(({ path, title, description }) => ({
        path,
        element: <FeaturePage title={title} description={description} />,
      })),
      { path: 'home', element: <Navigate to="/" replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
