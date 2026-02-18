const user = require("../models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exist = await user.findOne({ email })
        if (exist)
            return res.status(400).json({ message: "User already exists" })
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await user.create({
            name,
            email,
            password: hashedPassword
        });
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        )
        return res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const exist = await user.findOne({ email });
        if (!exist)
            return res.status(401).json("User does not  exist")
        const hashedPassword = exist.password;
        const verified = await bcrypt.compare(password, hashedPassword)
        if (verified) {
            const token = jwt.sign(
                { id: exist._id, name: exist.name, email: exist.email, password: exist.password },
                process.env.JWT_SECRET,
                { expiresIn: "2d" }
            )
            return res.status(200).json({ token })
        }
        else {
            return res.status(401).json({ message: "invalid credentials" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = { register, login }