# matter-mjs
[matter.js](https://brm.io/matter-js/docs/index.html) ES module version  

# sample

![sandglass](https://code4sabae.github.io/matter-mjs/samples/sandglass.png)  
[砂時計 / SandGlass](https://code4sabae.github.io/matter-mjs/samples/sandglass.html)  
[see Also box2d-es version](https://code4sabae.github.io/box2d-es/samples/sandglass.html)  

![shubo](https://code4sabae.github.io/matter-mjs/samples/shubo.png)  
[しゅぼ / Shubo](https://code4sabae.github.io/matter-mjs/samples/shubo.html)  

# first step

```
<!DOCTYPE HTML><html lang="ja"><head><meta charset="utf-8">
<title>simple - matter.mjs</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
</head><body>
<script type="module">

import { Matter, createWorld } from "https://js.sabae.cc/matter.mjs";
const { Bodies } = Matter;

const world = createWorld(document.body);
world.add(Bodies.rectangle(500, 0, 100, 200));
world.add(Bodies.circle(250, 0, 100));
world.add(Bodies.circle(750, 0, 100));
world.add(Bodies.circle(500, 1800, 1100, { isStatic: true }));

</script>
</body></html>
```

