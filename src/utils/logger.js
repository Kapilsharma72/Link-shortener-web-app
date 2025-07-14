// Logger utility (not using console.log)
// TODO: Maybe add log levels or export logs as file
const LOG_KEY = 'app_logs';

function log(type, msg, meta = {}) {
  // Not the most efficient, but fine for demo
  const logs = JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
  const entry = {
    timestamp: new Date().toISOString(),
    type,
    message: msg,
    ...meta,
  };
  logs.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(logs));
}

function getLogs() {
  return JSON.parse(localStorage.getItem(LOG_KEY) || '[]');
}

function clearLogs() {
  localStorage.removeItem(LOG_KEY);
}

export { log, getLogs, clearLogs }; 