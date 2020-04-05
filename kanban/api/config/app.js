module.exports = {
    port: process.env.PORT || 4000,
    development: process.env.DEVELOPMENT || true,
    logs: {
        saveSuccessMessages: false,
        saveInfoMessages: false,
        saveErrorMessages: true,
    },
    authentication: {
        // later on the secret will be stored securily
        secret: process.env.SECRET || 'KHzZ[n5-$^8[DRfF',
    },
}