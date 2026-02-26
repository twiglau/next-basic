# tRPC .input() 功能详解

在 tRPC 的路由定义中，`.input()` 承担了两个核心功能：**运行时校验 (Validation)** 和 **编译时类型推导 (Type Inference)**。

## 1. 核心功能

### 运行时校验 (Runtime Validation)

当你调用接口时，tRPC 会自动执行校验逻辑：

- **字段存在性**：检查是否包含 schema 定义的所有必需字段。
- **格式检查**：根据 Zod 定义（如 `.min()`, `.max()`），如果不符合规范，tRPC 会直接拦截请求并返回 `400 Bad Request` 错误，不会执行后续的 `mutation` 或 `query` 逻辑。
- **安全性**：防止非法或恶意构造的数据进入后端逻辑。

### 自动化类型推导 (Type Inference)

- **IDE 补全**：在后端逻辑中，`input` 变量会自动获得完整的类型定义，提供代码补全。
- **前后端同步**：前端调用时，如果参数类型不匹配，在代码编译阶段就会报错，实现全栈类型安全。

---

## 2. 常见疑问

### 如果输入合乎规范，会报错吗？

**不会报错。**
当数据符合 Zod 定义时，tRPC 会完成验证，并静默地将验证后的数据传递给业务逻辑层。只有验证失败时才会触发错误。

### 客户端还需要用 Zod 主动校验吗？

**技术上不需要，但体验上非常推荐。**

虽然服务器端有拦截机制，但客户端主动校验有以下好处：

1. **即时反馈 (UX)**：无需网络往返即可告知用户输入错误。
2. **减少无效请求**：拦截明显无效的数据，减轻服务器负担。
3. **代码复用**：在 TypeScript 环境下，前端表单（如 React Hook Form）可以直接复用后端的 Schema 定义，实现零成本的多层保障。

---

## 3. 最佳实践示例

```typescript
// 后端：定义校验逻辑
.input(SnippetSchema)
.mutation(async ({ input }) => {
  // input 此时是强类型的
  const { title } = input;
})

// 前端：复用校验逻辑
const form = useForm({
  resolver: zodResolver(SnippetSchema),
});
```
