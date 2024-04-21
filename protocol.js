const express = require('express');
const app = express();
const PORT = 4332; //port

app.use(express.json());

app.post('/portalweb', (req, res) => {
    const data = req.body;

    const response = {
        status: 'success',
        message: 'success !!',
        data: data
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Protocol starting on this port ${PORT}`);
});
