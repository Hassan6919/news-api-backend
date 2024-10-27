const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/news', async (req, res) => {
    const category = req.query.category || 'general';
    const pageSize = req.query.pageSize || '10';
    console.log("Received parameters:", { category, pageSize });

    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
            params: {
                country: 'us',
                category: category,
                apiKey: process.env.NEWS_API_KEY,
                pageSize: pageSize,
            },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error.response ? error.response.data : error.message);
        res.status(500).json({
            message: 'Error fetching news',
            error: error.response ? error.response.data : error.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
  /* hhhh */