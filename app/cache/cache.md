# 四种缓存

## CLIENT 端： Router Cache

1. 刷新页面，会清除 客户端 路由缓存(Router Cache)

## SERVER 端：

- Full Route Cache

1. 静态渲染，走的是 Full Route Cache，不会触发服务端渲染

- Data Cache

## 常见疑问：Dynamic API (如 `cookies()`) 的位置对缓存有影响吗？

在 Next.js 15/16 版本中，不论 `cookies()` 写在 `fetch` 之前还是之后，其影响是一致的。

### 详细分析

1. **渲染模式判定 (Dynamic Rendering)**
   - `cookies()` 是一个 **Dynamic API**。
   - 只要路由（页面或组件）中调用了它，整条路由就会被标记为 **动态渲染 (Dynamic Rendering)**，打包输出为 `ƒ (Dynamic)`。
   - 这意味着页面无法进入 **Full Route Cache**（构建时生成的静态 HTML 缓存）。

2. **数据获取行为 (Data Cache)**
   - 在 Next.js 15+ 中，`fetch` 默认不缓存 (`no-store`)。
   - `fetch` 的缓存行为由其自身的参数（如 `cache: 'force-cache'`）决定，不再受 `cookies()` 调用位置的隐式干扰。

3. **如果你手动开启了 fetch 缓存**
   - 如果你显式写了 fetch(url, { cache: 'force-cache' })
     - Data Cache：数据会被缓存。
     - Full Route Cache：因为你用了 cookies()，页面依然是动态渲染的。
   - 对比：
     - 没有 cookies()：页面是静态的，HTML 被缓存（Full Route Cache），访问极快。
     - 有 cookies()：页面是动态的，HTML 每次现渲染，但 fetch的部分会从 Data Cache 中取数据，速度依然很快，但多了一层服务端渲染的开销。

4. **Request Memoization (请求记忆化)**
   - `fetch` 的记忆化在 Server 端依然有效。如果在同一次请求中多次调用相同的 `fetch`（如在 `cookies()` 前后分别调用），React 仍会通过 Request Memoization 确保只发出一次网络请求。

### 结论

**位置对缓存策略没有实质性影响。**

- **打包结果**：均为 `ƒ (Dynamic)`。
- **性能核心**：页面性能主要取决于 `fetch` 自身是否开启了 `Data Cache` 以及是否使用了 `Suspense` 流式渲染。
- **最佳实践**：建议将 `cookies()` 放在靠近逻辑使用的地方。位置的变化不会改变 Next.js 对该页面“动态性”的定性。
