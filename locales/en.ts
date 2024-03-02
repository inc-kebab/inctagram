// label: названия для лейблов, например "Confirm password", "Email", "New Password", "Password", и т.д.
// button: названия для кнопок и ссылок
// validation: сообщения для валидации, например "Maximum 20 characters for password", "Minimum 6 characters for password", "The passwords must match", и т.д.
// pages: названия для страниц и их элементов, например "Congratulations!", "Create new password", "Email verification link expired", и т.д.
// если на странице есть модалка то объект "modal" так же вкладывается внутрь объекта с названием страницы

export const en = {
  button: {
    backToSignIn: 'Back to Sign In',
    createNewPassword: 'Create new password',
    no: 'No',
    resendVerificationLink: 'Resend verification link',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    yes: 'Yes',
  },
  label: {
    confirmPassword: 'Confirm password',
    email: 'Email',
    newPassword: 'New Password',
    password: 'Password',
    reCaptcha: 'I’m not a robot',
    userName: 'Username',
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
    profile: {
      logOutConfirmation: 'Are you really want to log out of your account?',
    },
    signIn: {
      forgotPassword: 'Forgot Password',
      signUpSuggestion: 'Don’t have an account?',
      title: 'Sign In',
    },
    signUp: {
      agreement: {
        description: `I agree to the <1>privacy</1> and <2>terms</2>`,
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
      modalBtn: 'OK',
      modalText: 'We have sent a link to confirm your email to ',
      question: 'Do you have an account?',
      title: 'Sign Up',
    },
  },
  validation: {
    emailVerification: 'The email must match the format example@example.com',
    invalidCredentials: 'The email or password are incorrect. Try again please',
    maxLength20: 'Maximum 20 characters for password',
    minLength6: 'Minimum 6 characters for password',
    passwordMismatch: 'The passwords must match',
    passwordVerification:
      'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
    required: 'Required field',
    userNameVerification: 'Username must contain:\n' + '0-9; A-Z; a-z; _ ; -',
  },
}

export type LocaleType = typeof en
