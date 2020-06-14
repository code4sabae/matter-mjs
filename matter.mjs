import canvasutil from "https://code4fukui.github.io/jigaku/lib/jigaku.mjs";
import Matter from "./matter.min.mjs";
//import Matter from "https://code4sabae.github.io/matter-mjs/matter.min.mjs";
const { Engine, Render, Runner, World, Bodies } = Matter;

const startRender = (engine, element) => {
  const canvas = canvasutil.createFullCanvas();
  const size = [1000, 1000];
  const render = { background: "#ffffff", size, canvas };
  const drawWorld = (g) => {
    g.setColor(0, 0, 0);
    const bodies = Matter.Composite.allBodies(engine.world);
    for (const body of bodies) {
      if (!body.render.visible) continue;
      const p = body.position;
      // g.fillCircle(p.x, p.y, 10);
      g.fillStyle = body.render.fillStyle;
      g.beginPath();
      const v = body.vertices;
      g.moveTo(v[0].x, v[0].y);
      for (let i = 1; i < v.length; i++) {
        g.lineTo(v[i].x, v[i].y);
      }
      g.closePath();
      g.fill();
    }
  };

  canvas.draw = (g, cw, ch) => {
    g.fillStyle = render.background;
    g.fillRect(0, 0, cw, ch);
    g.save();
    const [sw, sh] = size;
    const r = Math.min(cw / sw, ch / sh);
    const offx = (cw - sw * r) / 2;
    const offy = (ch - sh * r) / 2;
    g.setTransform(r, 0, 0, r, offx, offy);
    drawWorld(g);
    g.restore();
  };
  const f = () => {
    // this.world.Step(1 / 60, 1);
    canvas.redraw();
  };
  setInterval(f, 1000 / 60);
  return render;
}
const createRender = (engine, element) => {
  const orgw = 1000; // window.innerWidth;
  const orgh = 1000; // window.innerHeight;
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
    /*
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
    */
    const pw = window.devicePixelRatio;
    if (rw < rh) {
      maxx = orgw * rh;
      maxy = orgh * rh;
      offx = -(w - maxx / pw) / 2;
      maxx += offx / 2;
    } else {
      maxx = orgw * rw;
      maxy = orgh * rw;
      offy = -(h - maxy / pw) / 2;
      maxy += offy / 2;
    }
    /*
    element.style.left = offx + "px";
    element.style.top = offy + "px";
    */
    console.log(offx, offy, orgw, orgh, w, h, maxx, maxy);
    
    //render.bounds = { min: { x: 0, y: 0 }, max: { x: maxx, y: maxy}};
    render.bounds = { min: { x: offx, y: offy }, max: { x: maxx, y: maxy}};
  };
  window.onresize();
  return render;
};

const createWorld = (element) => {
  const engine = Engine.create();
  const world = engine.world;
  // const render = createRender(engine, element);
  // Render.run(render);
  const render = startRender(engine, element);
  const runner = Runner.create();
  Runner.run(runner, engine);
  return {
    add (body) {
      World.add(world, body);
    },
    get width () {
      return render.size[0]; //render.canvas.width;
    },
    set width (n) {
      render.size[0] = n;
    },
    get height () {
      return render.size[1]; // render.canvas.height;
    },
    set height (n) {
      render.size[1] = n;
    },
    get render () {
      return render;
    },
    get engine () {
      return engine;
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

export { createWorld, Matter };
