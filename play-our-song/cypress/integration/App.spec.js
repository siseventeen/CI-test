describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

  it ('untiled playlist', () => {
    cy.visit ('/');
    //cy.get('[data-cy=title]').should('contain', 'Untitiled Playlist');
    cy.get('[data-cy=title]').contains('Untitled Playlist');
  });
});