// label: названия для лейблов, например "Confirm password", "Email", "New Password", "Password", и т.д.
// button: названия для кнопок и ссылок
// validation: сообщения для валидации, например "Maximum 20 characters for password", "Minimum 6 characters for password", "The passwords must match", и т.д.
// pages: названия для страниц и их элементов, например "Congratulations!", "Create new password", "Email verification link expired", и т.д.
// если на странице есть модалка то объект "modal" так же вкладывается внутрь объекта с названием страницы

export const en = {
  button: {
    backToSignIn: 'Back to Sign In',
    createNewPassword: 'Create new password',
    resendLink: 'Resend link',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    signIn: 'Sign In',
    signUp: 'Sign Up',
  },
  label: {
    confirmPassword: 'Confirm password',
    email: 'Email',
    newPassword: 'New Password',
    password: 'Password',
    reCaptcha: 'I’m not a robot',
  },
  lang: {
    en: 'English',
    ru: 'Russian',
  },
  layout: {
    sidebar: {
      create: 'Create',
      favorites: 'Favorites',
      home: 'Home',
      logout: 'Log Out',
      messenger: 'Messenger',
      profile: 'My profile',
      search: 'Search',
      statistics: 'Statistics',
    },
  },
  pages: {
    congratulations: {
      description: 'Your email has been confirmed',
      title: 'Congratulations!',
    },
    createNewPassword: {
      description: 'Your password must be between 6 and 20 characters',
      title: 'Create new password',
    },
    emailVerification: {
      description:
        'Looks like the verification link has expired. Not to worry, we can send the link again',
      title: 'Email verification link expired',
    },
    forgotPassword: {
      description: 'Enter your email address and we will send you further instructions',
      title: 'Forgot Password',
    },
    signIn: {
      forgotPassword: 'Forgot Password',
      signUpSuggestion: 'Don’t have an account?',
      title: 'Sign In',
    },
  },
  validation: {
    invalidCredentials: 'The email or password are incorrect. Try again please',
    invalidEmailFormat: 'The email must match the format example@example.com',
    maxLength20: 'Maximum 20 characters for password',
    minLength6: 'Minimum 6 characters for password',
    passwordMismatch: 'The passwords must match',
    passwordVerification:
      'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
    required: 'Required',
  },
}

export type LocaleType = typeof en
