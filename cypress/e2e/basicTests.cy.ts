// describe('Login as client then check if the welcome message show the correct name and finally logout', () => {
//   it('Open the page and be redirected to login', () => {
//     cy.visit('http://localhost:5173/')
//     cy.location('pathname').should("eq","/login")
//     cy.get("[datatype=email]").type('ana.lopez@example.com')
//     cy.get("[datatype=password]").type('AnaML123')
//     cy.get("[datatype=loginButton]").click()
//     cy.url().should('eq','http://localhost:5173/')
//   })
  
//   beforeEach(function() {
//     if(this.currentTest && this.currentTest.title != 'Open the page and be redirected to login'){
//       cy.login();
//     }
//   });



//   it('Read the welcome message and validate if it is the correct name and logout', () =>{
//     cy.visit('http://localhost:5173/')
//     cy.location('pathname').should("eq","/")
//     cy.get("[datatype=welcomeMessage]").contains("Ana")

//     cy.get('[datatype=logoutButton]').click()
//     cy.location('pathname').should('eq','/login');
//   })
// })

// describe('Go to clientDetails, modify the last name, save, enter again and check if the changes were saved, finally logout',() =>{
//   before(function(){
//     cy.login();
//   })

//   it('Validate if it is in home, then go to clientDetails change lastname, visit again, change lastname again and logout',() =>{
//     cy.visit('http://localhost:5173/');
//     cy.location('pathname').should("eq","/")
//     cy.get('[datatype=nav-clientDetails]').click();
//     cy.get('[datatype=lastNameInput]').clear().type('López Cascante')
//     cy.get('[datatype=saveChangesButton]').click()
//     cy.location('pathname').should('eq','/')
//     cy.get('[datatype=nav-clientDetails]').click();
//     cy.get('[datatype=lastNameInput]').should('contain.value','López Cascante').clear().type('López')
//     cy.get('[datatype=saveChangesButton]').click()
//     cy.wait(5100)
//     cy.get('[datatype=logoutButton]').click()
//     cy.location('pathname').should('eq','/login');
//   })
// });

describe('Go to pet list, get the first pet, check if it is the correct pet name, species and breed',() =>{
  before(function(){
    cy.login()
  });

  it("Goes to 'My pets', click the first card, validate data",() => {
    cy.visit('http://localhost:5173/');
    cy.location('pathname').should("eq","/")
    cy.get('[datatype=nav-pets]').click();
    cy.get('[datatype=viewPetDetailsButton]').first().click()
    cy.location('pathname').should('eq','/pets/Milo')

    cy.get('[datatype=petName]').should('have.text','Milo')
    cy.get('[datatype=petSpecies]').should('have.text','Dog')
    cy.get('[datatype=petBreed]').should('have.text','Labrador Retriever')
  })
});