export function createLogger(scope = 'app', { level = 'info' } = {}) {
  const levels = ['debug', 'info', 'warn', 'error'];
  const min = Math.max(0, levels.indexOf(level));

  const shouldLog = (l) => levels.indexOf(l) >= min;
  const fmt = (l, args) => [`[%s][%s]`, scope, l.toUpperCase(), ...args];

  return {
    debug: (...args) => shouldLog('debug') && console.debug(...fmt('debug', args)),
    info: (...args) => shouldLog('info') && console.info(...fmt('info', args)),
    warn: (...args) => shouldLog('warn') && console.warn(...fmt('warn', args)),
    error: (...args) => shouldLog('error') && console.error(...fmt('error', args)),
  };
}
