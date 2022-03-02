import logoIconFile from '../favicon.svg';

import { Engine, Render, Bodies, Composite, Runner, Mouse, MouseConstraint, Constraint, Events, Body, World } from 'matter-js';

let engine: Engine | null;
let render: Render | null;
let currentLogoIcon: Body | null;
let logoIconPosition: Matter.Vector | null;
let shouldFire: boolean = false;
const width = window.innerWidth;
const height = window.innerHeight;

let pixelRatio = window.devicePixelRatio;
if (pixelRatio !== 1 && pixelRatio !== 2 && pixelRatio !== 3) {
  pixelRatio = 1;
}

export function createGame(element: HTMLElement): HTMLCanvasElement {
  // width = 600;
  // height = 400;
  engine = Engine.create();
  engine.gravity.y = 0;
  render = Render.create({
    element,
    engine: engine,
    options: {
      width,
      height,
      background: '#E6F4F1',
      wireframes: false,
      pixelRatio: pixelRatio,
      // showStats: true,
      // showPerformance: true,
      // showAngleIndicator: true,
    },
  });

  logoIconPosition = { x: width / 2, y: height / 2 };
  currentLogoIcon = createLogoIcon(logoIconPosition);

  const elastic = Constraint.create({
    pointA: logoIconPosition,
    bodyB: currentLogoIcon,
    stiffness: 0.05,
    render: {
      strokeStyle: '#ccc',
      lineWidth: 2,
      anchors: false,
      visible: false,
      type: 'spring',
    },
  });

  const bug = createBug({ x: -10, y: 100 });

  let frame = 1;
  setInterval(() => {
    frame = frame === 1 ? 2 : 1;
    bug.render.sprite.texture = `/assets/bug-${frame}@${pixelRatio}.png?v={VERSJON}`;
  }, 100);

  let direction = 1;
  setInterval(() => {
    const currentPosition = { ...bug.position };
    if (currentPosition.x < 0) {
      direction = 1;
    } else if (currentPosition.x > width) {
      direction = -1;
    }

    if (currentPosition.y < 0 || currentPosition.y > height) {
      currentPosition.x = -100;
      currentPosition.y = 100;
      Body.setPosition(bug, currentPosition);
      Body.setAngularVelocity(bug, 0);
    }

    Body.setVelocity(bug, { x: 3 * direction, y: 0 });
    Body.setAngle(bug, (direction * 90 * Math.PI) / 180);
  }, 50);

  Composite.add(engine.world, [currentLogoIcon, elastic, bug]);

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    // @ts-ignore
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  function isClose(body: any, point: Matter.Vector, diff: number): boolean {
    return Math.abs(body.position.x - point.x) < diff && Math.abs(body.position.y - point.y) < diff;
  }

  Events.on(mouseConstraint, 'enddrag', (e) => {
    if (e.body === currentLogoIcon && !isClose(currentLogoIcon, logoIconPosition, 15)) {
      shouldFire = true;
    }
  });

  Events.on(mouseConstraint, 'startdrag', (e) => {
    if (e.body === currentLogoIcon) {
      elastic.render.visible = true;
    }
  });

  Events.on(engine, 'afterUpdate', function () {
    if (shouldFire && isClose(currentLogoIcon, logoIconPosition, 15)) {
      currentLogoIcon = createLogoIcon(logoIconPosition);
      Composite.add(engine.world, currentLogoIcon);
      elastic.bodyB = currentLogoIcon;
      elastic.render.visible = false;
      shouldFire = false;
    }
  });

  Composite.add(engine.world, mouseConstraint);
  render.mouse = mouse;

  Render.run(render);
  var runner = Runner.create();
  Runner.run(runner, engine);

  return render.canvas;
}

export function destroyGame() {
  Render.stop(render);
  World.clear(engine.world, true);
  Engine.clear(engine);
  render.canvas.remove();
  render.canvas = null;
  render.context = null;
  render.textures = {};

  engine = null;
  render = null;
  currentLogoIcon = null;
}

function createLogoIcon(position: Matter.Vector): Body {
  const b = Bodies.circle(position.x, position.y, 25, {
    label: 'logoIcon',
    density: 0.004,
    //   frictionAir: 0.06,
    //   restitution: 0.3,
    //   friction: 0.01,
    render: {
      sprite: {
        texture: logoIconFile,
        xScale: 1,
        yScale: 1,
      },
    },
  });
  Body.setInertia(b, Infinity);
  return b;
}

function createBug(position: Matter.Vector): Body {
  // this.load.spritesheet('helt', `/assets/helt-sprite@${fiksForPikselratio(1)}.png?v={VERSJON}`, {
  //   frameWidth: fiksForPikselratio(32),
  //   frameHeight: fiksForPikselratio(40),
  //   margin: 1,
  //   spacing: 2,
  // });
  //pixelRatio

  const b = Bodies.rectangle(position.x, position.y, 40, 50, {
    label: 'bug',
    isStatic: false,
    density: 0.01,
    render: {
      sprite: {
        texture: `/assets/bug-1@${pixelRatio}.png?v={VERSJON}`,
        xScale: 1 / pixelRatio,
        yScale: 1 / pixelRatio,
      },
    },
  });
  return b;
}
