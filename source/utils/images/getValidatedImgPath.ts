import fs from 'fs';
import path from 'path';

const getValidatedImgPath = (filename: string): string | null => {
    const imagePath = path.join(process.cwd(), 'images/fullimgs', `${filename}.jpg`);
    if (fs.existsSync(imagePath)) {
        return imagePath;
    }
    return null;
};

export default getValidatedImgPath;
