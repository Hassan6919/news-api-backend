const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get('/news', async (req, res) => {
    const category = req.query.category || 'general';  // Default to 'general' if not provided
    const pageSize = req.query.pageSize || '10';       // Default to 10 if not provided

    console.log("Received parameters:", { category, pageSize });  // Debugging line

    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us', {
            params: {
                country: 'us',
                category: category,
                apiKey: 'a53dba2494e74a4cb148aee8964fbd36',
                pageSize: pageSize,
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching news:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            message: 'Error fetching news',
            error: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
