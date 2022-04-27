import { getObjectsByPrototype } from 'game/utils';
import { ATTACK, MOVE } from 'game/constants';
import { Creep, StructureSpawn } from 'game/prototypes';
import 'common';

let attacker: Creep | undefined;

export function loop() {
  if (!attacker) {
    const mySpawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);
    if (mySpawn) {
      attacker = mySpawn.spawnCreep([MOVE, ATTACK]).object;
    }
  } else {
    const enemySpawn = getObjectsByPrototype(StructureSpawn).find(i => !i.my);
    if (enemySpawn) {
      attacker.moveTo(enemySpawn);
      attacker.attack(enemySpawn);
    }
  }
}
