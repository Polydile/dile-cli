import fs from 'fs';
import path from 'path';

/**
 * Transforma componentes con prefijo "dile" a "{{appPrefix}}"
 * Por ejemplo: "dile-app" → "{{appPrefix}}-app"
 *              "dile-router" → "{{appPrefix}}-router"
 * 
 * NO transforma:
 * - Variables CSS como "--dile-app-drawer" (custom properties)
 * - Event listeners como "@dile-router-link-clicked"
 */

const PREFIX = 'dile';
const COMPONENTS_WITH_PREFIX = [
  'app',
  'router',
  'user',
  'resend',
  'page',
  'remember',
];

export function transform(templateDir) {
  console.log('\n🔄 Transformando app prefix (dile-* → {{appPrefix}}-*)...');
  
  const processFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf-8');
    let updated = false;
    
    // Reemplazar cada componente con prefijo
    // Usa lookbehind negativo (?<![-@]) para evitar transformar:
    // - "--dile-" (variables CSS)
    // - "@dile-" (event listeners)
    COMPONENTS_WITH_PREFIX.forEach((component) => {
      const oldStr = `${PREFIX}-${component}`;
      const newStr = `{{appPrefix}}-${component}`;
      const regex = new RegExp(`(?<![-@])${oldStr}`, 'g');
      
      if (regex.test(content)) {
        content = content.replace(regex, newStr);
        updated = true;
      }
    });
    
    if (updated) {
      fs.writeFileSync(filePath, content, 'utf-8');
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
