describe('API - Authentication - Login Endpoint', () => {
    let email;
    let password;

    before(() => {
        cy.fixture('tempAdmin.json').then((admin) => {
            email = admin.email;
            password = admin.password;
        });
    });

    it('Should authenticate successfully when valid credentials are provided', () => {
        cy.request('POST', 'https://serverest.dev/login', {
            email,
            password
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('authorization');
            expect(response.body.message).to.eq('Login realizado com sucesso');
        });
    });

    it('Should return an error when an incorrect password is provided', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email,
                password: 'incorrectPassword123'
            }
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        });
    });

    it('Should return an error when an unregistered email is provided', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email: 'notregistered_' + email,
                password
            }
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        });
    });

    it('Should return a validation error when password field is empty', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email: email,
                password: ''
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.password).to.eq('password não pode ficar em branco');
        });
    });

    it('Should return a validation error when email field is empty', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            failOnStatusCode: false,
            body: {
                email: '',
                password: password
            }
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.email).to.eq('email não pode ficar em branco');
        });
    });
});
