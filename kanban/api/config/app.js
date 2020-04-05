module.exports = {
    port: process.env.PORT || 4000,
    development: process.env.DEVELOPMENT || true,
    logs: {
        saveSuccessMessages: false,
        saveInfoMessages: false,
        saveErrorMessages: true,
    },
}