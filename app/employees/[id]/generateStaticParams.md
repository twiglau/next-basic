# `generateStaticParams` 说明

## 概念与作用

`generateStaticParams` 是 App Router 下用于动态路由的构建阶段钩子。在构建（build）期间，Next.js 会调用此函数以获取需要静态生成（SSG）的动态路径列表。函数应返回一个对象数组，每个对象表示一个路径对应的 `params`。

## 放置位置

- 将 `generateStaticParams` 导出在动态路由目录内，例如 `app/employees/[id]/page.tsx` 同级文件，或直接在 `page.tsx` 中导出。

## 返回值示例

```ts
export async function generateStaticParams() {
  const res = await fetch('http://localhost:3002/employees')
  const list = await res.json()
  return list.map((e: any) => ({ id: String(e.id) }))
}
```

## 适用场景

- 适合路径集合在构建时已知且数量可控的页面，例如博客文章、商品详情页、文档页等。使用 `generateStaticParams` 可以在 build 时为这些路径生成静态 HTML，从而获得更快的响应和 CDN 缓存收益。

## 限制与注意事项

- 构建时行为：`generateStaticParams` 只在构建期间运行，新增或更新的路径不会在运行时自动纳入预渲染，除非你重建或使用按需再验证（ISR）。
- 若路径非常多或实时变化频繁，则不适合使用（会导致构建时间长或产物体积大）。针对这种情况应使用动态渲染（`dynamic = 'force-dynamic'`）或在 fetch 中使用 `next: { revalidate }` / `cache: 'no-store'`。 
- 与 `dynamicParams` 配合：默认允许未列出的 params 在运行时生成（`dynamicParams = true`）。如果你希望只接受 `generateStaticParams` 列出的路径并对其他路径返回 404，可设置：

```ts
export const dynamicParams = false
```

## 与运行时渲染 / ISR 的关系

- 若你仍想静态化但需要定期刷新数据，可以在页面内使用 `fetch` 的 ISR 选项：

```ts
const res = await fetch('...', { next: { revalidate: 10 } })
```

- 若想在数据修改时按需使静态页面失效，可在 Server Action 中使用 `revalidatePath()`。

## 小结

- 使用 `generateStaticParams` 能在构建时为已知动态路径生成静态页面，提升性能和缓存效果。 
- 只有在路径数量可控且可接受“构建时已知”这一前提下使用；否则优先选择运行时动态渲染或 ISR。

----

如需，我可以为 `app/employees/[id]/page.tsx` 添加一个示例 `generateStaticParams` 实现并提交 patch。是否需要我添加？
