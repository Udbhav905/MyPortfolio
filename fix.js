const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'components');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));
files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Replace: const FadeContent = dynamic(() => [object Promise], { ssr: false });
  // With:    const FadeContent = dynamic(() => import('@/lib/reactbits/FadeContent'), { ssr: false });
  content = content.replace(/const ([a-zA-Z0-9_]+) = dynamic\(\(\) => \[object Promise\]/g, (match, componentName) => {
    changed = true;
    return `const ${componentName} = dynamic(() => import('@/lib/reactbits/${componentName}')`;
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Fixed', file);
  }
});
