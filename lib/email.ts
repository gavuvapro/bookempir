import { Resend } from "resend"
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
export async function sendEmail(to: string, subject: string, html: string){
  if(!resend) { console.log("Email (dev):", subject, to); return }
  await resend.emails.send({ from: process.env.EMAIL_FROM || "hello@example.com", to, subject, html })
}
export const emails = {
  welcome: (name:string)=> `<h2>Welcome, ${name}!</h2><p>Thanks for joining Authora.</p>`,
  orderConfirmation: (orderNumber:string)=> `<p>Your order ${orderNumber} is confirmed. Thank you!</p>`
}
