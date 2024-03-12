export enum AuthRoutes {
  CONFIRM_EMAIL = '/auth/confirm-email',
  CREATE_NEW_PASSWORD = '/auth/create-new-password',
  FORGOT_PASSWORD = '/auth/forgot-password',
  PASSWORD_RECOVERY = '/auth/password-recovery',
  SIGN_IN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
}

export enum GeneralRoutes {
  PRIVACY = '/general/privacy',
  REDIRECT = '/general/redirect',
  TERMS = '/general/terms',
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
  AuthRoutes.SIGN_UP,
  AuthRoutes.SIGN_IN,
  AuthRoutes.CREATE_NEW_PASSWORD,
  AuthRoutes.FORGOT_PASSWORD,
  AuthRoutes.PASSWORD_RECOVERY,
  AuthRoutes.CONFIRM_EMAIL,
]
