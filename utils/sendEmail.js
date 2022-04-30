// import { createTransport } from 'nodemailer'

// export default async (options) => {
//   const transporter = createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASSWORD,
//     },
//   })

//   const message = {
//     from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   }

//   try {
//     const info = await transporter.sendMail(message)
//     console.log('Message sent: %s', info.messageId)
//   } catch (error) {
//     console.log(error)
//   }
// }
