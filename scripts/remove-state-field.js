// 临时脚本：删除 Venus 集合中所有文档的 state 字段
// 运行方式: node scripts/remove-state-field.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'your-mongodb-uri';

async function removeStateField () {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        // 删除所有文档中的 state 字段
        const result = await mongoose.connection.db
            .collection('venus')
            .updateMany(
                {}, // 匹配所有文档
                { $unset: { state: "" } } // 删除 state 字段
            );

        console.log(`Updated ${result.modifiedCount} documents`);
        console.log('State field removed successfully!');

        await mongoose.disconnect();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

removeStateField();
