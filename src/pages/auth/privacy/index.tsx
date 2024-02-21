import { ReactElement, memo } from 'react'

import { Page } from '@/shared/types/layout'
import { BackToPage } from '@/shared/ui/BackToPage'
import { Typography } from '@/shared/ui/Typography'
import { AuthLayout } from '@/widgets/layout'
import { useRouter } from 'next/router'

import s from './Privacy.module.scss'

const Privacy: Page = memo(() => {
  const router = useRouter()

  const handleNavigateToPrevPage = () => router.back()

  return (
    <div className={s.wrapper}>
      <BackToPage
        className={s.link}
        onNavigate={handleNavigateToPrevPage}
        title="Back to Sign Up"
      />
      <Typography asComponent="h1" className={s.title} textAlign="center" variant="h1">
        Privacy Policy
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        Your Privacy Matters to Us
      </Typography>
      <Typography className={s.text} variant="regular14">
        We value your privacy and strive to protect it when you use our Inctagram application. This
        privacy policy describes how we collect, use, disclose, and safeguard your personal data.
        Please read this policy carefully to understand how we handle your information.
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        Collection and Use of Personal Data
      </Typography>
      <Typography className={s.text} variant="regular14">
        We collect certain personal data that you provide to us when registering and using our
        application. This data may include your name, email address, profile photos, and other
        information necessary for using Inctagram.
      </Typography>
      <Typography className={s.text} variant="regular14">
        We use your personal data to provide and improve our services, including personalizing
        content, communicating with you, ensuring security, and preventing fraud. We may also use
        anonymous and aggregated data for analysis and statistics.
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        Disclosure of Personal Data
      </Typography>
      <Typography className={s.text} variant="regular14">
        We do not disclose your personal data to third parties without your consent, except as
        required by law or in cases necessary for providing our services or protecting our rights.
        We may disclose your data to our partners, agents, or service providers who work on our
        behalf and according to our instructions.
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        Protection of Personal Data
      </Typography>
      <Typography className={s.text} variant="regular14">
        We take security measures to protect your personal data from unauthorized access, use, or
        disclosure. We use technical, administrative, and physical security measures to safeguard
        your data.
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        Links to Third-Party Websites
      </Typography>
      <Typography className={s.text} variant="regular14">
        Our application may contain links to third-party websites or services that are not
        controlled by us. We are not responsible for the privacy and security of information
        collected by these third-party sites or services. It is recommended to review the privacy
        policy of these third-party resources before providing them with your personal data.
      </Typography>
      <Typography asComponent="h2" className={s.subTitle} variant="h2">
        Changes to the Privacy Policy
      </Typography>
      <Typography className={s.text} variant="regular14">
        We reserve the right to make changes to our privacy policy. In the event of significant
        changes, we will notify you by posting the updated privacy policy on our website or sending
        you email notifications.
      </Typography>
    </div>
  )
})

Privacy.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>
}

export default Privacy
