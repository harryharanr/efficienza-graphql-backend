const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    login: async ({ email, password }) => {
        const user = await User.findOne({ email });
        if(!user) throw new Error('User not found!');

        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) throw new Error('Invalid credentials');

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            "somesupersecretkey",
            {
                expiresIn: "20s"
            }
        );

        return {
            userId: user.id,
            token
        }
    },
    users: async() => {
        try {
            const users = await User.find();
            return users;
        } catch (error) {
            throw error;
        }
    },
    createUser: async({ userInput: { email, password, firstname, lastname }}) => {
        try {
            let user = await User.findOne({ email });
            if(user) throw new Error('User already exists');

            const hashedPassword = await bcrypt.hash(password, 12);
            user = new User({
                email,
                password: hashedPassword,
                firstname,
                lastname
            });
            const result = await user.save();
            return { ...result._doc, password: null, _id: result.id };
        } catch (error) {
            throw error;
        }
    }
}
