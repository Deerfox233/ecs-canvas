import { ComponentType } from "./component";
import { Entity } from "./entity";
import { World } from "./world";

export abstract class System {
    public abstract world: World;
    public abstract depComponents: Set<ComponentType>;

    public abstract update(entities: Set<Entity>): void;
}