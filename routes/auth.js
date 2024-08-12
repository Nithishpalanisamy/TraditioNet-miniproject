const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        console.log('Plain Password:', password);  // Log the plain password

        user = new User({ email,uname, password });  // Store plain password
        await user.save();

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('JWT signing error:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }
            res.json({ success: true, token });
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Server error');
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log('Login Email:', email);
        console.log('Entered Password:', password);

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        console.log('Stored Password:', user.password);  // Log the stored plain password

        if (password !== user.password) {
            console.log('Password mismatch');
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error('JWT signing error:', err);
                return res.status(500).json({ success: false, message: 'Server error' });
            }
            res.json({ success: true, token });
        });
    } catch (err) {
        console.error('Server error:', err);
        res.status(500).send('Server error');
    }
});


// dialog box uname render
router.get('/user-info', (req, res) => {
    if (req.isAuthenticated()) {
      res.json({
        username: req.user.username,
        useremail: req.user.email
      });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });

  
module.exports = router;