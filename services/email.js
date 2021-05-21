const sendgrid = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  #sender = sendgrid;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;
      case "prodaction":
        this.link = "Link for production";
        break;

      default:
        this.link = "http://localhost:3000";
        break;
    }
  }

  #createTemplateVerifyEmail(verificationToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "default",
      product: {
        name: "System contacts",
        link: this.link,
      },
    });
    const email = {
        body: {
            name,
            intro: 'Welcome to Mailgen! We are very excited to have you on board.',
            action: {
                instructions: 'To get started with System contacts, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Confirm your account',
                    link: `${this.link}/api/users/verify/${verificationToken}`
                }
            },
        }
    };
    const emailBody = mailGenerator.generate(email);
    return emailBody
  }

  async sendVerifyEmail(verificationToken, email, name) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY)

    const msg = {
      to: email, // Change to your recipient
      from: '1911.denis54@gmail.com', // Change to your verified sender
      subject: 'Verify email',
      html: this.#createTemplateVerifyEmail(verificationToken, name),
    }
    
    this.#sender.send(msg)
  }
}

module.exports = EmailService;
