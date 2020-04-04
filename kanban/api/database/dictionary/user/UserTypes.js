const DictionaryAbstract = require('../DictionaryAbstract')

class UserTypes extends DictionaryAbstract {
    static types = {
        'REGULAR': 'Regular',
        'SUPERVISOR': 'Supervisor',
        'ADMIN': 'Admin',
    }
}

module.exports = UserTypes