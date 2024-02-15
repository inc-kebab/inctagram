import { Recaptcha } from '@/shared/assets/icons/other'
import { Button } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { TextField } from '@/shared/ui/TextField'
import { Typography } from '@/shared/ui/Typography'

import s from './ForgotPassword.module.scss'

export const ForgotPassword = () => {
  return (
    <form>
      <Card className={s.wrapper}>
        <Typography textAlign="center" variant="h1">
          Forgot Password
        </Typography>
        <TextField className={s.textField} label="Email" name="email" />
        <Typography className={s.description} variant="regular14">
          Enter your email address and we will send you further instructions
        </Typography>
        <Button className={s.button} fullWidth>
          Send Link
        </Button>
        <div className={s.linkWrapper}>
          <Button as="a" href="/sign-in" type="button" variant="text">
            Back to Sign In
          </Button>
        </div>
        <Card className={s.recaptcha}>
          I’m not a robot
          <Recaptcha />
        </Card>
      </Card>
    </form>
  )
}
