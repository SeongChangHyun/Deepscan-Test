const authRouter = [
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
    path: '/activation',
    component: () => import('@/app/auth/components/user-activation'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/app/auth/components/authredirect'),
    hidden: true
  },
  {
    path: '/reset-password',
    component: () => import('@/app/auth/components/reset-password'),
    hidden: true
  }
]

export default authRouter
