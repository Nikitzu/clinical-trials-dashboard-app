describe('Studies Dashboard', () => {
  const redirect = 'https://clinicaltrials.gov';

  it('shows right dashboard title on page load', () => {
    cy.visit('/');
    cy.contains('Dashboard of Clinical Trials');
  });

  it('renders 10 trials on page load', () => {
    cy.visit('/');
    cy.get('[data-cy="trials-link"]')
      .should('be.visible')
      .invoke('removeAttr', 'target')
      .click();
    cy.checkRedirectedUrl(redirect);
  });

  it('title link redirects to the source website', () => {
    cy.visit('/');
    cy.get('app-study-card').should('have.length', 10);
  });

  it('copy button copies single study link to the clipboard', () => {
    cy.visit('/');
    cy.get('[data-cy="copy-study-link"]').first().click();
    cy.assertValueCopiedToClipboard(`${redirect}/study/`);
  });

  it('open button redirects to a new tab', () => {
    cy.visit('/');
    cy.get('[data-cy="open-study-link"]').first().invoke('removeAttr', 'target').click();
    cy.checkRedirectedUrl(`${redirect}/study/`);
  });
});
