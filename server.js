const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const GITHUB_USERNAME = 'shiftroll';
const REPO_NAME = 'negeri-bestari';
const FILE_PATH = 'path/to/your/file.md';
const PERSONAL_ACCESS_TOKEN = 'your-personal-access-token';

app.put('/update-cms', async (req, res) => {
    try {
        const { content } = req.body;

        const response = await axios.put(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`,
            {
                message: 'Update CMS content',
                content: Buffer.from(content).toString('base64'),
                branch: 'main',
                committer: {
                    name: 'Your Name',
                    email: 'your-email@example.com'
                }
            },
            {
                headers: {
                    Authorization: `token ${PERSONAL_ACCESS_TOKEN}`
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update content' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
