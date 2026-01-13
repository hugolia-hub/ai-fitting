// index.js
const express = require('express');
const cors = require('cors');
const app = express();

// 允许你的前端网页跨域访问这个后端
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('AI Backend is running! 🚀');
});

app.post('/api/try-on', async (req, res) => {
    // --- 未来：这里会接入真实的 AI API Key ---
    // const output = await replicate.run(...)
    
    console.log("收到试穿请求", req.body);

    // 模拟等待 2 秒
    setTimeout(() => {
        // 返回一个模拟的成功结果
        res.json({ 
            success: true, 
            image: "https://via.placeholder.com/500x700?text=AI+Result+Here" 
        });
    }, 2000);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
