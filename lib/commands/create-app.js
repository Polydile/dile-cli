import { readdirSync, statSync, readFileSync, existsSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readline from 'readline';
import Handlebars from 'handlebars';
import { toKebabCase } from '../utils/case.js';
import { ensureDirForFile } from '../utils/fs.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const templatesAppDir = join(__dirname, '../..', 'templates/app');

async function promptForInput() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (question, defaultValue) => {
    return new Promise((resolve) => {
      const prompt = defaultValue ? `${question} (${defaultValue}): ` : `${question}: `;
      rl.question(prompt, (answer) => {
        resolve(answer || defaultValue);
      });
    });
  };

  const appName = await askQuestion('App name', 'Dile App');
  const appPrefix = await askQuestion('Component prefix', 'dile');

  rl.close();

  return {
    appName,
    appPrefix: toKebabCase(appPrefix),
  };
}

function copyFileSync(src, dest) {
  const content = readFileSync(src);
  ensureDirForFile(dest);
  writeFileSync(dest, content);
}

function processTemplatesRecursive(srcDir, destDir, templateData) {
  const files = readdirSync(srcDir);

  for (const file of files) {
    const srcPath = join(srcDir, file);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      // Special handling for public folder - copy as is
      if (file === 'public') {
        const publicDestDir = join(destDir, file);
        copyPublicFolder(srcPath, publicDestDir);
      } else {
        const destSubDir = join(destDir, file);
        processTemplatesRecursive(srcPath, destSubDir, templateData);
      }
    } else if (file.endsWith('.hbs')) {
      // Process template files
      const templateName = file.slice(0, -4); // Remove .hbs extension
      let outputFileName = templateName;

      // Replace 'dile' prefix with the custom appPrefix
      if (outputFileName.startsWith('dile')) {
        outputFileName = outputFileName.replace(/^dile/, templateData.appPrefix);
      }

      const destPath = join(destDir, outputFileName);

      try {
        const source = readFileSync(srcPath, 'utf8');
        const template = Handlebars.compile(source);
        const content = template(templateData);
        ensureDirForFile(destPath);
        writeFileSync(destPath, content);
        console.log(`✓ ${relative(process.cwd(), destPath)}`);
      } catch (error) {
        console.error(`✖ Error processing ${file}: ${error.message}`);
        throw error;
      }
    }
  }
}

function copyPublicFolder(srcDir, destDir) {
  const files = readdirSync(srcDir);

  for (const file of files) {
    const srcPath = join(srcDir, file);
    const destPath = join(destDir, file);
    const stat = statSync(srcPath);

    if (stat.isDirectory()) {
      copyPublicFolder(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
      console.log(`✓ ${relative(process.cwd(), destPath)}`);
    }
  }
}

export async function createApp(options = {}) {
  console.log('🚀 Creating a new Dile App\n');

  const { appName, appPrefix } = await promptForInput();

  const appFolderName = toKebabCase(appName);
  const appPath = join(process.cwd(), appFolderName);

  console.log(`\n📦 Generating app "${appName}" with prefix "${appPrefix}" in folder "${appFolderName}"\n`);

  if (existsSync(appPath) && !options.force) {
    console.error(`✖ Folder already exists: ${appFolderName}`);
    console.error('Use --force flag to overwrite');
    process.exit(1);
  }

  const templateData = {
    appName,
    appPrefix,
  };

  try {
    processTemplatesRecursive(templatesAppDir, appPath, templateData);
    
    // Copy .env.example to .env
    const envExamplePath = join(appPath, '.env.example');
    const envPath = join(appPath, '.env');
    if (existsSync(envExamplePath)) {
      const envContent = readFileSync(envExamplePath, 'utf8');
      writeFileSync(envPath, envContent);
      console.log(`✓ ${relative(process.cwd(), envPath)}`);
    }
    
    console.log(`\n✅ App created successfully in "${appFolderName}"`);
    
    // Show next steps
    console.log('\n📝 Next steps:\n');
    console.log(`  cd ${appFolderName}`);
    console.log(`  npm install\n`);
  } catch (error) {
    console.error(`\n✖ Error creating app: ${error.message}`);
    process.exit(1);
  }
}
