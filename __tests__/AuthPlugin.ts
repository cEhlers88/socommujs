import AuthPlugin from '../src/serverplugin/AuthPlugin';

test('AuthPlugin', () => {
  const authPluginInstance = new AuthPlugin();

  expect(authPluginInstance.getSettingValue('Log Debug')).toBe(true);
  authPluginInstance.setSettingValue('Log Debug', false);
  expect(authPluginInstance.getSettingValue('Log Debug')).toBe(false);

  expect(authPluginInstance.getSettingValue('Log Info')).toBe(true);
  authPluginInstance.setSettingValue('Log Info', false);
  expect(authPluginInstance.getSettingValue('Log Info')).toBe(false);
});
