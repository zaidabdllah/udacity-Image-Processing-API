import express from 'express';
import validateImageParams from '../../middleware/images/validateImageParams';
import ProssingFilePath from '../../utils/images/ProssingFilePath';
const images = express.Router();

images.get('/', validateImageParams, async (req, res): Promise<void> => {
  const { filename, width, height, output } = req.query;
  const filepath = await ProssingFilePath(filename as string, Number(width), Number(height), output as string);
  res.status(200).sendFile(filepath as string);
});

export default images;