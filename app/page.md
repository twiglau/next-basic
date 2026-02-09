# `app/page.tsx` 被标记为 `static` 的原因与解决办法

## 为什么会被标记为 `static`

在 Next.js 的构建过程中，如果一个页面在构建时没有任何明确要求“每次请求都重新渲染”的信号，Next 会将其视为可以静态化（static）——即在 build 时预渲染或使用 ISR（增量静态再验证）。常见触发静态化的情形包括：

- 页面没有使用任何会每次请求都强制刷新的 fetch（例如没有使用 `cache: 'no-store'`）。
- 页面没有导出标记为动态渲染的常量（`export const dynamic = 'force-dynamic'`）。

当页面被静态化时，构建产物在运行时不会为每个请求重新执行页面的 server-side 代码，这会导致依赖实时数据的列表显示旧数据。

## 解决办法（任选其一）

1. 强制页面每次请求都动态渲染（推荐）

```ts
// 方法一： 在 app/page.tsx 顶部加入
export const dynamic = 'force-dynamic'
//方法二： revalidate: 10 means that the page will not be cached and will be re-rendered on every request
export const revalidate = 10 
```

2. 在服务端 fetch 时禁用缓存，让该请求每次都走网络

```ts
const res = await fetch('http://localhost:3002/employees', { cache: 'no-store' })
```

3. 使用 ISR（允许短期缓存并定时刷新）

```ts
const res = await fetch('http://localhost:3002/employees', { next: { revalidate: 10 } })
// 每 10 秒重新获取一次
```

4. 将页面改为客户端组件并在客户端请求数据（不推荐，除非你需要完整的客户端交互逻辑）

```ts
// 在文件顶部
'use client'
```

## 选择建议

- 需要“每次都最新”的列表：使用 `export const dynamic = 'force-dynamic'` 或 `cache: 'no-store'`（保持 Server Component，不增加 client bundle）。
- 接受短时缓存以减少后端压力：使用 `next.revalidate`（ISR）。
- 不要把所有页面都设为强制动态：只对确实需要每次请求最新数据的页面使用。

## 例子：把 `app/page.tsx` 改为强制动态

在 `app/page.tsx` 顶部加入：

```ts
export const dynamic = 'force-dynamic'
```

或者，如果你只想让获取员工列表的请求每次都实时：

```ts
const res = await fetch('http://localhost:3002/employees', { cache: 'no-store' })
const employees = await res.json()
```

## 额外提示

- 如果构建时你发现页面被不期望地静态化，先检查是否所有 fetch 都有默认缓存（默认可能是 `force-cache` 或构建时缓存），以及是否缺少 `dynamic` 导出。
- 对于需要在客户端立即刷新的场景，可以在客户端触发 `router.refresh()` 来重新请求服务端数据，但长期策略仍建议用上面的服务端配置。

