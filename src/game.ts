import logoIconFile from '../favicon.svg';

import { Engine, Render, Bodies, Composite, Runner, Mouse, MouseConstraint, Constraint, Events, Body, World } from 'matter-js';

let engine: Engine | null;
let render: Render | null;
let currentLogoIcon: Body | null;
let logoIconPosition: Matter.Vector | null;
let shouldFire: boolean = false;

export function createGame(element: HTMLElement): HTMLCanvasElement {
  let width = window.innerWidth;
  let height = window.innerHeight;
  // width = 600;
  // height = 400;
  engine = Engine.create();
  render = Render.create({
    element,
    engine: engine,
    options: {
      width,
      height,
      background: '#E6F4F1',
      wireframes: false,
      pixelRatio: window.devicePixelRatio,
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

  Composite.add(engine.world, [currentLogoIcon, elastic]);

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
