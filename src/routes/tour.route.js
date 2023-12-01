import { Router } from "express";
import {
  deleteTour,
  getAllTours,
  getSpecificTour,
  listTour,
  updateBgPhoto,
  updateTour,
} from "/Users/mrblackghost/Desktop/Dashboard Backend/src/controllers/tour.controller.js";
import { loggingMiddleware, upload } from "../middleware/multer.middleware.js";
import { getAllOrders, listOrder } from "../controllers/orders.controller.js";

const router = Router();

// Here the tourRouter get the control and then chekc the request and acc to it do call the method
router
  .route("/list")
  .post(
    loggingMiddleware,
    upload.fields([{ name: "backgroundImage", maxCount: 1 }]),
    listTour
  );
router.route("/").get(loggingMiddleware, getAllTours);
// router.route("/:_id").get(loggingMiddleware, getTour);
router
  .route("/update/:_id")
  .post(loggingMiddleware, upload.single("backgroundImage"), updateBgPhoto);

router.route("/find/:_id").get(loggingMiddleware, getSpecificTour);
router.route("/update/:_id").put(loggingMiddleware, updateTour);
router.route("/order").get(loggingMiddleware, getAllOrders);
router.route("/delete/:_id").delete(deleteTour);

router.route("/order").get(getAllOrders).post(loggingMiddleware, listOrder);

export default router;
