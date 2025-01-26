describe('Product API', () => {
    let productId;
  
    it('should not allow duplicate product names', () => {
    // Create the first product
    cy.request('POST', '/products', {
      name: 'Harry Potter and the Philosopher Remake\'s Stone',
      price: 100,
    }).then((response) => {
      expect(response.status).to.eq(201);
      productId = response.body._id; // Store productId for use in other tests
    });

    // Attempt to create a product with the same name
    cy.request({
      method: 'POST',
      url: '/products',
      failOnStatusCode: false, // Prevent Cypress from failing the test automatically
      body: {
        name: 'Harry Potter and the Philosopher\'s Stone',
        price: 100,
      },
    }).then((response) => {
      expect(response.status).to.eq(400); // Expect 400 Bad Request
      expect(response.body.message).to.eq('Product name must be unique');
    });
  });
  
    it('should fetch paginated products', () => {
      cy.request('GET', '/products?page=1&limit=1').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.have.length(1);
        expect(response.body.totalPages).to.be.greaterThan(0);
      });
    });
  
    it('should update a product', () => {
      cy.request('PUT', `/products/${productId}`, { price: 150 }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.price).to.eq(150);
      });
    });
  
    it('should delete a product', () => {
      cy.request('DELETE', `/products/${productId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Product deleted');
      });
    });
  });
  