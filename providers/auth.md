# index.tsx:936 Uncaught TypeError: Cannot read properties of undefined (reading 'custom')

- 问题是 next-auth 在 Edge Runtime 中运行时无法访问某些 Node.js 的 crypto API。这是一个常见的兼容性问题。需要在路由中添加运行时配置。

## 问题原因

- NextAuth 路由在 Edge Runtime 中运行，但 openid-client 库需要完整的 Node.js crypto API
- Edge Runtime 不支持所有 Node.js 功能

## 解决方案

- 在 NextAuth 路由中添加 export const runtime = "nodejs"
- 这强制该路由使用 Node.js Runtime 而不是 Edge Runtime