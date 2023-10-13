const { mongoose, SchemaTypes } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      maxLength: [50, "Product name cannot exceed 200 characters"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
      maxLength: [200, "Product description cannot exceed 200 characters"],
    },
    brand: {
      type: String,
      required: [true, "Please enter product seller"],
    },
    category: {
      type: String,
      required: [true, "Please enter product category"],
      enum: {
        values: ["Electronics", "Cameras", "Food", "Sports", "Outdoor", "Home"],
        message: "please select correct category",
      },
    },
    price: {
      type: SchemaTypes.Decimal128,
      min: [0, "Product price cannot be negative"],
      required: [true, "Please enter product price"],
      maxLength: [10, "Product price cannot exceed 10 digits"],
    },
    stock: {
      type: Number,
      min: [0, "Product stock cannot be negative"],
      required: [true, "Please enter product stock"],
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
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

module.exports = mongoose.model("Product", productSchema);
