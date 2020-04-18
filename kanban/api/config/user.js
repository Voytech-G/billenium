module.exports = {
    validation: {
        pinLength: 4,
        maxUsernameLength: 12,
        minUsernameLength: 3,
        maxFirstNameLength: 15,
        minFirstNameLength: 2,
        maxLastNameLength: 15,
        minLastNameLength: 2,
    },
    repository: {
        RETURN_NEW_AFTER_UPDATE: true,
        USE_FIND_AND_MODIFY: true,
    },
}