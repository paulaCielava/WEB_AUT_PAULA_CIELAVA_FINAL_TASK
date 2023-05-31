import 'cypress-file-upload';

describe('Automation Practice Form', () => {
  it('should fill out the form and validate the entered information', () => {
    cy.visit('https://demoqa.com/automation-practice-form')

    // Input necessary information
    cy.get('#firstName').type('Paula');
    cy.get('#lastName').type('Cielava');
    cy.get('#userEmail').type('demo@demo.com');
    cy.get('#gender-radio-2').check({force: true});
    cy.get('#userNumber').type('1234567890');

    // Set the - Date of Birth - with Calendar widget to - 28th of February, 1930.
    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('1'); // Select February
    cy.get('.react-datepicker__year-select').select('1930'); // Select 1930
    cy.contains('.react-datepicker__day--028', '28').click(); // Select 28

    // Set Subjects to Economics
    cy.get('#subjectsInput').type('Economics').type('{enter}');

    // Set Hobbies to Music
    cy.get('#hobbies-checkbox-3').check({ force: true });

    // Insert picture
    cy.fixture('motoj.jpg', 'base64').then((fileContent) => {
      cy.get('#uploadPicture').attachFile(
        { fileContent, fileName: 'motoj.jpg', mimeType: 'image/jpeg' },
        { uploadType: 'input' } 
      );
    });

    // Set State to NCR.
    cy.get('.css-yk16xz-control').select('NCR');
    // Set City to Delhi
    cy.get('#city').select('Delhi');

    // Click Submit
    cy.get('#submit').click();

    // Validate all information
    cy.contains('Name').next().should('contain', 'John Doe');
    cy.contains('Email').next().should('contain', 'johndoe@example.com');
    cy.contains('Gender').next().should('contain', 'Male');
    cy.contains('Mobile').next().should('contain', '1234567890');
    cy.contains('Date of Birth').next().should('contain', '28 February,1930');
    cy.contains('Subjects').next().should('contain', 'Economics');
    cy.contains('Hobbies').next().should('contain', 'Music');
    cy.contains('Picture').next().should('contain', 'image.jpg');
    cy.contains('State and City').next().should('contain', 'NCR Delhi');
  })
})