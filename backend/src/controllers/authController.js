const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const sendSMS = require('../utils/sendSMS');
const bcrypt = require('bcryptjs');

// @desc    Send OTP (Login / Register)
// @route   POST /api/auth/send-otp
// @access  Public
exports.sendOTP = async (req, res) => {
    const { identifier } = req.body;

    if (!identifier) {
        return res.status(400).json({ success: false, message: 'Please provide email or phone' });
    }

    try {
        const isEmail = identifier.includes('@');
        const query = isEmail ? { email: identifier } : { phone: identifier };

        let user = await User.findOne(query);

        if (!user) {
            const randomAvatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];
            user = await User.create({
                ...query,
                name: 'Guest User',
                role: 'user',
                avatar: randomAvatar
            });
        }

        // Generate 6-digit OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP
        const salt = await bcrypt.genSalt(10);
        const hashedOtp = await bcrypt.hash(otpCode, salt);

        const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins expiry

        user.otp = {
            code: hashedOtp, // Store hash
            expiresAt: otpExpires
        };

        await user.save();

        // Send OTP
        const message = `Your verification code is: ${otpCode}. It expires in 5 minutes.`;

        if (isEmail) {
            await sendEmail({
                email: identifier,
                subject: 'Your Aurea Vestis Login Code',
                code: otpCode
            });
        } else {
            await sendSMS({
                phone: identifier,
                message: message
            });
        }

        res.status(200).json({
            success: true,
            data: `OTP sent to ${identifier}`
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// Avatar Pool
const AVATARS = [
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Felix",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Liza",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Mittens",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Pepper",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Misty",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Scooter",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Oliver",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Bella",
    "https://api.dicebear.com/9.x/adventurer/svg?seed=Shadow"
];

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
    const { identifier, otp } = req.body;

    if (!identifier || !otp) {
        return res.status(400).json({ success: false, message: 'Please provide identifier and OTP' });
    }

    try {
        const isEmail = identifier.includes('@');
        const query = isEmail ? { email: identifier } : { phone: identifier };

        const user = await User.findOne(query);

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        if (!user.otp || !user.otp.code || !user.otp.expiresAt) {
            return res.status(400).json({ success: false, message: 'OTP not found or already used' });
        }

        if (user.otp.expiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'OTP expired' });
        }

        // Verify Hash
        const isMatch = await bcrypt.compare(otp, user.otp.code);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid OTP' });
        }

        // Clear OTP
        user.otp = undefined;
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                avatar: user.avatar
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
