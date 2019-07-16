import AuthLayout from '@/app/layout/AuthLayout'

const authRouter = [
  {
    path: '/auth',
    component: AuthLayout,
    hidden: true,
    children: [
      {
        path: '/login',
        component: () => import('@/app/auth/components/login'),
        hidden: true
      },
      {
        path: '/register',
        component: () => import('@/app/auth/components/register'),
        hidden: true
      },
      {
        path: '/activate',
        component: () => import('@/app/auth/components/user-activation'),
        hidden: true
      },
      {
        path: '/auth-redirect',
        component: () => import('@/app/auth/components/authRedirect'),
        hidden: true
      },
      {
        path: '/reset-password',
        component: () => import('@/app/auth/components/reset-password'),
        hidden: true
      },
      {
        path: '/result',
        component: () => import('@/app/auth/components/result'),
        hidden: true
      }
    ]
  }
]

export default authRouter
