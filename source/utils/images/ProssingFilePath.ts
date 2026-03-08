import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import getValidatedImgPath from './getValidatedImgPath';

const ProssingFilePath = async (filename: string, width: number, height: number, outputext?: string): Promise<string> => {//check if the image with the same name, size and extension already exists in cache and return the path of it if exist if not exist cache it then return the path of cached image
const getValidatedImgPathResult = getValidatedImgPath(filename);
const {name, ext} = path.parse(getValidatedImgPathResult as string);
if(outputext && !outputext.startsWith('.')) {//if outputext exist and not start with dot add dot to the beginning of it
outputext = `.${outputext}`;
}
const thumbDir = path.join(process.cwd(), 'images/thumbimgs');
await fs.promises.mkdir(thumbDir, { recursive: true });//create the cache folder if it doesn't exist
const outputExtension = outputext ? outputext : ext; // for filename
const outputFilename = `${name}_${width}_${height}${outputExtension}`;
const iscached = fs.existsSync(path.join(process.cwd(), 'images/thumbimgs', outputFilename))
if (iscached) {//if iscached return the path of cached image
return path.join(process.cwd(), 'images/thumbimgs', outputFilename);
} else {
const outputFormat = outputExtension.slice(1);
const SharpBuffer = await sharp(getValidatedImgPathResult as string).resize(width, height, { fit: 'fill' }).toFormat(outputFormat as keyof sharp.FormatEnum).toBuffer();//resize the original image to the specified width and height and get the buffer of the resized image
await fs.promises.writeFile(path.join(process.cwd(), 'images/thumbimgs', outputFilename), SharpBuffer);//write the buffer to the cache folder with the output filename
return path.join(process.cwd(), 'images/thumbimgs', outputFilename);//return the path of cached image
}
};

export default ProssingFilePath;
