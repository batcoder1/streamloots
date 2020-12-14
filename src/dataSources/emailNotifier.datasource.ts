import NotifierRepository from '../core/repositories/notifier.repository';
import nodemailer from 'nodemailer';
import Card from '../core/entities/Card';

export class EmailNotifier implements NotifierRepository {
  public notify(card: Card, email: string): void {
    const mailer = this.getMailer();
    const publish = card.private ? 'is not publish, already' : 'is publish';
    const mailOptions = {
      from: '"StreamLoots"',
      to: email,
      subject: `Your card ${card.name} ${publish}`,
      text: 'Your card has been updated!!',
    };
    mailer.sendMail(mailOptions);
  }

  private getMailer() {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }
}

export function CreateEmailNotifier(): EmailNotifier {
  return new EmailNotifier();
}
