"use strict";
(() => {
  // src/Game/Datagroups/PositionData.ts
  var PositionData = class {
    // using interface and not type cuz we dont need type unions and all that
    x;
    y;
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  };

  // src/Game/Entity/EntityManager.ts
  var EntityManager = class {
    entities = /* @__PURE__ */ new Map();
    idCounter = 0;
    constructor() {
    }
    addNewEntity(e) {
      e.id = this.idCounter;
      this.idCounter++;
      this.entities.set(e.id, e);
    }
    removeEntity(e) {
      this.entities.delete(e.id);
    }
    applyAllEntityPhysics() {
      for (const e of this.entities.values()) {
        e.applyPhysics();
      }
    }
  };
  var entityManager = new EntityManager();

  // src/config.ts
  var mspt = 20;
  var msprt = 14;
  var mapWidth = 1118 * 0.3;
  var mapHeight = 2235 * 0.3;
  var ballSize = 57.15 * 0.3 * 0.82;
  var ballSizeUncorrected = 57.15 * 0.3 * 1;

  // src/Const/Constants.ts
  var PI2 = Math.PI * 2;
  var PI = Math.PI;

  // src/Render/RenderableContainer.ts
  var RenderableContainer = class {
    children;
    constructor() {
      this.children = /* @__PURE__ */ new Map();
    }
    addChild(id, child) {
      this.children.set(id, child);
    }
    removeChild(id) {
      this.children.delete(id);
    }
    drawAll(ctx2) {
      for (const child of this.children.values()) {
        child.draw(ctx2);
      }
    }
  };
  var containers = [];
  function initRenderableContainers() {
    containers.push(new RenderableContainer());
    containers.push(new RenderableContainer());
    containers.push(new RenderableContainer());
  }

  // src/utils.ts
  function mapToCanvasCoords(x, y) {
    return new PositionData(x + mapLeft, y + mapTop);
  }
  function canvasToMapCoords(x, y) {
    return new PositionData(x - mapLeft, y - mapTop);
  }
  function cacheNewImage(url) {
    const imageId = `cache_${crypto.randomUUID()}`;
    const node = document.createElement("img");
    node.setAttribute("src", url);
    node.setAttribute("id", imageId);
    document.getElementById("imageCache").appendChild(node);
    return imageId;
  }

  // src/load.ts
  var Assets = {
    smashHitBall: cacheNewImage("../assets/smash-hit-ball.png"),
    // earthImage: cacheNewImage("https://i.ibb.co/0jsZ2PQj/image.png"),
    earthImage: cacheNewImage("../assets/earth-clear-bkg.png"),
    overlayShine: cacheNewImage("../assets/glass-sphere-overlay-1.png"),
    poolTableFelt: cacheNewImage("../assets/table-felt-1.png")
  };

  // src/Render/RenderablePath2D.ts
  var RenderablePath2D = class {
    path;
    type;
    fillColor = "#e5e5e5" /* LightGray */;
    strokeColor = "#000000" /* Black */;
    constructor(path, type, ...customArgs) {
      this.path = path;
      this.type = type;
      this.strokeColor = customArgs[0] || "#000000" /* Black */;
      this.fillColor = customArgs[1] || "#e5e5e5" /* LightGray */;
    }
  };

  // src/Render/RenderableImage.ts
  var RenderableImage = class {
    src;
    position;
    width;
    height;
    constructor(src, position, width, height, ...customArgs) {
      this.src = document.getElementById(src);
      this.position = position;
      this.width = width;
      this.height = height;
    }
  };

  // src/Render/RenderableText.ts
  var RenderableText = class {
    text;
    position;
    type;
    fillColor = "#e5e5e5" /* LightGray */;
    strokeColor = "#000000" /* Black */;
    font;
    constructor(text, position, type, font, ...customArgs) {
      this.text = text;
      this.position = position;
      this.type = type;
      this.font = font;
      this.strokeColor = customArgs[0] || "#000000" /* Black */;
      this.fillColor = customArgs[1] || "#e5e5e5" /* LightGray */;
    }
  };

  // src/Render/Renderable.ts
  var renderableId = 0;
  var Renderable = class {
    positionData;
    container;
    paths = [];
    textPaths = [];
    imagePaths = [];
    id;
    constructor(container, position) {
      this.container = container;
      this.positionData = position;
      this.id = renderableId;
      renderableId++;
      this.container.addChild(this.id, this);
    }
    /** add a path to the array of paths */
    addPath(path) {
      if (path instanceof RenderablePath2D) this.paths.push(path);
      if (path instanceof RenderableText) this.textPaths.push(path);
      if (path instanceof RenderableImage) this.imagePaths.push(path);
    }
    /** draws each Path2D given a ctx */
    draw(ctx2) {
      for (const template of this.paths) {
        ctx2.save();
        ctx2.translate(1 * this.positionData.x, 1 * this.positionData.y);
        if (template.type & 2 /* Fill */) {
          ctx2.fillStyle = template.fillColor;
          ctx2.fill(template.path);
        }
        if (template.type & 1 /* Stroke */) {
          ctx2.strokeStyle = template.strokeColor;
          ctx2.stroke(template.path);
        }
        if (template.type & 4 /* Shadow */) {
          ctx2.shadowColor = template.strokeColor;
          ctx2.shadowBlur = 10;
          ctx2.shadowOffsetX = 4;
          ctx2.shadowOffsetY = -2;
          ctx2.fill(template.path);
        }
        if (template.type & 8 /* ThickStroke */) {
          ctx2.strokeStyle = template.strokeColor;
          ctx2.lineWidth = 5;
          ctx2.stroke(template.path);
        }
        ctx2.restore();
      }
      for (const template of this.textPaths) {
        ctx2.save();
        ctx2.translate(1 * this.positionData.x, 1 * this.positionData.y);
        if (template.type & 1 /* Stroke */) {
          ctx2.strokeStyle = template.strokeColor;
          ctx2.font = template.font;
          ctx2.strokeText(template.text, template.position.x, template.position.y);
        }
        if (template.type & 2 /* Fill */) {
          ctx2.fillStyle = template.strokeColor;
          ctx2.font = template.font;
          ctx2.fillText(template.text, template.position.x, template.position.y);
        }
        ctx2.restore();
      }
      for (const template of this.imagePaths) {
        ctx2.save();
        ctx2.translate(1 * this.positionData.x, 1 * this.positionData.y);
        ctx2.drawImage(template.src, template.position.x, template.position.y, template.width, template.height);
        ctx2.restore();
      }
    }
  };

  // src/Render/Sprites/Balls/CueBall.ts
  var SpriteCueBall = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const path1 = new Path2D();
      path1.arc(0, 0, radius, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(path1, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };

  // src/Render/Sprites/Balls/SolidBalls.ts
  var Sprite1Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#ffff00" /* BallS1T9 */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("1", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite2Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#0000fe" /* BallS2T10 */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("2", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite3Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#fe0000" /* BallS3T11 */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("3", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite4Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#bf00c0" /* BallS4T12 */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("4", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite5Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#ff7f00" /* BallS5T13 */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("5", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite6Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#01c000" /* BallS6T14 */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("6", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite7Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#bf0000" /* BallS7T15 */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("7", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite8Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#000000" /* Black */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("8", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };

  // src/Render/Sprites/Balls/StripedBalls.ts
  var Sprite9Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const topMask = new Path2D();
      topMask.arc(0, 0, radius, PI / 5, 4 * PI / 5);
      const bottomMask = new Path2D();
      bottomMask.arc(0, 0, radius, 6 * PI / 5, 9 * PI / 5);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#ffff00" /* BallS1T9 */));
      this.addPath(new RenderablePath2D(topMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(bottomMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("9", { x: -5, y: 6 }, 2 /* Fill */, `${20 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite10Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const topMask = new Path2D();
      topMask.arc(0, 0, radius, PI / 5, 4 * PI / 5);
      const bottomMask = new Path2D();
      bottomMask.arc(0, 0, radius, 6 * PI / 5, 9 * PI / 5);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#0000fe" /* BallS2T10 */));
      this.addPath(new RenderablePath2D(topMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(bottomMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("10", { x: -8.5, y: 5.5 }, 2 /* Fill */, `${17 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite11Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const topMask = new Path2D();
      topMask.arc(0, 0, radius, PI / 5, 4 * PI / 5);
      const bottomMask = new Path2D();
      bottomMask.arc(0, 0, radius, 6 * PI / 5, 9 * PI / 5);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#fe0000" /* BallS3T11 */));
      this.addPath(new RenderablePath2D(topMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(bottomMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("11", { x: -8.5, y: 5.5 }, 2 /* Fill */, `${17 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite12Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const topMask = new Path2D();
      topMask.arc(0, 0, radius, PI / 5, 4 * PI / 5);
      const bottomMask = new Path2D();
      bottomMask.arc(0, 0, radius, 6 * PI / 5, 9 * PI / 5);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#bf00c0" /* BallS4T12 */));
      this.addPath(new RenderablePath2D(topMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(bottomMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("12", { x: -8.5, y: 5.5 }, 2 /* Fill */, `${17 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite13Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const topMask = new Path2D();
      topMask.arc(0, 0, radius, PI / 5, 4 * PI / 5);
      const bottomMask = new Path2D();
      bottomMask.arc(0, 0, radius, 6 * PI / 5, 9 * PI / 5);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#ff7f00" /* BallS5T13 */));
      this.addPath(new RenderablePath2D(topMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(bottomMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("13", { x: -8.5, y: 5.5 }, 2 /* Fill */, `${17 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite14Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const topMask = new Path2D();
      topMask.arc(0, 0, radius, PI / 5, 4 * PI / 5);
      const bottomMask = new Path2D();
      bottomMask.arc(0, 0, radius, 6 * PI / 5, 9 * PI / 5);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#01c000" /* BallS6T14 */));
      this.addPath(new RenderablePath2D(topMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(bottomMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("14", { x: -8.5, y: 5.5 }, 2 /* Fill */, `${17 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };
  var Sprite15Ball = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const bkgPath = new Path2D();
      bkgPath.arc(0, 0, radius, 0, PI2);
      const numberBkg = new Path2D();
      numberBkg.arc(0, 0, radius * 0.55, 0, PI2);
      const topMask = new Path2D();
      topMask.arc(0, 0, radius, PI / 5, 4 * PI / 5);
      const bottomMask = new Path2D();
      bottomMask.arc(0, 0, radius, 6 * PI / 5, 9 * PI / 5);
      const shadow = new Path2D();
      shadow.arc(0, 0, radius * 0.85, 0, PI2);
      this.addPath(new RenderablePath2D(shadow, 4 /* Shadow */, "#000000" /* Black */, "#929292" /* DarkGray */));
      this.addPath(new RenderablePath2D(bkgPath, 2 /* Fill */, "#fffff1" /* White */, "#bf0000" /* BallS7T15 */));
      this.addPath(new RenderablePath2D(topMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(bottomMask, 2 /* Fill */, "#fffff1" /* White */, "#fffff1" /* White */));
      this.addPath(new RenderablePath2D(numberBkg, 2 /* Fill */ | 1 /* Stroke */, "#929292" /* DarkGray */, "#fffff1" /* White */));
      this.addPath(new RenderableText("15", { x: -8.5, y: 5.5 }, 2 /* Fill */, `${17 * ballSize / ballSizeUncorrected}px Arial`, "#000000" /* Black */));
      this.addPath(new RenderableImage(Assets.overlayShine, { x: -2 * radius - 1, y: -2 * radius - 2 }, 4 * radius, 4 * radius));
    }
  };

  // src/Render/Sprites/Circle.ts
  var SpriteCircle = class extends Renderable {
    constructor(container, position, radius) {
      super(container, position);
      console.log(this);
      const path1 = new Path2D();
      path1.arc(0, 0, radius, 0, PI2);
      this.addPath(new RenderablePath2D(path1, 1 /* Stroke */));
    }
    draw(thisCtx) {
      super.draw(thisCtx);
    }
  };

  // src/Game/Datagroups/HitboxData.ts
  var HitboxData = class {
    size;
    constructor(size) {
      this.size = size;
    }
  };

  // src/Game/Physics/Vector.ts
  var Vector = class _Vector {
    x;
    y;
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    /** magnitude of a vector */
    static magnitude(v) {
      return Math.sqrt(v.x ** 2 + v.y ** 2);
    }
    /** directon of given VectorAbstract 
     * uses atan2 --> 
    */
    static direction(v) {
      return Math.atan2(v.y, v.x);
    }
    /** construct a vector from mag and dir */
    static fromPolar(r, theta) {
      return new _Vector(r * Math.cos(theta), r * Math.sin(theta));
    }
    /** set properties of the vecotr */
    set(v) {
      this.x = v.x;
      this.y = v.y;
    }
    /** basic vector addition */
    add(v) {
      this.x += v.x, this.y += v.y;
    }
    /** also vector addition but its subtraction */
    subtract(v) {
      this.x -= v.x;
      this.y -= v.y;
    }
    /** scale up or down a vector by a factor */
    scale(v) {
      this.x *= v;
      this.y *= v;
      return this;
    }
    /** getter method for angle vector angle */
    get angle() {
      return Math.atan2(this.y, this.x);
    }
    /** getter method for magnitude (probably wont use) */
    get magnitude() {
      return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    /** set the angle of vector and itll update the component vectors accordingly */
    set angle(angle) {
      const currentMag = this.magnitude;
      this.set({
        x: Math.cos(angle) * currentMag,
        y: Math.sin(angle) * currentMag
      });
    }
    /** updates angle based on magnitude change */
    set magnitude(magnitude) {
      const currentDir = this.angle;
      this.set({
        x: Math.cos(currentDir) * magnitude,
        y: Math.sin(currentDir) * magnitude
      });
    }
  };

  // src/Game/Datagroups/PhysicsData.ts
  var PhysicsData = class {
    velocity = new Vector(0, 0);
    mass = 1;
    // public momentum: number; // just calculate momentum on the fly
    // might add an acceleration vector here
    constructor() {
    }
  };

  // src/Game/Entity/Entity.ts
  var Entity = class {
    positionData;
    hitboxData;
    physicsData;
    sprite;
    // or any extended class from it btw
    id = -1;
    // just set it to -1 as a default for now;
    wallVelocityMultiFactor = 0.98;
    passiveVelocityMultiFactor = 0.9968;
    // public onCollisionCallback: (otherEntity: Entity, ...args: any[]) => any;
    constructor(mapx, mapy, size) {
      const canvasCoords = mapToCanvasCoords(mapx, mapy);
      this.positionData = new PositionData(canvasCoords.x, canvasCoords.y);
      this.hitboxData = new HitboxData(size);
      this.physicsData = new PhysicsData();
      this.sprite = new Renderable(containers[0], this.positionData);
      this.sprite.container.removeChild(this.sprite.id);
      entityManager.addNewEntity(this);
    }
    destroy() {
      entityManager.removeEntity(this);
      this.sprite.container.removeChild(this.sprite.id);
      return this;
    }
    applyPhysics() {
      this.positionData.x += this.physicsData.velocity.x;
      this.positionData.y += this.physicsData.velocity.y;
      this.physicsData.velocity.scale(this.passiveVelocityMultiFactor);
    }
    approximateZeroVelocity() {
      if (Vector.magnitude(this.physicsData.velocity) <= 0.5) this.physicsData.velocity.scale(this.passiveVelocityMultiFactor ** 2);
      if (Vector.magnitude(this.physicsData.velocity) <= 0.055) this.physicsData.velocity = new Vector(0, 0);
    }
    // public onCollision(callback: (otherEntity: Entity, ...args: any[]) => any) {
    //     this.onCollisionCallback = callback;
    // }
  };

  // src/Render/Sprites/Pocket.ts
  var SpritePocketEntity = class extends Renderable {
    constructor(position) {
      super(containers[0], position);
      console.log(this);
      const path1 = new Path2D();
      path1.arc(0, 0, ballSize * 1.2, 0, PI2);
      const path2 = new Path2D();
      path2.arc(0, 0, ballSize * 0.8, 0, PI2);
      const path3 = new Path2D();
      path3.arc(0, 0, ballSize * 0.35, 0, PI2);
      this.addPath(new RenderablePath2D(path1, 2 /* Fill */ | 1 /* Stroke */, "#4c3622" /* Wood2 */, "#BA8C63" /* Wood */));
      this.addPath(new RenderablePath2D(path2, 2 /* Fill */, "#7a5d44" /* Wood1 */, "#7a5d44" /* Wood1 */));
      this.addPath(new RenderablePath2D(path3, 2 /* Fill */, "#4c3622" /* Wood2 */, "#4c3622" /* Wood2 */));
    }
    draw(thisCtx) {
      super.draw(thisCtx);
    }
  };

  // src/Game/Entity/PocketEntity.ts
  var PocketEntity = class extends Entity {
    size = ballSize * 1.2;
    constructor(x, y) {
      super(x, y, ballSize * 1.2);
      this.sprite = new SpritePocketEntity({ x: this.positionData.x, y: this.positionData.y });
      console.log(entityManager.entities.values());
    }
    // make it bounce off the walls just like the TestEntity
    applyPhysics() {
      this.physicsData.velocity.scale(0);
      super.applyPhysics();
    }
  };

  // src/Game/Entity/BallEntity.ts
  var BallEntity = class extends Entity {
    /** this is the number that dictates what number the ball is.
     * it is numbered from 0 to 15 inclusive, where 0 is the cue ball and 1-15 are the normal numbered balls. 
     */
    ballNumber = 0;
    size = ballSize;
    constructor(x, y, ballNumber) {
      super(x, y, ballSize);
      this.ballNumber = ballNumber;
      console.log(`Ball number: ${this.ballNumber}`);
      switch (this.ballNumber) {
        default: {
          this.sprite = new SpriteCircle(containers[0], this.positionData, ballSize);
          break;
        }
        case 0:
          this.sprite = new SpriteCueBall(containers[0], this.positionData, ballSize);
          break;
        case 1:
          this.sprite = new Sprite1Ball(containers[0], this.positionData, ballSize);
          break;
        case 2:
          this.sprite = new Sprite2Ball(containers[0], this.positionData, ballSize);
          break;
        case 3:
          this.sprite = new Sprite3Ball(containers[0], this.positionData, ballSize);
          break;
        case 4:
          this.sprite = new Sprite4Ball(containers[0], this.positionData, ballSize);
          break;
        case 5:
          this.sprite = new Sprite5Ball(containers[0], this.positionData, ballSize);
          break;
        case 6:
          this.sprite = new Sprite6Ball(containers[0], this.positionData, ballSize);
          break;
        case 7:
          this.sprite = new Sprite7Ball(containers[0], this.positionData, ballSize);
          break;
        case 8:
          this.sprite = new Sprite8Ball(containers[0], this.positionData, ballSize);
          break;
        case 9:
          this.sprite = new Sprite9Ball(containers[0], this.positionData, ballSize);
          break;
        case 10:
          this.sprite = new Sprite10Ball(containers[0], this.positionData, ballSize);
          break;
        case 11:
          this.sprite = new Sprite11Ball(containers[0], this.positionData, ballSize);
          break;
        case 12:
          this.sprite = new Sprite12Ball(containers[0], this.positionData, ballSize);
          break;
        case 13:
          this.sprite = new Sprite13Ball(containers[0], this.positionData, ballSize);
          break;
        case 14:
          this.sprite = new Sprite14Ball(containers[0], this.positionData, ballSize);
          break;
        case 15:
          this.sprite = new Sprite15Ball(containers[0], this.positionData, ballSize);
          break;
      }
    }
    // make it bounce off the walls just like the TestEntity
    applyPhysics() {
      if (this.positionData.x + this.physicsData.velocity.x + this.hitboxData.size >= mapRight2) {
        this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
      }
      if (this.positionData.x + this.physicsData.velocity.x - this.hitboxData.size <= mapLeft) {
        this.physicsData.velocity.x *= -this.wallVelocityMultiFactor;
      }
      if (this.positionData.y + this.physicsData.velocity.y + this.hitboxData.size >= mapBottom2) {
        this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
      }
      if (this.positionData.y + this.physicsData.velocity.y - this.hitboxData.size <= mapTop) {
        this.physicsData.velocity.y *= -this.wallVelocityMultiFactor;
      }
      super.applyPhysics();
      super.approximateZeroVelocity();
      if (this.positionData.x >= mapRight2 - this.hitboxData.size) {
        this.positionData.x = mapRight2 - this.hitboxData.size;
      }
      if (this.positionData.x <= mapLeft + this.hitboxData.size) {
        this.positionData.x = mapLeft + this.hitboxData.size;
      }
      if (this.positionData.y >= mapBottom2 - this.hitboxData.size) {
        this.positionData.y = mapBottom2 - this.hitboxData.size;
      }
      if (this.positionData.y <= mapTop + this.hitboxData.size) {
        this.positionData.y = mapTop + this.hitboxData.size;
      }
    }
    checkPocketed(otherEntity) {
      if (otherEntity instanceof PocketEntity) {
        this.destroy();
        game.processDeletedBall(this.ballNumber);
      }
    }
    // make sure to remove the ball from the game as well
    destroy() {
      super.destroy();
      game.balls.splice(game.balls.indexOf(this), 1);
      return this;
    }
  };

  // src/Game/UI/RenderHud.ts
  var CueHudBkg = class extends Renderable {
    constructor(x, y) {
      super(containers[2], { x, y });
      const bkgCircle = new Path2D();
      bkgCircle.arc(0, 0, 67, 0, PI2);
      this.addPath(new RenderablePath2D(bkgCircle, 2 /* Fill */ | 1 /* Stroke */, "#e5e5e5" /* LightGray */, "rgba(255, 255, 255, 0.7)" /* HudBkgMain */));
    }
  };
  var CueHudIntensity = class extends Renderable {
    intensityRatio = 0.5;
    constructor(x, y) {
      super(containers[2], { x, y });
      const path1 = new Path2D();
      path1.arc(0, 0, 67 * this.intensityRatio, 0, PI2);
      const textPercentDisplay = new RenderableText("0.00%", { x: -24, y: 9 }, 2 /* Fill */, "20px Arial");
      this.addPath(new RenderablePath2D(path1, 2 /* Fill */, "#00ff9d80" /* HudBkgIndicator */, "#00ff9d80" /* HudBkgIndicator */));
      this.addPath(textPercentDisplay);
    }
    updateIntensity(newIntensity) {
      this.intensityRatio = newIntensity;
      const newPath1 = new Path2D();
      newPath1.arc(0, 0, 67 * this.intensityRatio, 0, PI2);
      this.paths[0] = new RenderablePath2D(newPath1, 2 /* Fill */, "#00ff9d80" /* HudBkgIndicator */, "#00ff9d80" /* HudBkgIndicator */);
      this.textPaths[0] = new RenderableText(`${(newIntensity * 100).toFixed(2)}%`, { x: -24, y: 9 }, 2 /* Fill */, "20px Roboto Mono");
    }
  };
  var CueHudTracerArrow = class extends Renderable {
    length = 300;
    angle = 0;
    startRadius = ballSize * 2;
    vector;
    constructor(x, y) {
      super(containers[2], { x, y });
      this.vector = new Vector(0, 0);
      const path1 = new Path2D();
      path1.moveTo(0, 0);
      path1.lineTo(this.vector.x, this.vector.y);
      this.addPath(new RenderablePath2D(path1, 8 /* ThickStroke */, "#fffff1" /* White */, "#ff0000" /* Red */));
      this.addPath(new RenderablePath2D(new Path2D(), 8 /* ThickStroke */, "#fffff1" /* White */, "#ff0000" /* Red */));
      this.addPath(new RenderablePath2D(new Path2D(), 8 /* ThickStroke */, "#fffff1" /* White */, "#ff0000" /* Red */));
    }
    updateVector(v) {
      this.vector.set(v);
      const path1 = new Path2D();
      path1.moveTo(0, 0);
      path1.lineTo(this.vector.x, this.vector.y);
      const pathL = new Path2D();
      path1.moveTo(this.vector.x, this.vector.y);
      path1.lineTo(this.vector.x - 20 * Math.cos(this.vector.angle + 0.54), this.vector.y - 20 * Math.sin(this.vector.angle + 0.54));
      const pathR = new Path2D();
      path1.moveTo(this.vector.x, this.vector.y);
      path1.lineTo(this.vector.x - 20 * Math.cos(this.vector.angle - 0.54), this.vector.y - 20 * Math.sin(this.vector.angle - 0.54));
      this.paths[0] = new RenderablePath2D(path1, 8 /* ThickStroke */, this.paths[0].strokeColor, this.paths[0].fillColor);
      this.paths[1] = new RenderablePath2D(pathL, 8 /* ThickStroke */, "#ff0000" /* Red */, "#ff0000" /* Red */);
      this.paths[2] = new RenderablePath2D(pathR, 8 /* ThickStroke */, "#ff0000" /* Red */, "#ff0000" /* Red */);
    }
  };

  // src/Game/UI/UIMain.ts
  var showHud = false;
  var firstShot = -1;
  function initHudListeners() {
    const canvasEle = document.getElementById("mainCanvas");
    var hudCx = 0;
    var hudCy = 0;
    var hudBkg = new CueHudBkg(0, 0);
    var hudIntensityDisplay = new CueHudIntensity(0, 0);
    var hudTracerArrow = new CueHudTracerArrow(0, 0);
    function updateHudPosition(position) {
      hudBkg.positionData = position;
      hudIntensityDisplay.positionData = position;
      hudTracerArrow.positionData = position;
    }
    canvasEle?.addEventListener("mousedown", (e) => {
      if (!checkAllZeroVelocity()) return;
      showHud = true;
      const cueBallPosition = game.getBallByNumber(0);
      const mx2 = cueBallPosition.positionData.x;
      const my2 = cueBallPosition.positionData.y;
      hudCx = mx2;
      hudCy = my2;
      updateHudPosition({ x: mx2, y: my2 });
      if (firstShot == 0) {
        game.doSelectionModal();
        firstShot++;
      }
    });
    canvasEle?.addEventListener("mouseup", (e) => {
      if (!checkAllZeroVelocity()) return;
      showHud = false;
      const mx2 = e.clientX;
      const my2 = e.clientY;
      const cueBall = game.getBallByNumber(0);
      cueBall.physicsData.velocity.set(
        Vector.fromPolar(15 * hudIntensityDisplay.intensityRatio, new Vector(-mx2 + hudCx, -my2 + hudCy).angle)
      );
      if (firstShot == -1) {
        firstShot++;
      }
      game.totalHits++;
    });
    canvasEle?.addEventListener("mousemove", (e) => {
      if (!checkAllZeroVelocity()) return;
      const mx2 = e.clientX;
      const my2 = e.clientY;
      if (showHud) {
        const d = Math.sqrt((mx2 - hudCx) ** 2 + (my2 - hudCy) ** 2) / (2.5 * 67);
        hudIntensityDisplay.updateIntensity(d <= 1 ? d : 1);
        hudTracerArrow.updateVector(
          Vector.fromPolar(
            hudTracerArrow.length * hudIntensityDisplay.intensityRatio,
            new Vector(-mx2 + hudCx, -my2 + hudCy).angle
          )
        );
      }
    });
  }
  function checkAllZeroVelocity() {
    for (const ball of game.balls) {
      if (ball.physicsData.velocity.magnitude != 0) return false;
    }
    return true;
  }

  // src/Game/Instance/Game.ts
  var GameInstance = class {
    /** the array containing all the balls. Index 0 is going to be the cue ball, and the rest are index 1-15. */
    balls = [];
    allowedBallTypes = 1 /* Solid */ | 2 /* Stripe */;
    solidBallsPresent = [1, 2, 3, 4, 5, 6, 7];
    stripeBallsPresent = [9, 10, 11, 12, 13, 14, 15];
    score = 0;
    totalHits = 0;
    ball8Hit = false;
    constructor() {
    }
    deleteAllBalls() {
      for (const ball of this.balls) {
        ball.destroy();
      }
    }
    /** reset all the balls into their initial triangle position. */
    rackBalls() {
      this.deleteAllBalls();
      this.solidBallsPresent = [1, 2, 3, 4, 5, 6, 7];
      this.stripeBallsPresent = [9, 10, 11, 12, 13, 14, 15];
      this.ball8Hit = false;
      this.score = 0;
      const ballOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      for (let i = 0; i < 67; i++) {
        this.indexSwap(ballOrder, this.randIntIncl(0, ballOrder.length - 1), this.randIntIncl(0, ballOrder.length - 1));
      }
      this.indexSwap(ballOrder, ballOrder.indexOf(8), 4);
      let colNum = 5;
      let rowNum = 0;
      let xOffset = 0;
      let yOffset = 2 * ballSize * (1 - Math.sin(PI / 3));
      console.log(yOffset);
      for (const ballNumber of ballOrder) {
        console.log(rowNum, colNum);
        this.ballAt(
          mapWidth / 2 + rowNum * ballSize * 2 + xOffset,
          mapHeight / 4 - /* correction factor to center the apex ball --> */
          9 * ballSize + 2 * yOffset + /* get rid of extra space between rows */
          colNum * ballSize * 2 - yOffset * colNum,
          ballNumber
        );
        rowNum++;
        if (rowNum > 5 - colNum) {
          xOffset -= ballSize;
          colNum--;
          rowNum = 0;
        }
      }
      this.ballAt(mapWidth / 2, 6 / 8 * mapHeight, 0);
      this.spawnPocketEntities();
    }
    ballAt(x, y, number) {
      const b = new BallEntity(x, y, number);
      this.balls.push(b);
    }
    getBallByNumber(n) {
      for (const ball of this.balls) {
        if (ball.ballNumber == n) {
          return ball;
        }
      }
      return null;
    }
    spawnPocketEntities() {
      new PocketEntity(0 + 6, 0 + 6);
      new PocketEntity(mapWidth - 6, 0 + 6);
      new PocketEntity(0 + 6, mapHeight - 6);
      new PocketEntity(mapWidth - 6, mapHeight - 6);
      new PocketEntity(mapWidth, mapHeight / 2);
      new PocketEntity(0, mapHeight / 2);
    }
    doSelectionModal() {
      document.getElementById("mainCanvas").style.pointerEvents = "none";
      document.getElementById("selectBallTypeModal").classList.remove("hidden");
      document.getElementById("selectBallTypeModal").classList.add("shown");
      const solidBtnListener = document.getElementById("selectBallTypeModal-btn-solids").addEventListener("click", () => {
        this.allowedBallTypes = 1 /* Solid */;
        this.hideStuff();
      });
      const stripeBtnListener = document.getElementById("selectBallTypeModal-btn-stripes").addEventListener("click", () => {
        this.allowedBallTypes = 2 /* Stripe */;
        this.hideStuff();
      });
    }
    hideStuff() {
      document.getElementById("selectBallTypeModal").classList.remove("shown");
      document.getElementById("selectBallTypeModal").classList.add("hidden");
      document.getElementById("mainCanvas").style.pointerEvents = "all";
      const eles = document.getElementsByClassName("displayLater");
      for (const ele of eles) {
        ele.classList.remove("hidden");
      }
      document.getElementById("ballTypeDisp").innerHTML = `Hit in all <b>${this.allowedBallTypes & 1 /* Solid */ ? "Solid" : "Stripe"}</b> balls to win.`;
    }
    // this is where we process W/L ig
    processDeletedBall(n) {
      if (n < 8 && n > 0) {
        this.solidBallsPresent.splice(this.solidBallsPresent.indexOf(n), 1);
        if (this.allowedBallTypes & 1 /* Solid */) {
          this.score += 100;
        } else {
          this.score -= 45;
        }
      }
      if (n > 8) {
        this.stripeBallsPresent.splice(this.stripeBallsPresent.indexOf(n), 1);
        if (this.allowedBallTypes & 2 /* Stripe */) {
          this.score += 100;
        } else {
          this.score -= 45;
        }
      }
      if (n == 0) {
        this.score *= 0.75;
        const itv = setInterval(() => {
          if (checkAllZeroVelocity()) {
            this.ballAt(mapWidth / 2, 6 / 8 * mapHeight, 0);
            clearInterval(itv);
          }
        }, 1111);
      }
      if (n == 8) {
        this.ball8Hit = true;
      }
      this.score = Math.round(this.score);
      document.getElementById("scoreDisp").innerText = `Score: ${this.score}`;
      if (!this.ball8Hit) return;
      if (this.allowedBallTypes & 1 /* Solid */) {
        this.endGame(this.solidBallsPresent.length == 0 ? 1 /* Win */ : 3 /* InstantDeath */);
        return;
      }
      if (this.allowedBallTypes & 2 /* Stripe */) {
        this.endGame(this.stripeBallsPresent.length == 0 ? 1 /* Win */ : 3 /* InstantDeath */);
        return;
      }
    }
    endGame(outcome) {
      clearInterval(tickInterval);
      const endScreen = document.getElementById("endScreen");
      endScreen.classList.remove("hidden");
      endScreen.classList.add("shown");
      const resultEle = document.getElementById("endScreen-result");
      const resultDescrEle = document.getElementById("endScreen-result-description");
      const scoreEle = document.getElementById("endScreen-score");
      const totalHits = document.getElementById("endScreen-totalHits");
      switch (outcome) {
        case 1 /* Win */: {
          resultEle.innerText = "You win!";
          resultDescrEle.innerText = "You hit all your balls in!";
          scoreEle.innerText = `Score ${this.score}`;
          totalHits.innerText = `Total hits: ${this.totalHits}`;
        }
        case 2 /* Lose */: {
          resultEle.innerText = "You lost!";
          resultDescrEle.innerText = "You hit all the balls from the opposing type! (how did this even happen bruh)";
          scoreEle.innerText = `Score ${this.score}`;
          totalHits.innerText = `Total hits: ${this.totalHits}`;
        }
        case 3 /* InstantDeath */: {
          resultEle.innerText = "You lost: Instant death!";
          resultDescrEle.innerText = "You pocketed the 8-ball before clearing your set!";
          scoreEle.innerText = `Score ${this.score}`;
          totalHits.innerText = `Total hits: ${this.totalHits}`;
        }
      }
    }
    // util stuff 
    /** swap the values of two indexes in an array */
    indexSwap(list, a, b) {
      const temp = Number(list[a]);
      list[a] = Number(list[b]);
      list[b] = temp;
    }
    /** get a random integer from a to b, inclusive */
    randIntIncl(a, b) {
      return Math.floor(Math.random() * (b - a + 1)) + a;
    }
  };

  // src/Game/Physics/Collision.ts
  function checkForCollisions() {
    let array = Array.from(entityManager.entities.values());
    let collisionsThisTick = 0;
    for (let i = 0; i < entityManager.entities.size; i++) {
      for (let j = i + 1; j < entityManager.entities.size; j++) {
        const a = array[i];
        const b = array[j];
        if (a.id == b.id) continue;
        const dx = a.positionData.x - b.positionData.x;
        const dy = a.positionData.y - b.positionData.y;
        const dr = Math.sqrt(dx ** 2 + dy ** 2);
        const hbSum = a.hitboxData.size + b.hitboxData.size;
        if (dr < hbSum) {
          collisionsThisTick++;
          const overlap = hbSum - dr;
          b.positionData.x -= 0.5 * dx * overlap / dr;
          a.positionData.y += 0.5 * dy * overlap / dr;
          b.positionData.y -= 0.5 * dy * overlap / dr;
          a.positionData.x += 0.5 * dx * overlap / dr;
          const angle = Math.atan2(dy, dx);
          const xComp = dx / dr;
          const yComp = dy / dr;
          const relvx = b.physicsData.velocity.x - a.physicsData.velocity.x;
          const relvy = b.physicsData.velocity.y - a.physicsData.velocity.y;
          const relv = relvx * xComp + relvy * yComp;
          const restitution = 1;
          const impulse = -(1 + restitution) * relv / (1 / a.physicsData.mass + 1 / b.physicsData.mass);
          const ix = impulse * dx / dr;
          const iy = impulse * dy / dr;
          a.physicsData.velocity.subtract({ x: ix / a.physicsData.mass, y: iy / a.physicsData.mass });
          b.physicsData.velocity.add({ x: ix / b.physicsData.mass, y: iy / b.physicsData.mass });
          if (a instanceof BallEntity) a.checkPocketed(b);
          if (b instanceof BallEntity) b.checkPocketed(b);
        }
      }
    }
    document.getElementById("debug-collisions").innerText = `Collisions: ${collisionsThisTick} (this)`;
  }

  // src/Render/InitCanvas.ts
  var c = document.getElementById("mainCanvas");
  var ctx;
  function initCanvas() {
    ctx = c.getContext("2d");
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    window.addEventListener("resize", () => {
      c.height = window.innerHeight;
      c.width = window.innerWidth;
    });
  }

  // src/Render/RenderMain.ts
  var background = document.getElementsByClassName("background")[0];
  var bkgXcurrent = 0;
  var bkgYcurrent = 0;
  var lastTick = Date.now();
  var thisTick = Date.now();
  function renderFrameLoop(ctx2) {
    requestAnimationFrame(() => {
      renderFrameLoop(ctx2);
    });
    bkgXcurrent += (bkgX - bkgXcurrent) * 0.08;
    bkgYcurrent += (bkgY - bkgYcurrent) * 0.08;
    background.style.transform = `translate(${bkgXcurrent}px, ${bkgYcurrent}px) scale(1.1)`;
    thisTick = Date.now();
    const delta = thisTick - lastTick;
    if (delta > msprt) {
      const renStart = Date.now();
      ctx2.clearRect(0, 0, c.width, c.height);
      lastTick = thisTick;
      containers[0].drawAll(ctx2);
      containers[1].drawAll(ctx2);
      if (showHud) containers[2].drawAll(ctx2);
      document.getElementById("debug-fps").innerText = `fps: ${(1e3 / delta).toFixed(1)} | ${(1e3 / msprt).toFixed(1)} (delta|config)`;
      document.getElementById("debug-renderTime").innerText = `frame render: ${Date.now() - renStart} ms`;
    }
  }

  // src/Render/Sprites/WorldBorder.ts
  var SpriteWorldBorder = class extends Renderable {
    constructor(container, position, width, height) {
      super(container, position);
      console.log(this);
      const path1 = new Path2D();
      path1.rect(0, 0, width, height);
      this.addPath(new RenderablePath2D(path1, 2 /* Fill */ | 8 /* ThickStroke */, "#BA8C63" /* Wood */, "#06b69f" /* PoolTableGreen */));
    }
    draw(thisCtx) {
      super.draw(thisCtx);
    }
    resize() {
      this.positionData.x = mapLeft;
      this.positionData.y = mapTop;
      const newPath2D = new Path2D();
      newPath2D.rect(0, 0, mapWidth, mapHeight);
      this.paths[0] = new RenderablePath2D(newPath2D, 2 /* Fill */ | 1 /* Stroke */, this.paths[0].strokeColor, this.paths[0].fillColor);
    }
  };

  // src/index.ts
  var bkgX = 0;
  var bkgY = 0;
  var mapLeft = 0;
  var mapRight2 = 0;
  var mapBottom2 = 0;
  var mapTop = 0;
  initCanvas();
  initRenderableContainers();
  renderFrameLoop(ctx);
  initHudListeners();
  var mapBorderIndicator = new SpriteWorldBorder(containers[0], new PositionData(100, 100), 500, 500);
  resizeMap();
  var game = new GameInstance();
  game.rackBalls();
  var tickInterval = setInterval(() => {
    const start = Date.now();
    checkForCollisions();
    entityManager.applyAllEntityPhysics();
    document.getElementById("debug-mspt").innerText = `mspt: ${Date.now() - start} ms | ${Date.now() - start > mspt ? Date.now() - start : mspt} ms | ${mspt} mspt | ${1e3 / (Date.now() - start > mspt ? Date.now() - start : mspt).toFixed(2)} (tick|actual|config|tps)`;
    document.getElementById("debug-entityCounts").innerText = `Entities: ${entityManager.entities.size} | ${containers.length} (total|containers)`;
  }, mspt);
  window.addEventListener("resize", (e) => {
    const delta = resizeMap();
    relocateAllEntities(delta.dx, delta.dy);
  });
  function resizeMap() {
    const oldMapLeft = mapLeft;
    const oldMapTop = mapTop;
    mapLeft = window.innerWidth / 2 - mapWidth / 2;
    mapRight2 = window.innerWidth / 2 + mapWidth / 2;
    mapBottom2 = window.innerHeight / 2 + mapHeight / 2;
    mapTop = window.innerHeight / 2 - mapHeight / 2;
    mapBorderIndicator.resize();
    return {
      dx: mapLeft - oldMapLeft,
      dy: mapTop - oldMapTop
    };
  }
  function relocateAllEntities(dx, dy) {
    for (const entity of entityManager.entities.values()) {
      entity.positionData.x += dx;
      entity.positionData.y += dy;
    }
  }
  var mx = 0;
  var my = 0;
  document.addEventListener("mousemove", (event) => {
    mx = event.clientX;
    my = event.clientY;
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    bkgX = (x - 0.5) * 40;
    bkgY = (y - 0.5) * 40;
    const cc = canvasToMapCoords(mx, my);
    document.getElementById("debug-mousePos").innerText = `Mouse: window (${mx}, ${my}) | map (${cc.x}, ${cc.y})`;
  });
  document.addEventListener("click", (event) => {
    const mapCoords = canvasToMapCoords(event.clientX, event.clientY);
  });
  document.getElementById("debug-resetBalls").addEventListener("click", () => {
    for (const e of entityManager.entities.values()) {
      e.destroy();
    }
    game.rackBalls();
  });
  document.getElementById("debug-zeroAllVelocity").addEventListener("click", () => {
    for (const e of entityManager.entities.values()) {
      e.physicsData.velocity.scale(0);
    }
  });
})();
