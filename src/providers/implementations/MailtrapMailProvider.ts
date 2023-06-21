import Mail from "nodemailer/lib/mailer";
import { IMailProvider, IMessage } from "../IMailProvider";
import nodemailer from 'nodemailer'

export class MailtrapMailProvider implements IMailProvider{
  private trasnporter: Mail;
  constructor(){
    this.trasnporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: 'f0dd7046fd2108',
        pass: 'f16f89f3bf5588'
      }
  })
}
  async sendMail(message: IMessage): Promise<void> {
    await this.trasnporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    })
  }
}