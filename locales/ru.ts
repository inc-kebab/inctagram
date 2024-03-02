// Чтобы typescript подсказывал поля заполняем сначала файл en.ts

import { LocaleType } from './en'

export const ru: LocaleType = {
  button: {
    backToSignIn: 'Страница входа',
    backToSignUp: 'Вернуться к регистрации',
    createNewPassword: 'Создать новый пароль',
    resendVerificationLink: 'Отправить повторное подтверждение',
    sendLink: 'Отправить ссылку',
    sendLinkAgain: 'Отправить ссылку повторно',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
  },
  label: {
    confirmPassword: 'Подтвердите пароль',
    email: 'Электронная почта',
    newPassword: 'Новый пароль',
    password: 'Пароль',
    reCaptcha: 'Я не робот',
    userName: 'Имя пользователя',
  },
  lang: {
    en: 'Английский',
    ru: 'Русский',
  },
  layout: {
    sidebar: {
      create: 'Создать',
      favorites: 'Избранное',
      home: 'Главная',
      logout: 'Выйти',
      messenger: 'Чат',
      profile: 'Мой профиль',
      search: 'Поиск',
      statistics: 'Статистика',
    },
  },
  pages: {
    congratulations: {
      description: 'Ваш адрес электронной почты был подтвержден',
      title: 'Поздравляем!',
    },
    createNewPassword: {
      description: 'Ваш пароль должен содержать от 6 до 20 символов',
      title: 'Создать новый пароль',
    },
    emailVerification: {
      description:
        'Пожалуйста, проверьте свой почтовый ящик. Если вы не получили письмо, проверьте папку "Спам"',
      title: 'Ссылка на подтверждение устарела',
    },
    forgotPassword: {
      description: 'Введите свою почту и мы отправим вам инструкции по восстановлению пароля',
      success:
        'Ссылка была отправлена по электронной почте.\n Если вы не получили письмо, отправьте ссылку еще раз',
      title: 'Забыли пароль',
    },
    privacy: {
      changes:
        'Мы оставляем за собой право вносить изменения в нашу политику конфиденциальности. ' +
        'В случае внесения существенных изменений мы уведомим вас путем размещения обновленной ' +
        'политики конфиденциальности на нашем веб-сайте или отправки вам уведомления ' +
        'по электронной почте.',
      changesTitle: 'Изменения в политике конфиденциальности',
      collectionData1:
        'Мы собираем определенные личные данные, которые вы предоставляете нам при регистрации и использовании нашего приложения. ' +
        'Эти данные могут включать ваше имя, адрес электронной почты, фотографии профиля и другую информацию, ' +
        'необходимую для использования Inctagram.',
      collectionData2:
        'Мы используем ваши личные данные для предоставления и улучшения наших услуг, включая персонализацию контента, связь с вами, ' +
        'обеспечение безопасности и предотвращение мошенничества. Мы также можем использовать анонимные и агрегированные ' +
        'данные для анализа и статистики.',
      collectionDataTitle: 'Сбор и использование личных данных',
      disclosureData:
        'Мы не раскрываем ваши личные данные третьим лицам без вашего согласия, кроме случаев, предусмотренных законом или в случаях, ' +
        'когда это необходимо для предоставления наших услуг или защиты наших прав. Мы можем раскрывать ваши данные нашим партнерам, ' +
        'агентам или поставщикам услуг, которые работают от нашего имени и согласно нашим инструкциям.',
      disclosureDataTitle: 'Раскрытие личных данных',
      links:
        'Наше приложение может содержать ссылки на сторонние веб-сайты или услуги, которые не контролируются нами. ' +
        'Мы не несем ответственности за приватность и безопасность информации, собираемой этими сторонними сайтами или услугами. ' +
        'Рекомендуется ознакомиться с политикой конфиденциальности этих сторонних ресурсов перед предоставлением ' +
        'им своих личных данных.',
      linksTitle: 'Ссылки на сторонние сайты',
      matters:
        'Мы ценим вашу конфиденциальность и стремимся обеспечить ее защиту при использовании нашего приложения Inctagram. ' +
        'В данной политике конфиденциальности описывается, как мы собираем, используем, раскрываем и защищаем ваши личные данные. ' +
        'Пожалуйста, внимательно ознакомьтесь с этой политикой, чтобы понять, как мы обрабатываем вашу информацию.',
      mattersTitle: 'Ваша конфиденциальность для нас важна',
      protectionData:
        'Мы принимаем меры безопасности, чтобы защитить ваши личные данные от несанкционированного доступа, ' +
        'использования или раскрытия. Мы используем технические, административные и физические меры безопасности ' +
        'для защиты ваших данных.',
      protectionDataTitle: 'Защита личных данных',
      title: 'Политика конфиденциальности',
    },
    signIn: {
      forgotPassword: 'Забыли пароль',
      signUpSuggestion: 'У вас нет аккаунта?',
      title: 'Логин',
    },
    signUp: {
      agreement: {
        description: `Я согласен с <1>privacy</1> и <2>terms</2>`,
        privacy: 'Условиями использования',
        terms: 'Политикой конфиденциальности',
      },
      modalBtn: 'Хорошо',
      modalText: 'Мы отправили ссылку для подтверждения вашего электронного адреса на ',
      question: 'У вас уже есть аккаунт?',
      title: 'Регистрация',
    },
    terms: {
      changes: '5. Изменения условий',
      changes1:
        '5.1. Inctagram оставляет за собой право вносить изменения в настоящие условия использования по своему усмотрению. ' +
        'Мы уведомим вас о таких изменениях и предоставим возможность ознакомиться с обновленными условиями.',
      changes2:
        '5.2. Продолжение использования Inctagram после внесения изменений в условия использования означает ваше ' +
        'согласие с обновленными условиями.',
      intellect: '3. Интеллектуальная собственность',
      intellect1:
        '3.1. Inctagram и все связанные с ним материалы, включая логотипы, дизайн, тексты, графику и другие элементы, ' +
        'являются собственностью Inctagram или его лицензиаров и защищены авторскими правами и другими законами об ' +
        'интеллектуальной собственности.',
      intellect2:
        '3.2. При использовании Inctagram вы не получаете права на использование нашей интеллектуальной собственности ' +
        'без нашего явного разрешения.',
      liability: '4. Ответственность',
      liability1:
        '4.1. Inctagram не несет ответственности за контент, который публикуют или делятся пользователи. Мы не гарантируем ' +
        'точность, полноту или надежность такого контента.',
      liability2:
        '4.2. Inctagram не несет ответственности за любой ущерб, причиненный вам или третьим лицам в результате использования нашего приложения.',
      liability3:
        '4.3. Вы используете Inctagram на свой собственный риск. Мы не гарантируем, что наше приложение будет работать без ошибок или прерываний.',
      registration: '1. Регистрация и аккаунт',
      registration1:
        '1.1. Для использования Inctagram вам необходимо создать аккаунт. Вы должны предоставить достоверную информацию при регистрации ' +
        'и поддерживать актуальность этой информации.',
      registration2:
        '1.2. Вы несете ответственность за безопасность своего аккаунта и пароля. Не передавайте свои учетные данные третьим лицам и ' +
        'не позволяйте им использовать ваш аккаунт.',
      registration3:
        '1.3. Вы обязуетесь не создавать несколько аккаунтов или использовать аккаунты других пользователей без их разрешения.',
      rules: '2. Правила использования',
      rules1:
        '2.1. При использовании Inctagram вы обязуетесь соблюдать все применимые законы и нормы поведения.',
      rules2:
        '2.2. Запрещено размещение незаконного, оскорбительного, непристойного или вредного контента. ' +
        'Вы несете ответственность за контент, который вы публикуете или делитесь через наше приложение.',
      rules3:
        '2.3. Запрещено нарушение частной жизни других пользователей. Не публикуйте личную информацию других людей без их разрешения.',
      rules4:
        '2.4. Запрещено использование Inctagram для рассылки спама или других нежелательных сообщений.',
      rules5:
        '2.5. Мы оставляем за собой право удалить любой контент или аккаунт, который нарушает наши правила использования или может причинить вред другим пользователям.',
      title: 'Условия использования',
      welcome:
        'Добро пожаловать в Inctagram! Пожалуйста, ознакомьтесь с нашими условиями использования перед началом использования нашей ' +
        'социальной сети. При использовании нашего приложения вы соглашаетесь с нашими условиями и обязуетесь их соблюдать. ' +
        'Если вы не согласны с нашими условиями, пожалуйста, не используйте наше приложение.',
    },
  },
  validation: {
    emailVerification: 'Почта должна соответствовать формату example@example.com',
    invalidCredentials: 'Введенные email или пароль неверны. Пожалуйста, попробуйте еще раз',
    maxLength20: 'Максимальное количество символов 20',
    minLength6: 'Минимальное количество символов 6',
    passwordMismatch: 'Пароли должны совпадать',
    passwordVerification:
      'Пароль должен содержать a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
    required: 'Обязательное поле',
    userNameVerification: 'Имя пользователя должно содержать:\n' + '0-9; A-Z; a-z; _ ; -',
  },
}
