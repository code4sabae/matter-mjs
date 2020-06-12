import Matter from "../matter.min.mjs";

const { Engine, Render, Runner, World, Bodies, Body } = Matter;

class SandGlass {
	constructor () {
		const element = document.body;
		element.style.margin = "0";
		element.style.padding = "0";
		element.style.overflow = "hidden";

		const engine = Engine.create();
		this.world = engine.world;
		
		const render = Render.create({
			element, engine,
			options: {
				width: window.innerWidth,
				height: window.innerHeight,
				background: '#FFFFFF',
				wireframes: false,
			}
		});
		Render.run(render);
		const runner = Runner.create();
		Runner.run(runner, engine);
	
		const sw = 200;
		const sh = 400;

		const hole = 59;
		const nballs = 700;

		this.createWall(0, 200, 10, 200, 0);
		this.createWall(200, 200, 10, 200, 0);
		this.createWall(100, 0, 10, 100, Math.PI / 2);
		this.createWall(100, 400, 10, 100, Math.PI / 2);
		
		this.createWall(75 - hole, 170, 81, 4, Math.PI / 8);
		this.createWall(200 - 75 + hole, 170, 81, 4, -Math.PI / 8);
		this.createWall(75 - hole, 232, 81, 4, -Math.PI / 8);
		this.createWall(200 - 75 + hole, 232, 81, 4, Math.PI / 8);

		for (let i = 0; i < nballs; i++) {
			this.createBall(20 + 160 * Math.random(), 20 + 130 * Math.random(), 3);
		}

		element.onclick = () => {
			useDeviceMotion();
			this.world.gravity.y = -this.world.gravity.y; // 重力反転
		};

		window.addEventListener("devicemotion", (e) => {
			// ball.WakeUp();
			var xg = e.accelerationIncludingGravity.x;
			var yg = e.accelerationIncludingGravity.y;
			this.world.gravity.x = xg * 30;
			this.world.gravity.y = -yg * 30;
		}, true);
	}

	createWall (x, y, width, height, angle) {
		const base = Bodies.rectangle(x, y, width * 2, height * 2, { isStatic: true });
		Body.rotate(base, angle);
		World.add(this.world, base);
	}
	
	createBall (x, y, r) {
		const circle = Bodies.circle(x, y, r);
		World.add(this.world, circle);
	};
};

const useDeviceMotion = () => {
	if (window.DeviceMotionEvent && DeviceMotionEvent.requestPermission && typeof DeviceMotionEvent.requestPermission === 'function') {
		DeviceMotionEvent.requestPermission()
	}
	if (window.DeviceOrientationEvent && DeviceOrientationEvent.requestPermission && typeof DeviceOrientationEvent.requestPermission === 'function') {
		DeviceOrientationEvent.requestPermission();
	}
};

window.onload = () => {
	new SandGlass();
};