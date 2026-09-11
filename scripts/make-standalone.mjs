// Gera dist/preview-standalone.html com o bundle JS embutido (arquivo único),
// para permitir visualização em ambientes que só servem um arquivo HTML.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const indexHtml = readFileSync(join(dist, 'index.html'), 'utf8');

const scriptMatch = indexHtml.match(/<script[^>]*src="\.?\/?(assets\/[^"]+\.js)"[^>]*><\/script>/);
if (!scriptMatch) {
  console.error('Bundle JS não encontrado no dist/index.html');
  process.exit(1);
}

const bundlePath = join(dist, scriptMatch[1]);
const bundleCode = readFileSync(bundlePath, 'utf8');

// Embute o JS escapando sequências problemáticas para inline <script>
const safeCode = bundleCode.replace(/<\/script>/gi, '<\\/script>');

const standalone = indexHtml.replace(
  scriptMatch[0],
  () => `<script type="module">\n${safeCode}\n</script>`
);

writeFileSync(join(dist, 'preview-standalone.html'), standalone, 'utf8');
console.log('OK: dist/preview-standalone.html gerado');
