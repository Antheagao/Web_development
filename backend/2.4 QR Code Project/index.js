import { input } from '@inquirer/prompts';
import qr from 'qr-image';
import * as fs from 'node:fs';

const url = await input({ message: 'Enter the website url' });
var qr_url = qr.image(url, { type: 'png' });
qr_url.pipe(fs.createWriteStream('./URL.png'));

fs.writeFile("./URL.txt", url, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});
