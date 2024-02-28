const mongoose = require("mongoose");
const { Object } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "Subcriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    //   wishlist: {
    //     type: Object,
    //     ref: "Product",
    //   },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userSchema);
