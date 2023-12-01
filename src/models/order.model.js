import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: String,
  amount: String,
  email: String,
  date: Date,
  people: String,
  tourName: String,
  status: String,
  order_id: String,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
