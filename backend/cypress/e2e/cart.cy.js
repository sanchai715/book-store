describe('Cart API', () => {
    let product1, product2;
  
    before(() => {
      // Create test products before running the cart tests
      cy.request('POST', '/products', { name: 'Book 1', price: 100 }).then((response) => {
        product1 = response.body._id;
      });
  
      cy.request('POST', '/products', { name: 'Book 2', price: 100 }).then((response) => {
        product2 = response.body._id;
      });
    });
  
    it('should add a product to the cart', () => {
      cy.request('POST', '/cart/add', { productId: product1, quantity: 2 }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.items).to.have.length(1);
        expect(response.body.items[0].quantity).to.eq(2);
      });
    });
  
    it('should calculate the cart total with promotions', () => {
      // Add multiple items to the cart
      cy.request('POST', '/cart/add', { productId: product2, quantity: 1 });
  
      // Calculate total
      cy.request('GET', '/cart/calculate').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.totalPrice).to.eq(300); // 3 items x 100
        expect(response.body.discount).to.eq(20); // 10% discount
        expect(response.body.finalPrice).to.eq(280); // Total - Discount
      });
    });
  
    it('should clear the cart', () => {
      cy.request('DELETE', '/cart/clear').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('Cart cleared successfully');
      });
    });
  });
  