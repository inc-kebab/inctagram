// Чтобы typescript подсказывал поля заполняем сначала файл en.ts

import { LocaleType } from './en'

export const ru: LocaleType = {
  button: {
    backToSignIn: 'Страница входа',
    createNewPassword: 'Создать новый пароль',
    resendLink: 'Отправить новую ссылку',
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
  },
  validation: {
    maxLength20: 'Максимальное количество символов 20',
    minLength6: 'Минимальное количество символов 6',
    passwordMismatch: 'Пароли должны совпадать',
    passwordVerification:
      'Пароль должен содержать a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
    required: 'Обязательное поле',
  },
}
