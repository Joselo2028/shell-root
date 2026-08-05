export const environment = {
  production: true,

  remotes: {
    landing: 'https://landing.latinka.com/remoteEntry.js',
    auth: 'https://auth.latinka.com/remoteEntry.js',
    user: 'https://user.latinka.com/remoteEntry.js',
    wallet: 'https://wallet.latinka.com/remoteEntry.js',
    recharges: 'https://recharges.latinka.com/remoteEntry.js',
    notifications: 'https://notifications.latinka.com/remoteEntry.js',
    support: 'https://support.latinka.com/remoteEntry.js',

    tinka: 'https://tinka.latinka.com/remoteEntry.js',
    kabala: 'https://kabala.latinka.com/remoteEntry.js',
    ganadiario: 'https://ganadiario.latinka.com/remoteEntry.js',
    ganagol: 'https://ganagol.latinka.com/remoteEntry.js',
    kinelo: 'https://kinelo.latinka.com/remoteEntry.js',
    videoloterias: 'https://videoloterias.latinka.com/remoteEntry.js',
    blog: 'https://blog.latinka.com/remoteEntry.js',
  },

  auth: {
    /**
     * MODO PROXY LOCAL
     * Deja estas activas para trabajar normal sin error CORS.
     */
    authBaseUrl: '/api-auth',
    pamBaseUrl: '/api-pam',

    /**
     * MODO URL REAL QA
     * Comenta las 2 de arriba y descomenta estas 2 para generar el error CORS.
     */
    // authBaseUrl: 'https://api.ec-qas.latinka.com.pe',
    // pamBaseUrl: 'http://uat.pam.seekdev.com',

    pamFastTokenPath: '/auth/pam/token/fast',
    pamTokenExchangePath: '/auth/pam/token/exchange',
    refreshPath: '/auth/refresh',
    logoutPath: '/auth/logout',

    backfrontLoginPath: '/backfront-identity/api/v1/identity/login',
  },
};
