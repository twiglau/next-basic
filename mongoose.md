# mongoose 操作

```ts
// scripts/remove-state-field.ts
import mongoose from "mongoose";

async function removeStateField() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to MongoDB");

    // 删除所有 Venus 文档中的 state 字段
    const result = await mongoose.connection.db
      .collection("venus")
      .updateMany({}, { $unset: { state: "" } });

    console.log(`Updated ${result.modifiedCount} documents`);
    console.log("State field removed successfully!");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

removeStateField();
```

2. 运行脚本

```bash
npm run remove-state-field
```

3. 重启服务器

```bash
npm run dev
```
