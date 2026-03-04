import express from 'express';
import images from './api/images';

const routers = express.Router();

routers.use('/images', images);

export default routers;