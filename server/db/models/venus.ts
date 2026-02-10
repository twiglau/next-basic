import mongoose, { Schema } from "mongoose";

const venusSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "场馆名称不能为空"],
    },
    address: {
      type: String,
      required: [true, "场馆地址不能为空"],
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "States",
      required: [true, "场馆所属州不能为空"],
    },
  },
  { timestamps: true },
);

export type VenusType = mongoose.InferSchemaType<typeof venusSchema>;

export const Venus =
  mongoose.models.Venus || mongoose.model<VenusType>("Venus", venusSchema);
