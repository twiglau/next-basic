# 在提交中使用 `useTransition` 的说明

## 概要

在 React（尤其是 Next.js 的并发特性）中，`useTransition` 可用于把某些更新标记为“可延后/低优先级”。对表单提交场景来说，把非紧急的后续更新（例如刷新列表、路由刷新或大量 UI 更新）包裹为低优先级，可以提升交互流畅性和用户体验。

## 为什么需要 `useTransition`（与直接调用 `editEmployee` 的对比）

- 直接调用 `editEmployee`：能完成提交并生效，但如果提交后触发了大量同步更新（比如 `router.refresh()`、重新渲染大量列表），这些更新会被视为高优先级，可能导致输入卡顿、按钮短暂无响应或界面闪烁。
- 使用 `useTransition`：把这些“非关键”的后续更新放到 `startTransition` 中，React 可以优先保证用户交互（如输入、点击）保持响应，同时在后台平滑完成较大范围的渲染。

## 主要优点

- 响应性：避免提交触发的同步渲染阻塞用户交互。 
- 明确等待态：通过 `isPending` 可以显示 loading 状态或禁用提交按钮，给用户明确反馈。
- 减少布局抖动：并发渲染有更平滑的调度策略，降低闪烁或跳动的概率。

## 与乐观更新的关系

`useTransition` 不是乐观更新。乐观更新是先在本地立即更新 UI，再在后台提交并在失败时回滚；`useTransition` 是控制更新优先级，适用于在提交后需要进行的非紧急刷新或渲染。两者可以结合使用：先乐观更新以立即反馈，再用 `startTransition` 做全量刷新或收尾工作。

## 何时可以不使用 `useTransition`

- 提交很快且之后不触发大量 UI 更新时，直接调用 `editEmployee` 就足够。
- 但在列表刷新、复杂重渲染或希望保证输入不卡顿时，推荐使用 `useTransition`。

## 简明示例（在 `EditForm.tsx` 场景中）

```tsx
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function EditForm({ employee }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function onSubmit(data) {
    // 调用 server action（或其它提交函数）
    await editEmployee(data)

    // 将刷新/大范围更新放到低优先级，保证交互优先
    startTransition(() => {
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* 表单字段 */}
      <button type="submit" disabled={isPending}>
        {isPending ? '提交中…' : '保存'}
      </button>
    </form>
  )
}
```

注意：不要在 `startTransition` 内使用需要阻塞的 `await`；`startTransition` 中的回调应该同步触发需要的更新（例如 `router.refresh()` 或设置本地状态）。

## 小结

- 可以直接调用 `editEmployee`，功能上没问题。 
- 为了更佳的用户体验（保持输入/交互响应、显示明确加载态、减少抖动），在提交后触发的刷新或大范围更新建议使用 `useTransition`。

