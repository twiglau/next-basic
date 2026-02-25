# SQLite

## prisma 步骤

1. pnpm add prisma
2. npx prisma init --datasource-provider sqlite
3. 编写模型 Schema
4. 根据模型生成数据库表

```bash
# 根据模型生成数据库表
npx prisma db push

# 迁移
npx prisma migrate dev

# 查看数据库表
npx prisma studio
```

5. 根据模型生成 Prisma Client 用于操作数据库

```bash
# 根据模型生成 Prisma Client 用于操作数据库
npx prisma generate
```

## migrations 能做什么？

在 Prisma 中，**Migrations（迁移）** 就像是数据库的“Git”或“版本控制系统”。它记录了数据库结构（Schema）随时间推移的每一次变更。

### 1. 结构化地演进数据库 (Version Control)

当你修改 `schema.prisma` 时，`prisma migrate dev` 会生成包含 SQL 语句的文件夹，记录了“谁在什么时候做了什么修改”。

### 2. 团队同步 (Team Sync)

拉取同事的代码后，运行 `npx prisma migrate dev` 即可让本地数据库结构与代码完全同步。

### 3. 安全部署 (Safe Deployment)

在生产环境中使用 `npx prisma migrate deploy` 进行**增量更新**，安全地修改线上数据库结构。

### 4. 保持数据一致性 (Data Integrity)

采用**声明式**管理：先定义目标状态，由 Prisma 自动计算 SQL，减少手动改表带来的风险。

### 5. 审计与自定义 (Audit Trail)

每个迁移都有明文 `migration.sql`，执行前可以检查或手动微调转换逻辑。

---

**简单类比**：

- **`schema.prisma`**：数据库的**蓝图**（现在的模样）。
- **`migrations/`**：数据库的**成长轨迹**（历史记录）。
