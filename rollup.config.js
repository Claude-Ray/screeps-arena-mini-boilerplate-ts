import typescript from '@rollup/plugin-typescript';
import fsPromise from 'fs/promises';

async function getDirectories(dirname) {
  const arenas = [];
  try {
    const dir = await fsPromise.opendir(dirname);
    for await (const dirent of dir) {
      arenas.push(dirent.name);
    }
  } catch (err) {
    console.error(err);
  }
  return arenas;
}

export default async () => {
  const arenas = await getDirectories('./src/arenas');
  return arenas.map(arena => ({
    external: [
      'arena',
      'arena/constants',
      'arena/prototypes',
      'game',
      'game/constants',
      'game/path-finder',
      'game/prototypes',
      'game/utils',
      'game/visual',
    ],
    input: `src/arenas/${arena}/main.ts`,
    output: {
      dir: `dist/${arena}`,
      entryFileNames: '[name].mjs',
      format: 'es',
    },
    plugins: [typescript()],
  }));
};
