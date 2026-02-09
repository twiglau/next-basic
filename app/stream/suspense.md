# `Suspense` 使用说明与示例

## 概要

`Suspense` 是 React 提供的声明式加载边界（loading boundary），用于在子树“挂起（suspend）”时显示回退 UI（`fallback`）。在 Next.js 的 `app/` 目录中，配合服务端并发渲染与流式渲染，`Suspense` 可以显著改善首屏展示与渐进渲染体验。

## 主要优点

- **声明式加载**：通过 `fallback` 统一声明加载占位，无需在父组件手动维护多个 loading flag。 
- **局部渲染优先**：耗时子树（如 `HeavyPage`）不会阻塞其他已准备好的子树（如 `LightPage`）。
- **更少样板**：减少手写条件渲染/状态管理代码，关注点更清晰。
- **支持流式 SSR**：在 Next.js 的 Server Components 场景下，Suspense 允许服务器分块发送可用内容、剩余部分继续流式渲染，改善 TTFB/首次可交互时间。
- **与 `useTransition` 协同**：`useTransition` 可保证用户交互优先级，`Suspense` 负责慢组件的占位，两者配合能提供更平滑体验。

## vs 直接条件渲染（直接调用 `LightPage` / `HeavyPage`）

- 直接条件渲染需要显式管理 loading 状态，并在父组件中写分支逻辑；当组件本身是异步（例如懒加载或等待数据）时，`Suspense` 更自然且更易组合。
- 直接渲染在有异步挂起时可能导致整个父树等待；`Suspense` 能把挂起限制在边界内。

## 服务端（Next.js）与客户端差异

- **服务端（Server Components）**：Server Components 可以在渲染时“挂起”（例如等待 fetch），Next.js 会在服务器端流式发送已就绪的 HTML 片段，`Suspense` 用作边界来控制哪些部分先展示。 
- **客户端（Client Components）**：常与 `React.lazy` 或动态导入配合，用于按需加载代码或等待 client-side 数据。客户端的 `Suspense` 通过 `fallback` 显示加载占位。

## 与 `ErrorBoundary` 配合

`Suspense` 只处理加载状态，不捕获渲染错误。要处理渲染/运行时错误，应把 `ErrorBoundary` 包在合适的位置，与 `Suspense` 组合使用：

```
<ErrorBoundary fallback={<ErrorUI />}>
  <Suspense fallback={<Spinner/>}>
    <HeavyComponent />
  </Suspense>
</ErrorBoundary>
```

## 注意事项

- `fallback` 应尽量保持轻量，避免在加载占位中引入更多昂贵操作。 
- `Suspense` 不能替代错误处理或业务级的加载策略（例如复杂的占位占位布局、占位高度保留、骨骼屏策略等），这些仍需针对 UX 设计。 
- 不要把所有内容都包在单一 Suspense 边界内——更细粒度的边界能获得更好的渐进渲染效果。

## 示例：客户端懒加载（`React.lazy`）

```tsx
import React, { Suspense } from 'react'
const HeavyPage = React.lazy(() => import('./HeavyPage'))

export default function Page() {
  return (
    <div>
      <LightPage />
      <Suspense fallback={<div>Heavy loading...</div>}>
        <HeavyPage />
      </Suspense>
    </div>
  )
}
```

## 示例：Next.js `app/` 目录中的服务端边界（概念示例）

```tsx
// app/stream/page.tsx （Server Component）
import Suspense from 'react'

export default function StreamPage() {
  return (
    <>
      <LightPage />
      <Suspense fallback={<div>加载详细内容…</div>}>
        {/* HeavyServerComponent 可以是 async 的 Server Component */}
        <HeavyServerComponent />
      </Suspense>
    </>
  )
}
```

注意：在 Next.js 中，Server Components 的挂起会触发服务器端的流式渲染，客户端会逐步接收和 hydrate 已发送的部分。

## 示例：`SuspenseList` 控制展示顺序

```tsx
import { Suspense, SuspenseList } from 'react'

<SuspenseList revealOrder="forwards">
  <Suspense fallback={<SkeletonA />}>
    <ComponentA />
  </Suspense>
  <Suspense fallback={<SkeletonB />}>
    <ComponentB />
  </Suspense>
</SuspenseList>
```

`SuspenseList` 用于协调多个 Suspense 边界的揭示顺序（串行/并行/同时），便于实现分阶段渲染体验。

## 小结

- 当子树含异步加载或可能阻塞渲染时，优先使用 `Suspense` 来声明加载占位。 
- 在 Next.js 的 `app/` 目录中，`Suspense` 能与服务端流式渲染协同，获得更好的首屏与渐进渲染体验。
- 对于复杂 UX，可结合 `Suspense`、`ErrorBoundary`、`useTransition` 与局部乐观更新策略来获得最佳体
