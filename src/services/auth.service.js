const { JwtHelper } = require('../helpers');
let _userService = null;

class AuthService {
    constructor({ UserService }) {
        _userService = UserService
    }

    async singUp(user) {
        const { username } = user;
        const userExists = await _userService.getUserByUsername(username)
        if (userExists) {
            const error = new Error();
            error.status = 400;
            error.message = 'User already exist';
            throw error;
        }
        return await _userService.create(user);
    }

    async singIn(user) {
        const { username, password } = user
        const userExists = await _userService.getUserByUsername(username)
        if (!userExists) {
            const error = new Error();
            error.status = 404;
            error.message = 'User does not exist';
            throw error;
        }

        const validPassword = userExists.comparePasswords(password);
        if (!validPassword) {
            const error = new Error();
            error.status = 400;
            error.message = 'Invalid password';
            throw error;
        }

        const userToEncode = {
            username: userExists.username,
            id: userExists._id
        }
        const token = JwtHelper.generateToken(userToEncode);

        return { token, user: userExists };
    }
}

module.exports = AuthService;