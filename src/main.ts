import { Component } from "./ecs/component";
import { World } from "./ecs/world";

const canvas = document.getElementById('canvas') as HTMLCanvasElement;

const ctx = canvas.getContext('2d');


const world = new World();
const world_ = new World();

const entity0 = world.spawnEntity();
const entity1 = world.spawnEntity();    // will be destroyed
const entity2 = world.spawnEntity();
const entity0_ = world_.spawnEntity();
console.log(entity0, entity1, entity2);

const allEntities = world.getAllEntities();
console.log(allEntities);

world.removeEntity(entity1);
console.log("id:1 haven't been destroyed yet", world.getAllEntities());

world.update();
console.log("id:1 has been destroyed", world.getAllEntities());

class Position implements Component {
    constructor(public x: number, public y: number) { }
}

class Velocity implements Component {
    constructor(public x: number, public y: number) { }
}

const position = new Position(5, 10);
world.addComponentToEntity(entity0, position);

const velocity = new Velocity(10, 10);
world.addComponentToEntity(entity0, velocity);
try {
    world.addComponentToEntity(entity1, velocity);
} catch (e) {
    console.error(e);
}
world.addComponentToEntity(entity2, velocity);

console.log("entities with position", world.findEntitiesWithComponents(new Set([Position])));
console.log("entities with velocity", world.findEntitiesWithComponents(new Set([Velocity])));

world.removeComponentFromEntity(entity0, Position);
console.log("entities with position", world.findEntitiesWithComponents(new Set([Position])));
world.removeComponentFromEntity(entity0_, Position);