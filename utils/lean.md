# Mongoose `.lean()` 方法详解

## `.lean()` 的作用

### 默认情况（不使用 `.lean()`）

```typescript
const states = await States.find({});
// 返回的是 Mongoose Document 对象
```

Mongoose 默认返回的是 **Document 对象**，这些对象包含：

- ✅ Mongoose 的所有方法（如 `.save()`, `.remove()` 等）
- ✅ Getters 和 Setters
- ✅ 虚拟属性
- ✅ 中间件钩子
- ❌ 但是体积更大，性能开销更高

### 使用 `.lean()` 之后

```typescript
const states = await States.find({}).lean();
// 返回的是普通 JavaScript 对象（Plain Old JavaScript Object - POJO）
```

返回的是 **纯 JavaScript 对象**：

- ✅ 更轻量，性能更好（快约 5-10 倍）
- ✅ 可以直接序列化为 JSON
- ✅ 内存占用更小
- ❌ 没有 Mongoose 的方法（不能调用 `.save()` 等）
- ❌ 不会触发 getters/setters

## 实际对比

```typescript
// 不使用 .lean()
const state1 = await States.findOne({ code: "CA" });
console.log(state1);
// 输出: Document { _id: ObjectId(...), name: 'California', ... }
// 类型: Mongoose Document
state1.save(); // ✅ 可以调用

// 使用 .lean()
const state2 = await States.findOne({ code: "CA" }).lean();
console.log(state2);
// 输出: { _id: ObjectId(...), name: 'California', ... }
// 类型: Plain Object
state2.save(); // ❌ 报错：state2.save is not a function
```

## 什么时候使用 `.lean()`？

### ✅ 应该使用的场景

- **只读操作**：只需要读取数据，不需要修改
- **API 响应**：需要返回 JSON 数据给前端
- **性能优化**：处理大量数据时
- **数据转换**：需要将数据转换为其他格式

```typescript
// ✅ 适合使用 .lean()
export async function getStates() {
  const states = await States.find({}).lean(); // 只读，返回给前端
  return states.map((s) => ({ id: s._id.toString(), name: s.name }));
}
```

### ❌ 不应该使用的场景

- 需要调用 Mongoose 方法（`.save()`, `.remove()` 等）
- 需要使用虚拟属性或 getters
- 需要触发中间件钩子

```typescript
// ❌ 不要使用 .lean()
const user = await User.findOne({ email }).lean();
user.password = newPassword;
await user.save(); // 报错！lean() 返回的对象没有 save 方法
```

## 在项目中的使用示例

```typescript
export async function getStates() {
  try {
    await connectionDb();
    const states = await States.find({}).select("_id name code").lean();
    //                                                          ^^^^^^
    //                                                          使用 .lean() 因为：
    //                                                          1. 只需要读取数据
    //                                                          2. 要返回给前端
    //                                                          3. 提高性能
    return states.map((state) => ({
      id: state._id.toString(),
      name: state.name,
      code: state.code,
    }));
  } catch (error) {
    console.error("Failed to fetch states:", error);
    return [];
  }
}
```

这里使用 `.lean()` 是完全正确的，因为：

1. 我们只需要读取州列表
2. 不需要修改数据
3. 要将数据返回给前端
4. 可以提高查询性能

## 性能对比示例

```typescript
// 测试 10000 条数据
console.time("without lean");
const docs = await Model.find({});
console.timeEnd("without lean");
// 输出: without lean: 450ms

console.time("with lean");
const objects = await Model.find({}).lean();
console.timeEnd("with lean");
// 输出: with lean: 50ms
```

## 总结

**`.lean()` 就是告诉 Mongoose "我只要数据，不要那些花里胡哨的功能"，从而获得更好的性能。**

在只读场景下，始终使用 `.lean()` 来优化性能。
