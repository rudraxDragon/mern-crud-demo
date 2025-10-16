import mongoose from "mongoose";
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "There is no prodcut on this planet without a name , so ENTER ONE"]
    },
    qty: {
      type: Number,
      required: true,
      default: 0
    },
    price: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model("Product", productSchema)
export default Product
