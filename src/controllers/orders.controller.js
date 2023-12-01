import Order from "../models/order.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllOrders = async (req, res) => {
  try {
    console.log("ORDER");
    const orders = await Order.find({});
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const listOrder = async (req, res) => {
  const order = await Order.create(req.body);
  res.status(201).json({ order });
};

export { getAllOrders, listOrder };
