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
export enum EServerEvent {
  clientConnected,
  clientDisconnected,
  clientWillConnect,
  getClientRequest,
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
