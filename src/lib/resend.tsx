import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function EmailTemplate({ token }: { token: string }) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ color: '#4CAF50', textAlign: 'center' }}>Authentication Token</h2>
      <p>Hello,</p>
      <p>Your authentication token is:</p>
      <p style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>{token}</p>
      <p>Please use this token to complete your authentication. If you did not request this, please ignore this email.</p>
      <p style={{ textAlign: 'center', color: '#555' }}>
        Thank you,
        <br />
        <strong>CineSpectare - Minard Parilla</strong>
      </p>
    </div>
  )
}

export async function sendEmail(to: string, token: string) {
  const { error } = await resend.emails.send({
    from: 'noreply@cinespectare.com',
    to,
    subject: 'Your Authentication Token',
    react: <EmailTemplate token={token} />,
  })
  if (error) throw error.message
}
