import { faker } from '@faker-js/faker';

describe('API - Product Endpoint', () => {
    let token;
    let createdProductId;
    const adminFixture = 'tempAdmin.json';

    before(() => {
        cy.fixture(adminFixture).then((admin) => {
            return cy.request('POST', 'https://serverest.dev/login', {
                email: admin.email,
                password: admin.password
            });
        }).then(res => {
            token = res.body.authorization;
        });
    });

    it('Should return a list of all products', () => {
        cy.request('GET', 'https://serverest.dev/produtos').then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('produtos');
            expect(response.body.produtos).to.be.an('array');
        });
    });

    it('Should create a new product with valid data', () => {
        const name = 'Test Product ' + faker.string.alpha(6);
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            headers: { Authorization: token },
            body: {
                nome: name,
                preco: 123,
                descricao: 'Product created by automated test',
                quantidade: 7
            }
        }).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            createdProductId = response.body._id;
        });
    });

    it('Should not create a product with empty name', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            headers: { Authorization: token },
            failOnStatusCode: false,
            body: {
                nome: '',
                preco: 123,
                descricao: 'Description',
                quantidade: 7
            }
        }).then(response => {
            expect(response.status).to.eq(400);
            expect(response.body.nome).to.eq('nome não pode ficar em branco');
        });
    });



    it('Should not allow creation of a duplicate product name', () => {
        const existingName = 'Existing Product ' + faker.string.alpha(6);

        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            headers: { Authorization: token },
            body: {
                nome: existingName,
                preco: 150,
                descricao: 'Test for duplicate name',
                quantidade: 3
            }
        }).then(() => {
            cy.request({
                method: 'POST',
                url: 'https://serverest.dev/produtos',
                headers: { Authorization: token },
                failOnStatusCode: false,
                body: {
                    nome: existingName,
                    preco: 150,
                    descricao: 'Test for duplicate name',
                    quantidade: 3
                }
            }).then(response => {
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq('Já existe produto com esse nome');
            });
        });
    });

    it('Should return a product when searched by valid id', () => {
        cy.request('GET', `https://serverest.dev/produtos/${createdProductId}`).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('nome');
        });
    });

    it.skip('Should return an empty result when searching for a non-existent product id', () => {
        // Skipped due to API bug: When searching by nonexistent _id, the API returns all products instead of an empty array.
        cy.request({
            method: 'GET',
            url: 'https://serverest.dev/produtos?_id=000000000000000000000000',
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(0);
            expect(response.body.produtos).to.be.an('array').that.is.empty;
        });
    });



    it('Should update a product by valid id', () => {
        const updatedName = 'Updated Product ' + faker.string.alpha(6);
        cy.request({
            method: 'PUT',
            url: `https://serverest.dev/produtos/${createdProductId}`,
            headers: { Authorization: token },
            body: {
                nome: updatedName,
                preco: 321,
                descricao: 'Updated by automated test',
                quantidade: 10
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Registro alterado com sucesso');
        });
    });

    it('Should delete a product by valid id', () => {
        cy.request({
            method: 'DELETE',
            url: `https://serverest.dev/produtos/${createdProductId}`,
            headers: { Authorization: token }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Registro excluído com sucesso');
        });
    });

    it('Should return an error when attempting to delete a product with invalid id length', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/produtos/000000000000000000000000',
            headers: { Authorization: token },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(400);
            expect(response.body.id).to.eq('id deve ter exatamente 16 caracteres alfanuméricos');
        });
    });

    it('Should return an error when attempting to delete a product with valid but non-existent id', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://serverest.dev/produtos/1234567890ABCDEF',
            headers: { Authorization: token },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Nenhum registro excluído');
        });
    });


});
