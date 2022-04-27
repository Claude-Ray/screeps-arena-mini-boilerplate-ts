import { ATTACK } from 'game/constants';
import { Creep } from 'game/prototypes';

declare module 'game/prototypes' {
  interface Creep {
    hasAttack: () => boolean;
  }
}

Creep.prototype.hasAttack = function () {
  return this.body.some(({ type }) => type === ATTACK);
};
