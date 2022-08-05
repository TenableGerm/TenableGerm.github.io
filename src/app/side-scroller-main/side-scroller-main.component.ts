import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import * as THREE from 'three';
import { Color, Mesh } from 'three';

@Component({
  selector: 'app-side-scroller-main',
  templateUrl: './side-scroller-main.component.html',
  styleUrls: ['./side-scroller-main.component.scss'],
})
export class SideScrollerMainComponent implements OnInit {
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  scene!: THREE.Scene;
  camera!: THREE.Camera;
  playerShip!: THREE.Group;
  playerShots!: THREE.Group;
  planet!: THREE.Group;
  enemyShips!: THREE.Group;
  enemyShots!: THREE.Group;
  renderer!: THREE.WebGLRenderer;

  White: THREE.Color = new THREE.Color(0xffffff);
  Orange: THREE.Color = new THREE.Color(0xff5900);
  Green: THREE.Color = new THREE.Color(0x009b48);
  Red: THREE.Color = new THREE.Color(0xb90000);
  Blue: THREE.Color = new THREE.Color(0x0045ad);
  Yellow: THREE.Color = new THREE.Color(0xffd500);
  Black: THREE.Color = new THREE.Color(0x000000);

  keysPressed: Map<Number, boolean> = new Map<Number, boolean>();
  canShoot: boolean = true;
  mousePressed: boolean = false;
  gameStart: boolean = false;
  gameOver: boolean = false;
  gameWin: boolean = false;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {

    const canvas = document.querySelector("#canvas");
    let displayWidth;
    let displayHeight;
    if (window.matchMedia("(max-width: 600px)").matches)
    {
       displayWidth  = Math.round(window.screen.width / 1.5 );
       displayHeight = Math.round(window.screen.width * 1);
    } else {
       displayWidth  = Math.round(600 / 1.5 );
       displayHeight = Math.round(600 * 1);
    }
  
    // Check if the canvas is not the same size.
    let currentWidth = canvas!.getAttribute('width') as string;
    let currentHeight = canvas!.getAttribute('height') as string;
    const needResize = Number.parseInt(currentWidth) != displayWidth || 
                        Number.parseInt(currentHeight) != displayHeight;
  
    if (needResize) {
      // Make the canvas the same size
      canvas!.setAttribute('width', displayWidth.toString());
      canvas!.setAttribute('height', displayHeight.toString());
    }
    
    //-----------------------------------------//
    
    this.createScene();

    this.camera.position.z = 100;

    this.camera.lookAt(0, 0, 0);

    this.scene.background = this.White;

    this.scene.add(this.playerShip);

    this.scene.add(this.planet);

    this.scene.add(this.enemyShips);

    this.startRenderingLoop();

    let startTimer$ = timer(5000);

    startTimer$.subscribe(x => {
      this.gameStart = true;
      this.gameLogicChecks();
    });
  }

  @HostListener('window:mousemove', ['$event'])
  private onMouseMove(event: MouseEvent) {
    if(this.gameStart){
      const canvas = document.querySelector("#canvas");
      var mousePos = this.getMousePos(canvas, event);
      this.playerShip.position.x = mousePos.x ?? this.playerShip.position.x;
      this.playerShip.position.y = mousePos.y ?? this.playerShip.position.y;
    }
  }

  @HostListener('window:touchmove', ['$event'])
  private onTouchMove(event: TouchEvent) {
    if(this.gameStart){
      const canvas = document.querySelector("#canvas");
      var mousePos = this.getTouchPos(canvas, event);
      this.playerShip.position.x = mousePos.x ?? this.playerShip.position.x;
      this.playerShip.position.y = mousePos.y ?? this.playerShip.position.y;
      this.playerShot();
    }

  }

  @HostListener('window:keydown', ['$event'])
  private onDocumentKeyDown(event: KeyboardEvent) {
    if(this.gameStart){
      this.keysPressed.set(event.which, true);
      event.preventDefault();
      // A //Left Arrow
      if (this.keysPressed.get(65) == true || this.keysPressed.get(37) == true) {
        this.playerShip.position.setX(this.playerShip.position.x - 0.25);
      }
      // W //Up Arrow
      if (this.keysPressed.get(87) == true || this.keysPressed.get(38) == true) {
        this.playerShip.position.setY(this.playerShip.position.y + 0.25);
      }
      // S //Down Arrow
      if (this.keysPressed.get(83) == true || this.keysPressed.get(40) == true) {
        this.playerShip.position.setY(this.playerShip.position.y - 0.25);
      }
      // D //Right Arrow
      if (this.keysPressed.get(68) == true || this.keysPressed.get(39) == true) {
        this.playerShip.position.setX(this.playerShip.position.x + 0.25);
      }
      //Space 
      if (this.keysPressed.get(32) == true) {
        this.playerShot();
      }
      //BackSpace
      if (this.keysPressed.get(8) == true) {
      }
    }
  }

  @HostListener('window:keyup', ['$event'])
  private onDocumentKeyUp(event: KeyboardEvent) {
    this.keysPressed.set(event.which, false);
  }

  private getMousePos(canvas : Element | null, evt : MouseEvent) {
    var rect = canvas!.getBoundingClientRect();
    if( (rect.left < evt.clientX && evt.clientX < rect.right) 
     && (rect.top < evt.clientY && evt.clientY < rect.bottom)){
        let scaledX = (evt.clientX - rect.left - ((rect.right - rect.left) /2)) / 17;
        let scaledY = (-((evt.clientY - rect.top) - ((rect.bottom - rect.top) /2))) / 26;
        return {
          x: scaledX,
          y: scaledY
        };
    } else {
      return {
        x: null,
        y: null
      };
    }

  }

  private getTouchPos(canvas : Element | null, evt : TouchEvent) {
    var rect = canvas!.getBoundingClientRect();
    if(evt.touches != null || evt.touches != undefined){
      if( (rect.left < evt.touches.item(evt.touches.length-1)!.clientX && evt.touches.item(evt.touches.length-1)!.clientX< rect.right) 
     && (rect.top < evt.touches.item(evt.touches.length-1)!.clientY && evt.touches.item(evt.touches.length-1)!.clientY < rect.bottom)){
        let scaledX = (evt.touches.item(evt.touches.length-1)!.clientX - rect.left - ((rect.right - rect.left) /2)) / 10;
        let scaledY = (-((evt.touches.item(evt.touches.length-1)!.clientY - rect.top) - ((rect.bottom - rect.top) /2))) / 15;
      return {
        x: scaledX,
        y: scaledY
      };
    } else {
      return {
        x: null,
        y: null
      };
    }
    } else {
      return {
        x: null,
        y: null
      };
    }

  }

  private gameLogicChecks() {

    let logicTimer$ = timer(0,1);

    logicTimer$.subscribe(x => {
      this.playerShotMover();
    });
    logicTimer$.subscribe(x => {
      this.playerHitChecks();
    });
    logicTimer$.subscribe(x => {
     this.enemyShotMover();
    });
    logicTimer$.subscribe(x => {
      this.enemyHitChecks();
    });
    logicTimer$.subscribe(x => {
      this.sphereRotation();
    });

    let enemyShotTimer$ = timer(0, 2000);

    enemyShotTimer$.subscribe(x => {
      this.allEnemyShoot();
    });

  }

  private sphereRotation() {

    this.planet.rotateX(0.0015);

  }

  private playerShotMover() {
    this.playerShots.children.forEach((shot) => {
      if (shot.position.y >= 12) {
        this.playerShots.remove(shot);
      } else {
        shot.position.setY(shot.position.y + 0.07);
      }
    });
  }

  private enemyShotMover() {
    this.enemyShots.children.forEach((shot) => {
      if (shot.position.y <= -12) {
        this.enemyShots.remove(shot);
      } else {
        shot.position.setY(shot.position.y - 0.05);
      }
    });
  }

  private enemyHitChecks() {
    if(this.enemyShips.children.length == 0){
      this.gameWin = true;
    }
    this.playerShots.children.forEach((shot) => {
      this.enemyShips.children.forEach((enemy) => {
        if (
          shot.position.x >= enemy.position.x - 0.5 &&
          shot.position.x <= enemy.position.x + 0.5 &&
          shot.position.y >= enemy.position.y - 1.5 &&
          shot.position.y <= enemy.position.y + 0.25
        ) {
          this.enemyShips.remove(enemy);
          this.playerShots.remove(shot);
        }
      });
    });
  }

  private playerHitChecks() {
    this.enemyShots.children.forEach((shot) => {
        if (
          shot.position.x >= this.playerShip.position.x - 0.5 &&
          shot.position.x <= this.playerShip.position.x + 0.5 &&
          shot.position.y >= this.playerShip.position.y - 1.5 &&
          shot.position.y <= this.playerShip.position.y + 0.25
        ) {
          this.scene.remove(this.playerShip);
          this.enemyShots.remove(shot);
          this.gameOver = true;
          this.router.navigateByUrl('/gameover');
        }
    });
  }

  private startRenderingLoop() {
    let component: SideScrollerMainComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);
    })();
  }

  private createScene() {
    this.initGroups();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 100);

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    //this.renderer.setPixelRatio(window.devicePixelRatio);

    this.createLevel(1);
  }

  private initGroups() {
    this.playerShip = new THREE.Group();
    this.planet = new THREE.Group();
    this.enemyShips = new THREE.Group();
    this.playerShots = new THREE.Group();
    this.enemyShots = new THREE.Group();
  }

  private createLevel(level : number) {
    this.createShip();
    this.createPlanet();
    for(let i = -5;  i <= 5; i+=2){
      this.createEnemy(i, 10);
    }
    for(let i = -2;  i <= 2; i+=2){
      this.createEnemy(i, 2-i);
    }
    for(let i = -2;  i <= 2; i+=2){
      this.createEnemy(-i, 2-i);
    }
  }

  private createShip() {
    const triangleShip = new THREE.Shape()
      .moveTo(0, 0.5)
      .lineTo(-0.5, 0)
      .lineTo(0.5, 0)
      .lineTo(0, 0.5); // close path

    const geometry = new THREE.ShapeGeometry(triangleShip);

    var material = new THREE.MeshPhongMaterial({
      color: this.Blue,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);

    this.playerShip.add(mesh);

    const light = new THREE.PointLight(this.White, 3, 10);
    light.position.set(0, 0, 5);

    this.playerShip.add(light);

    this.playerShip.position.set(0, -5, 85);
    this.playerShip.rotation.set(0, 0, 0);
    this.playerShip.scale.set(1, 1, 1);
  }

  private createPlanet() {
    const geometry = new THREE.SphereGeometry(80);

    var material = new THREE.MeshPhongMaterial({
      color: this.Green,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);

    const light = new THREE.PointLight(this.Yellow, 7, 300);
    light.position.set(100, 100, 100);
    this.planet.add(light);

    this.planet.add(mesh);
  }

  private createEnemy(x: number, y: number) {
    let enemy = new THREE.Group();
    const triangleShip = new THREE.Shape()
      .moveTo(0, -0.5)
      .lineTo(0.5, 0)
      .lineTo(-0.5, 0)
      .lineTo(0, -0.5); // close path

    const geometry = new THREE.ShapeGeometry(triangleShip);

    var material = new THREE.MeshPhongMaterial({
      color: this.Red,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(0, 0, 0);
    mesh.rotation.set(0, 0, 0);
    mesh.scale.set(1, 1, 1);

    enemy.add(mesh);

    const light = new THREE.PointLight(this.White, 3, 10);
    light.position.set(0, 0, 5);

    //enemy.add(light);

    enemy.position.set(x, y, 85);
    enemy.rotation.set(0, 0, 0);
    enemy.scale.set(1, 1, 1);

    this.enemyShips.add(enemy);
  }

  private shoot(group : THREE.Object3D): THREE.Group {
    let shot = new THREE.Group();
      const shotShape = new THREE.Shape()
        .moveTo(0, 0)
        .lineTo(0, 1)
        .lineTo(0.15, 1)
        .lineTo(0.15, 0); // close path

      const geometry = new THREE.ShapeGeometry(shotShape);

      var material = new THREE.MeshPhongMaterial({
        color: this.White,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(geometry, material);

      var v = new THREE.Vector3(0, 0, 0);
      group.getWorldPosition(v);

      mesh.position.set(0, 0, 0);
      mesh.rotation.set(0, 0, 0);
      mesh.scale.set(1, 1, 1);

      shot.add(mesh);

      const light = new THREE.PointLight(this.White, 3, 2);
      light.position.set(0, 0, 1);

      shot.add(light);

      shot.position.set(v.x - 0.05, v.y, v.z);
      shot.rotation.set(0, 0, 0);
      shot.scale.set(1, 1, 1);

      return shot;
  }

  private playerShot() {
    if(this.canShoot){
      let shot = this.shoot(this.playerShip);
      this.playerShots.add(shot);
      this.scene.add(this.playerShots);
      this.canShoot = false
      setTimeout(() => { this.canShoot = true }, 300);
    }
  }

  private allEnemyShoot() {
    this.enemyShips.children.forEach(enemy => {
      let shot = this.shoot(enemy);
      shot.position.y -= 1;
      this.enemyShots.add(shot);
      this.scene.add(this.enemyShots);
    });
  }
}
