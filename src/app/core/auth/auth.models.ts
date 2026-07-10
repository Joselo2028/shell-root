export interface PamFastTokenResponse {
  message: string;
  redirect: string;
  token: string;
}

export interface AuthUser {
  clientId: string;
  sessionId: string;
  name: string;
  mail: string;
  mobilePhone: string;
  balanceAmount: number;
  mode: string;
  agreement: string;
  mailVerified: string;
  mobileStatus: string;
  isDataComplete: number;
}

export interface LoginState {
  state: string;
  message: string;
  phone: string | null;
  clientId: string | null;
  button: string | null;
  lrdn: string | null;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  user: AuthUser;
  loginState: LoginState;
}

export interface PamTokenExchangeRequest {
  securityToken: string;
}

export interface BackfrontLoginRequest {
  documentType: string;
  documentNumber: string;
  password: string;
  operatorId: string;
  playerIp: string;
  requestIp: string;
  platform: string;
}

export interface BackfrontLoginResponse {
  token: string;
  clientId: string;
  aditionalToken: string | null;
  ssoRefresh?: string;
  responseMessage: string;
  responseTitle: string;
  responseButton: string;
}

export interface RefreshRequest {
  refreshToken: string;
  username: string;
}

export interface AuthRefreshResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
  tokenType: 'Bearer';
}

export interface LogoutRequest {
  refreshToken: string;
}
