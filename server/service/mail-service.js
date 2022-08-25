import nodemailer from 'nodemailer';

class MailService {
    async sendActivationMail(to, link) {
        try {
            console.log(`Отправка сообщения с почты ${process.env.SMTP_USER} на почту ${to}`);
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                // service: 'gmail',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: `Активация аккаунта на ${process.env.API_URL}`,
                text: '',
                html: `
                    <div>
                        <h1>Для активации перейдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
            });
            console.log('Сообщение успешно отправлено');
        } catch (e) {
            console.log('Ошибка при отправке сообщения', e);
        }
    }
}

export default new MailService();
