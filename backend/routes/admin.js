const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');
const ContactMessage = require('../models/ContactMessage');

// Admin Login Limiter is applied in server.js

// POST /api/admin/login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, error: 'Invalid credentials' });
    }

    // Check against env vars
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminUsername || !adminPasswordHash || !process.env.JWT_SECRET) {
      console.error('Admin credentials or JWT secret not configured in env.');
      return res.status(500).json({ success: false, error: 'Server configuration error' });
    }

    if (username !== adminUsername) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, adminPasswordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Generate JWT
    const payload = { admin: { id: 1 } }; // Simple static payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set secure httpOnly cookie
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax', // none required if cross-origin in prod, but let's default appropriately
      maxAge: 3600000 // 1 hour
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'An error occurred during login' });
  }
});

// POST /api/admin/logout
router.post('/logout', (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.clearCookie('admin_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  });
  res.json({ success: true });
});

// GET /api/admin/me
router.get('/me', (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) {
    return res.json({ authenticated: false });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    res.json({ authenticated: true });
  } catch (err) {
    res.json({ authenticated: false });
  }
});

// GET /api/admin/contacts (Protected)
router.get('/contacts', auth, async (req, res) => {
  try {
    const contacts = await ContactMessage.find()
      .select('_id name email phone subject message read createdAt')
      .sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Fetch contacts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PATCH /api/admin/contacts/:id/read (Protected)
router.patch('/contacts/:id/read', auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { read } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    if (typeof read !== 'boolean') {
      return res.status(400).json({ error: 'Invalid read status' });
    }

    const contact = await ContactMessage.findByIdAndUpdate(
      id,
      { read },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/admin/contacts/:id (Protected)
router.delete('/contacts/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const contact = await ContactMessage.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
