import { randomUUID } from 'crypto';
import { Component } from './index';

export class Entity {
  id: string = randomUUID();
  components: Map<string, Component> = new Map();

  addComponent(component: Component): void {
    this.components.set(component.name, component);
  }

  removeComponent(componentName: string): void {
    this.components.delete(componentName);
  }

  print(): void {
    console.log(JSON.stringify(this, null, 4));
  }

}