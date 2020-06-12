import { Matter, createWorldFullscreen } from "https://code4sabae.github.io/matter-mjs/util.mjs";
const { Bodies, Body } = Matter;

window.onload = () => {
  const world = createWorldFullscreen();
  const [w, h] = [world.width, world.height];

	const nballs = 400;

	const cx = w / 2;
	const cy = h / 2;
	const sw = h / 2;
	const sh = h;
	const ww = h / 40;

	world.add(createWall(cx - sw / 2, cy, ww, sh / 2, 0));
	world.add(createWall(cx + sw / 2, cy, ww, sh / 2, 0));
	world.add(createWall(cx, 0, ww, sw / 2, Math.PI / 2));
	world.add(createWall(cx, sh, ww, sw / 2, Math.PI / 2));
	
	const hole = sw / 6;
	const hw = ww / 2;
	const hgap = sh / 15;
	const th = Math.PI / 6;
	world.add(createWall(cx - (sw + hole) / 4, cy - hgap, sw / 4, hw, th));
	world.add(createWall(cx + (sw + hole) / 4, cy - hgap, sw / 4, hw, -th));
	world.add(createWall(cx - (sw + hole) / 4, cy + hgap, sw / 4, hw, -th));
	world.add(createWall(cx + (sw + hole) / 4, cy + hgap, sw / 4, hw, th));

	const bw = sw / 60;
	for (let i = 0; i < nballs; i++) {
		world.add(Bodies.circle(cx + (sw - ww * 2) * (Math.random() - .5), ww + (sh / 4) * Math.random(), bw));
	}

	document.body.onclick = () => {
		world.useRealGravity(); // 傾きセンサーを重力に反映（対応していたら）
		world.gravity.y = -world.gravity.y; // 重力反転
	};
}

const createWall = (x, y, width, height, angle) => {
	const base = Bodies.rectangle(x, y, width * 2, height * 2, { isStatic: true });
	Body.rotate(base, angle);
	return base;
}
