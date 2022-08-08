import { ECS, Entity } from './index';

export abstract class System {
  public abstract componentsResuired: Set<Function>;
  public abstract update(entities: Set<Entity>): void;
  public ecs: ECS;
}