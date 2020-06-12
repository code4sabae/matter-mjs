import { Matter, createWorldFullscreen } from "https://code4sabae.github.io/matter-mjs/util.mjs";
const { Bodies } = Matter;

window.onload = () => {
  const world = createWorldFullscreen();
  const [w, h] = [world.width, world.height];
  world.add(Bodies.rectangle(w / 3, 0, w / 10, h / 4));
  world.add(Bodies.circle(w / 3 * 2, 0, w / 10));
  world.add(Bodies.rectangle(w / 2, h / 5 * 4, w * .9, h / 10, { isStatic: true }));
};
