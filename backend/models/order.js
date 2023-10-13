const { mongoose, SchemaTypes } = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    total_quantity: {
      type: Number,
      min: 0,
      required: true,
    },
    total_price: {
      type: SchemaTypes.Decimal128,
      min: 0,
      required: true,
    },
    status: {
      type: String,
      required: [true, "Please enter product status"],
      default: "Processing",
      enum: {
        values: ["Processing", "Shipping", "Delivered"],
        message: "please select correct status",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
