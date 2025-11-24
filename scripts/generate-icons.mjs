#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuración de tamaños requeridos
const sizes = [
  { name: 'a4m-icon-192.png', size: 192 },
  { name: 'a4m-icon-512.png', size: 512 },
  { name: 'a4m-icon-maskable-192.png', size: 192, maskable: true },
  { name: 'a4m-icon-180.png', size: 180 }
];

const svgPath = path.resolve('assets/a4m-icon.svg');
const outDir = path.resolve('assets');

if (!fs.existsSync(svgPath)) {
  console.error('No se encontró el SVG base en', svgPath);
  process.exit(1);
}

async function generate() {
  const svgBuffer = fs.readFileSync(svgPath);
  for (const cfg of sizes) {
    const target = path.join(outDir, cfg.name);
    if (cfg.maskable) {
      // Crear lienzo transparente con padding interno para área segura
      const canvasSize = cfg.size;
      const padding = Math.round(canvasSize * 0.12); // ~12% margen
      const iconSize = canvasSize - padding * 2;
      // Renderizar SVG escalado al tamaño interno y componer sobre fondo transparente
      const rendered = await sharp(svgBuffer, { density: 512 })
        .resize(iconSize, iconSize, { fit: 'contain' })
        .toBuffer();
      const composite = await sharp({
        create: {
          width: canvasSize,
          height: canvasSize,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        }
      })
        .composite([
          { input: rendered, top: padding, left: padding }
        ])
        .png()
        .toBuffer();
      await sharp(composite).toFile(target);
    } else {
      await sharp(svgBuffer, { density: 512 })
        .resize(cfg.size, cfg.size, { fit: 'contain' })
        .png()
        .toFile(target);
    }
    console.log('Generado', target);
  }
  console.log('Iconos PNG generados correctamente.');
}

generate().catch(e => {
  console.error('Error generando iconos:', e);
  process.exit(1);
});
