import nodemailer from 'nodemailer';
import { config } from '../config/config';
import { emailInfo, emailActionEnum } from '../constants';

class EmailService {
    sendMail(userEmail :string, action:emailActionEnum) {
        const { subject, html } = emailInfo[action];

        const emailTransporter = nodemailer.createTransport({
            from: 'No reply kolosOk',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            },
        });

        return emailTransporter.sendMail({
            to: userEmail,
            subject,
            html,
        });
    }
}

export const emailService = new EmailService();
