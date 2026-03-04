import express from 'express';

const images = express.Router();

images.get('/', (req, res) => {
    res.status(200);
    res.send('Image processing endpoint');
});

export default images;