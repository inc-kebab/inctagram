import { memo } from 'react'

import { BackToPage } from '@/shared/ui/BackToPage'
import { Typography } from '@/shared/ui/Typography'
import { useRouter } from 'next/router'

import s from './Terms.module.scss'

const Terms = memo(() => {
  const router = useRouter()

  const handleNavigateToPrevPage = () => router.back()

  return (
    <div className={s.wrapper}>
      <BackToPage
        className={s.link}
        onNavigate={handleNavigateToPrevPage}
        title="Back to Sign Up"
      />
      <Typography as="h1" className={s.title} textAlign="center" variant="h1">
        Terms of Service
      </Typography>
      <Typography className={s.text} variant="regular14">
        Welcome to Inctagram! Please read our terms of use before using our social networking app.
        By using our application, you agree to our terms and commit to abide by them. If you do not
        agree with our terms, please do not use our application.
      </Typography>
      <Typography as="h2" className={s.subTitle} variant="h2">
        1. Your Privacy Matters to Us
      </Typography>
      <Typography className={s.text} variant="regular14">
        1.1 To use Inctagram, you need to create an account. You must provide accurate information
        during registration and keep this information up to date.
      </Typography>
      <Typography className={s.text} variant="regular14">
        1.2 You are responsible for the security of your account and password. Do not share your
        account credentials with third parties or allow them to use your account.
      </Typography>
      <Typography className={s.text} variant="regular14">
        1.3 You agree not to create multiple accounts or use other users' accounts without their
        permission.
      </Typography>
      <Typography as="h2" className={s.subTitle} variant="h2">
        2. Rules of Use
      </Typography>
      <Typography className={s.text} variant="regular14">
        2.1 When using Inctagram, you agree to comply with all applicable laws and codes of conduct.
      </Typography>
      <Typography className={s.text} variant="regular14">
        2.2 Posting illegal, offensive, indecent, or harmful content is prohibited. You are
        responsible for the content you post or share through our application.
      </Typography>
      <Typography className={s.text} variant="regular14">
        2.3 Violating the privacy of other users is prohibited. Do not publish personal information
        of others without their permission.
      </Typography>
      <Typography className={s.text} variant="regular14">
        2.4 Using Inctagram for spamming or sending unwanted messages is prohibited.
      </Typography>
      <Typography className={s.text} variant="regular14">
        2.5 We reserve the right to remove any content or account that violates our terms of use or
        may harm other users.
      </Typography>
      <Typography as="h2" className={s.subTitle} variant="h2">
        3. Intellectual Property
      </Typography>
      <Typography className={s.text} variant="regular14">
        3.1 Inctagram and all related materials, including logos, designs, texts, graphics, and
        other elements, are the property of Inctagram or its licensors and are protected by
        copyright and other intellectual property laws.
      </Typography>
      <Typography className={s.text} variant="regular14">
        3.2 By using Inctagram, you do not acquire any rights to use our intellectual property
        without our explicit permission.
      </Typography>
      <Typography as="h2" className={s.subTitle} variant="h2">
        4. Liability
      </Typography>
      <Typography className={s.text} variant="regular14">
        4.1 Inctagram is not responsible for the content posted or shared by users. We do not
        guarantee the accuracy, completeness, or reliability of such content.
      </Typography>
      <Typography className={s.text} variant="regular14">
        4.2 Inctagram is not liable for any damages caused to you or third parties as a result of
        using our application.
      </Typography>
      <Typography className={s.text} variant="regular14">
        4.3 You use Inctagram at your own risk. We do not guarantee that our application will work
        without errors or interruptions.
      </Typography>
      <Typography as="h2" className={s.subTitle} variant="h2">
        5. Changes to the Terms
      </Typography>
      <Typography className={s.text} variant="regular14">
        5.1 Inctagram reserves the right to make changes to these terms of use at its discretion. We
        will notify you of such changes and provide an opportunity to review the updated terms.
      </Typography>
      <Typography className={s.text} variant="regular14">
        5.2 Continued use of Inctagram after changes to the terms of use indicates your agreement
        with the updated terms.
      </Typography>
    </div>
  )
})

export default Terms
