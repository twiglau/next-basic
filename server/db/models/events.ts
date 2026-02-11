import mongoose from "mongoose";
import { eventsValidationConfig } from "./events.config";

const eventsSchema = new mongoose.Schema(
  {
    artist: {
      type: String,
      minLength: [
        eventsValidationConfig.artist.minLength,
        eventsValidationConfig.artist.errorMessages.minLength,
      ],
      maxLength: [
        eventsValidationConfig.artist.maxLength,
        eventsValidationConfig.artist.errorMessages.maxLength,
      ],
    },
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venues",
      required: [
        eventsValidationConfig.venueId.required,
        eventsValidationConfig.venueId.errorMessages.required,
      ],
    },
    description: {
      type: String,
      minLength: [
        eventsValidationConfig.description.minLength,
        eventsValidationConfig.description.errorMessages.minLength,
      ],
      maxLength: [
        eventsValidationConfig.description.maxLength,
        eventsValidationConfig.description.errorMessages.maxLength,
      ],
    },
    date: {
      type: Date,
      required: [
        eventsValidationConfig.date.required,
        eventsValidationConfig.date.errorMessages.required,
      ],
    },
    slug: {
      type: String,
      unique: true,
      index: true,
      minLength: [
        eventsValidationConfig.slug.minLength,
        eventsValidationConfig.slug.errorMessages.minLength,
      ],
      maxLength: [
        eventsValidationConfig.slug.maxLength,
        eventsValidationConfig.slug.errorMessages.maxLength,
      ],
      required: [
        eventsValidationConfig.slug.required,
        eventsValidationConfig.slug.errorMessages.required,
      ],
    },
  },
  { timestamps: true },
);

export type EventsType = Omit<
  mongoose.InferSchemaType<typeof eventsSchema>,
  "venueId" | "date"
> & {
  venueId: string;
  date: string;
};

export const Events =
  mongoose.models.Events || mongoose.model("Events", eventsSchema);
