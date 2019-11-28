describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('showes untiled playlist', () => {
    cy.visit ('/');
    //cy.get('[data-cy=title]').should('contain', 'Untitiled Playlist');
    cy.get('[data-cy=title]').contains('Untitled Playlist');
  });

  it ('showes generate button', () => {
    cy.visit ('/');
    cy.get('[data-cy=generate-bn]').contains('Generate');
  });

  it ('changes playlist title with input', () => {
    cy.visit ('/');
    cy.get('[data-cy=input]').type('TEST TITLE');
    cy.get('[data-cy=generate-bn]').click();
    cy.get('[data-cy=title]').contains('TEST TITLE');
  });
});