// @ts-ignore
import Clientmanager from '../Clientmanager';
let ClientmanagerInstance: Clientmanager;

beforeEach(() => {
  ClientmanagerInstance = new Clientmanager();
});

test('There should be no Clients after just initializing Clientmanager.', () => {
  expect(ClientmanagerInstance.getClients().length).toBe(0);
});
test('There should be one Client after initializing Clientmanager and add a Client.', () => {
  ClientmanagerInstance.addClient(ClientmanagerInstance.createClient());
  expect(ClientmanagerInstance.getClients().length).toBe(1);
});
test('Test some client add and remove.', () => {
  const client1 = ClientmanagerInstance.createClient();
  const client2 = ClientmanagerInstance.createClient();

  ClientmanagerInstance.addClient(client1);
  ClientmanagerInstance.addClient(client2);
  expect(ClientmanagerInstance.getClients().length).toBe(2);

  ClientmanagerInstance.removeClient(client1.id);
  expect(ClientmanagerInstance.getClients().length).toBe(1);
  expect(ClientmanagerInstance.getClients()[0].id).toBe(client2.id);
});
test('After add some clients and remove them all, there should ne no clients at all.', () => {
  ClientmanagerInstance.addClient(ClientmanagerInstance.createClient());
  ClientmanagerInstance.addClient(ClientmanagerInstance.createClient());
  ClientmanagerInstance.addClient(ClientmanagerInstance.createClient());
  ClientmanagerInstance.addClient(ClientmanagerInstance.createClient());
  ClientmanagerInstance.addClient(ClientmanagerInstance.createClient());

  expect(ClientmanagerInstance.getClients().length).toBe(5);

  ClientmanagerInstance.removeAllClients();
  expect(ClientmanagerInstance.getClients().length).toBe(0);
});
