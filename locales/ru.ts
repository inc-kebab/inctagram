// Чтобы typescript подсказывал поля заполняем сначала файл en.ts

import { LocaleType } from './en'

export const ru: LocaleType = {
  button: {
    backToSignIn: 'Страница входа',
    createNewPassword: 'Создать новый пароль',
    no: 'Нет',
    resendVerificationLink: 'Отправить повторное подтверждение',
    sendLink: 'Отправить ссылку',
    sendLinkAgain: 'Отправить ссылку повторно',
    signIn: 'Войти',
    signUp: 'Зарегистрироваться',
    yes: 'Да',
  },
  label: {
    confirmAction: 'Подствердите действие',
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
      title: 'Забыли пароль',
    },
    profile: {
      logOutConfirmation: 'Вы действительно хотите выйти из своего аккаунта?',
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
