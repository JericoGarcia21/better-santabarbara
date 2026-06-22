import { accessSync, constants, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

let gitConfigWritable = false;

try {
  accessSync('../.git/config', constants.W_OK);
  gitConfigWritable = true;
} catch {
  // Hook installation is optional in CI and read-only checkouts.
}

if (!process.env.CI && existsSync('../.git') && gitConfigWritable) {
  const huskyBin = fileURLToPath(
    new URL('../node_modules/husky/bin.js', import.meta.url)
  );
  const result = spawnSync(process.execPath, [huskyBin], {
    cwd: '..',
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    console.warn(
      'Husky setup skipped because Git configuration is not writable.'
    );
  }
}
