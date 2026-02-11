# API Route vs Server Action：为什么注册用 API Route？

## 问题背景

在项目中：

- **注册**：使用 `fetch("/api/login")` 调用 API Route
- **场馆表单**：使用 Server Action

为什么不统一使用 Server Action？

---

## 当前代码分析

### 注册功能（使用 API Route）

```tsx
// app/login/page.tsx
const formik = useFormik({
  onSubmit: (values) => {
    handleSubmit(values);
  },
});

const handleSubmit = async (values) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  const data = await res.json();
  if (data.error) alert(data.error);
};
```

### 场馆表单（使用 Server Action）

```tsx
// app/dashboard/venue/page.tsx
const [state, action, isPending] = useActionState(addVenus, null);

return (
  <form action={action}>
    <input name="name" />
    <button type="submit">提交</button>
  </form>
);
```

---

## 为什么注册不适合用 Server Action？

### 原因 1：使用了 Formik（客户端表单库）

```tsx
const formik = useFormik({
  onSubmit: (values) => {
    handleSubmit(values); // 客户端函数
  },
});
```

**问题**：

- Formik 是纯客户端库，使用 `onSubmit` 处理表单
- Server Action 需要通过 `<form action={serverAction}>` 调用
- 两者的工作方式不兼容

---

### 原因 2：需要在客户端处理响应

```tsx
const data = await res.json();
if (data.error) {
  alert(data.error); // 立即显示客户端弹窗
}
```

**问题**：

- 需要立即在客户端显示 `alert`
- Server Action 的返回值需要通过 `useActionState` 管理
- 当前代码结构更适合直接 `fetch`

---

### 原因 3：与 NextAuth 集成一致

```tsx
// 登录使用 NextAuth 的客户端函数
await signIn("credentials", {
  email: values.email,
  password: values.password,
});
```

- NextAuth 的 `signIn` 本身就是客户端函数
- 注册和登录在同一个组件中，保持一致的调用方式更合理

---

## API Route vs Server Action 选择指南

### ✅ 使用 Server Action 的场景

1. **表单提交**（使用原生 HTML form）
2. **需要渐进增强**（JavaScript 禁用时仍可工作）
3. **简单的 CRUD 操作**
4. **与 `useActionState` 配合**

**示例**：场馆表单

```tsx
const [state, action, isPending] = useActionState(addVenus, null);

return (
  <form action={action}>
    <input name="name" />
    <button type="submit">提交</button>
  </form>
);
```

---

### ✅ 使用 API Route 的场景

1. **使用客户端表单库**（Formik, React Hook Form）
2. **需要精细的错误处理**（不同状态码）
3. **第三方集成**（NextAuth, Stripe webhook）
4. **非表单请求**（GET, DELETE, PATCH）
5. **需要设置特殊 headers 或 cookies**

**示例**：注册功能

```tsx
const res = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(values),
});
```

---

## 什么是渐进增强（Progressive Enhancement）？

**渐进增强**：网站的核心功能在**没有 JavaScript** 的情况下仍然可以工作，JavaScript 只是用来增强用户体验。

### Server Action 的渐进增强示例

#### ❌ 传统 API Route 方式（无渐进增强）

```tsx
const handleSubmit = async (e) => {
  e.preventDefault(); // 阻止默认提交

  const res = await fetch("/api/venue", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

return <form onSubmit={handleSubmit}>...</form>;
```

**问题**：

- 如果用户**禁用了 JavaScript**，表单完全无法提交
- 依赖 `fetch` API（需要 JavaScript）
- 点击提交按钮 → 什么都不会发生 ❌

---

#### ✅ Server Action 方式（支持渐进增强）

```tsx
// actions.ts
"use server";

export async function addVenue(formData: FormData) {
  const name = formData.get("name");
  // 保存到数据库...
  return { success: true };
}
```

```tsx
// page.tsx
function VenueForm() {
  return (
    <form action={addVenue}>
      <input name="name" />
      <button type="submit">提交</button>
    </form>
  );
}
```

**优势**：

- **JavaScript 禁用时**：表单仍然可以提交（浏览器发送 POST 请求）
- **JavaScript 启用时**：Next.js 拦截提交，使用 AJAX（更好的体验）
- 自动处理两种情况 ✅

---

## 渐进增强实际演示

### JavaScript **禁用**时

**用户操作**：

1. 填写表单
2. 点击"提交"
3. 浏览器发送传统的 POST 请求
4. 页面刷新，显示结果

**结果**：✅ 表单可以工作（虽然体验一般）

---

### JavaScript **启用**时

**用户操作**：

1. 填写表单
2. 点击"提交"
3. Next.js 拦截提交，使用 AJAX
4. **页面不刷新**，显示加载状态
5. 显示成功/失败消息

**结果**：✅ 更好的用户体验（无刷新）

---

## 两种方式对比

| 场景              | JavaScript 禁用   | JavaScript 启用 |
| ----------------- | ----------------- | --------------- |
| **Server Action** | ✅ 传统 POST 请求 | ✅ AJAX 请求    |
| **API Route**     | ❌ 无法提交       | ✅ AJAX 请求    |
| **页面刷新**      | 是                | 否              |
| **加载状态**      | 无                | 显示"提交中..." |
| **用户体验**      | 基本可用          | 流畅体验        |

---

## 为什么渐进增强很重要？

### 1. **可访问性**

某些用户可能：

- 使用屏幕阅读器（可能禁用 JS）
- 使用老旧浏览器
- 网络环境差，JS 加载失败

**渐进增强确保这些用户仍能使用你的网站**。

---

### 2. **SEO 友好**

搜索引擎爬虫可能不执行 JavaScript：

- ✅ Server Action：表单仍然可以被爬虫理解
- ❌ 纯客户端：爬虫看不到表单功能

---

### 3. **性能优化**

```tsx
<form action={addVenue}>
  {/* Next.js 会：
    1. 首次加载时不需要 JS bundle
    2. JS 加载后自动增强体验
    3. 用户可以更快看到表单
  */}
</form>
```

---

## 完整对比表格

| 特性         | Server Action            | API Route               |
| ------------ | ------------------------ | ----------------------- |
| **适用场景** | 原生表单提交             | 客户端表单库            |
| **调用方式** | `<form action={action}>` | `fetch("/api/...")`     |
| **返回值**   | 通过 `useActionState`    | 直接 `await res.json()` |
| **错误处理** | 返回对象                 | HTTP 状态码 + JSON      |
| **客户端库** | 不兼容 Formik            | ✅ 兼容                 |
| **渐进增强** | ✅ 支持                  | ❌ 需要 JS              |
| **灵活性**   | 中等                     | 高                      |

---

## 项目中的最佳实践

### 注册/登录：使用 API Route ✅

**原因**：

- 使用 Formik 客户端表单库
- 需要灵活的客户端错误处理
- 与 NextAuth 的登录逻辑保持一致

### 场馆/活动表单：使用 Server Action ✅

**原因**：

- 简单表单，不需要复杂验证
- 支持渐进增强
- 与 `useActionState` 配合良好

---

## 总结

**当前的实现方式是最佳实践**：

- ✅ 注册用 API Route（配合 Formik）
- ✅ 场馆表单用 Server Action（支持渐进增强）

**选择规则**：

```
使用 Server Action：
  - 简单表单
  - 需要渐进增强
  - 与 useActionState 配合

使用 API Route：
  - 客户端表单库（Formik, RHF）
  - 复杂错误处理
  - 第三方集成
  - 非表单请求
```
