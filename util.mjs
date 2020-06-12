import Matter from "https://code4sabae.github.io/matter-mjs/matter.min.mjs";

const { Engine, Render, Runner, World, Bodies } = Matter;

const getRenderFullscreen = (engine) => {
  const orgw = window.innerWidth;
  const orgh = window.innerHeight;
  const element = document.body;
  const render = Render.create({
    element, engine,
    options: {
      width: orgw,
      height: orgh,
      background: '#ffffff',
      wireframes: false,
      hasBounds: true,
    }
  });
  element.style.margin = "0";
  element.style.padding = "0";
  element.style.overflow = "hidden";
  
  window.onresize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    render.canvas.width = w;
    render.canvas.height = h;
    render.canvas.style.width = w + "px";
    render.canvas.style.height = h + "px";
    const [rw, rh] = [orgw / w, orgh / h];
    let maxx, maxy;
    let [offx, offy] = [0, 0];
    if (rw < rh) {
      maxx = orgw * rh;
      maxy = orgh * rh;
      offx = (orgw * rw - maxx) / 2;
      maxx += offx / 2;
    } else {
      maxx = orgw * rw;
      maxy = orgh * rw;
      offy = (orgh * rh - maxy) / 2;
      maxy += offy / 2;
    }
    render.bounds = { min: { x: offx, y: offy }, max: { x: maxx, y: maxy}};
  };
  return render;
};

const createWorldFullscreen = () => {
  const engine = Engine.create();
  const world = engine.world;
  const render = getRenderFullscreen(engine);
  Render.run(render);
  const runner = Runner.create();
  Runner.run(runner, engine);
  return {
    add (body) {
      World.add(world, body);
    },
    get width () {
      return render.canvas.width;
    },
    get height () {
      return render.canvas.height;
    },
    get gravity () {
      return world.gravity;
    },
    useRealGravity () {
      useDeviceMotionWorld(world);
    }
  };
};

const useDeviceMotionWorld = (world) => {
	if (window.DeviceMotionEvent && DeviceMotionEvent.requestPermission && typeof DeviceMotionEvent.requestPermission === 'function') {
		DeviceMotionEvent.requestPermission()
	}
	if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function') {
		DeviceOrientationEvent.requestPermission();
	}
	// Androidは逆!?
	// window.addEventListener("devicemotion", (e) => {
  const yflg = window.navigator.userAgent.indexOf("Android") >= 0 ? -1 : 1;
	window.ondevicemotion = (e) => {
		if (e.accelerationIncludingGravity.x === null) return;
		// ball.WakeUp();
		var xg = e.accelerationIncludingGravity.x;
    var yg = e.accelerationIncludingGravity.y * yflg;
    world.gravity.x = xg / 9.8;
    world.gravity.y = -yg / 9.8;
	};
};

export { getRenderFullscreen, createWorldFullscreen, Matter };
