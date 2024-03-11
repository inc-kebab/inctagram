export enum AuthRoutes {
  CONFIRM_EMAIL = '/auth/confirm-email',
  CREATE_NEW_PASSWORD = '/auth/create-new-password',
  FORGOT_PASSWORD = '/auth/forgot-password',
  PASSWORD_RECOVERY = '/auth/password-recovery',
  PRIVACY = '/privacy',
  REDIRECT = '/auth/redirect',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  TERMS = '/terms',
}

export enum AppRoutes {
  FAVORITES = '/favorites',
  HOME = '/home',
  MAIN = '/',
  MESSENGER = '/messenger',
  PROFILE = '/profile',
  PROFILE_SETTINGS = '/profile/settings',
  SEARCH = '/search',
  STATISTICS = '/statistics',
}

export const PublicRoutes: string[] = [
  AppRoutes.MAIN,
  AuthRoutes.SIGN_UP,
  AuthRoutes.SIGN_IN,
  AuthRoutes.PRIVACY,
  AuthRoutes.CREATE_NEW_PASSWORD,
  AuthRoutes.FORGOT_PASSWORD,
  AuthRoutes.PASSWORD_RECOVERY,
  AuthRoutes.TERMS,
  AuthRoutes.CONFIRM_EMAIL,
]
