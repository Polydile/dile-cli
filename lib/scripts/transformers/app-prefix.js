import fs from 'fs';
import path from 'path';

/**
 * Transforma "dile-app" a "{{appPrefix}}-app" en todos los archivos
 * Reemplaza la parte "dile" con la variable handlebars {{appPrefix}}
 */
export function transform(templateDir) {
  console.log('\n🔄 Transformando app prefix (dile-app → {{appPrefix}}-app)...');
  
  const processFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const updatedContent = content.replace(/dile-app/g, '{{appPrefix}}-app');
    
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
  console.log('✅ App prefix transformado');
}
