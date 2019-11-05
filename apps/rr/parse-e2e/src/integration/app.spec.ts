import { getGreeting } from '../support/app.po';

describe('rr-parse', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to rr-parse!');
  });
});
