import Clientmanager from '../Clientmanager';
const ClientmanagerInstance: Clientmanager = new Clientmanager();

beforeAll(() => {});

test('There should be no Clients after just initializing Clientmanager.', () => {
  expect(ClientmanagerInstance.getClients().length).toBe(0);
});

test('There should be one Client after initializing Clientmanager and add a Client.', () => {
  ClientmanagerInstance.addClient();
  expect(ClientmanagerInstance.getClients().length).toBe(1);
});
