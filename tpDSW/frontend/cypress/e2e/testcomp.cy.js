describe("template spec", () => {
  it("passes", () => {
    cy.visit("https://birbnbdsw.netlify.app/");

    const verAlojamientos = cy.contains('Ver alojamientos').click()

    const inputCordoba = cy.get('.search-box > input.search-input[type="text"]').clear().type('cordoba');

    const buscar = cy.get('.search-btn').click()

    const esperaCarga = cy.get('.alojamientos > div').first().should('contain.text', 'Córdoba')

    const primerAlojamiento = cy.get('.alojamientos button.MuiButtonBase-root[type="button"]').first().click();

    cy.contains('label', 'Check-in').parent().find('button.MuiButtonBase-root[type="button"]').click()
    
    cy.get('[role="rowgroup"].MuiDayCalendar-monthContainer').contains(19).click()

    cy.contains('label', 'Check-out').parent().find('button.MuiButtonBase-root[type="button"]').click()

    cy.get('[role="rowgroup"].MuiDayCalendar-monthContainer').contains(26).click()

    cy.contains('label', 'Huéspedes').parent().find('input.MuiInputBase-input[type="number"]').invoke('val', '2').trigger('input')

    cy.contains('button', 'Reservar ahora').click()

  });
});
