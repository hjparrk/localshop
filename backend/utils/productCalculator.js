const productCalculator = (products) => {
  let total_quantity = 0;
  let total_price = 0;

  products.forEach((product) => {
    total_quantity += product.quantity;
    total_price += +parseFloat(product.product.price).toFixed(2);
  });

  return { total_quantity, total_price };
};

module.exports = productCalculator;
