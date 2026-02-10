import mongoose, { Schema } from "mongoose";
import { venusValidationConfig } from "./venus.config";

const venusSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      minlength: venusValidationConfig.name.minLength,
      maxlength: venusValidationConfig.name.maxLength,
      required: [
        venusValidationConfig.name.required,
        venusValidationConfig.name.errorMessages.required,
      ],
    },
    address: {
      type: String,
      minlength: venusValidationConfig.address.minLength,
      maxlength: venusValidationConfig.address.maxLength,
      required: [
        venusValidationConfig.address.required,
        venusValidationConfig.address.errorMessages.required,
      ],
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "States",
      required: [
        venusValidationConfig.stateId.required,
        venusValidationConfig.stateId.errorMessages.required,
      ],
    },
  },
  { timestamps: true },
);

export type VenusType = Omit<
  mongoose.InferSchemaType<typeof venusSchema>,
  "stateId"
> & {
  stateId: string;
};

export const Venus =
  mongoose.models.Venus || mongoose.model<VenusType>("Venus", venusSchema);
