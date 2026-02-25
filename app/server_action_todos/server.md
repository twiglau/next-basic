# React Server Components 中的序列化 (Serialization)

在 Next.js 的 Server Components 中，**“可序列化” (Serializable)** 是一个核心概念，因为它涉及到数据如何从 **服务器（Node.js 环境）** 传递到 **客户端（浏览器环境）**。

## 1. 什么是序列化 (Serialization)？

简单来说，序列化就是**将内存中的对象或数据结构转换为一种可以“跨网络传输”的格式（通常是字符串或二进制流）的过程**。

- **服务器端**：对象存在于 Node.js 内存里。
- **浏览器端**：无法直接访问服务器内存。
- **过程**：服务器把对象“拍扁”成一段文本（序列化），发送到浏览器，浏览器再将其还原（反序列化）。

## 2. 为什么 Props 必须可序列化？

当你从 Server Component 给 Client Component 传递 Prop 时，React 实际上是在执行一次**跨网络的传输**。浏览器无法接收服务器上的“活”函数或复杂的类实例，因为它没有服务器的上下文（闭包、环境变量等）。

## 3. 什么数据是“可序列化”的？

在 RSC 中，以下基础数据可以安全传递：

- **基本类型**：`string`, `number`, `boolean`, `null`, `undefined`, `bigint`。
- **基础容器**：普通的 `Object` (`{...}`) 和 `Array` (`[...]`)。
- **特殊 React 类型**：
  - **Server Actions**：带有 `"use server"` 标记的函数（React 会将其序列化为一个特殊的“调用 ID”）。
  - **JSX 元素**：服务端渲染出的组件结构。
- **Web 标准对象**：`FormData`, `Map`, `Set`（较新版本支持）。

## 4. 为什么内联函数 (如 `() => ...`) 不行？

**普通函数和闭包是不可序列化的：**

1.  **代码传输限制**：JavaScript 引擎无法简单地把函数的源代码及其背后的所有内存引用（闭包）打包。
2.  **上下文缺失**：如果函数引用了服务器上的数据库连接或密钥，浏览器端根本无法运行。

## 5. 为什么 Server Action 可以传递？

当你定义一个异步函数并添加 `"use server"` 标记时，Next.js 在构建阶段执行了“隐藏魔术”：

- **解耦实现与引用**：Next.js **不会**尝试将复杂的函数源代码序列化发送给浏览器。相反，它在服务器端保留函数体，并生成一个**加密的唯一 ID**（类似于一个指针）。
- **传递的是“存根” (Stub)**：发送给 Client Component 的 Prop 实际上是一个轻量级的引用对象。它包含了动作的 ID 和服务器地址。这个对象是完全**可序列化**的。
- **远程过程调用 (RPC)**：
  1.  当你在客户端触发 `onClick={myAction}` 时，React 识别出这是一个 Server Action 引用。
  2.  浏览器会自动发起一个特殊的 **HTTP POST 请求**到服务器。
  3.  请求中包含了该 Action 的 ID 以及你传递的参数。
  4.  服务器接收到请求，根据 ID 找到对应的函数并执行，最后将结果（同样需可序列化）传回客户端。

这种机制确保了**服务器逻辑（如数据库操作、敏感密钥）永远不会暴露给客户端**，但也解释了为什么包裹它的内联函数会失效——因为内联函数是“临时的、活的”，没有对应的 ID 存根。

## 6. 为什么嵌套调用 Server Action 必须使用 await？

这是一个关于 **异步执行顺序 (Execution Sequence)** 和 **Server Action 响应机制** 的关键问题。简单来说：**如果没有 `await`，Server Action 还没等数据存好并告诉页面刷新，就已经提前“收工”了。**

### 场景 A：不加 `await` (错误做法)

```typescript
const addTodoWithUserId3 = async () => {
  "use server";
  const form = new FormData();
  form.set("todo", "🐂");

  // ❌ 这里没有 await，它就像“发射后不管”的导弹
  addTodoWithUserId(form);

  // 🏁 这里的代码会立即执行完，Server Action 结束并返回响应给浏览器
};
```

1.  **浏览器**：调用 `addTodoWithUserId3`。
2.  **服务器**：开始执行 `adddoWithUserId3` -> 触发 `addTodoWithUserId`（异步触发后立即继续）。
3.  **服务器**：`addTodoWithUserId3` 运行结束，给浏览器发回“成功”响应。
4.  **浏览器**：收到响应，认为动作完成了，结束 `useTransition` 的任务状态。
5.  **问题来了**：此时服务器后台的 `addTodo` 可能**还没跑完**（还没写进数组，或者 `revalidatePath` 还没生效）。浏览器刷新获取的还是**旧数据**。

---

### 场景 B：添加 `await` (正确做法)

```typescript
const addTodoWithUserId3 = async () => {
  "use server";
  const form = new FormData();
  form.set("todo", "🐂");

  // ✅ 这里有 await，它会“原地等待”直到内部逻辑全部完成
  await addTodoWithUserId(form);

  // 🏁 只有内部任务真正完成了，这里才会执行完
};
```

1.  **浏览器**：调用 `addTodoWithUserId3`。
2.  **服务器**：开始执行 `addTodoWithUserId3` -> 等待 `addTodoWithUserId` 完成。
3.  **服务器**：`addTodo` 将数据推入数组 -> **执行 `revalidatePath`**（标记页面需要更新数据）。
4.  **服务器**：内部动作全部完成，`addTodoWithUserId3` 终于运行结束，给浏览器发回响应。
5.  **浏览器**：收到响应，由于服务器已经确保存好了数据并触发了重刷标记，浏览器拿到的就是**最新的数据**。

---

### 核心结论：Server Action 的“自动刷新”是捆绑在响应中的

在 Next.js 中，Server Action 触发页面刷新的原理是：当 Action **成功结束并返回响应**时，React 会检查是否有 `revalidatePath` 或 `revalidateTag` 被触发。

- **如果不 `await`**：Action 响应发出时，内部的异步任务还没到执行 `revalidatePath` 那一步。
- **如果 `await`**：Action 响应会带着“数据已更新，请重新拉取”的指示一起发给浏览器。

> [!TIP]
> **形象类比：点外卖**
>
> - **没 await**：服务员刚把单子传进厨房，就回来说“菜好了”，你跑去厨房看，锅还是冷的。
> - **有 await**：服务员在厨房盯着厨师把菜炒好装盘，才回来说“菜好了”，你过去就能吃到热乎的。

---

> [!TIP]
> **总结**：
>
> - **Serializable (可序列化)**：能像 JSON 一样被“拍扁”成字符串传走的数据。
> - **Non-serializable (不可序列化)**：带“灵魂”（上下文、闭包、私有状态）的活物，如普通函数、类实例等。
