# revalidatePath 作用

1. 定义：revalidatePath(path)（来自 next/cache）用于使指定路径的服务端缓存失效，下一次请求该路径时会重新渲染/重新获取数据（触发 Server Components 的重新渲染）。
2. 使用位置：必须在服务端上下文调用（Server Actions、server component、API 路由等），不能在客户端直接调用。
3. 语义：它只使缓存失效，并不主动向客户端推送更新——会导致后续请求返回最新内容。与 router.refresh() 不同：

  > revalidatePath：影响服务端缓存与下一次渲染的数据来源。
  > router.refresh()：在客户端触发一次重新渲染/请求（通常用于立即更新当前页面 UI）。

4. 与 revalidateTag：revalidatePath 以路径为粒度；revalidateTag 配合 fetch 的 next.tags 用于按 tag 精细失效，更灵活。

## 项目里的注意点

- 文件 actions.ts 中目前导入了 revalidatePath 但没有使用，而且函数最后用 redirect('/') 跳转回首页。若你已使用 redirect，通常不需要再调用 revalidatePath（因为重定向会导致客户端导航并加载最新页面）；
- 如果你想留在当前页面并让其他服务器渲染的部分更新，应在成功提交后调用 revalidatePath('/')（或具体路径）然后返回，不做重定向，或结合客户端的 router.refresh() 使用。