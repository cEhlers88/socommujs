export enum ELogLevel {
  unknown,
  debug,
  info,
  warning,
  error,
  fatal,
}
export enum EPluginState {
  unknown,
  initialized,

  error,
}
export enum ERequestMessage {
  userExist,
  login,
  logout,
}
export enum EServerEvent {
  clientConnected,
  clientDisconnected,
  clientWillConnect,
  getAuthenticatedRequest,
  getClientRequest,
  getUnauthenticatedRequest,
  log,
  serverInitialized,
  serverStart,
  serverStop,
}
export enum EServerState {
  unknown,
  initialized,
  closed,
  listening,
  error,
}
