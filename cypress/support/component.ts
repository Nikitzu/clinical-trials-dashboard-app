import './commands';

import { mount } from 'cypress/angular';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      assertValueCopiedToClipboard: typeof Function;
      checkRedirectedUrl: typeof Function;
    }
  }
}

Cypress.Commands.add('mount', mount);
