const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../middlewares/errors/ErrorHandler");
const Product = require("../models/product");
const Cart = require("../models/cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Get my cart => GET /api/carts/mycart
const getMyCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return next(new ErrorHandler(404, "No Cart Found"));
  }

  await cart.populate("products.product");

  res.status(200).json({ cart });
});

// Add product to my cart => POST /api/carts/
const addToCart = catchAsyncErrors(async (req, res, next) => {
  // id: product id
  const { id, quantity } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler(404, "No Product Found"));
  }

  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return next(new ErrorHandler(404, "No Cart Found"));
  }

  const isInCart = cart?.products?.find(
    (p) => p.product.toString() === product._id.toString()
  );

  if (isInCart) {
    await Cart.findOneAndUpdate(
      {
        _id: cart._id,
        "products.product": product._id,
      },
      {
        $inc: {
          "products.$.quantity": quantity,
        },
      }
    );
  } else {
    await Cart.findByIdAndUpdate(cart._id, {
      $push: {
        products: { product: product._id, quantity: quantity },
      },
    });
  }

  res.status(200).json({ success: true, message: "added to cart" });
});

// Update my cart => PUT /api/carts
const updateCart = catchAsyncErrors(async (req, res, next) => {
  // id: product id
  const { id, quantity } = req.body;

  const product = await Product.findById(id);

  if (!product) {
    return next(new ErrorHandler(404, "Product Not Found"));
  }

  const cart = await Cart.findOne({
    user: req.user._id,
    "products.product": product._id,
  });

  if (!cart) {
    return next(new ErrorHandler(404, "Product Not Found In Cart"));
  }

  await Cart.findOneAndUpdate(
    {
      _id: cart._id,
      "products.product": product._id,
    },
    {
      $set: {
        "products.$.quantity": quantity,
      },
    }
  );

  res.status(200).json({ success: true, message: "cart updated" });
});

const clearCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return next(new ErrorHandler(404, "No Cart Found"));
  }

  await cart.updateOne({
    $set: {
      products: [],
    },
  });

  res.status(200).json({ cart });
});

const checkout = async (req, res) => {
  let cart = await Cart.findOne({
    user: req.user._id,
  });

  if (!cart) {
    return next(new ErrorHandler(404, "No Cart Found"));
  }

  cart = await cart.populate("products.product");
  let products = cart.products;

  products = products.map((product) => ({
    name: product.product.name,
    description: product.product.description,
    price: +parseFloat(product.product.price).toFixed(2),
    image: product.product.image.url,
    quantity: product.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: "aud",
            product_data: {
              name: product.name,
              description: product.description,
              images: [product.image],
            },
            unit_amount_decimal: parseFloat(product.price) * 100,
          },
          quantity: product.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.CLIENT_DOMAIN}/checkout/success`,
      cancel_url: `${process.env.CLIENT_DOMAIN}/checkout/fail`,
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getMyCart, addToCart, updateCart, clearCart, checkout };
