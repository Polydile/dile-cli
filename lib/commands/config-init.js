import { writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const defaultConfig = {
  components: { basePath: 'src/components' },
  resources: { basePath: 'src/resources' },
};

export const configInit = (options) => {
  const cwd = process.cwd();

  let filename = 'dile.config.js';
  let content = generateESMContent(defaultConfig);

  if (options.cjs) {
    filename = 'dile.config.cjs';
    content = generateCJSContent(defaultConfig);
  } else if (options.mjs) {
    filename = 'dile.config.mjs';
    content = generateESMContent(defaultConfig);
  } else if (options.json) {
    filename = 'dile.config.json';
    content = JSON.stringify(defaultConfig, null, 2);
  }

  const filepath = resolve(cwd, filename);

  if (existsSync(filepath) && !options.force) {
    console.error(`✖ Configuration file already exists: ${filename}`);
    console.error('Use --force flag to overwrite');
    process.exit(1);
  }

  writeFileSync(filepath, content);
  console.log(`✓ Configuration file created: ${filename}`);
};

function generateESMContent(config) {
  return `export default ${JSON.stringify(config, null, 2)};
`;
}

function generateCJSContent(config) {
  return `module.exports = ${JSON.stringify(config, null, 2)};
`;
}
