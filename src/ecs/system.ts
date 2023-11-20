import { ComponentType } from "./component";
import { Entity } from "./entity";
import { World } from "./world";

export abstract class System {
  private _world: World | undefined;
  public abstract depComponents: Set<ComponentType>;

  public set world(world: World) {
    this._world = world;
  }

  public get world(): World {
    if (this._world === undefined) {
      throw new Error("system does not belong to any world");
    }

    return this._world;
  }

  public abstract update(entities: Set<Entity>): void;
}
