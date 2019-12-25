export enum logLevel {
  unknown,
  debug,
  info,
  warning,
  error,
  fatal,
}
export enum pluginstate {
  unknown,
  initialized,

  error,
}
export enum serverevent {
  clientConnected,
  clientDisconnected,
  clientWillConnect,
  getClientRequest,
  log,
}
export enum serverstate {
  unknown,
  initialized,
  closed,
  listening,
  error,
}
