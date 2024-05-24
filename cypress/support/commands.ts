Cypress.Commands.add('assertValueCopiedToClipboard', (value) => {
  if (!value) {
    throw new Error('No value provided');
  }
  cy.window().then((win) => {
    win.navigator.clipboard.readText().then((text) => {
      expect(text).to.contain(value);
    });
  });
});

Cypress.Commands.add('checkRedirectedUrl', (redirect) => {
  cy.origin(redirect, { args: { redirect } }, ({ redirect }) => {
    cy.url().should('include', `${redirect}`);
  });
});
