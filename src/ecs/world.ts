import { Component, ComponentManager, ComponentType } from "./component";
import { Entity } from "./entity";
import { System } from "./system";

export class World {
    private entities = new Map<Entity, ComponentManager>();
    private entitiesToDestroy = new Set<Entity>();
    private systems = new Set<System>();

    /**
     * Generates ascending ids for entities
     */
    private IdGenerator = (() => {
        let id = 0;

        return () => {
            return id++;
        };
    })();

    /**
     * Spawns a new entity in the world
     * @returns the new entity
     */
    public spawnEntity(): Entity {
        const entity: Entity = {
            id: this.IdGenerator(),
        };

        this.entities.set(entity, new ComponentManager());

        return entity;
    }

    /**
     * Removes an entity from the world. It will be destroyed at the end of the frame
     * @param entity the entity to remove
     */
    public removeEntity(entity: Entity): void {
        this.entitiesToDestroy.add(entity);
    }

    /**
     * Finds all entities that have the given components
     * @param componentTypes the components to search for
     * @returns a set of entities that have the given components
     */
    public findEntitiesWithComponents(
        componentTypes: Set<ComponentType>
    ): Set<Entity> {
        const entities = new Set<Entity>();

        for (let [entity, componentManager] of this.entities) {
            if (componentManager.hasAll(componentTypes)) {
                entities.add(entity);
            }
        }

        return entities;
    }

    /**
     * Gets all entities in the world
     * @returns a set of all entities in the world
     */
    public getAllEntities(): Set<Entity> {
        return new Set(this.entities.keys());
    }

    /**
     * Destroys an entity and removes it from all systems in the world
     * @param entity the entity to destroy
     */
    private destroyEntities(entity: Entity): void {
        this.entities.delete(entity);
    }

    /**
     * Adds a component to an entity
     * @param entity the entity to add the component to
     * @param component the component to add
     */
    public addComponentToEntity(entity: Entity, component: Component): void {
        const componentManager = this.entities.get(entity);

        if (!componentManager) {
            throw new Error(
                `entity id: ${entity.id} does not exist in the world. It might be destroyed or exist in another world`
            );
        }

        componentManager.add(component);
    }

    /**
     * Gets a component from an entity in the world
     * @param entity the entity to get the components from
     * @returns the component manager for the entity
     */
    public getComponentsFromEntity(entity: Entity): ComponentManager {
        const componentManager = this.entities.get(entity);

        if (!componentManager) {
            throw new Error(
                `entity id: ${entity.id} does not exist in the world. It might be destroyed or exist in another world`
            );
        }

        return componentManager;
    }

    /**
     * Removes a component from an entity in the world
     * @param entity the entity to remove the component from
     * @param componentType the component to remove
     */
    public removeComponentFromEntity(
        entity: Entity,
        componentType: ComponentType
    ): void {
        const componentManager = this.entities.get(entity);

        if (!componentManager) {
            throw new Error(
                `entity id: ${entity.id} does not exist in the world. It might be destroyed or exist in another world`
            );
        }

        componentManager.remove(componentType);
    }

    /**
     * Adds a system to the world
     * @param system the system to add
     */
    public addSystem(system: System): void {
        if (system.depComponents.size === 0) {
            console.warn(
                "this system has no dependencies, it will run on all entities in the world"
            );
        }

        system.world = this;

        this.systems.add(system);
    }

    /**
     * Updates all systems in the world. Should be called once per frame
     */
    public update(): void {
        for (let system of this.systems) {
            const entities = this.findEntitiesWithComponents(system.depComponents);
            system.update(entities);
        }

        for (let entity of this.entitiesToDestroy) {
            this.destroyEntities(entity);
        }
        this.entitiesToDestroy.clear();
    }
}
