import { AuthRoutes } from '@/shared/const/routes'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
  callbacks: {
    signIn: async ({ account, user }) => {
      if (account?.provider === 'google') {
        fetch('https://main.inctagram.fun/api/v1/auth/github/login1', {
          body: JSON.stringify({
            code: account.id_token,
          }),
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
        })
          .then(res => res.json())
          .then(res => console.log(res))

        /*
        Делаю ПОСТ запрос на бек, отдаю токен.
        Бек дешифрует, достает данные юзера, если все ок, добавляет юзера в БД.
        Бек в ответ на ПОСТ запрос возвращает accessToken.
        Я сетаю токен в локалсторедж.
        
        Как обработать ошибки знает только бог.
        
         */
        return true
      }

      if (account?.provider === 'github') {
        console.log(account)
        console.log(user)

        /*
        Делаю ПОСТ запрос на бек, отдаю токен.
        Бек дешифрует, достает данные юзера, если все ок, добавляет юзера в БД.
        Бек в ответ на ПОСТ запрос возвращает accessToken.
        Я сетаю токен в локалсторедж.
        
        Как обработать ошибки знает только бог.
        
         */

        return true
      }

      return true
    },
  },
  pages: {
    signIn: AuthRoutes.SIGN_IN,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
})
