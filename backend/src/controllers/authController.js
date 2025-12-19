const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Login / Register User
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
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
