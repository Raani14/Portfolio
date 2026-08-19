const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');

/* ── Field length limits ───────────────────────────── */
const LIMITS = {
  name: 100,
  email: 254,
  phone: 20,
  subject: 200,
  message: 5000,
};

/* ── Helpers ───────────────────────────────────────── */

// Strip HTML tags to prevent XSS in stored data
function stripHtml(str) {
  return str.replace(/<[^>]*>/g, '');
}

// Sanitize and trim a string field
function sanitize(value, maxLength) {
  if (typeof value !== 'string') return '';
  return stripHtml(value.trim()).slice(0, maxLength);
}

/* ── Email transporter (lazy init) ─────────────────── */
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('Email credentials not configured — email notifications disabled.');
    return null;
  }
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
}

/* ── POST /api/contact ─────────────────────────────── */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message, _honeypot } = req.body;

    // Honeypot check — bots fill hidden fields, humans don't
    if (_honeypot) {
      // Silently accept but don't save (so bots think it worked)
      return res.status(201).json({ success: true, message: 'Message sent successfully!' });
    }

    // Sanitize all inputs
    const clean = {
      name: sanitize(name, LIMITS.name),
      email: sanitize(email, LIMITS.email),
      phone: sanitize(phone || '', LIMITS.phone),
      subject: sanitize(subject, LIMITS.subject),
      message: sanitize(message, LIMITS.message),
    };

    // Required field validation
    if (!clean.name || !clean.email || !clean.subject || !clean.message) {
      return res.status(400).json({ error: 'All required fields must be provided.' });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clean.email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    // Save to MongoDB
    const newMessage = new ContactMessage(clean);
    await newMessage.save();

    // Send email notification (non-blocking — don't fail submission if email fails)
    const mailer = getTransporter();
    if (mailer) {
      const emailTo = process.env.EMAIL_TO || process.env.EMAIL_USER;
      mailer.sendMail({
        from: process.env.EMAIL_USER,
        to: emailTo,
        replyTo: clean.email,
        subject: `Portfolio Contact: ${clean.name} — ${clean.subject}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e293b; border-bottom: 2px solid #3b82f6; padding-bottom: 12px;">
              New Contact Message
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
              <tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #64748b; width: 100px;">Name</td>
                <td style="padding: 8px 12px; color: #1e293b;">${clean.name}</td>
              </tr>
              <tr style="background: #f8fafc;">
                <td style="padding: 8px 12px; font-weight: 600; color: #64748b;">Email</td>
                <td style="padding: 8px 12px;"><a href="mailto:${clean.email}" style="color: #3b82f6;">${clean.email}</a></td>
              </tr>
              ${clean.phone ? `
              <tr>
                <td style="padding: 8px 12px; font-weight: 600; color: #64748b;">Phone</td>
                <td style="padding: 8px 12px; color: #1e293b;">${clean.phone}</td>
              </tr>` : ''}
              <tr style="background: #f8fafc;">
                <td style="padding: 8px 12px; font-weight: 600; color: #64748b;">Subject</td>
                <td style="padding: 8px 12px; color: #1e293b;">${clean.subject}</td>
              </tr>
            </table>
            <div style="background: #f1f5f9; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin: 16px 0;">
              <p style="color: #334155; white-space: pre-wrap; margin: 0;">${clean.message}</p>
            </div>
            <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
              Sent from your portfolio contact form · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        `,
      }).catch(err => {
        // Log but don't fail the submission
        console.error('Email notification failed:', err.message);
      });
    }

    res.status(201).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'An error occurred. Please try again later.' });
  }
});

module.exports = router;
