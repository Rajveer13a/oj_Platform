import { Resend } from "resend";
import { env } from "../../config/env";
import jwt from "jsonwebtoken";

const resend = new Resend(env.RESEND_API_KEY);

export const sendEmailVerification = async (email: string) => {
  
  const jwtEmailToken = jwt.sign({ email }, env.EMAIL_VERIFICATION_JWT_SECRET, {
    expiresIn: "15m",
  });

  const verificationLink = `${env.FRONTEND_URL}/verify/${jwtEmailToken}`;

  const { data, error } = await resend.emails.send({
    from: "verify@mail.brainyalgo.online",
    to: [email],
    subject: "Verify your email — BrainyAlgo",
    html: `
      <!DOCTYPE html>
      <html>
        <body style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px; color: #111;">
          
          <h2 style="font-size: 22px; font-weight: 700; margin-bottom: 8px;">
            Verify your email
          </h2>
          
          <p style="color: #555; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            Thanks for signing up for BrainyAlgo. Click the button below to verify your email address.
            This link expires in <strong>15 minutes</strong>.
          </p>

          <a
            href="${verificationLink}"
            style="
              display: inline-block;
              background: #111;
              color: #fff;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-size: 14px;
              font-weight: 600;
            "
          >
            Verify Email
          </a>

          <p style="color: #999; font-size: 12px; margin-top: 32px; line-height: 1.6;">
            If you didn't create an account, you can safely ignore this email.
            <br/>
          </p>

          <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
          
          <p style="color: #bbb; font-size: 11px;">
            BrainyAlgo · Made with ❤️
          </p>

        </body>
      </html>
    `,
  });
  
  return { data, error };
};
