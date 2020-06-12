import Matter from "../matter.min.mjs";

const { Engine, Render, Runner, World, Bodies } = Matter;

window.onload = () => {
  const engine = Engine.create();
  const world = engine.world;

  const element = document.body;
  const render = Render.create({
    element, engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      background: '#FFFFFF',
      wireframes: false,
    }
  });
  element.style.margin = "0";
  element.style.padding = "0";
  element.style.overflow = "hidden";
    /*
  window.onresize = () => {
    render.options.width = window.innerWidth;
    render.options.height = window.innerHeight;
    render.canvas.style.width = window.innerWidth + "px";
    render.canvas.style.height = window.innerHeight + "px";
  };
    */

  Render.run(render);

  const runner = Runner.create();
  Runner.run(runner, engine);

  const rect = Bodies.rectangle(500, 0, 100, 80);
  const circle = Bodies.circle(200, 0, 50);
  const base = Bodies.rectangle(400, 350, 800, 30, { isStatic: true });

  World.add(world, [rect, circle, base]);
};
