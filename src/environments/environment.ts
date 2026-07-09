export const environment = {
  production: false,

  remotes: {
    landing: 'http://localhost:4201/remoteEntry.js',
    auth: 'http://localhost:4202/remoteEntry.js',
    user: 'http://localhost:4203/remoteEntry.js',
    wallet: 'http://localhost:4204/remoteEntry.js',
    recharges: 'http://localhost:4205/remoteEntry.js',
    notifications: 'http://localhost:4206/remoteEntry.js',
    support: 'http://localhost:4207/remoteEntry.js',

    tinka: 'http://localhost:4208/remoteEntry.js',
    kabala: 'http://localhost:4209/remoteEntry.js',
    ganadiario: 'http://localhost:4210/remoteEntry.js',
    ganagol: 'http://localhost:4211/remoteEntry.js',
    kinelo: 'http://localhost:4212/remoteEntry.js',
    videoloterias: 'http://localhost:4213/remoteEntry.js',
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
    backfrontLoginPath: '/backfront-identity/api/v1/identity/login',
  },
};
