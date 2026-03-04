import express from 'express';
import validateImageParams from '../../middleware/images/validateImageParams';
const images = express.Router();

images.get('/', validateImageParams, (req, res) => {
    res.status(200);
    res.send('Image processing endpoint');
});

export default images;