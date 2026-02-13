import * as migration_20260207_133115 from './20260207_133115';
import * as migration_20260207_142705 from './20260207_142705';
import * as migration_20260207_144524 from './20260207_144524';
import * as migration_20260208_114302 from './20260208_114302';
import * as migration_20260208_121840_add_several_blocks from './20260208_121840_add_several_blocks';
import * as migration_20260208_130219_add_several_blocks from './20260208_130219_add_several_blocks';
import * as migration_20260209_081321_update_header_block from './20260209_081321_update_header_block';
import * as migration_20260213_202237 from './20260213_202237';
import * as migration_20260213_203124_update_parnership_block from './20260213_203124_update_parnership_block';

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
    name: '20260207_144524',
  },
  {
    up: migration_20260208_114302.up,
    down: migration_20260208_114302.down,
    name: '20260208_114302',
  },
  {
    up: migration_20260208_121840_add_several_blocks.up,
    down: migration_20260208_121840_add_several_blocks.down,
    name: '20260208_121840_add_several_blocks',
  },
  {
    up: migration_20260208_130219_add_several_blocks.up,
    down: migration_20260208_130219_add_several_blocks.down,
    name: '20260208_130219_add_several_blocks',
  },
  {
    up: migration_20260209_081321_update_header_block.up,
    down: migration_20260209_081321_update_header_block.down,
    name: '20260209_081321_update_header_block',
  },
  {
    up: migration_20260213_202237.up,
    down: migration_20260213_202237.down,
    name: '20260213_202237',
  },
  {
    up: migration_20260213_203124_update_parnership_block.up,
    down: migration_20260213_203124_update_parnership_block.down,
    name: '20260213_203124_update_parnership_block'
  },
];
