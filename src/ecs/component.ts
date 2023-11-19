export interface Component { }

export type ComponentType<T extends Component = Component> = new (...args: any[]) => T;

export class ComponentManager {
    private components = new Map<ComponentType, Component>();

    public add(component: Component): void {
        this.components.set(component.constructor as ComponentType, component);
    }

    public get<T extends Component>(componentType: ComponentType<T>): T {
        return this.components.get(componentType) as T;
    }

    public has(componentType: ComponentType): boolean {
        return this.components.has(componentType);
    }

    public hasAll(componentTypes: Set<ComponentType>): boolean {
        for (let componentType of componentTypes) {
            if (!this.components.has(componentType)) {
                return false;
            }
        }

        return true;
    }

    public remove(componentType: ComponentType): void {
        this.components.delete(componentType);
    }
}