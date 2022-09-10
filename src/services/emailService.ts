import nodemailer from 'nodemailer';
import { config } from '../config/config';

class EmailService {
    sendMail(userEmail = '') {
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
            subject: 'Hello world',
            html: 'Hello this is mail',
        });
    }
}

export const emailService = new EmailService();
