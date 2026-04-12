// src/lib/email-service.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.ALIYUN_SMTP_HOST,
  port: Number(process.env.ALIYUN_SMTP_PORT) || 465,
  secure: true, 
  auth: {
    user: process.env.ALIYUN_SMTP_USER,
    pass: process.env.ALIYUN_SMTP_PASS,
  },
});

export async function sendVerificationCode(email: string, code: string) {
  const htmlTemplate = `
    <div style="font-family: 'Courier New', Courier, monospace; background-color: #0a0a0a; color: #00ffcc; padding: 40px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #333;">
      <h2 style="color: #fff; border-bottom: 2px solid #00ffcc; padding-bottom: 10px;">🛡️ SECURITY OVERRIDE / 密码重置指令</h2>
      <p>Initiator: <strong>${email}</strong></p>
      <p>系统已接收到您的基因锁重置请求。请使用以下 8 位验证码验证您的权限。该指令将在 5 分钟后自毁。</p>
      
      <div style="background-color: #111; padding: 20px; border-left: 4px solid #ff6b81; margin: 20px 0; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #666; margin-bottom: 8px;">AUTHORIZATION CODE</p>
        <p style="margin: 0; font-size: 32px; font-weight: bold; color: #ff6b81; letter-spacing: 4px;">${code}</p>
      </div>

      <p style="color: #666; font-size: 12px; margin-top: 40px; border-top: 1px dashed #333; padding-top: 20px;">
        WARNING: If you did not request this override, your matrix sector may be compromised. Ignore this transmission.
        <br>Space² / Taohuayuan World Model
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Taohuayuan Matrix" <${process.env.ALIYUN_SMTP_USER}>`,
    to: email,
    subject: '[TAOHUAYUAN] Security Override - Verification Code',
    html: htmlTemplate,
  });
}