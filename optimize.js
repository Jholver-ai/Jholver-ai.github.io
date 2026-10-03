const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'img');
const images = ['atencion.jpg', 'doctor.jpg', 'hero-bg.jpg', 'servicio1.jpg', 'servicio2.jpg', 'servicio3.jpg', 'servicio4.jpg'];

async function optimize() {
    for (const img of images) {
        const inputPath = path.join(imgDir, img);
        if (fs.existsSync(inputPath)) {
            const parsed = path.parse(img);
            const webpPath = path.join(imgDir, `${parsed.name}.webp`);
            
            // Convert to webp with quality adjustment
            await sharp(inputPath)
                .webp({ quality: 75 })
                .toFile(webpPath);
                
            // Optimize original jpg too (override)
            const tempJpg = path.join(imgDir, `${parsed.name}_temp.jpg`);
            await sharp(inputPath)
                .jpeg({ quality: 75, mozjpeg: true })
                .toFile(tempJpg);
            fs.renameSync(tempJpg, inputPath);
            
            console.log(`Optimized ${img}`);
        }
    }
}

optimize().catch(console.error);
