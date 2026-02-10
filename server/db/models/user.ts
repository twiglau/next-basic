import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  // 开启自动时间戳
  { timestamps: true },
);

export type UserType = mongoose.InferSchemaType<typeof userSchema>;
export const User =
  (mongoose.models.User as mongoose.Model<UserType>) ||
  mongoose.model<UserType>("User", userSchema);
