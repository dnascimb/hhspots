
// Provide a default path to dwr.engine
if (dwr == null) var dwr = {};
if (dwr.engine == null) dwr.engine = {};
if (DWREngine == null) var DWREngine = dwr.engine;

if (HeartbeatAjax == null) var HeartbeatAjax = {};
HeartbeatAjax._path = '/dwr';
HeartbeatAjax.setI18NBeanFactory = function(p0, callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'setI18NBeanFactory', p0, callback);
}
HeartbeatAjax.setLocaleManager = function(p0, callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'setLocaleManager', p0, callback);
}
HeartbeatAjax.setFormatSettingsManager = function(p0, callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'setFormatSettingsManager', p0, callback);
}
HeartbeatAjax.setDraftManager = function(p0, callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'setDraftManager', p0, callback);
}
HeartbeatAjax.setHeartbeatManager = function(p0, callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'setHeartbeatManager', p0, callback);
}
HeartbeatAjax.stopActivity = function(p0, p1, callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'stopActivity', p0, p1, callback);
}
HeartbeatAjax.getHeartbeatInterval = function(callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'getHeartbeatInterval', callback);
}
HeartbeatAjax.startActivity = function(p0, p1, callback) {
  dwr.engine._execute(HeartbeatAjax._path, 'HeartbeatAjax', 'startActivity', p0, p1, callback);
}
