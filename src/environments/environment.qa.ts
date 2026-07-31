export const environment = {
  production: false,

  remotes: {
    // Aquí normalmente van las URLs QA de los remotes.
  },

  auth: {
    authBaseUrl: 'https://api.ec-qas.latinka.com.pe',
    pamBaseUrl: 'http://uat.pam.seekdev.com',

    pamFastTokenPath: '/auth/pam/token/fast',
    pamTokenExchangePath: '/auth/pam/token/exchange',
    refreshPath: '/auth/refresh',
    logoutPath: '/auth/logout',

    backfrontLoginPath: '/backfront-identity/api/v1/identity/login',
  },
};
