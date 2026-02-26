This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


npx json-server --watch db.json --port 3002
```

## sqlite3 pnpm.onlyBuiltDependencies 意思？

pnpm.onlyBuiltDependencies 是 pnpm v9 引入的一个安全性配置项。

它的含义和作用如下：

1. 核心含义
   由于安全性考虑，pnpm 默认情况下会 忽略 所有依赖包中的构建脚本（例如 preinstall, install, postinstall）。

这是为了防止恶意软件在 pnpm install 过程中自动运行脚本攻击你的系统。

2. 为什么你需要它？
   有些包（比如我们刚才解决问题的 better-sqlite3）包含 原生 C++ 代码，它们必须在你的机器上编译成二进制文件（.node 绑定文件）才能运行。

如果你不把它们加入 onlyBuiltDependencies，pnpm 就不会运行它们的编译脚本，导致程序运行时报错（比如你之前遇到的 Could not locate the bindings file）。

3. 配置方式：你在ackage.json中看到的这段配置：

```json
"pnpm": {
    "onlyBuiltDependencies": [
        "better-sqlite3"
    ]
}
```

其作用就是显式告诉 pnpm：“我信任 better-sqlite3 这个包，请允许它在安装时运行构建脚本。”

总结
默认行为：出于安全，不运行任何包的脚本。
配置后：只允许名单里的包运行构建脚本。
解决问题：它是解决 由于缺少原生二进制文件而导致运行报错 的标准化 pnpm 方案。
