export { connectionDb } from "./db";

// 导出 User 模型和类型
export { User, type UserType } from "./models/user";
// 导出 Venus 模型和类型
export { Venus, type VenusType } from "./models/venus";
// 导出 States 模型和类型
export { States, type StatesType } from "./models/states";

// 导出 Prisma 客户端
export { prisma } from "./prisma";
export * from "@/lib/generated/prisma/client"; // exports generated types from prisma
