const calculateDiscount = (itemGroups) => {
    const discounts = [0, 0, 10, 20, 30, 40, 50, 60]; // Discounts by unique items
    let totalDiscount = 0;
  
    itemGroups.forEach((group) => {
      const discount = discounts[group.length];
      const groupPrice = group.length * 100;
      totalDiscount += (groupPrice * discount) / 100;
    });
  
    return totalDiscount;
  };
  
  const groupItemsForPromotion = (cartItems) => {
    const itemGroups = [];
    const itemMap = {};
  
    cartItems.forEach((item) => {
      const productId = item.product.toString();
      itemMap[productId] = (itemMap[productId] || 0) + item.quantity;
    });
  
    while (Object.keys(itemMap).length) {
      const group = [];
      for (const productId in itemMap) {
        group.push(productId);
        itemMap[productId] -= 1;
        if (itemMap[productId] === 0) delete itemMap[productId];
      }
      itemGroups.push(group);
    }
  
    return itemGroups;
  };
  
  module.exports = { calculateDiscount, groupItemsForPromotion };
  