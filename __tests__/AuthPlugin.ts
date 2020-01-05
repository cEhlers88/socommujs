import AuthPlugin from '../src/serverplugin/AuthPlugin';

test('AuthPlugin', () => {
  const authPluginInstance = new AuthPlugin();

  expect(typeof authPluginInstance).toBe("object");
});
