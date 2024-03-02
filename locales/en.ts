// label: названия для лейблов, например "Confirm password", "Email", "New Password", "Password", и т.д.
// button: названия для кнопок и ссылок
// validation: сообщения для валидации, например "Maximum 20 characters for password", "Minimum 6 characters for password", "The passwords must match", и т.д.
// pages: названия для страниц и их элементов, например "Congratulations!", "Create new password", "Email verification link expired", и т.д.
// если на странице есть модалка то объект "modal" так же вкладывается внутрь объекта с названием страницы

export const en = {
  button: {
    backToSignIn: 'Back to Sign In',
    backToSignUp: 'Back to Sign Up',
    createNewPassword: 'Create new password',
    resendVerificationLink: 'Resend verification link',
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
      title: 'Verification link expired',
    },
    forgotPassword: {
      description: 'Enter your email address and we will send you further instructions',
      success: 'The link has been sent by email. \n If you don’t receive an email send link again',
      title: 'Forgot Password',
    },
    privacy: {
      changes:
        'We reserve the right to make changes to our privacy policy. In the event of significant ' +
        'changes, we will notify you by posting the updated privacy policy on our website or sending ' +
        'you email notifications.',
      changesTitle: 'Changes to the Privacy Policy',
      collectionData1:
        'We collect certain personal data that you provide to us when registering and using our ' +
        'application. This data may include your name, email address, profile photos, and other ' +
        'information necessary for using Inctagram.',
      collectionData2:
        'We use your personal data to provide and improve our services, including personalizing ' +
        'content, communicating with you, ensuring security, and preventing fraud. We may also use ' +
        'anonymous and aggregated data for analysis and statistics.',
      collectionDataTitle: 'Collection and Use of Personal Data',
      disclosureData:
        'We do not disclose your personal data to third parties without your consent, except as ' +
        'required by law or in cases necessary for providing our services or protecting our rights. ' +
        'We may disclose your data to our partners, agents, or service providers who work on our ' +
        'behalf and according to our instructions.',
      disclosureDataTitle: 'Disclosure of Personal Data',
      links:
        'Our application may contain links to third-party websites or services that are not ' +
        'controlled by us. We are not responsible for the privacy and security of information ' +
        'collected by these third-party sites or services. It is recommended to review the privacy ' +
        'policy of these third-party resources before providing them with your personal data.',
      linksTitle: 'Links to Third-Party Websites',
      matters:
        'We value your privacy and strive to protect it when you use our Inctagram application. This ' +
        'privacy policy describes how we collect, use, disclose, and safeguard your personal data. ' +
        'Please read this policy carefully to understand how we handle your information.',
      mattersTitle: 'Your Privacy Matters to Us',
      protectionData:
        'We take security measures to protect your personal data from unauthorized access, use, or ' +
        'disclosure. We use technical, administrative, and physical security measures to safeguard ' +
        'your data.',
      protectionDataTitle: 'Protection of Personal Data',
      title: 'Privacy Policy',
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
    terms: {
      changes: '5. Changes to the Terms',
      changes1:
        '5.1 Inctagram reserves the right to make changes to these terms of use at its discretion. We ' +
        'will notify you of such changes and provide an opportunity to review the updated terms.',
      changes2:
        '5.2 Continued use of Inctagram after changes to the terms of use indicates your agreement ' +
        'with the updated terms.',
      intellect: '3. Intellectual Property',
      intellect1:
        '3.1 Inctagram and all related materials, including logos, designs, texts, graphics, and other elements, ' +
        'are the property of Inctagram or its licensors and are protected by copyright and other intellectual property laws.',
      intellect2:
        '3.2 By using Inctagram, you do not acquire any rights to use our intellectual property ' +
        'without our explicit permission.',
      liability: '4. Liability',
      liability1:
        '4.1 Inctagram is not responsible for the content posted or shared by users. We do not ' +
        'guarantee the accuracy, completeness, or reliability of such content.',
      liability2:
        '4.2 Inctagram is not liable for any damages caused to you or third parties as a result of ' +
        'using our application.',
      liability3:
        '4.3 You use Inctagram at your own risk. We do not guarantee that our application will work ' +
        'without errors or interruptions.',
      registration: '1. Registration and account',
      registration1:
        '1.1 To use Inctagram, you need to create an account. You must provide accurate information ' +
        'during registration and keep this information up to date.',
      registration2:
        '1.2 You are responsible for the security of your account and password. Do not share your ' +
        'account credentials with third parties or allow them to use your account.',
      registration3:
        '1.3 You agree not to create multiple accounts or use other users accounts without their permission.',
      rules: '2. Rules of Use',
      rules1:
        '2.1 When using Inctagram, you agree to comply with all applicable laws and codes of conduct.',
      rules2:
        '2.2 Posting illegal, offensive, indecent, or harmful content is prohibited. You are ' +
        'responsible for the content you post or share through our application.',
      rules3:
        '2.3 Violating the privacy of other users is prohibited. Do not publish personal information ' +
        'of others without their permission.',
      rules4: '2.4 Using Inctagram for spamming or sending unwanted messages is prohibited.',
      rules5:
        '2.5 We reserve the right to remove any content or account that violates our terms of use or ' +
        'may harm other users.',
      title: 'Terms of Service',
      welcome:
        'Welcome to Inctagram! Please read our terms of use before using our social networking app. ' +
        'By using our application, you agree to our terms and commit to abide by them. If you do not ' +
        'agree with our terms, please do not use our application.',
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
