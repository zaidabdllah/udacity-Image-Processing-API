import fs from 'fs';
import path from 'path';



const getValidatedImgPath = (filename: string): string | null => {//check if the file exist in the fullimgs folder with or without extension and return the path of it if exist
    const dirpath = path.join(process.cwd(), 'images/fullimgs');
    const files = fs.readdirSync(dirpath);
    const fileExists = files.find(file => path.parse(file).base === filename || path.parse(file).name === filename);//check if the file exist in the fullimgs folder with or without extension and return the path of it if exist
    if (fileExists) {//if file exist return the path of it
        return path.join(process.cwd(), 'images/fullimgs', fileExists);;
    } else {
        return null;//if file not exist return null
    }
};

export default getValidatedImgPath;
