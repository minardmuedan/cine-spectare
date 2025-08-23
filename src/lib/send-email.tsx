import nodemailer from 'nodemailer'

const EmailTemplate = (token: string) => `
  <div style="font-family: Arial, sans-serif; line-height:1.6; ...">
    <h2 style="color:#DC2626;text-align:center">Authentication Token</h2>
    <p>Hello,</p>
    <p>Your authentication token is:</p>
    <p style="font-size:24px;font-weight:bold;text-align:center;color:#333">${token}</p>
    <p>Please use this token to complete your authentication...</p>
    <p style="text-align:center;color:#555">
      Thank you,<br /><strong>CineSpectare - Minard Parilla</strong>
    </p>
  </div>
`

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SEND_EMAIL_USER!,
    pass: process.env.SEND_EMAIL_PASSWORD!,
  },
})

export async function sendEmail(to: string, token: string) {
  await new Promise((res, rej) => {
    transporter.sendMail(
      {
        from: process.env.USER!,
        to,
        subject: 'Your Authentication Token',
        html: EmailTemplate(token),
      },
      error => {
        if (error) {
          console.log('EMAIL ERROR: ', error)
          rej('Verification code cannot send')
        }

        res('')
      },
    )
  })
}
