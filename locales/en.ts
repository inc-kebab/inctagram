// label: названия для лейблов, например "Confirm password", "Email", "New Password", "Password", и т.д.
// button: названия для кнопок и ссылок
// validation: сообщения для валидации, например "Maximum 20 characters for password", "Minimum 6 characters for password", "The passwords must match", и т.д.
// pages: названия для страниц и их элементов, например "Congratulations!", "Create new password", "Email verification link expired", и т.д.
// если на странице есть модалка то объект "modal" так же вкладывается внутрь объекта с названием страницы

/* eslint-disable max-lines */
export const en = {
  button: {
    answer: 'Answer',
    back: 'Back',
    backToHome: 'Back to home',
    backToSignIn: 'Back to Sign In',
    backToSignUp: 'Back to Sign Up',
    createNewPassword: 'Create new password',
    discard: 'Discard',
    no: 'No',
    profileSettings: 'Profile settings',
    publish: 'Publish',
    resendVerificationLink: 'Resend verification link',
    save: 'Save changes',
    saveDraft: 'Save draft',
    selectFromComputer: 'Select from Computer',
    sendLink: 'Send Link',
    sendLinkAgain: 'Send Link Again',
    showLess: 'Show less',
    showMore: 'Show more',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    simple_save: 'Save',
    yes: 'Yes',
  },
  dates: {
    month: {
      April: 'April',
      August: 'August',
      December: 'December',
      February: 'February',
      January: 'January',
      July: 'July',
      June: 'June',
      March: 'March',
      May: 'May',
      November: 'November',
      October: 'October',
      September: 'September',
    },
  },
  fields: {
    firstName: 'First name',
    lastName: 'Last name',
  },
  label: {
    aboutMe: 'About me',
    birthDate: 'Date of Birth',
    city: 'City',
    confirmAction: 'Confirm action',
    confirmPassword: 'Confirm password',
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    newPassword: 'New Password',
    password: 'Password',
    reCaptcha: 'I’m not a robot',
    successUpdateProfile: 'Your settings are saved!',
    userName: 'Username',
    warningUpdateProfile: 'High load. It may take up to several minutes to replace the image.',
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
    confirmEmail: {
      metaDescription:
        'Confirm your email address to access your new account and start enjoying all its benefits.',
      metaTitle: 'Email confirmation',
    },
    congratulations: {
      description: 'Your email has been confirmed',
      title: 'Congratulations!',
    },
    createNewPassword: {
      description: 'Your password must be between 6 and 20 characters',
      metaDescription:
        'Create a new password to restore access to your account and continue to use all its features.',
      metaTitle: 'Create new password',
      title: 'Create new password',
    },
    emailVerification: {
      description:
        'Looks like the verification link has expired. Not to worry, we can send the link again',
      title: 'Verification link expired',
    },
    forgotPassword: {
      description: 'Enter your email address and we will send you further instructions',
      metaDescription:
        "Forgot your password? Don't worry, we will help you restore access to your account and continue to use all its features.",
      metaTitle: 'Forgot Password',
      success: 'The link has been sent by email. \n If you don’t receive an email send link again',
      title: 'Forgot Password',
    },
    main: {
      metaTitle: 'Main',
      ssgErrorPosts:
        'An error occurred while retrieving about posts data. Try again after one minute.',
      ssgErrorUsersCount:
        'An error occurred while retrieving about users data. Try again after one minute.',
      usersTitle: 'Registered users',
    },
    post: {
      addPhoto: 'Add Photo',
      confirmCloseCreateModal: {
        message:
          'Do you really want to close the creation of a publication? If you close everything will be deleted',
        title: 'Close',
      },
      cropping: 'Cropping',
      deletePost: 'Delete Post',
      deletePostQuestion: 'Are you sure you want to delete this post?',
      editInfoModal: {
        message:
          'Do you really want to finish editing? If you close the changes you have made will not be saved.',
        title: 'Close Post',
      },
      editPost: 'Edit Post',
      editPostModal: {
        acceptBtn: 'Save changes',
        areaLabel: 'Add publication descriptions',
      },
      filters: 'Filters',
      likes: 'Likes',
      maxPost: 'A maximum of 10 images can be uploaded',
      next: 'Next',
      publication: 'Publication',
      publish: 'Publish',
      successCreate: 'Success create post!',
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
      metaDescription:
        'Protect your privacy and find out how we use and protect your personal data.',
      metaTitle: 'Privacy Policy',
      protectionData:
        'We take security measures to protect your personal data from unauthorized access, use, or ' +
        'disclosure. We use technical, administrative, and physical security measures to safeguard ' +
        'your data.',
      protectionDataTitle: 'Protection of Personal Data',
      title: 'Privacy Policy',
    },
    profile: {
      addProfilePhoto: 'Add a Profile Photo',
      deletePhoto: 'Delete Photo',
      deleteProfilePhoto: 'Are you sure you want to delete the photo?',
      followers: 'Followers',
      following: 'Following',
      logOutConfirmation: 'Are you really want to log out of your account',
      metaDescription:
        'Discover detailed information about users, their interests, skills and experience.',
      metaTitle: 'Profile',
      publications: 'Publications',
    },
    profileSettings: {
      metaDescription:
        'Customize your profile to suit your needs. Update your information, add a profile photo. Make your profile unique and informative to stand out and attract attention.',
      metaTitle: 'Profile settings',
    },
    signIn: {
      forgotPassword: 'Forgot Password',
      metaDescription: 'Log in to your account to access personalized features and content.',
      metaTitle: 'Sign In',
      signUpSuggestion: 'Don’t have an account?',
      title: 'Sign In',
    },
    signUp: {
      agreement: {
        description: `I agree to the <1>privacy</1> and <2>terms</2>`,
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
      },
      metaDescription:
        'Create an account to start using our services and receive exclusive benefits.',
      metaTitle: 'Sign Up',
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
      metaDescription:
        'Please read our terms of use to understand your rights and obligations when using our services.',
      metaTitle: 'Terms of Service',
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
  placeholders: {
    aboutMe: 'Write about yourself',
    birthDate: 'Specify your date of birth',
    city: 'Specify your city of residence',
    comment: 'Enter your comment text',
    email: 'email@inctagrum.fun',
    firstName: 'Enter your first name',
    lastName: 'Enter your last name',
    password: 'Enter your password',
    passwordConfirm: 'Enter your password again',
    postDescription: 'Add a description for the your post',
    username: 'Enter your username',
  },
  tabs: {
    devices: 'Devices',
    general: 'General information',
    management: 'Account management',
    payments: 'My payments',
  },
  validation: {
    aboutMeVerification:
      'About me can contain only letters "a-z" "а-я" (uppercase and lowercase), special characters and a numbers',
    ageMin: 'A user under 13 cannot create a profile ',
    avatarSize: (size: number) => `Photo size must be less than ${size} MB!`,
    avatarType: 'The format of the uploaded photo must be PNG and JPEG',
    dateOfBirthMax: 'Date of birth cannot be greater than the current date',
    emailVerification: 'The email must match the format example@example.com',
    error: 'Error! ',
    imgLoad: 'Error when creating or uploading an image',
    invalidCredentials: 'The email or password are incorrect. Try again please',
    maxLength: (len: number) => `Maximum ${len} characters`,
    minLength: (len: number) => `Minimum ${len} characters`,
    nameVerification: (field: string) =>
      `${field} can contain only letters (uppercase and lowercase)`,
    passwordMismatch: 'The passwords must match',
    passwordVerification:
      'The password must contain at least 1 capital letter, a special character and a number',
    required: 'Required field',
    userNameVerification:
      'Username can contain only letters "a-z" (uppercase and lowercase), numbers, and the characters "_" and "-"',
  },
}

export type LocaleType = typeof en
