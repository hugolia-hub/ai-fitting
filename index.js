// index.js
const express = require('express');
const cors = require('cors');
const Replicate = require("replicate");
require('dotenv').config(); // 如果你使用 .env 文件，需要这行；没用的话可以忽略

const app = express();

// 1. ⚠️ 关键设置：增加数据接收上限
// 图片转成 Base64 很大，默认的 1mb 不够用，这里设为 50mb
app.use(express.json({ limit: '50mb' }));
app.use(cors());

// 2. 初始化 Replicate
// 确保把你的 Key 填在这里，或者在系统环境变量里设置了 REPLICATE_API_TOKEN
const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN || "r8_你的真实Key在这里"
});

app.get('/', (req, res) => {
    res.send('AI Backend is running! 🚀');
});

app.post('/api/try-on', async (req, res) => {
    try {
        console.log("收到试穿请求...");
        
        const { human_img, garm_img } = req.body;

        if (!human_img || !garm_img) {
            return res.status(400).json({ success: false, error: "缺少图片数据" });
        }

        console.log("正在呼叫 AI 模型...");

        // 3. 调用 IDM-VTON 模型
        const output = await replicate.run(
            "yisol/idm-vton:c871bb9b0466074280c2a9a7386749c8b38a98d8fec5108b521adf26e203ee00",
            {
                input: {
                    human_img: human_img, // Replicate 支持直接传入 Base64 字符串
                    garm_img: garm_img,
                    crop: false,
                    steps: 30,
                    category: "upper_body" // 默认试穿上衣
                }
            }
        );

        console.log("AI 处理完成:", output);

        res.json({ 
            success: true, 
            image: output 
        });

    } catch (error) {
        console.error("AI 报错:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
