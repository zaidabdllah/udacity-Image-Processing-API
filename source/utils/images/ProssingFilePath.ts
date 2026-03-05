import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/*
check if the image with the same name and size already exists in cache then return the path of the image in cache
if not exist create the image and save it in cache and return the path
*/

const ProssingFilePath = async (filename: string, width: number, height: number): Promise<string> => {
const iscached = fs.existsSync(path.join(process.cwd(), 'images/thumbimgs', `${filename}_${width}_${height}.jpg`));
if (iscached) {
return path.join(process.cwd(), 'images/thumbimgs', `${filename}_${width}_${height}.jpg`);
} else {
const SharpBuffer = await sharp(path.join(process.cwd(), 'images/fullimgs', `${filename}.jpg`)).resize(width, height).toBuffer();
await fs.promises.writeFile(path.join(process.cwd(), 'images/thumbimgs', `${filename}_${width}_${height}.jpg`), SharpBuffer);
return path.join(process.cwd(), 'images/thumbimgs', `${filename}_${width}_${height}.jpg`);
}
};

export default ProssingFilePath;
