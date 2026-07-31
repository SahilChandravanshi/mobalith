import { createHashRouter, Navigate } from 'react-router-dom'

import { AppShell } from '@/shared/ui/AppShell'

import { DashboardPage } from '@/pages/DashboardPage'
import { FeaturePage } from '@/pages/FeaturePage'
import { HeroesPage } from '@/pages/heroes/HeroesPage'
import { HeroDetailsPage } from '@/pages/heroes/HeroDetailsPage'
import { ItemsPage } from '@/pages/items/ItemsPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

import { featureRoutes } from '@/shared/config/navigation'


export const router = createHashRouter([
  {
    path: '/',
    element: <AppShell />,
    errorElement: <NotFoundPage />,

    children: [

      {
        index: true,
        element: <DashboardPage />,
      },


      ...featureRoutes.map(
        ({ path, title, description }) => {

          if (path === 'heroes') {
            return {
              path,
              element: <HeroesPage />,
            }
          }


          if (path === 'heroes/:heroId') {
            return {
              path,
              element: <HeroDetailsPage />,
            }
          }


          if (path === 'items') {
            return {
              path,
              element: <ItemsPage />,
            }
          }


          return {
            path,
            element: (
              <FeaturePage
                title={title}
                description={description}
              />
            ),
          }
        }
      ),


      {
        path: 'home',
        element: <Navigate to="/" replace />,
      },


      {
        path: '*',
        element: <NotFoundPage />,
      },

    ],
  },
])