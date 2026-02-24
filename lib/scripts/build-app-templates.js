import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { transformers } from './transformers/index.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, '../../');
const SOURCE_DIR = path.join(PROJECT_ROOT, 'app');
const TARGET_DIR = path.join(PROJECT_ROOT, 'templates/app');

// Archivos y carpetas a excluir
const EXCLUDE_LIST = [
  'node_modules',
  '.env',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  'dist',
  '.git',
  '.DS_Store'
];

function shouldExclude(name) {
  return EXCLUDE_LIST.includes(name);
}

function cleanTargetDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function copyDirRecursive(src, dest) {
  // Crear directorio destino si no existe
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  entries.forEach((entry) => {
    if (shouldExclude(entry.name)) {
      console.log(`⏭️  Excluido: ${entry.name}`);
      return;
    }

    const sourcePath = path.join(src, entry.name);
    let destFileName = entry.name;

    if (entry.isDirectory()) {
      const destPath = path.join(dest, destFileName);
      console.log(`📁 Copiando carpeta: ${entry.name}`);
      copyDirRecursive(sourcePath, destPath);
    } else {
      destFileName = `${entry.name}.hbs`;
      const destPath = path.join(dest, destFileName);
      fs.copyFileSync(sourcePath, destPath);
      console.log(`📄 Copiado: ${entry.name} → ${destFileName}`);
    }
  });
}

// Script principal
console.log('🚀 Iniciando construcción de templates de app...\n');
console.log(`📌 Origen: ${SOURCE_DIR}`);
console.log(`📌 Destino: ${TARGET_DIR}\n`);

if (!fs.existsSync(SOURCE_DIR)) {
  console.error(`❌ Error: La carpeta ${SOURCE_DIR} no existe`);
  process.exit(1);
}

console.log('🗑️  Limpiando directorio de destino...');
cleanTargetDir(TARGET_DIR);

console.log('📋 Copiando archivos y carpetas...\n');
copyDirRecursive(SOURCE_DIR, TARGET_DIR);

console.log('\n🔧 Aplicando transformaciones...');
transformers.forEach((transformer) => {
  transformer.transform(TARGET_DIR);
});

console.log('\n✅ ¡Construcción completada con éxito!');
console.log(`📦 Templates disponibles en: ${TARGET_DIR}`);
