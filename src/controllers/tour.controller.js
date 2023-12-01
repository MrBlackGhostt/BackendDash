import { json } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { TourPages } from "../models/tour.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllTours = async (req, res) => {
  try {
    const tours = await TourPages.find({});
    res.status(200).json({ tours });
  } catch (error) {
    throw new ApiError(500, `msg: ${error}`);
  }
};

const listTour = asyncHandler(async (req, res) => {
  const {
    tourName,
    tags,
    backgroundImage,
    alt,
    link,
    location,
    duration,
    name,
    price,
    status,
  } = req.body;

  if ([tourName].some((fields) => fields?.trim() === "")) {
    throw new ApiError(400, "TourName is required");
  }

  const backgroundImageLocalPath = req.files?.backgroundImage[0]?.path;

  if (!backgroundImageLocalPath) {
    throw new ApiError(400, "Background Image is required");
  }

  const bgImageUpload = await uploadOnCloudinary(backgroundImageLocalPath);

  if (!bgImageUpload) {
    throw ApiError(400, "Backgroung Image is required");
  }

  const tour = await TourPages.create({
    tourName: tourName.toLowerCase(),
    tags,
    backgroundImage: bgImageUpload.url,
    alt: "",
    link: "",
    location: "",
    duration: "",
    name: "",
    price: "",
    status: true,
  });

  const createdTour = await TourPages.findById(tour._id).select(
    "-photos -refereshToken"
  );

  if (!createdTour) {
    throw new ApiError(500, "Something went worng while creating tour ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdTour, "Tour registered Successfully"));
});

const getSpecificTour = async (req, res) => {
  try {
    const { _id: tourId } = req.params;

    const tour = await TourPages.findById(tourId);

    if (!tour) {
      return res.status(404).json({ message: "Tour Not Found" });
      // throw new ApiError(400, "Tour Not Found");
    }

    res.status(200).json({ tour });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(400).json("Invalid Tour ID");
  }
};

const updateTour = async (req, res) => {
  try {
    const { _id: tourId } = req.params;

    // Check if there are any properties to update in the request body
    if (!Object.keys(req.body).length) {
      return res.status(400).json("No Properties to update");
      // throw new ApiError(400, "No properties to update");
    }

    const tour = await TourPages.findOneAndUpdate(
      { _id: tourId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!tour) {
      throw new ApiError(404, `No tour with id: ${tourId}}`);
      // return res.status(404).json({ msg: `No tour with id: ${taskID}` });
    }

    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ msg: error.message });
    //throw new ApiError(404, `${error.message}`);
  }
};

const updateBgPhoto = async (req, res) => {
  try {
    const { _id: tourId } = req.params;

    // Check if there are any properties to update in the request body
    // if (!Object.keys(req.body).length) {
    //   return res.status(400).json("No Properties to update");
    //   // throw new ApiError(400, "No properties to update");
    // }

    const backgroundImageLocalPath = req.file?.backgroundImage[0]?.path;

    console.log("Backpo Path", backgroundImageLocalPath);

    if (!backgroundImageLocalPath) {
      throw new ApiError(400, "Background Image is required");
    }

    const bgImageUpload = await uploadOnCloudinary(backgroundImageLocalPath);

    if (!bgImageUpload) {
      throw ApiError(400, "Backgroung Image is required");
    } else {
      console.log("UPLOAD SUCCESS", bgImageUpload);
    }

    const tour = await TourPages.findOneAndUpdate(
      { _id: tourId },
      { $set: bgImageUpload },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!tour) {
      throw new ApiError(404, `No tour with id: ${tourId}}`);
      // return res.status(404).json({ msg: `No tour with id: ${taskID}` });
    }

    res.status(200).json(tour);
  } catch (error) {}
};

const deleteTour = async (req, res) => {
  try {
    const { _id: tourId } = req.params;

    const tour = await TourPages.findOneAndDelete({ _id: tourId });

    if (!tour) {
      return res.status(404).json({ msg: `No task with id : ${tourId}` });
    }

    res.status(200).json({ tour });
  } catch (error) {
    throw new ApiError(error.statusCode, `${error.message}`);
  }
};

export {
  listTour,
  getAllTours,
  getSpecificTour,
  updateTour,
  updateBgPhoto,
  deleteTour,
};
