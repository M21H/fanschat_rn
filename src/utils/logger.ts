export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  VERBOSE = 'log',
  INFO = 'info',
  DEBUG = 'debug',
}

function logEvent(level: LogLevel, message: string, obj: { [key: string]: ToFix }): void {
  if (__DEV__) {
    console[level](message, obj);
  }
}

export const Logger = {
  log(message: string, obj: { [key: string]: ToFix } = {}): ToFix {
    logEvent(LogLevel.VERBOSE, message, obj);
  },
  error(error: string, obj: { [key: string]: ToFix } = {}): ToFix {
    logEvent(LogLevel.ERROR, error, obj);
  },
  warn(message: string, obj: { [key: string]: ToFix } = {}): ToFix {
    logEvent(LogLevel.WARN, message, obj);
  },
  info(message: string, obj: { [key: string]: ToFix } = {}): ToFix {
    logEvent(LogLevel.INFO, message, obj);
  },
  debug(message: string, obj: { [key: string]: ToFix } = {}): ToFix {
    logEvent(LogLevel.DEBUG, message, obj);
  },
};
