# `useActionState` vs `useFormStatus` 详解

这两个是 React 19 中用于处理表单的不同 Hook，它们有不同的用途和使用场景。

## `useActionState` - 管理表单状态和 Server Action

**作用**：管理 Server Action 的执行状态和返回值

**使用位置**：在包含 `<form>` 的**父组件**中使用

**返回值**：`[state, formAction, isPending]`

```typescript
const [state, action, isPending] = useActionState(serverAction, initialState);
```

- `state`: Server Action 返回的数据（成功/失败消息等）
- `action`: 传递给 `<form action={action}>` 的函数
- `isPending`: 表单是否正在提交

**示例**：

```tsx
"use client";

const VenuePage = () => {
  const [state, action, isPending] = useActionState(addVenus, null);
  //    ↑       ↑        ↑
  //    返回值  传给form  是否提交中

  return (
    <form action={action}>
      <input name="name" />
      <button type="submit" disabled={isPending}>
        {isPending ? "提交中..." : "提交"}
      </button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
};
```

---

## `useFormStatus` - 获取表单提交状态

**作用**：获取**父级 `<form>`** 的提交状态（只读）

**使用位置**：在 `<form>` 的**子组件**中使用（不能在同一组件）

**返回值**：`{ pending, data, method, action }`

```typescript
const { pending, data, method, action } = useFormStatus();
```

- `pending`: 表单是否正在提交
- `data`: 表单数据（FormData）
- `method`: HTTP 方法（POST/GET）
- `action`: 表单的 action URL

**示例**：

```tsx
"use client";

// 父组件
function VenuePage() {
  return (
    <form action={addVenus}>
      <input name="name" />
      <SubmitButton /> {/* 子组件使用 useFormStatus */}
    </form>
  );
}

// 子组件
function SubmitButton() {
  const { pending } = useFormStatus();
  //      ↑
  //      获取父级 form 的状态

  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中..." : "提交"}
    </button>
  );
}
```

---

## 核心区别对比

| 特性                        | `useActionState`                | `useFormStatus`            |
| --------------------------- | ------------------------------- | -------------------------- |
| **使用位置**                | 包含 `<form>` 的组件            | `<form>` 的子组件          |
| **主要功能**                | 管理 Server Action 状态和返回值 | 获取表单提交状态（只读）   |
| **返回 Server Action 结果** | ✅ 是 (`state`)                 | ❌ 否                      |
| **提供 pending 状态**       | ✅ 是 (`isPending`)             | ✅ 是 (`pending`)          |
| **需要传递 action**         | ✅ 是 (`action`)                | ❌ 否（自动检测父级 form） |
| **组件分离**                | 不需要                          | 需要（必须在子组件）       |

---

## 使用场景

### 场景 1：简单表单（使用 `useActionState`）

```tsx
"use client";

function SimpleForm() {
  const [state, action, isPending] = useActionState(addVenus, null);

  return (
    <form action={action}>
      <input name="name" />
      <button disabled={isPending}>{isPending ? "提交中..." : "提交"}</button>
      {state?.message && <p>{state.message}</p>}
    </form>
  );
}
```

**优点**：简单直接，所有逻辑在一个组件

---

### 场景 2：复用提交按钮（使用 `useFormStatus`）

```tsx
"use client";

// 可复用的提交按钮组件
function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中..." : children}
    </button>
  );
}

// 表单 1
function VenueForm() {
  return (
    <form action={addVenus}>
      <input name="name" />
      <SubmitButton>添加场馆</SubmitButton>
    </form>
  );
}

// 表单 2（复用同一个按钮组件）
function EventForm() {
  return (
    <form action={addEvent}>
      <input name="title" />
      <SubmitButton>添加活动</SubmitButton>
    </form>
  );
}
```

**优点**：组件复用性强

---

### 场景 3：结合使用

```tsx
"use client";

// 父组件：使用 useActionState 获取返回值
function VenueForm() {
  const [state, action] = useActionState(addVenus, null);

  return (
    <div>
      <form action={action}>
        <input name="name" />
        <SubmitButton /> {/* 子组件使用 useFormStatus */}
      </form>
      {state?.message && <p>{state.message}</p>}
    </div>
  );
}

// 子组件：使用 useFormStatus 获取 pending 状态
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "提交中..." : "提交"}
    </button>
  );
}
```

**优点**：既能获取返回值，又能复用按钮组件

---

## 常见错误

### ❌ 错误 1：在同一组件使用 `useFormStatus`

```tsx
function Form() {
  const { pending } = useFormStatus(); // ❌ 错误！不会工作

  return (
    <form action={addVenus}>
      <button disabled={pending}>提交</button>
    </form>
  );
}
```

**原因**：`useFormStatus` 只能检测**父级** `<form>` 的状态

---

### ❌ 错误 2：不需要返回值时用 `useActionState`

```tsx
function Form() {
  const [state, action, isPending] = useActionState(addVenus, null);
  // 如果不需要 state，这样写太繁琐

  return (
    <form action={action}>
      <input name="name" />
      <button disabled={isPending}>提交</button>
    </form>
  );
}
```

**更好的方案**：直接用 `useFormStatus`

```tsx
function Form() {
  return (
    <form action={addVenus}>
      <input name="name" />
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>提交</button>;
}
```

---

## 总结

- **`useActionState`**：当你需要**获取 Server Action 的返回值**（如错误消息、成功提示）时使用
- **`useFormStatus`**：当你只需要**获取提交状态**，或者想**复用提交按钮组件**时使用
- **结合使用**：复杂表单可以同时使用两者，发挥各自优势

---

## 项目中的实际应用

在当前项目的 `app/dashboard/venue/page.tsx` 中：

```tsx
const [state, action, isPending] = useActionState(addVenus, null);
```

使用 `useActionState` 是正确的选择，因为：

1. 需要显示 `state?.message`（Server Action 的返回消息）
2. 需要在按钮上显示 `isPending` 状态
3. 表单逻辑相对简单，不需要组件分离
