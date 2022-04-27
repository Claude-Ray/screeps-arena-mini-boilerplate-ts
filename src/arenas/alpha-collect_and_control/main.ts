import { getObjectsByPrototype } from 'game/utils';
import { StructureSpawn, StructureContainer, Creep } from 'game/prototypes';
import { MOVE, CARRY, ERR_NOT_IN_RANGE } from 'game/constants';
import { RESOURCE_SCORE } from 'arena/constants';
import { ScoreCollector } from 'arena/prototypes';
import 'common';

let creep: Creep | undefined;

export function loop() {
  if (!creep) {
    const mySpawn = getObjectsByPrototype(StructureSpawn).find(obj => obj.my);
    const creepBody = [
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      MOVE,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
      CARRY,
    ];
    if (mySpawn) {
      creep = mySpawn.spawnCreep(creepBody).object;
    }
  } else {
    if (creep.store[RESOURCE_SCORE] > 0) {
      const scoreCollector = getObjectsByPrototype(ScoreCollector)[0];
      if (creep.transfer(scoreCollector, RESOURCE_SCORE) == ERR_NOT_IN_RANGE) {
        creep.moveTo(scoreCollector);
      }
    } else {
      const containers = getObjectsByPrototype(StructureContainer);
      if (containers.length > 0) {
        const container = creep.findClosestByPath(containers);
        if (
          container &&
          creep.withdraw(container, RESOURCE_SCORE) == ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(container);
        }
      }
    }
  }
}
