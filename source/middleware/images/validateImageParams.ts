import { Request, Response, NextFunction } from 'express';
import getValidatedImgPath from '../../utils/images/getValidatedImgPath';

const MAX_WIDTH = 5000;
const MAX_HEIGHT = 5000;


const validateImageParams = (req: Request, res: Response, next: NextFunction): void => {
    const { filename, width, height, output } = req.query;
    if (!filename) {
        res.status(400).json({ ok: false, code: 'MISSING_FILENAME', error: 'Filename is required' });
        return;
    }
    const validatedImgPath = getValidatedImgPath(filename as string);
    if (!validatedImgPath) {
        res.status(404).json({ ok: false, code: 'FILE_NOT_FOUND', error: 'File not found' });
        return;
    }
    if (!width) {
        res.status(400).json({ ok: false, code: 'MISSING_WIDTH', error: 'Width parameter is required' });
        return;
    }
    const parsedWidth = Number(width);
    if (isNaN(parsedWidth) || parsedWidth <= 0) {
        res.status(400).json({ ok: false, code: 'INVALID_WIDTH', error: 'Invalid width value (must be a positive number)' });
        return;
    }
    if(parsedWidth > MAX_WIDTH) {   
        res.status(400).json({ ok: false, code: 'WIDTH_TOO_LARGE', error: `Width is too large. Maximum allowed width is ${MAX_WIDTH}` });
        return;
    }
    if (!height) {
        res.status(400).json({ ok: false, code: 'MISSING_HEIGHT', error: 'Height parameter is required' });
        return;
    }
    const parsedHeight = Number(height);
    if (isNaN(parsedHeight) || parsedHeight <= 0) {
        res.status(400).json({ ok: false, code: 'INVALID_HEIGHT', error: 'Invalid height value (must be a positive number)' });
        return;
    }
    if(parsedHeight > MAX_HEIGHT) {
        res.status(400).json({ ok: false, code: 'HEIGHT_TOO_LARGE', error: `Height is too large. Maximum allowed height is ${MAX_HEIGHT}` });
        return;
    }
    if (output) {
        const validOutputformats = ['jpg', 'jpeg', 'png', 'webp', '.jpg', '.jpeg', '.png', '.webp'];
        if (!validOutputformats.includes((output as string).toLowerCase())) {
            res.status(400).json({ ok: false, code: 'INVALID_OUTPUT_FORMAT', error: 'Invalid output format (must be jpg, jpeg, png, or webp)' });
            return;
        }
    }
    next();
};

export default validateImageParams;
