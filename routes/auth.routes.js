const { Router } = require('express');
const router = Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

/* prefix /api/auth ... */
router.post(
    '/register',
    [
        check('email', 'Not an email').isEmail(),
        check('password', '6 letters at least').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Bad data for registration' });
            }

            const { email, password } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 1);
            const user = new User({ email, password: hashedPassword });
            await user.save();

            res.status(201).json({ message: 'User was created' });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again later...' });
        }
    });

router.post(
    '/login',
    [
        check('email', 'Enter your email').normalizeEmail().isEmail(),
        check('password', 'Enter your password').exists(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: 'Bad data for login' });
            }

            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'User was not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Wrong password, try again later' });
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: '1h' },
            );

            res.json({ token, userId: user.id });
        } catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Something went wrong, try again later...' });
        }
    });

module.exports = router;
