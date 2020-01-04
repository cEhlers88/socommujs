import LogPlugin from '../src/serverplugin/LogPlugin';

test('LogPlugin', () => {
  const logPluginInstance = new LogPlugin();

  expect(logPluginInstance.getSettingValue('Log Debug')).toBe(true);
  logPluginInstance.setSettingValue('Log Debug', false);
  expect(logPluginInstance.getSettingValue('Log Debug')).toBe(false);

  expect(logPluginInstance.getSettingValue('Log Info')).toBe(true);
  logPluginInstance.setSettingValue('Log Info', false);
  expect(logPluginInstance.getSettingValue('Log Info')).toBe(false);
});
