import { client } from './structures/client';
import { TOKEN } from './util/config';

let newClient = new client();

newClient.login(TOKEN);