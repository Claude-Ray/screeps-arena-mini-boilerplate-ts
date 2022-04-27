import { getObjectsByPrototype } from 'game/utils';
import { Creep } from 'game/prototypes';
import { Flag } from 'arena/prototypes';
import 'common';

export function loop() {
  const enemyFlag = getObjectsByPrototype(Flag).find(object => !object.my);
  const myCreeps = getObjectsByPrototype(Creep).filter(object => object.my);
  if (enemyFlag) {
    for (const creep of myCreeps) {
      creep.moveTo(enemyFlag);
    }
  }
}
