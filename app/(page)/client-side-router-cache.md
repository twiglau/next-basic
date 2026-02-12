# 客户端路由缓存 (Router Cache)[https://nextjs.org/docs/app/guides/caching#client-side-router-cache]

## 为什么在当前 (page) 中感觉没有生效？

在开发模式 (`npm run dev`) 下，客户端路由缓存（Router Cache）的表现与生产环境有显著不同，这通常是导致“缓存没生效”错觉的主要原因。

### 1. 开发模式 vs 生产模式

- **开发模式 (dev)**：为了方便调试，Next.js 会大幅缩短缓存时间，或者在导航时更频繁地刷新数据（尤其是涉及到 Fast Refresh 时）。
- **生产模式 (prod)**：缓存逻辑会严格执行。对于**动态渲染**的页面，缓存有效期为 **30秒**；对于**静态渲染**的页面，缓存有效期为 **5分钟**。

### 2. 动态渲染 (Dynamic Rendering) 的限制

由于你的页面（可能受全局 `layout.tsx` 的 `AuthProvider` 影响）被判定为动态渲染：

- `prefetch={true}` 会预取 `loading.tsx` 和组件树结构，但数据部分（RSC Payload）的缓存时间极短（仅 30 秒）。
- 如果你超过 30 秒后再点，它会重新向服务端请求数据，导致你再次看到 3-5 秒的加载动画。

### 3. F5 刷新会清空缓存

Router Cache 是**内存缓存 (In-memory Cache)**。一旦你手动点浏览器刷新按钮 (F5)，整个客户端状态（包括缓存）都会被清空。

### 4. Partial Rendering (部分渲染)

虽然缓存可能在重新获取数据，但 `loading.tsx` 的存在确保了 **Layout 不需要重新渲染**。这是 Router Cache 的一部分功劳（它保持了已渲染布局的状态）。

---

## 验证建议

如果你想看到缓存生效的效果：

1. 执行 `pnpm run build`。
2. 执行 `pnpm run start`（进入生产模式）。
3. 在页面间快速切换（30秒内），你会发现第二次进入时是瞬间打开的，不会触发 `loading.tsx`。

## 总结

- **Router Cache 不会持久化到硬盘**，只在单次会话中有效。
- **开发环境不代表真实缓存表现**。
- **动态路径缓存时间很短**。
