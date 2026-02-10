import mongoose, { Schema } from "mongoose";

const statesSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "州名称不能为空"],
    },
    code: {
      type: String,
      required: [true, "州代码不能为空"],
    },
  },
  { timestamps: true },
);

export type StatesType = mongoose.InferSchemaType<typeof statesSchema>;

export const States =
  mongoose.models.States || mongoose.model<StatesType>("States", statesSchema);
