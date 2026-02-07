import * as migration_20260207_133115 from './20260207_133115';
import * as migration_20260207_142705 from './20260207_142705';
import * as migration_20260207_144524 from './20260207_144524';

export const migrations = [
  {
    up: migration_20260207_133115.up,
    down: migration_20260207_133115.down,
    name: '20260207_133115',
  },
  {
    up: migration_20260207_142705.up,
    down: migration_20260207_142705.down,
    name: '20260207_142705',
  },
  {
    up: migration_20260207_144524.up,
    down: migration_20260207_144524.down,
    name: '20260207_144524'
  },
];
