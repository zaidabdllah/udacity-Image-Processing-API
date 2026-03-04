import { Request, Response, NextFunction } from 'express';
import getValidatedImgPath from '../../utils/images/getValidatedImgPath';
const validateImageParams = (req: Request, res: Response, next: NextFunction): void => {
    const { filename , width, height } = req.query;
    if (!filename) {
        res.status(400).send('Filename is required');
        return;
    }
    const validatedImgPath = getValidatedImgPath(filename as string);
    if (!validatedImgPath) {
        res.status(404).send('File not found');
        return;
    }
    if (!width) {
        res.status(400).send('Width is required');
        return;
    }
    const parsedWidth = Number(width);
    if (isNaN(parsedWidth) || parsedWidth <= 0) {
        res.status(400).send('Invalid width value (must be a positive number)');
        return;
    }
    if (!height) {
        res.status(400).send('Height is required');
        return;
    }
    const parsedHeight = Number(height);
    if (isNaN(parsedHeight) || parsedHeight <= 0) {
        res.status(400).send('Invalid height value (must be a positive number)');
        return;
    }
    next();
};

export default validateImageParams;
