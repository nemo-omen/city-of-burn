import { randomUUID } from 'crypto';
import { Component } from './index';

export class Entity {
  id: string = randomUUID();

  print(): void {
    console.log(JSON.stringify(this, null, 4));
  }

}