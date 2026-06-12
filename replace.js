const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  // Replace import('@appletosolutions/reactbits').then((mod) => mod.ComponentName)
  content = content.replace(/import\('@appletosolutions\/reactbits'\)\.then\(\(mod\) => mod\.([a-zA-Z0-9_]+)\)/g, (match, componentName) => {
    changed = true;
    return `import('@/lib/reactbits/${componentName}')`;
  });
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', file);
  }
});
