const bcrypt = require('bcrypt')

class AuthenticationService {
    /**
     * Return hashed string
     * 
     * @param {String} plainText
     * @return {String} 
     */
    static async getHash(plainText, saltRounds) {
        return await bcrypt.hash(plainText, saltRounds)
    }
}

module.exports = AuthenticationService