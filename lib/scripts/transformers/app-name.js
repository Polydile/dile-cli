import fs from 'fs';
import path from 'path';

/**
 * Transforma "Dile App" a "{{appName}}" en todos los archivos
 */
export function transform(templateDir) {
  console.log('\n🔄 Transformando app name (Dile App → {{appName}})...');
  
  const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const updatedContent = content.replace(/Dile App/g, '{{appName}}');
    
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      console.log(`  ✏️  ${path.relative(templateDir, filePath)}`);
    }
  };

  const processDir = (dir) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    entries.forEach((entry) => {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        processDir(fullPath);
      } else if (entry.name.endsWith('.hbs')) {
        processFile(fullPath);
      }
    });
  };

  processDir(templateDir);
  console.log('✅ App name transformado');
}
