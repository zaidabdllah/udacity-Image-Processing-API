import express from 'express';
import validateImageParams from '../../middleware/images/validateImageParams';
import ProssingFilePath from '../../utils/images/ProssingFilePath';
const images = express.Router();

images.get('/', validateImageParams, async (req, res): Promise<void> => {
  const { filename, width, height } = req.query;
  const filepath = await ProssingFilePath(filename as string, Number(width), Number(height));
  res.status(200).sendFile(filepath as string);
});

export default images;