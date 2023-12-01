import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    tourName: {
      type: String,
    },
    tags: {
      type: [String], // Array of strings
    },
    backgroundImage: {
      type: String,
    },
    alt: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    duration: {
      type: String,
      default: "",
    },
    tagline: {
      type: String,
    },
    name: {
      type: String,
      default: "",
    },
    price: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: true, // You can set a default value for Boolean fields, e.g., false
    },
    dateStatus: [
      {
        date: { type: String },
        status: { type: Boolean, default: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

tourSchema.virtual("id").get(function () {
  return this._id.toString();
});

tourSchema.set("toObject", { virtuals: true });
tourSchema.set("toJSON", { virtuals: true });

export const TourPages = new mongoose.model("TourPages", tourSchema);
