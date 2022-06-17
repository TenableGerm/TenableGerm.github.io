import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { Color, Mesh } from 'three';


@Component({
  selector: 'app-rubiks-cube',
  templateUrl: './rubiks-cube.component.html',
  styleUrls: ['./rubiks-cube.component.scss']
})
export class RubiksCubeComponent {

  @ViewChild('canvas')
  private canvasRef: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  constructor() { }

  scene: THREE.Scene;
  camera: THREE.Camera;
  Cube: THREE.Group;
  renderer: THREE.WebGLRenderer;

  WhiteSide: THREE.Group  = new THREE.Group();
  OrangeSide: THREE.Group  = new THREE.Group();
  GreenSide: THREE.Group  = new THREE.Group();
  RedSide: THREE.Group  = new THREE.Group();
  BlueSide: THREE.Group  = new THREE.Group();
  YellowSide: THREE.Group  = new THREE.Group();

  White: THREE.Color = new THREE.Color(0xFFFFFF);
  Orange: THREE.Color = new THREE.Color(0xFF5900);
  Green: THREE.Color = new THREE.Color(0x009B48);
  Red: THREE.Color = new THREE.Color(0xB90000);
  Blue: THREE.Color = new THREE.Color(0x0045AD);
  Yellow: THREE.Color = new THREE.Color(0xFFD500);
  Black: THREE.Color = new THREE.Color(0x000000);

  UWhite: THREE.Mesh<THREE.Geometry>[] = [];
  LOrange: THREE.Mesh<THREE.Geometry>[] = [];
  FGreen: THREE.Mesh<THREE.Geometry>[] = [];
  RRed: THREE.Mesh<THREE.Geometry>[] = [];
  BBlue: THREE.Mesh<THREE.Geometry>[] = [];
  DYellow: THREE.Mesh<THREE.Geometry>[] = [];

  UWhiteGeom: THREE.Geometry[] = [];
  LOrangeGeom: THREE.Geometry[] = [];
  FGreenGeom: THREE.Geometry[] = [];
  RRedGeom: THREE.Geometry[] = [];
  BBlueGeom: THREE.Geometry[] = [];
  DYellowGeom: THREE.Geometry[] = [];

  savedYellow1: THREE.Color[] = [];
  savedBlue1: THREE.Color[] = [];
  savedRed1: THREE.Color[] = [];
  savedGreen1: THREE.Color[] = [];
  savedOrange1: THREE.Color[] = [];
  savedWhite1: THREE.Color[] = [];

  savedYellow2: THREE.Color[] = [];
  savedBlue2: THREE.Color[] = [];
  savedRed2: THREE.Color[] = [];
  savedGreen2: THREE.Color[] = [];
  savedOrange2: THREE.Color[] = [];
  savedWhite2: THREE.Color[] = [];

  ngAfterViewInit(): void {
    //document.addEventListener("keydown", this.onDocumentKeyDown, false);

    this.createScene();

    this.camera.position.z = 10;	
    this.Cube.add(this.WhiteSide);
    this.Cube.add(this.OrangeSide);
    this.Cube.add(this.GreenSide);
    this.Cube.add(this.RedSide);
    this.Cube.add(this.BlueSide);
    this.Cube.add(this.YellowSide);


    this.scene.background = this.White;

    this.scene.add(this.Cube);

    this.Cube.rotation.x = this.Cube.rotation.x + 1;
    this.Cube.rotation.y = this.Cube.rotation.y + 1;

    this.startRenderingLoop();

  }

  private startRenderingLoop(){
    let component: RubiksCubeComponent = this;
    (function render(){
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);

    }())
  }

  private createScene(){
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 1, 1, 10000);

    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setSize(this.canvas.width, 2 * this.canvas.height);
    //this.renderer.setPixelRatio(window.devicePixelRatio);

    var LinegeometryV = new THREE.Geometry();
    var LinegeometryH = new THREE.Geometry();

    LinegeometryV.vertices.push(
      new THREE.Vector3(-0.05, -1,  1.01),  // 0
      new THREE.Vector3( 0.05, -1,  1.01),  // 1
      new THREE.Vector3(-0.05,  2,  1.01),  // 2
      new THREE.Vector3( 0.05,  2,  1.01),  // 3
    );

    LinegeometryV.faces.push(
      // front
      new THREE.Face3(0, 3, 2),
      new THREE.Face3(0, 1, 3),
    );
    LinegeometryH.vertices.push(
      new THREE.Vector3(-1, 0.95,  1.01),  // 0
      new THREE.Vector3( 2, 0.95,  1.01),  // 1
      new THREE.Vector3(-1, 1.05,  1.01),  // 2
      new THREE.Vector3( 2, 1.05,  1.01),  // 3
    );

    LinegeometryH.faces.push(
      // front
      new THREE.Face3(0, 3, 2),
      new THREE.Face3(0, 1, 3),
    );


    var geometry = new THREE.Geometry();

    geometry.vertices.push(
      new THREE.Vector3(0, 0,  1),  // 0
      new THREE.Vector3( 1, 0,  1),  // 1
      new THREE.Vector3(0,  1,  1),  // 2
      new THREE.Vector3( 1,  1,  1),  // 3
    );

    geometry.faces.push(
      // front
      new THREE.Face3(0, 3, 2),
      new THREE.Face3(0, 1, 3),
    );

    /*Right of spawn face*/
    geometry.faces[0].color = new THREE.Color(0xd9d9d9);
    geometry.faces[1].color = new THREE.Color(0xd9d9d9);


    var material = new THREE.MeshBasicMaterial( {color: 0xffffff, vertexColors: true} );
    // var qbSide = new THREE.Mesh(geometry, material);

    this.Cube = new THREE.Group();

    LinegeometryV.faces[0].color = new THREE.Color(0x000000);
    LinegeometryV.faces[1].color = new THREE.Color(0x000000);
    LinegeometryH.faces[0].color = new THREE.Color(0x000000);
    LinegeometryH.faces[1].color = new THREE.Color(0x000000);

    for(let i = 0; i < 9; i++) {
      this.savedYellow1.push(new THREE.Color());
      this.savedBlue1.push(new THREE.Color());
      this.savedRed1.push(new THREE.Color());
      this.savedGreen1.push(new THREE.Color());
      this.savedOrange1.push(new THREE.Color());
      this.savedWhite1.push(new THREE.Color());

      this.savedYellow2.push(new THREE.Color());
      this.savedBlue2.push(new THREE.Color());
      this.savedRed2.push(new THREE.Color());
      this.savedGreen2.push(new THREE.Color());
      this.savedOrange2.push(new THREE.Color());
      this.savedWhite2.push(new THREE.Color());
    }

    const AxisZ = new THREE.Vector3(0, 0, 1);
    const AxisY = new THREE.Vector3(0, 1, 0);
    const AxisX = new THREE.Vector3(1, 0, 0);

    var Lines = new THREE.Group();


    var FLineMeshV = new THREE.Mesh(LinegeometryV, material);
    var FLineMeshV2 = new THREE.Mesh(LinegeometryV, material);
    var FLineMeshV3 = new THREE.Mesh(LinegeometryV, material);
    var FLineMeshV4 = new THREE.Mesh(LinegeometryV, material);
    FLineMeshV2.position.x += 1;
    FLineMeshV3.position.x += 2;
    FLineMeshV4.position.x -= 1;
    var FLineMeshH = new THREE.Mesh(LinegeometryH, material);
    var FLineMeshH2 = new THREE.Mesh(LinegeometryH, material);
    var FLineMeshH3= new THREE.Mesh(LinegeometryH, material);
    var FLineMeshH4 = new THREE.Mesh(LinegeometryH, material);
    FLineMeshH2.position.y -= 1;
    FLineMeshH3.position.y += 1;
    FLineMeshH4.position.y -= 2;


    Lines.add(FLineMeshV);
    Lines.add(FLineMeshV2);
    Lines.add(FLineMeshV3);
    Lines.add(FLineMeshV4);
    Lines.add(FLineMeshH);
    Lines.add(FLineMeshH2);
    Lines.add(FLineMeshH3);
    Lines.add(FLineMeshH4);


    var LLineMeshV = new THREE.Mesh(LinegeometryV, material);
    var LLineMeshV2 = new THREE.Mesh(LinegeometryV, material);
    var LLineMeshV3 = new THREE.Mesh(LinegeometryV, material);
    var LLineMeshV4 = new THREE.Mesh(LinegeometryV, material);

    var LLineMeshH = new THREE.Mesh(LinegeometryH, material);
    var LLineMeshH2 = new THREE.Mesh(LinegeometryH, material);
    var LLineMeshH3 = new THREE.Mesh(LinegeometryH, material);
    var LLineMeshH4 = new THREE.Mesh(LinegeometryH, material);
    LLineMeshH2.position.y -= 1;
    LLineMeshH3.position.y -= 2;
    LLineMeshH4.position.y += 1;

    LLineMeshV.rotation.y += -Math.PI/2;
    LLineMeshV2.rotation.y += -Math.PI/2;
    LLineMeshV3.rotation.y += -Math.PI/2;
    LLineMeshV4.rotation.y += -Math.PI/2;
    LLineMeshH.rotation.y += -Math.PI/2;
    LLineMeshH2.rotation.y += -Math.PI/2
    LLineMeshH3.rotation.y += -Math.PI/2;
    LLineMeshH4.rotation.y += -Math.PI/2;

    LLineMeshV.position.z += -1;
    LLineMeshV3.position.z += 1;
    LLineMeshV4.position.z += -2;

    LLineMeshH.position.z += -1;
    LLineMeshH2.position.z += -1;
    LLineMeshH3.position.z += -1;
    LLineMeshH4.position.z += -1;

    Lines.add(LLineMeshV);
    Lines.add(LLineMeshV2);
    Lines.add(LLineMeshV3);
    Lines.add(LLineMeshV4);
    Lines.add(LLineMeshH);
    Lines.add(LLineMeshH2);
    Lines.add(LLineMeshH3);
    Lines.add(LLineMeshH4);

    var RLineMeshV = new THREE.Mesh(LinegeometryV, material);
    var RLineMeshV2 = new THREE.Mesh(LinegeometryV, material);
    var RLineMeshV3 = new THREE.Mesh(LinegeometryV, material);
    var RLineMeshV4 = new THREE.Mesh(LinegeometryV, material);
    RLineMeshV2.position.x += 1;
    RLineMeshV3.position.x += 1;
    RLineMeshV4.position.x += 1;
    var RLineMeshH = new THREE.Mesh(LinegeometryH, material);
    var RLineMeshH2 = new THREE.Mesh(LinegeometryH, material);
    var RLineMeshH3 = new THREE.Mesh(LinegeometryH, material);
    var RLineMeshH4 = new THREE.Mesh(LinegeometryH, material);
    RLineMeshH2.position.y -= 1;
    RLineMeshH3.position.y += 1;
    RLineMeshH4.position.y -= 2;

    RLineMeshV.rotation.y += Math.PI/2;
    RLineMeshV2.rotation.y += Math.PI/2;
    RLineMeshV3.rotation.y += Math.PI/2;
    RLineMeshV4.rotation.y += Math.PI/2;
    RLineMeshH.rotation.y += Math.PI/2;
    RLineMeshH2.rotation.y += Math.PI/2;
    RLineMeshH3.rotation.y += Math.PI/2;
    RLineMeshH4.rotation.y += Math.PI/2;

    RLineMeshV.position.x += 1;
    RLineMeshV2.position.z += -1;
    RLineMeshV3.position.z += 1;
    RLineMeshV4.position.z += -2;
    RLineMeshH.position.x += 1;
    RLineMeshH2.position.x += 1;
    RLineMeshH3.position.x += 1;
    RLineMeshH4.position.x += 1;

    Lines.add(RLineMeshV);
    Lines.add(RLineMeshV2);
    Lines.add(RLineMeshV3);
    Lines.add(RLineMeshV4);
    Lines.add(RLineMeshH);
    Lines.add(RLineMeshH2);
    Lines.add(RLineMeshH3);
    Lines.add(RLineMeshH4);

    var BLineMeshV = new THREE.Mesh(LinegeometryV, material);
    var BLineMeshV2 = new THREE.Mesh(LinegeometryV, material);
    var BLineMeshV3 = new THREE.Mesh(LinegeometryV, material);
    var BLineMeshV4 = new THREE.Mesh(LinegeometryV, material);
    BLineMeshV2.position.x += 1;
    BLineMeshV3.position.x += 2;
    BLineMeshV4.position.x -= 1;
    var BLineMeshH = new THREE.Mesh(LinegeometryH, material);
    var BLineMeshH2 = new THREE.Mesh(LinegeometryH, material);
    var BLineMeshH3 = new THREE.Mesh(LinegeometryH, material);
    var BLineMeshH4 = new THREE.Mesh(LinegeometryH, material);
    BLineMeshH2.position.y -= 1;
    BLineMeshH3.position.y -= 2;
    BLineMeshH4.position.y += 1;

    BLineMeshV.rotation.y += Math.PI;
    BLineMeshV2.rotation.y += Math.PI;
    BLineMeshV3.rotation.y += Math.PI;
    BLineMeshV4.rotation.y += Math.PI;
    BLineMeshH.rotation.y += Math.PI;
    BLineMeshH2.rotation.y += Math.PI;
    BLineMeshH3.rotation.y += Math.PI;
    BLineMeshH4.rotation.y += Math.PI;

    BLineMeshV.position.z += -1;
    BLineMeshV2.position.z += -1;
    BLineMeshV3.position.z += -1;
    BLineMeshV4.position.z += -1;
    BLineMeshH.position.z += -1;
    BLineMeshH2.position.z += -1;
    BLineMeshH3.position.z += -1;
    BLineMeshH4.position.z += -1;
    BLineMeshH.position.x += 1;
    BLineMeshH2.position.x += 1;
    BLineMeshH3.position.x += 1;
    BLineMeshH4.position.x += 1;

    Lines.add(BLineMeshV);
    Lines.add(BLineMeshV2);
    Lines.add(BLineMeshV3);
    Lines.add(BLineMeshV4);
    Lines.add(BLineMeshH);
    Lines.add(BLineMeshH2);
    Lines.add(BLineMeshH3);
    Lines.add(BLineMeshH4);

    var DLineMeshV = new THREE.Mesh(LinegeometryV, material);
    var DLineMeshV2 = new THREE.Mesh(LinegeometryV, material);
    var DLineMeshV3 = new THREE.Mesh(LinegeometryV, material);
    var DLineMeshV4 = new THREE.Mesh(LinegeometryV, material);
    DLineMeshV2.position.x += 1;
    DLineMeshV3.position.x += 2;
    DLineMeshV4.position.x += -1;
    var DLineMeshH = new THREE.Mesh(LinegeometryH, material);
    var DLineMeshH2 = new THREE.Mesh(LinegeometryH, material);
    var DLineMeshH3 = new THREE.Mesh(LinegeometryH, material);
    var DLineMeshH4 = new THREE.Mesh(LinegeometryH, material);
    DLineMeshH2.position.y -= 1;
    DLineMeshH3.position.y -= 1;
    DLineMeshH4.position.y -= 1;

    DLineMeshV.rotation.x += Math.PI/2;
    DLineMeshV2.rotation.x += Math.PI/2;
    DLineMeshV3.rotation.x += Math.PI/2;
    DLineMeshV4.rotation.x += Math.PI/2;
    DLineMeshH.rotation.x += Math.PI/2;
    DLineMeshH2.rotation.x += Math.PI/2;
    DLineMeshH3.rotation.x += Math.PI/2;
    DLineMeshH4.rotation.x += Math.PI/2;

    DLineMeshV.position.z += -1;
    DLineMeshV2.position.z += -1;
    DLineMeshV3.position.z += -1;
    DLineMeshV4.position.z += -1;
    DLineMeshH.position.z += -2;
    DLineMeshH2.position.z += -1;
    DLineMeshH2.position.y += 1;
    DLineMeshH3.position.y += 1;
    DLineMeshH4.position.z += -3;
    DLineMeshH4.position.y += 1;

    Lines.add(DLineMeshV);
    Lines.add(DLineMeshV2);
    Lines.add(DLineMeshV3);
    Lines.add(DLineMeshV4);
    Lines.add(DLineMeshH);
    Lines.add(DLineMeshH2);
    Lines.add(DLineMeshH3);
    Lines.add(DLineMeshH4);

    var ULineMeshV = new THREE.Mesh(LinegeometryV, material);
    var ULineMeshV2 = new THREE.Mesh(LinegeometryV, material);
    var ULineMeshV3 = new THREE.Mesh(LinegeometryV, material);
    var ULineMeshV4 = new THREE.Mesh(LinegeometryV, material);
    ULineMeshV2.position.x += 1;
    ULineMeshV3.position.x += -1;
    ULineMeshV4.position.x += 2;
    var ULineMeshH = new THREE.Mesh(LinegeometryH, material);
    var ULineMeshH2 = new THREE.Mesh(LinegeometryH, material);
    var ULineMeshH3 = new THREE.Mesh(LinegeometryH, material);
    var ULineMeshH4 = new THREE.Mesh(LinegeometryH, material);

    ULineMeshV.rotation.x += -Math.PI/2;
    ULineMeshV2.rotation.x += -Math.PI/2;
    ULineMeshV3.rotation.x += -Math.PI/2;
    ULineMeshV4.rotation.x += -Math.PI/2;
    ULineMeshH.rotation.x += -Math.PI/2;
    ULineMeshH2.rotation.x += -Math.PI/2;
    ULineMeshH3.rotation.x += -Math.PI/2;
    ULineMeshH4.rotation.x += -Math.PI/2;

    ULineMeshV.position.y += 1;
    ULineMeshV2.position.y += 1;
    ULineMeshV3.position.y += 1;
    ULineMeshV4.position.y += 1;
    ULineMeshH.position.y += 1;
    ULineMeshH.position.z += 1;
    ULineMeshH3.position.z += 2;
    ULineMeshH4.position.z += -1;
    ULineMeshH2.position.y += 1;
    ULineMeshH3.position.y += 1;
    ULineMeshH4.position.y += 1;

    Lines.add(ULineMeshV);
    Lines.add(ULineMeshV2);
    Lines.add(ULineMeshV3);
    Lines.add(ULineMeshV4);
    Lines.add(ULineMeshH);
    Lines.add(ULineMeshH2);
    Lines.add(ULineMeshH3);
    Lines.add(ULineMeshH4);

    this.Cube.add(Lines);



    var index =0;
    for(var i = -1; i <= 1; i++ ){
      for(var j = -1; j <= 1; j++ ){
        this.UWhiteGeom[index] = geometry.clone();
        this.UWhite[index] = new THREE.Mesh(this.UWhiteGeom[index], material);
        this.UWhite[index].geometry.faces[0].color = this.White;
        this.UWhite[index].geometry.faces[1].color = this.White;
        this.UWhite[index].translateOnAxis(AxisX, i);
        this.UWhite[index].translateOnAxis(AxisY, 1);
        this.UWhite[index].translateOnAxis(AxisZ, j);
        this.UWhite[index].rotateX(-Math.PI/2);
        this.WhiteSide.add(this.UWhite[index]);
        index++;
      }
    }

    index =0;
    for(i = -1; i <= 1; i++ ){
      for(j = -1; j <= 1; j++ ){
        this.LOrangeGeom[index] = geometry.clone();
        this.LOrange[index] = new THREE.Mesh(this.LOrangeGeom[index], material);
        this.LOrange[index].geometry.faces[0].color = this.Orange;
        this.LOrange[index].geometry.faces[1].color = this.Orange;
        this.LOrange[index].translateOnAxis(AxisX, 0);
        this.LOrange[index].translateOnAxis(AxisY, i);
        this.LOrange[index].translateOnAxis(AxisZ, j-1);
        this.LOrange[index].rotateY(-Math.PI/2);
        this.OrangeSide.add(this.LOrange[index]);
        index++;
      }
    }

    index =0;
    for(i = -1; i <= 1; i++ ){
      for(j = -1; j <= 1; j++ ){
        this.FGreenGeom[index] = geometry.clone();
        this.FGreen[index] = new THREE.Mesh(this.FGreenGeom[index], material);
        this.FGreen[index].geometry.faces[0].color = this.Green;
        this.FGreen[index].geometry.faces[1].color = this.Green;
        this.FGreen[index].translateOnAxis(AxisX, j);
        this.FGreen[index].translateOnAxis(AxisY, i+1);
        this.FGreen[index].translateOnAxis(AxisZ, 0);
        this.FGreen[index].rotateZ(-Math.PI/2);
        this.GreenSide.add(this.FGreen[index]);
        index++;
      }
    }

    index =0;
    for(i = -1; i <= 1; i++ ){
      for(j = -1; j <= 1; j++ ){
        this.RRedGeom[index] = geometry.clone();
        this.RRed[index] = new THREE.Mesh(this.RRedGeom[index], material);
        this.RRed[index].geometry.faces[0].color = this.Red;
        this.RRed[index].geometry.faces[1].color = this.Red;
        this.RRed[index].translateOnAxis(AxisX, 1);
        this.RRed[index].translateOnAxis(AxisY, j);
        this.RRed[index].translateOnAxis(AxisZ, i);
        this.RRed[index].rotateY(Math.PI/2);
        this.RedSide.add(this.RRed[index]);
        index++;
      }
    }

    index =0;
    for(i = -1; i <= 1; i++ ){
      for(j = -1; j <= 1; j++ ){
        this.BBlueGeom[index] = geometry.clone();
        this.BBlue[index] = new THREE.Mesh(this.BBlueGeom[index], material);
        this.BBlue[index].geometry.faces[0].color = this.Blue;
        this.BBlue[index].geometry.faces[1].color = this.Blue;
        this.BBlue[index].translateOnAxis(AxisX, j);
        this.BBlue[index].translateOnAxis(AxisY, i+1);
        this.BBlue[index].translateOnAxis(AxisZ, -1);
        this.BBlue[index].rotateX(-Math.PI);
        this.BlueSide.add(this.BBlue[index]);
        index++;
      }
    }

    index =0;
    for(i = -1; i <= 1; i++ ){
      for(j = -1; j <= 1; j++ ){
        this.DYellowGeom[index] = geometry.clone();
        this.DYellow[index] = new THREE.Mesh(this.DYellowGeom[index], material);
        this.DYellow[index].geometry.faces[0].color = this.Yellow;
        this.DYellow[index].geometry.faces[1].color = this.Yellow;
        this.DYellow[index].translateOnAxis(AxisX, i);
        this.DYellow[index].translateOnAxis(AxisY, 0);
        this.DYellow[index].translateOnAxis(AxisZ, j-1);
        this.DYellow[index].rotateX(Math.PI/2);
        this.YellowSide.add(this.DYellow[index]);
        index++;
      }
    }
  }

    private turnX(col: number, dir: number){
      if(col === 1){
          if(dir === 1){
          let temp = this.RRed[0].geometry.faces[0].color;
          this.RRed[0].geometry.faces[0].color = this.RRed[2].geometry.faces[0].color;
          this.RRed[0].geometry.faces[1].color = this.RRed[2].geometry.faces[1].color;
          this.RRed[2].geometry.faces[0].color = this.RRed[8].geometry.faces[0].color;
          this.RRed[2].geometry.faces[1].color = this.RRed[8].geometry.faces[1].color;
          this.RRed[8].geometry.faces[0].color = this.RRed[6].geometry.faces[0].color;
          this.RRed[8].geometry.faces[1].color = this.RRed[6].geometry.faces[1].color;
          this.RRed[6].geometry.faces[0].color = temp;
          this.RRed[6].geometry.faces[1].color = temp;

          let temp2 = this.RRed[1].geometry.faces[0].color;
          this.RRed[1].geometry.faces[0].color = this.RRed[5].geometry.faces[0].color;
          this.RRed[1].geometry.faces[1].color = this.RRed[5].geometry.faces[1].color;
          this.RRed[5].geometry.faces[0].color = this.RRed[7].geometry.faces[0].color;
          this.RRed[5].geometry.faces[1].color = this.RRed[7].geometry.faces[1].color;
          this.RRed[7].geometry.faces[0].color = this.RRed[3].geometry.faces[0].color;
          this.RRed[7].geometry.faces[1].color = this.RRed[3].geometry.faces[1].color;
          this.RRed[3].geometry.faces[0].color = temp2;
          this.RRed[3].geometry.faces[1].color = temp2;

          let temp3 = this.BBlue[2].geometry.faces[0].color;
          let temp4 = this.BBlue[5].geometry.faces[0].color;
          let temp5 = this.BBlue[8].geometry.faces[0].color;

          this.BBlue[2].geometry.faces[0].color = this.UWhite[6].geometry.faces[0].color;
          this.BBlue[2].geometry.faces[1].color = this.UWhite[6].geometry.faces[1].color;
          this.BBlue[5].geometry.faces[0].color = this.UWhite[7].geometry.faces[0].color;
          this.BBlue[5].geometry.faces[1].color = this.UWhite[7].geometry.faces[1].color;
          this.BBlue[8].geometry.faces[0].color = this.UWhite[8].geometry.faces[0].color;
          this.BBlue[8].geometry.faces[1].color = this.UWhite[8].geometry.faces[1].color;

          this.UWhite[6].geometry.faces[0].color = this.FGreen[8].geometry.faces[0].color;
          this.UWhite[6].geometry.faces[1].color = this.FGreen[8].geometry.faces[1].color;
          this.UWhite[7].geometry.faces[0].color = this.FGreen[5].geometry.faces[0].color;
          this.UWhite[7].geometry.faces[1].color = this.FGreen[5].geometry.faces[1].color;	
          this.UWhite[8].geometry.faces[0].color = this.FGreen[2].geometry.faces[0].color;
          this.UWhite[8].geometry.faces[1].color = this.FGreen[2].geometry.faces[1].color;

          this.FGreen[8].geometry.faces[0].color = this.DYellow[8].geometry.faces[0].color;
          this.FGreen[8].geometry.faces[1].color = this.DYellow[8].geometry.faces[1].color;
          this.FGreen[5].geometry.faces[0].color = this.DYellow[7].geometry.faces[0].color;
          this.FGreen[5].geometry.faces[1].color = this.DYellow[7].geometry.faces[1].color;
          this.FGreen[2].geometry.faces[0].color = this.DYellow[6].geometry.faces[0].color;
          this.FGreen[2].geometry.faces[1].color = this.DYellow[6].geometry.faces[1].color;

          this.DYellow[8].geometry.faces[0].color = temp3;
          this.DYellow[8].geometry.faces[1].color = temp3;
          this.DYellow[7].geometry.faces[0].color = temp4;
          this.DYellow[7].geometry.faces[1].color = temp4;
          this.DYellow[6].geometry.faces[0].color = temp5;
          this.DYellow[6].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){
          let temp = this.RRed[0].geometry.faces[0].color;
          this.RRed[0].geometry.faces[0].color = this.RRed[6].geometry.faces[0].color;
          this.RRed[0].geometry.faces[1].color = this.RRed[6].geometry.faces[1].color;
          this.RRed[6].geometry.faces[0].color = this.RRed[8].geometry.faces[0].color;
          this.RRed[6].geometry.faces[1].color = this.RRed[8].geometry.faces[1].color;
          this.RRed[8].geometry.faces[0].color = this.RRed[2].geometry.faces[0].color;
          this.RRed[8].geometry.faces[1].color = this.RRed[2].geometry.faces[1].color;
          this.RRed[2].geometry.faces[0].color = temp;
          this.RRed[2].geometry.faces[1].color = temp;

          let temp2 = this.RRed[1].geometry.faces[0].color;
          this.RRed[1].geometry.faces[0].color = this.RRed[3].geometry.faces[0].color;
          this.RRed[1].geometry.faces[1].color = this.RRed[3].geometry.faces[1].color;
          this.RRed[3].geometry.faces[0].color = this.RRed[7].geometry.faces[0].color;
          this.RRed[3].geometry.faces[1].color = this.RRed[7].geometry.faces[1].color;
          this.RRed[7].geometry.faces[0].color = this.RRed[5].geometry.faces[0].color;
          this.RRed[7].geometry.faces[1].color = this.RRed[5].geometry.faces[1].color;
          this.RRed[5].geometry.faces[0].color = temp2;
          this.RRed[5].geometry.faces[1].color = temp2;

          let temp3 = this.BBlue[2].geometry.faces[0].color;
          let temp4 = this.BBlue[5].geometry.faces[0].color;
          let temp5 = this.BBlue[8].geometry.faces[0].color;

          this.BBlue[2].geometry.faces[0].color = this.DYellow[8].geometry.faces[0].color;
          this.BBlue[2].geometry.faces[1].color = this.DYellow[8].geometry.faces[1].color;
          this.BBlue[5].geometry.faces[0].color = this.DYellow[7].geometry.faces[0].color;
          this.BBlue[5].geometry.faces[1].color = this.DYellow[7].geometry.faces[1].color;
          this.BBlue[8].geometry.faces[0].color = this.DYellow[6].geometry.faces[0].color;
          this.BBlue[8].geometry.faces[1].color = this.DYellow[6].geometry.faces[1].color;

          this.DYellow[8].geometry.faces[0].color = this.FGreen[8].geometry.faces[0].color;
          this.DYellow[8].geometry.faces[1].color = this.FGreen[8].geometry.faces[1].color;
          this.DYellow[7].geometry.faces[0].color = this.FGreen[5].geometry.faces[0].color;
          this.DYellow[7].geometry.faces[1].color = this.FGreen[5].geometry.faces[1].color;
          this.DYellow[6].geometry.faces[0].color = this.FGreen[2].geometry.faces[0].color;
          this.DYellow[6].geometry.faces[1].color = this.FGreen[2].geometry.faces[1].color;

          this.FGreen[8].geometry.faces[0].color = this.UWhite[6].geometry.faces[0].color;
          this.FGreen[8].geometry.faces[1].color = this.UWhite[6].geometry.faces[1].color;
          this.FGreen[5].geometry.faces[0].color = this.UWhite[7].geometry.faces[0].color;
          this.FGreen[5].geometry.faces[1].color = this.UWhite[7].geometry.faces[1].color;
          this.FGreen[2].geometry.faces[0].color = this.UWhite[8].geometry.faces[0].color;
          this.FGreen[2].geometry.faces[1].color = this.UWhite[8].geometry.faces[1].color;
          
          this.UWhite[6].geometry.faces[0].color = temp3;
          this.UWhite[6].geometry.faces[1].color = temp3;
          this.UWhite[7].geometry.faces[0].color = temp4;
          this.UWhite[7].geometry.faces[1].color = temp4;	
          this.UWhite[8].geometry.faces[0].color = temp5;
          this.UWhite[8].geometry.faces[1].color = temp5;
          

        }
      }
      if(col === 0){
          if(dir === 1){
          

          let temp3 = this.BBlue[1].geometry.faces[0].color;
          let temp4 = this.BBlue[4].geometry.faces[0].color;
          let temp5 = this.BBlue[7].geometry.faces[0].color;

          this.BBlue[1].geometry.faces[0].color = this.UWhite[3].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[1].color = this.UWhite[3].geometry.faces[1].color;
          this.BBlue[4].geometry.faces[0].color = this.UWhite[4].geometry.faces[0].color;
          this.BBlue[4].geometry.faces[1].color = this.UWhite[4].geometry.faces[1].color;
          this.BBlue[7].geometry.faces[0].color = this.UWhite[5].geometry.faces[0].color;
          this.BBlue[7].geometry.faces[1].color = this.UWhite[5].geometry.faces[1].color;

          this.UWhite[3].geometry.faces[0].color = this.FGreen[7].geometry.faces[0].color;
          this.UWhite[3].geometry.faces[1].color = this.FGreen[7].geometry.faces[1].color;
          this.UWhite[4].geometry.faces[0].color = this.FGreen[4].geometry.faces[0].color;
          this.UWhite[4].geometry.faces[1].color = this.FGreen[4].geometry.faces[1].color;	
          this.UWhite[5].geometry.faces[0].color = this.FGreen[1].geometry.faces[0].color;
          this.UWhite[5].geometry.faces[1].color = this.FGreen[1].geometry.faces[1].color;

          this.FGreen[7].geometry.faces[0].color = this.DYellow[5].geometry.faces[0].color;
          this.FGreen[7].geometry.faces[1].color = this.DYellow[5].geometry.faces[1].color;
          this.FGreen[4].geometry.faces[0].color = this.DYellow[4].geometry.faces[0].color;
          this.FGreen[4].geometry.faces[1].color = this.DYellow[4].geometry.faces[1].color;
          this.FGreen[1].geometry.faces[0].color = this.DYellow[3].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[1].color = this.DYellow[3].geometry.faces[1].color;

          this.DYellow[5].geometry.faces[0].color = temp3;
          this.DYellow[5].geometry.faces[1].color = temp3;
          this.DYellow[4].geometry.faces[0].color = temp4;
          this.DYellow[4].geometry.faces[1].color = temp4;
          this.DYellow[3].geometry.faces[0].color = temp5;
          this.DYellow[3].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){

          let temp3 = this.BBlue[1].geometry.faces[0].color;
          let temp4 = this.BBlue[4].geometry.faces[0].color;
          let temp5 = this.BBlue[7].geometry.faces[0].color;

          this.BBlue[1].geometry.faces[0].color = this.DYellow[5].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[1].color = this.DYellow[5].geometry.faces[1].color;
          this.BBlue[4].geometry.faces[0].color = this.DYellow[4].geometry.faces[0].color;
          this.BBlue[4].geometry.faces[1].color = this.DYellow[4].geometry.faces[1].color;
          this.BBlue[7].geometry.faces[0].color = this.DYellow[3].geometry.faces[0].color;
          this.BBlue[7].geometry.faces[1].color = this.DYellow[3].geometry.faces[1].color;

          this.DYellow[5].geometry.faces[0].color = this.FGreen[7].geometry.faces[0].color;
          this.DYellow[5].geometry.faces[1].color = this.FGreen[7].geometry.faces[1].color;
          this.DYellow[4].geometry.faces[0].color = this.FGreen[4].geometry.faces[0].color;
          this.DYellow[4].geometry.faces[1].color = this.FGreen[4].geometry.faces[1].color;
          this.DYellow[3].geometry.faces[0].color = this.FGreen[1].geometry.faces[0].color;
          this.DYellow[3].geometry.faces[1].color = this.FGreen[1].geometry.faces[1].color;

          this.FGreen[7].geometry.faces[0].color = this.UWhite[3].geometry.faces[0].color;
          this.FGreen[7].geometry.faces[1].color = this.UWhite[3].geometry.faces[1].color;
          this.FGreen[4].geometry.faces[0].color = this.UWhite[4].geometry.faces[0].color;
          this.FGreen[4].geometry.faces[1].color = this.UWhite[4].geometry.faces[1].color;
          this.FGreen[1].geometry.faces[0].color = this.UWhite[5].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[1].color = this.UWhite[5].geometry.faces[1].color;
          
          this.UWhite[3].geometry.faces[0].color = temp3;
          this.UWhite[3].geometry.faces[1].color = temp3;
          this.UWhite[4].geometry.faces[0].color = temp4;
          this.UWhite[4].geometry.faces[1].color = temp4;	
          this.UWhite[5].geometry.faces[0].color = temp5;
          this.UWhite[5].geometry.faces[1].color = temp5;
          

        }
      }
      if(col === -1){
          if(dir === 1){
          let temp = this.LOrange[0].geometry.faces[0].color;
          this.LOrange[0].geometry.faces[0].color = this.LOrange[6].geometry.faces[0].color;
          this.LOrange[0].geometry.faces[1].color = this.LOrange[6].geometry.faces[1].color;
          this.LOrange[6].geometry.faces[0].color = this.LOrange[8].geometry.faces[0].color;
          this.LOrange[6].geometry.faces[1].color = this.LOrange[8].geometry.faces[1].color;
          this.LOrange[8].geometry.faces[0].color = this.LOrange[2].geometry.faces[0].color;
          this.LOrange[8].geometry.faces[1].color = this.LOrange[2].geometry.faces[1].color;
          this.LOrange[2].geometry.faces[0].color = temp;
          this.LOrange[2].geometry.faces[1].color = temp;

          let temp2 = this.LOrange[1].geometry.faces[0].color;
          this.LOrange[1].geometry.faces[0].color = this.LOrange[3].geometry.faces[0].color;
          this.LOrange[1].geometry.faces[1].color = this.LOrange[3].geometry.faces[1].color;
          this.LOrange[3].geometry.faces[0].color = this.LOrange[7].geometry.faces[0].color;
          this.LOrange[3].geometry.faces[1].color = this.LOrange[7].geometry.faces[1].color;
          this.LOrange[7].geometry.faces[0].color = this.LOrange[5].geometry.faces[0].color;
          this.LOrange[7].geometry.faces[1].color = this.LOrange[5].geometry.faces[1].color;
          this.LOrange[5].geometry.faces[0].color = temp2;
          this.LOrange[5].geometry.faces[1].color = temp2;

          let temp3 = this.BBlue[0].geometry.faces[0].color;
          let temp4 = this.BBlue[3].geometry.faces[0].color;
          let temp5 = this.BBlue[6].geometry.faces[0].color;

          this.BBlue[0].geometry.faces[0].color = this.UWhite[0].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[1].color = this.UWhite[0].geometry.faces[1].color;
          this.BBlue[3].geometry.faces[0].color = this.UWhite[1].geometry.faces[0].color;
          this.BBlue[3].geometry.faces[1].color = this.UWhite[1].geometry.faces[1].color;
          this.BBlue[6].geometry.faces[0].color = this.UWhite[2].geometry.faces[0].color;
          this.BBlue[6].geometry.faces[1].color = this.UWhite[2].geometry.faces[1].color;

          this.UWhite[0].geometry.faces[0].color = this.FGreen[6].geometry.faces[0].color;
          this.UWhite[0].geometry.faces[1].color = this.FGreen[6].geometry.faces[1].color;
          this.UWhite[1].geometry.faces[0].color = this.FGreen[3].geometry.faces[0].color;
          this.UWhite[1].geometry.faces[1].color = this.FGreen[3].geometry.faces[1].color;	
          this.UWhite[2].geometry.faces[0].color = this.FGreen[0].geometry.faces[0].color;
          this.UWhite[2].geometry.faces[1].color = this.FGreen[0].geometry.faces[1].color;

          this.FGreen[6].geometry.faces[0].color = this.DYellow[2].geometry.faces[0].color;
          this.FGreen[6].geometry.faces[1].color = this.DYellow[2].geometry.faces[1].color;
          this.FGreen[3].geometry.faces[0].color = this.DYellow[1].geometry.faces[0].color;
          this.FGreen[3].geometry.faces[1].color = this.DYellow[1].geometry.faces[1].color;
          this.FGreen[0].geometry.faces[0].color = this.DYellow[0].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[1].color = this.DYellow[0].geometry.faces[1].color;

          this.DYellow[2].geometry.faces[0].color = temp3;
          this.DYellow[2].geometry.faces[1].color = temp3;
          this.DYellow[1].geometry.faces[0].color = temp4;
          this.DYellow[1].geometry.faces[1].color = temp4;
          this.DYellow[0].geometry.faces[0].color = temp5;
          this.DYellow[0].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){

          let temp = this.LOrange[0].geometry.faces[0].color;
          this.LOrange[0].geometry.faces[0].color = this.LOrange[2].geometry.faces[0].color;
          this.LOrange[0].geometry.faces[1].color = this.LOrange[2].geometry.faces[1].color;
          this.LOrange[2].geometry.faces[0].color = this.LOrange[8].geometry.faces[0].color;
          this.LOrange[2].geometry.faces[1].color = this.LOrange[8].geometry.faces[1].color;
          this.LOrange[8].geometry.faces[0].color = this.LOrange[6].geometry.faces[0].color;
          this.LOrange[8].geometry.faces[1].color = this.LOrange[6].geometry.faces[1].color;
          this.LOrange[6].geometry.faces[0].color = temp;
          this.LOrange[6].geometry.faces[1].color = temp;

          let temp2 = this.LOrange[1].geometry.faces[0].color;
          this.LOrange[1].geometry.faces[0].color = this.LOrange[5].geometry.faces[0].color;
          this.LOrange[1].geometry.faces[1].color = this.LOrange[5].geometry.faces[1].color;
          this.LOrange[5].geometry.faces[0].color = this.LOrange[7].geometry.faces[0].color;
          this.LOrange[5].geometry.faces[1].color = this.LOrange[7].geometry.faces[1].color;
          this.LOrange[7].geometry.faces[0].color = this.LOrange[3].geometry.faces[0].color;
          this.LOrange[7].geometry.faces[1].color = this.LOrange[3].geometry.faces[1].color;
          this.LOrange[3].geometry.faces[0].color = temp2;
          this.LOrange[3].geometry.faces[1].color = temp2;
          

          let temp3 = this.BBlue[0].geometry.faces[0].color;
          let temp4 = this.BBlue[3].geometry.faces[0].color;
          let temp5 = this.BBlue[6].geometry.faces[0].color;

          this.BBlue[0].geometry.faces[0].color = this.DYellow[2].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[1].color = this.DYellow[2].geometry.faces[1].color;
          this.BBlue[3].geometry.faces[0].color = this.DYellow[1].geometry.faces[0].color;
          this.BBlue[3].geometry.faces[1].color = this.DYellow[1].geometry.faces[1].color;
          this.BBlue[6].geometry.faces[0].color = this.DYellow[0].geometry.faces[0].color;
          this.BBlue[6].geometry.faces[1].color = this.DYellow[0].geometry.faces[1].color;

          this.DYellow[2].geometry.faces[0].color = this.FGreen[6].geometry.faces[0].color;
          this.DYellow[2].geometry.faces[1].color = this.FGreen[6].geometry.faces[1].color;
          this.DYellow[1].geometry.faces[0].color = this.FGreen[3].geometry.faces[0].color;
          this.DYellow[1].geometry.faces[1].color = this.FGreen[3].geometry.faces[1].color;
          this.DYellow[0].geometry.faces[0].color = this.FGreen[0].geometry.faces[0].color;
          this.DYellow[0].geometry.faces[1].color = this.FGreen[0].geometry.faces[1].color;

          this.FGreen[6].geometry.faces[0].color = this.UWhite[0].geometry.faces[0].color;
          this.FGreen[6].geometry.faces[1].color = this.UWhite[0].geometry.faces[1].color;
          this.FGreen[3].geometry.faces[0].color = this.UWhite[1].geometry.faces[0].color;
          this.FGreen[3].geometry.faces[1].color = this.UWhite[1].geometry.faces[1].color;
          this.FGreen[0].geometry.faces[0].color = this.UWhite[2].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[1].color = this.UWhite[2].geometry.faces[1].color;
          
          this.UWhite[0].geometry.faces[0].color = temp3;
          this.UWhite[0].geometry.faces[1].color = temp3;
          this.UWhite[1].geometry.faces[0].color = temp4;
          this.UWhite[1].geometry.faces[1].color = temp4;	
          this.UWhite[2].geometry.faces[0].color = temp5;
          this.UWhite[2].geometry.faces[1].color = temp5;
          
        }
      }
    }

    private turnY(row: number, dir: number){
      if(row === 1){
        if(dir === 1){
          let temp = this.UWhite[0].geometry.faces[0].color;
          this.UWhite[0].geometry.faces[0].color = this.UWhite[2].geometry.faces[0].color;
          this.UWhite[0].geometry.faces[1].color = this.UWhite[2].geometry.faces[1].color;
          this.UWhite[2].geometry.faces[0].color = this.UWhite[8].geometry.faces[0].color;
          this.UWhite[2].geometry.faces[1].color = this.UWhite[8].geometry.faces[1].color;
          this.UWhite[8].geometry.faces[0].color = this.UWhite[6].geometry.faces[0].color;
          this.UWhite[8].geometry.faces[1].color = this.UWhite[6].geometry.faces[1].color;
          this.UWhite[6].geometry.faces[0].color = temp;
          this.UWhite[6].geometry.faces[1].color = temp;

          let temp2 = this.UWhite[1].geometry.faces[0].color;
          this.UWhite[1].geometry.faces[0].color = this.UWhite[5].geometry.faces[0].color;
          this.UWhite[1].geometry.faces[1].color = this.UWhite[5].geometry.faces[1].color;
          this.UWhite[5].geometry.faces[0].color = this.UWhite[7].geometry.faces[0].color;
          this.UWhite[5].geometry.faces[1].color = this.UWhite[7].geometry.faces[1].color;
          this.UWhite[7].geometry.faces[0].color = this.UWhite[3].geometry.faces[0].color;
          this.UWhite[7].geometry.faces[1].color = this.UWhite[3].geometry.faces[1].color;
          this.UWhite[3].geometry.faces[0].color = temp2;
          this.UWhite[3].geometry.faces[1].color = temp2;

          let temp3 = this.BBlue[8].geometry.faces[0].color;
          let temp4 = this.BBlue[7].geometry.faces[0].color;
          let temp5 = this.BBlue[6].geometry.faces[0].color;

          this.BBlue[8].geometry.faces[0].color = this.LOrange[6].geometry.faces[0].color;
          this.BBlue[8].geometry.faces[1].color = this.LOrange[6].geometry.faces[1].color;
          this.BBlue[7].geometry.faces[0].color = this.LOrange[7].geometry.faces[0].color;
          this.BBlue[7].geometry.faces[1].color = this.LOrange[7].geometry.faces[1].color;
          this.BBlue[6].geometry.faces[0].color = this.LOrange[8].geometry.faces[0].color;
          this.BBlue[6].geometry.faces[1].color = this.LOrange[8].geometry.faces[1].color;

          this.LOrange[6].geometry.faces[0].color = this.FGreen[6].geometry.faces[0].color;
          this.LOrange[6].geometry.faces[1].color = this.FGreen[6].geometry.faces[1].color;
          this.LOrange[7].geometry.faces[0].color = this.FGreen[7].geometry.faces[0].color;
          this.LOrange[7].geometry.faces[1].color = this.FGreen[7].geometry.faces[1].color;
          this.LOrange[8].geometry.faces[0].color = this.FGreen[8].geometry.faces[0].color;
          this.LOrange[8].geometry.faces[1].color = this.FGreen[8].geometry.faces[1].color;

          this.FGreen[6].geometry.faces[0].color = this.RRed[8].geometry.faces[0].color;
          this.FGreen[6].geometry.faces[1].color = this.RRed[8].geometry.faces[1].color;
          this.FGreen[7].geometry.faces[0].color = this.RRed[5].geometry.faces[0].color;
          this.FGreen[7].geometry.faces[1].color = this.RRed[5].geometry.faces[1].color;
          this.FGreen[8].geometry.faces[0].color = this.RRed[2].geometry.faces[0].color;
          this.FGreen[8].geometry.faces[1].color = this.RRed[2].geometry.faces[1].color;

          this.RRed[8].geometry.faces[0].color = temp3;
          this.RRed[8].geometry.faces[1].color = temp3;
          this.RRed[5].geometry.faces[0].color = temp4;
          this.RRed[5].geometry.faces[1].color = temp4;
          this.RRed[2].geometry.faces[0].color = temp5;
          this.RRed[2].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){
          let temp = this.UWhite[0].geometry.faces[0].color;
          this.UWhite[0].geometry.faces[0].color = this.UWhite[6].geometry.faces[0].color;
          this.UWhite[0].geometry.faces[1].color = this.UWhite[6].geometry.faces[1].color;
          this.UWhite[6].geometry.faces[0].color = this.UWhite[8].geometry.faces[0].color;
          this.UWhite[6].geometry.faces[1].color = this.UWhite[8].geometry.faces[1].color;
          this.UWhite[8].geometry.faces[0].color = this.UWhite[2].geometry.faces[0].color;
          this.UWhite[8].geometry.faces[1].color = this.UWhite[2].geometry.faces[1].color;
          this.UWhite[2].geometry.faces[0].color = temp;
          this.UWhite[2].geometry.faces[1].color = temp;

          let temp2 = this.UWhite[1].geometry.faces[0].color;
          this.UWhite[1].geometry.faces[0].color = this.UWhite[3].geometry.faces[0].color;
          this.UWhite[1].geometry.faces[1].color = this.UWhite[3].geometry.faces[1].color;
          this.UWhite[3].geometry.faces[0].color = this.UWhite[7].geometry.faces[0].color;
          this.UWhite[3].geometry.faces[1].color = this.UWhite[7].geometry.faces[1].color;
          this.UWhite[7].geometry.faces[0].color = this.UWhite[5].geometry.faces[0].color;
          this.UWhite[7].geometry.faces[1].color = this.UWhite[5].geometry.faces[1].color;
          this.UWhite[5].geometry.faces[0].color = temp2;
          this.UWhite[5].geometry.faces[1].color = temp2;

          let temp3 = this.BBlue[8].geometry.faces[0].color;
          let temp4 = this.BBlue[7].geometry.faces[0].color;
          let temp5 = this.BBlue[6].geometry.faces[0].color;

          this.BBlue[8].geometry.faces[0].color = this.RRed[8].geometry.faces[0].color;
          this.BBlue[8].geometry.faces[1].color = this.RRed[8].geometry.faces[1].color;
          this.BBlue[7].geometry.faces[0].color = this.RRed[5].geometry.faces[0].color;
          this.BBlue[7].geometry.faces[1].color = this.RRed[5].geometry.faces[1].color;
          this.BBlue[6].geometry.faces[0].color = this.RRed[2].geometry.faces[0].color;
          this.BBlue[6].geometry.faces[1].color = this.RRed[2].geometry.faces[1].color;

          this.RRed[8].geometry.faces[0].color = this.FGreen[6].geometry.faces[0].color;
          this.RRed[8].geometry.faces[1].color = this.FGreen[6].geometry.faces[1].color;
          this.RRed[5].geometry.faces[0].color = this.FGreen[7].geometry.faces[0].color;
          this.RRed[5].geometry.faces[1].color = this.FGreen[7].geometry.faces[1].color;
          this.RRed[2].geometry.faces[0].color = this.FGreen[8].geometry.faces[0].color;
          this.RRed[2].geometry.faces[1].color = this.FGreen[8].geometry.faces[1].color;

          this.FGreen[6].geometry.faces[0].color = this.LOrange[6].geometry.faces[0].color;
          this.FGreen[6].geometry.faces[1].color = this.LOrange[6].geometry.faces[1].color;
          this.FGreen[7].geometry.faces[0].color = this.LOrange[7].geometry.faces[0].color;
          this.FGreen[7].geometry.faces[1].color = this.LOrange[7].geometry.faces[1].color;
          this.FGreen[8].geometry.faces[0].color = this.LOrange[8].geometry.faces[0].color;
          this.FGreen[8].geometry.faces[1].color = this.LOrange[8].geometry.faces[1].color;

          this.LOrange[6].geometry.faces[0].color = temp3;
          this.LOrange[6].geometry.faces[1].color = temp3;
          this.LOrange[7].geometry.faces[0].color = temp4;
          this.LOrange[7].geometry.faces[1].color = temp4;
          this.LOrange[8].geometry.faces[0].color = temp5;
          this.LOrange[8].geometry.faces[1].color = temp5;

        }
      }
      if(row === 0){
        if(dir === 1){

          let temp3 = this.BBlue[5].geometry.faces[0].color;
          let temp4 = this.BBlue[4].geometry.faces[0].color;
          let temp5 = this.BBlue[3].geometry.faces[0].color;

          this.BBlue[5].geometry.faces[0].color = this.LOrange[3].geometry.faces[0].color;
          this.BBlue[5].geometry.faces[1].color = this.LOrange[3].geometry.faces[1].color;
          this.BBlue[4].geometry.faces[0].color = this.LOrange[4].geometry.faces[0].color;
          this.BBlue[4].geometry.faces[1].color = this.LOrange[4].geometry.faces[1].color;
          this.BBlue[3].geometry.faces[0].color = this.LOrange[5].geometry.faces[0].color;
          this.BBlue[3].geometry.faces[1].color = this.LOrange[5].geometry.faces[1].color;

          this.LOrange[3].geometry.faces[0].color = this.FGreen[3].geometry.faces[0].color;
          this.LOrange[3].geometry.faces[1].color = this.FGreen[3].geometry.faces[1].color;
          this.LOrange[4].geometry.faces[0].color = this.FGreen[4].geometry.faces[0].color;
          this.LOrange[4].geometry.faces[1].color = this.FGreen[4].geometry.faces[1].color;
          this.LOrange[5].geometry.faces[0].color = this.FGreen[5].geometry.faces[0].color;
          this.LOrange[5].geometry.faces[1].color = this.FGreen[5].geometry.faces[1].color;

          this.FGreen[3].geometry.faces[0].color = this.RRed[7].geometry.faces[0].color;
          this.FGreen[3].geometry.faces[1].color = this.RRed[7].geometry.faces[1].color;
          this.FGreen[4].geometry.faces[0].color = this.RRed[4].geometry.faces[0].color;
          this.FGreen[4].geometry.faces[1].color = this.RRed[4].geometry.faces[1].color;
          this.FGreen[5].geometry.faces[0].color = this.RRed[1].geometry.faces[0].color;
          this.FGreen[5].geometry.faces[1].color = this.RRed[1].geometry.faces[1].color;

          this.RRed[7].geometry.faces[0].color = temp3;
          this.RRed[7].geometry.faces[1].color = temp3;
          this.RRed[4].geometry.faces[0].color = temp4;
          this.RRed[4].geometry.faces[1].color = temp4;
          this.RRed[1].geometry.faces[0].color = temp5;
          this.RRed[1].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){
        
          let temp3 = this.BBlue[5].geometry.faces[0].color;
          let temp4 = this.BBlue[4].geometry.faces[0].color;
          let temp5 = this.BBlue[3].geometry.faces[0].color;

          this.BBlue[5].geometry.faces[0].color = this.RRed[7].geometry.faces[0].color;
          this.BBlue[5].geometry.faces[1].color = this.RRed[7].geometry.faces[1].color;
          this.BBlue[4].geometry.faces[0].color = this.RRed[4].geometry.faces[0].color;
          this.BBlue[4].geometry.faces[1].color = this.RRed[4].geometry.faces[1].color;
          this.BBlue[3].geometry.faces[0].color = this.RRed[1].geometry.faces[0].color;
          this.BBlue[3].geometry.faces[1].color = this.RRed[1].geometry.faces[1].color;

          this.RRed[7].geometry.faces[0].color = this.FGreen[3].geometry.faces[0].color;
          this.RRed[7].geometry.faces[1].color = this.FGreen[3].geometry.faces[1].color;
          this.RRed[4].geometry.faces[0].color = this.FGreen[4].geometry.faces[0].color;
          this.RRed[4].geometry.faces[1].color = this.FGreen[4].geometry.faces[1].color;
          this.RRed[1].geometry.faces[0].color = this.FGreen[5].geometry.faces[0].color;
          this.RRed[1].geometry.faces[1].color = this.FGreen[5].geometry.faces[1].color;

          this.FGreen[3].geometry.faces[0].color = this.LOrange[3].geometry.faces[0].color;
          this.FGreen[3].geometry.faces[1].color = this.LOrange[3].geometry.faces[1].color;
          this.FGreen[4].geometry.faces[0].color = this.LOrange[4].geometry.faces[0].color;
          this.FGreen[4].geometry.faces[1].color = this.LOrange[4].geometry.faces[1].color;
          this.FGreen[5].geometry.faces[0].color = this.LOrange[5].geometry.faces[0].color;
          this.FGreen[5].geometry.faces[1].color = this.LOrange[5].geometry.faces[1].color;

          this.LOrange[3].geometry.faces[0].color = temp3;
          this.LOrange[3].geometry.faces[1].color = temp3;
          this.LOrange[4].geometry.faces[0].color = temp4;
          this.LOrange[4].geometry.faces[1].color = temp4;
          this.LOrange[5].geometry.faces[0].color = temp5;
          this.LOrange[5].geometry.faces[1].color = temp5;

        }
      }
      if(row === -1){
        if(dir === 1){

          let temp = this.DYellow[0].geometry.faces[0].color;
          this.DYellow[0].geometry.faces[0].color = this.DYellow[6].geometry.faces[0].color;
          this.DYellow[0].geometry.faces[1].color = this.DYellow[6].geometry.faces[1].color;
          this.DYellow[6].geometry.faces[0].color = this.DYellow[8].geometry.faces[0].color;
          this.DYellow[6].geometry.faces[1].color = this.DYellow[8].geometry.faces[1].color;
          this.DYellow[8].geometry.faces[0].color = this.DYellow[2].geometry.faces[0].color;
          this.DYellow[8].geometry.faces[1].color = this.DYellow[2].geometry.faces[1].color;
          this.DYellow[2].geometry.faces[0].color = temp;
          this.DYellow[2].geometry.faces[1].color = temp;

          let temp2 = this.DYellow[1].geometry.faces[0].color;
          this.DYellow[1].geometry.faces[0].color = this.DYellow[3].geometry.faces[0].color;
          this.DYellow[1].geometry.faces[1].color = this.DYellow[3].geometry.faces[1].color;
          this.DYellow[3].geometry.faces[0].color = this.DYellow[7].geometry.faces[0].color;
          this.DYellow[3].geometry.faces[1].color = this.DYellow[7].geometry.faces[1].color;
          this.DYellow[7].geometry.faces[0].color = this.DYellow[5].geometry.faces[0].color;
          this.DYellow[7].geometry.faces[1].color = this.DYellow[5].geometry.faces[1].color;
          this.DYellow[5].geometry.faces[0].color = temp2;
          this.DYellow[5].geometry.faces[1].color = temp2;

          let temp3 = this.BBlue[2].geometry.faces[0].color;
          let temp4 = this.BBlue[1].geometry.faces[0].color;
          let temp5 = this.BBlue[0].geometry.faces[0].color;

          this.BBlue[2].geometry.faces[0].color = this.LOrange[0].geometry.faces[0].color;
          this.BBlue[2].geometry.faces[1].color = this.LOrange[0].geometry.faces[1].color;
          this.BBlue[1].geometry.faces[0].color = this.LOrange[1].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[1].color = this.LOrange[1].geometry.faces[1].color;
          this.BBlue[0].geometry.faces[0].color = this.LOrange[2].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[1].color = this.LOrange[2].geometry.faces[1].color;

          this.LOrange[0].geometry.faces[0].color = this.FGreen[0].geometry.faces[0].color;
          this.LOrange[0].geometry.faces[1].color = this.FGreen[0].geometry.faces[1].color;
          this.LOrange[1].geometry.faces[0].color = this.FGreen[1].geometry.faces[0].color;
          this.LOrange[1].geometry.faces[1].color = this.FGreen[1].geometry.faces[1].color;
          this.LOrange[2].geometry.faces[0].color = this.FGreen[2].geometry.faces[0].color;
          this.LOrange[2].geometry.faces[1].color = this.FGreen[2].geometry.faces[1].color;

          this.FGreen[0].geometry.faces[0].color = this.RRed[6].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[1].color = this.RRed[6].geometry.faces[1].color;
          this.FGreen[1].geometry.faces[0].color = this.RRed[3].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[1].color = this.RRed[3].geometry.faces[1].color;
          this.FGreen[2].geometry.faces[0].color = this.RRed[0].geometry.faces[0].color;
          this.FGreen[2].geometry.faces[1].color = this.RRed[0].geometry.faces[1].color;

          this.RRed[6].geometry.faces[0].color = temp3;
          this.RRed[6].geometry.faces[1].color = temp3;
          this.RRed[3].geometry.faces[0].color = temp4;
          this.RRed[3].geometry.faces[1].color = temp4;
          this.RRed[0].geometry.faces[0].color = temp5;
          this.RRed[0].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){
          
          let temp = this.DYellow[0].geometry.faces[0].color;
          this.DYellow[0].geometry.faces[0].color = this.DYellow[2].geometry.faces[0].color;
          this.DYellow[0].geometry.faces[1].color = this.DYellow[2].geometry.faces[1].color;
          this.DYellow[2].geometry.faces[0].color = this.DYellow[8].geometry.faces[0].color;
          this.DYellow[2].geometry.faces[1].color = this.DYellow[8].geometry.faces[1].color;
          this.DYellow[8].geometry.faces[0].color = this.DYellow[6].geometry.faces[0].color;
          this.DYellow[8].geometry.faces[1].color = this.DYellow[6].geometry.faces[1].color;
          this.DYellow[6].geometry.faces[0].color = temp;
          this.DYellow[6].geometry.faces[1].color = temp;

          let temp2 = this.DYellow[1].geometry.faces[0].color;
          this.DYellow[1].geometry.faces[0].color = this.DYellow[5].geometry.faces[0].color;
          this.DYellow[1].geometry.faces[1].color = this.DYellow[5].geometry.faces[1].color;
          this.DYellow[5].geometry.faces[0].color = this.DYellow[7].geometry.faces[0].color;
          this.DYellow[5].geometry.faces[1].color = this.DYellow[7].geometry.faces[1].color;
          this.DYellow[7].geometry.faces[0].color = this.DYellow[3].geometry.faces[0].color;
          this.DYellow[7].geometry.faces[1].color = this.DYellow[3].geometry.faces[1].color;
          this.DYellow[3].geometry.faces[0].color = temp2;
          this.DYellow[3].geometry.faces[1].color = temp2;

          let temp3 = this.BBlue[2].geometry.faces[0].color;
          let temp4 = this.BBlue[1].geometry.faces[0].color;
          let temp5 = this.BBlue[0].geometry.faces[0].color;

          this.BBlue[2].geometry.faces[0].color = this.RRed[6].geometry.faces[0].color;
          this.BBlue[2].geometry.faces[1].color = this.RRed[6].geometry.faces[1].color;
          this.BBlue[1].geometry.faces[0].color = this.RRed[3].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[1].color = this.RRed[3].geometry.faces[1].color;
          this.BBlue[0].geometry.faces[0].color = this.RRed[0].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[1].color = this.RRed[0].geometry.faces[1].color;

          this.RRed[6].geometry.faces[0].color = this.FGreen[0].geometry.faces[0].color;
          this.RRed[6].geometry.faces[1].color = this.FGreen[0].geometry.faces[1].color;
          this.RRed[3].geometry.faces[0].color = this.FGreen[1].geometry.faces[0].color;
          this.RRed[3].geometry.faces[1].color = this.FGreen[1].geometry.faces[1].color;
          this.RRed[0].geometry.faces[0].color = this.FGreen[2].geometry.faces[0].color;
          this.RRed[0].geometry.faces[1].color = this.FGreen[2].geometry.faces[1].color;

          this.FGreen[0].geometry.faces[0].color = this.LOrange[0].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[1].color = this.LOrange[0].geometry.faces[1].color;
          this.FGreen[1].geometry.faces[0].color = this.LOrange[1].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[1].color = this.LOrange[1].geometry.faces[1].color;
          this.FGreen[2].geometry.faces[0].color = this.LOrange[2].geometry.faces[0].color;
          this.FGreen[2].geometry.faces[1].color = this.LOrange[2].geometry.faces[1].color;

          this.LOrange[0].geometry.faces[0].color = temp3;
          this.LOrange[0].geometry.faces[1].color = temp3;
          this.LOrange[1].geometry.faces[0].color = temp4;
          this.LOrange[1].geometry.faces[1].color = temp4;
          this.LOrange[2].geometry.faces[0].color = temp5;
          this.LOrange[2].geometry.faces[1].color = temp5;

        }
      }
    }
    
    private  turnZ(row: number, dir: number){
      if(row === 1){
        if(dir === 1){
          let temp = this.BBlue[0].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[0].color = this.BBlue[2].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[1].color = this.BBlue[2].geometry.faces[1].color;
          this.BBlue[2].geometry.faces[0].color = this.BBlue[8].geometry.faces[0].color;
          this.BBlue[2].geometry.faces[1].color = this.BBlue[8].geometry.faces[1].color;
          this.BBlue[8].geometry.faces[0].color = this.BBlue[6].geometry.faces[0].color;
          this.BBlue[8].geometry.faces[1].color = this.BBlue[6].geometry.faces[1].color;
          this.BBlue[6].geometry.faces[0].color = temp;
          this.BBlue[6].geometry.faces[1].color = temp;

          let temp2 = this.BBlue[1].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[0].color = this.BBlue[5].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[1].color = this.BBlue[5].geometry.faces[1].color;
          this.BBlue[5].geometry.faces[0].color = this.BBlue[7].geometry.faces[0].color;
          this.BBlue[5].geometry.faces[1].color = this.BBlue[7].geometry.faces[1].color;
          this.BBlue[7].geometry.faces[0].color = this.BBlue[3].geometry.faces[0].color;
          this.BBlue[7].geometry.faces[1].color = this.BBlue[3].geometry.faces[1].color;
          this.BBlue[3].geometry.faces[0].color = temp2;
          this.BBlue[3].geometry.faces[1].color = temp2;

          let temp3 = this.UWhite[0].geometry.faces[0].color;
          let temp4 = this.UWhite[3].geometry.faces[0].color;
          let temp5 = this.UWhite[6].geometry.faces[0].color;

          this.UWhite[0].geometry.faces[0].color = this.LOrange[0].geometry.faces[0].color;
          this.UWhite[0].geometry.faces[1].color = this.LOrange[0].geometry.faces[1].color;
          this.UWhite[3].geometry.faces[0].color = this.LOrange[3].geometry.faces[0].color;
          this.UWhite[3].geometry.faces[1].color = this.LOrange[3].geometry.faces[1].color;
          this.UWhite[6].geometry.faces[0].color = this.LOrange[6].geometry.faces[0].color;
          this.UWhite[6].geometry.faces[1].color = this.LOrange[6].geometry.faces[1].color;

          this.LOrange[0].geometry.faces[0].color = this.DYellow[6].geometry.faces[0].color;
          this.LOrange[0].geometry.faces[1].color = this.DYellow[6].geometry.faces[1].color;
          this.LOrange[3].geometry.faces[0].color = this.DYellow[3].geometry.faces[0].color;
          this.LOrange[3].geometry.faces[1].color = this.DYellow[3].geometry.faces[1].color;
          this.LOrange[6].geometry.faces[0].color = this.DYellow[0].geometry.faces[0].color;
          this.LOrange[6].geometry.faces[1].color = this.DYellow[0].geometry.faces[1].color;

          this.DYellow[6].geometry.faces[0].color = this.RRed[2].geometry.faces[0].color;
          this.DYellow[6].geometry.faces[1].color = this.RRed[2].geometry.faces[1].color;
          this.DYellow[3].geometry.faces[0].color = this.RRed[1].geometry.faces[0].color;
          this.DYellow[3].geometry.faces[1].color = this.RRed[1].geometry.faces[1].color;
          this.DYellow[0].geometry.faces[0].color = this.RRed[0].geometry.faces[0].color;
          this.DYellow[0].geometry.faces[1].color = this.RRed[0].geometry.faces[1].color;

          this.RRed[2].geometry.faces[0].color = temp3;
          this.RRed[2].geometry.faces[1].color = temp3;
          this.RRed[1].geometry.faces[0].color = temp4;
          this.RRed[1].geometry.faces[1].color = temp4;
          this.RRed[0].geometry.faces[0].color = temp5;
          this.RRed[0].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){
          let temp = this.BBlue[0].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[0].color = this.BBlue[6].geometry.faces[0].color;
          this.BBlue[0].geometry.faces[1].color = this.BBlue[6].geometry.faces[1].color;
          this.BBlue[6].geometry.faces[0].color = this.BBlue[8].geometry.faces[0].color;
          this.BBlue[6].geometry.faces[1].color = this.BBlue[8].geometry.faces[1].color;
          this.BBlue[8].geometry.faces[0].color = this.BBlue[2].geometry.faces[0].color;
          this.BBlue[8].geometry.faces[1].color = this.BBlue[2].geometry.faces[1].color;
          this.BBlue[2].geometry.faces[0].color = temp;
          this.BBlue[2].geometry.faces[1].color = temp;

          let temp2 = this.BBlue[1].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[0].color = this.BBlue[3].geometry.faces[0].color;
          this.BBlue[1].geometry.faces[1].color = this.BBlue[3].geometry.faces[1].color;
          this.BBlue[3].geometry.faces[0].color = this.BBlue[7].geometry.faces[0].color;
          this.BBlue[3].geometry.faces[1].color = this.BBlue[7].geometry.faces[1].color;
          this.BBlue[7].geometry.faces[0].color = this.BBlue[5].geometry.faces[0].color;
          this.BBlue[7].geometry.faces[1].color = this.BBlue[5].geometry.faces[1].color;
          this.BBlue[5].geometry.faces[0].color = temp2;
          this.BBlue[5].geometry.faces[1].color = temp2;

          let temp3 = this.UWhite[0].geometry.faces[0].color;
          let temp4 = this.UWhite[3].geometry.faces[0].color;
          let temp5 = this.UWhite[6].geometry.faces[0].color;

          this.UWhite[0].geometry.faces[0].color = this.RRed[2].geometry.faces[0].color;
          this.UWhite[0].geometry.faces[1].color = this.RRed[2].geometry.faces[1].color;
          this.UWhite[3].geometry.faces[0].color = this.RRed[1].geometry.faces[0].color;
          this.UWhite[3].geometry.faces[1].color = this.RRed[1].geometry.faces[1].color;
          this.UWhite[6].geometry.faces[0].color = this.RRed[0].geometry.faces[0].color;
          this.UWhite[6].geometry.faces[1].color = this.RRed[0].geometry.faces[1].color;

          this.RRed[2].geometry.faces[0].color = this.DYellow[6].geometry.faces[0].color;
          this.RRed[2].geometry.faces[1].color = this.DYellow[6].geometry.faces[1].color;
          this.RRed[1].geometry.faces[0].color = this.DYellow[3].geometry.faces[0].color;
          this.RRed[1].geometry.faces[1].color = this.DYellow[3].geometry.faces[1].color;
          this.RRed[0].geometry.faces[0].color = this.DYellow[0].geometry.faces[0].color;
          this.RRed[0].geometry.faces[1].color = this.DYellow[0].geometry.faces[1].color;

          this.DYellow[6].geometry.faces[0].color = this.LOrange[0].geometry.faces[0].color;
          this.DYellow[6].geometry.faces[1].color = this.LOrange[0].geometry.faces[1].color;
          this.DYellow[3].geometry.faces[0].color = this.LOrange[3].geometry.faces[0].color;
          this.DYellow[3].geometry.faces[1].color = this.LOrange[3].geometry.faces[1].color;
          this.DYellow[0].geometry.faces[0].color = this.LOrange[6].geometry.faces[0].color;
          this.DYellow[0].geometry.faces[1].color = this.LOrange[6].geometry.faces[1].color;

          this.LOrange[0].geometry.faces[0].color = temp3;
          this.LOrange[0].geometry.faces[1].color = temp3;
          this.LOrange[3].geometry.faces[0].color = temp4;
          this.LOrange[3].geometry.faces[1].color = temp4;
          this.LOrange[6].geometry.faces[0].color = temp5;
          this.LOrange[6].geometry.faces[1].color = temp5;

        }
      }
      if(row === 0){
        if(dir === 1){

          let temp3 = this.UWhite[1].geometry.faces[0].color;
          let temp4 = this.UWhite[4].geometry.faces[0].color;
          let temp5 = this.UWhite[7].geometry.faces[0].color;

          this.UWhite[1].geometry.faces[0].color = this.LOrange[1].geometry.faces[0].color;
          this.UWhite[1].geometry.faces[1].color = this.LOrange[1].geometry.faces[1].color;
          this.UWhite[4].geometry.faces[0].color = this.LOrange[4].geometry.faces[0].color;
          this.UWhite[4].geometry.faces[1].color = this.LOrange[4].geometry.faces[1].color;
          this.UWhite[7].geometry.faces[0].color = this.LOrange[7].geometry.faces[0].color;
          this.UWhite[7].geometry.faces[1].color = this.LOrange[7].geometry.faces[1].color;

          this.LOrange[1].geometry.faces[0].color = this.DYellow[7].geometry.faces[0].color;
          this.LOrange[1].geometry.faces[1].color = this.DYellow[7].geometry.faces[1].color;
          this.LOrange[4].geometry.faces[0].color = this.DYellow[4].geometry.faces[0].color;
          this.LOrange[4].geometry.faces[1].color = this.DYellow[4].geometry.faces[1].color;
          this.LOrange[7].geometry.faces[0].color = this.DYellow[1].geometry.faces[0].color;
          this.LOrange[7].geometry.faces[1].color = this.DYellow[1].geometry.faces[1].color;

          this.DYellow[7].geometry.faces[0].color = this.RRed[5].geometry.faces[0].color;
          this.DYellow[7].geometry.faces[1].color = this.RRed[5].geometry.faces[1].color;
          this.DYellow[4].geometry.faces[0].color = this.RRed[4].geometry.faces[0].color;
          this.DYellow[4].geometry.faces[1].color = this.RRed[4].geometry.faces[1].color;
          this.DYellow[1].geometry.faces[0].color = this.RRed[3].geometry.faces[0].color;
          this.DYellow[1].geometry.faces[1].color = this.RRed[3].geometry.faces[1].color;

          this.RRed[5].geometry.faces[0].color = temp3;
          this.RRed[5].geometry.faces[1].color = temp3;
          this.RRed[4].geometry.faces[0].color = temp4;
          this.RRed[4].geometry.faces[1].color = temp4;
          this.RRed[3].geometry.faces[0].color = temp5;
          this.RRed[3].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){

          let temp3 = this.UWhite[1].geometry.faces[0].color;
          let temp4 = this.UWhite[4].geometry.faces[0].color;
          let temp5 = this.UWhite[7].geometry.faces[0].color;

          this.UWhite[1].geometry.faces[0].color = this.RRed[5].geometry.faces[0].color;
          this.UWhite[1].geometry.faces[1].color = this.RRed[5].geometry.faces[1].color;
          this.UWhite[4].geometry.faces[0].color = this.RRed[4].geometry.faces[0].color;
          this.UWhite[4].geometry.faces[1].color = this.RRed[4].geometry.faces[1].color;
          this.UWhite[7].geometry.faces[0].color = this.RRed[3].geometry.faces[0].color;
          this.UWhite[7].geometry.faces[1].color = this.RRed[3].geometry.faces[1].color;

          this.RRed[5].geometry.faces[0].color = this.DYellow[7].geometry.faces[0].color;
          this.RRed[5].geometry.faces[1].color = this.DYellow[7].geometry.faces[1].color;
          this.RRed[4].geometry.faces[0].color = this.DYellow[4].geometry.faces[0].color;
          this.RRed[4].geometry.faces[1].color = this.DYellow[4].geometry.faces[1].color;
          this.RRed[3].geometry.faces[0].color = this.DYellow[1].geometry.faces[0].color;
          this.RRed[3].geometry.faces[1].color = this.DYellow[1].geometry.faces[1].color;

          this.DYellow[7].geometry.faces[0].color = this.LOrange[1].geometry.faces[0].color;
          this.DYellow[7].geometry.faces[1].color = this.LOrange[1].geometry.faces[1].color;
          this.DYellow[4].geometry.faces[0].color = this.LOrange[4].geometry.faces[0].color;
          this.DYellow[4].geometry.faces[1].color = this.LOrange[4].geometry.faces[1].color;
          this.DYellow[1].geometry.faces[0].color = this.LOrange[7].geometry.faces[0].color;
          this.DYellow[1].geometry.faces[1].color = this.LOrange[7].geometry.faces[1].color;

          this.LOrange[1].geometry.faces[0].color = temp3;
          this.LOrange[1].geometry.faces[1].color = temp3;
          this.LOrange[4].geometry.faces[0].color = temp4;
          this.LOrange[4].geometry.faces[1].color = temp4;
          this.LOrange[7].geometry.faces[0].color = temp5;
          this.LOrange[7].geometry.faces[1].color = temp5;

        }
      }
      if(row === -1){
        if(dir === 1){
          let temp = this.FGreen[0].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[0].color = this.FGreen[2].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[1].color = this.FGreen[2].geometry.faces[1].color;
          this.FGreen[2].geometry.faces[0].color = this.FGreen[8].geometry.faces[0].color;
          this.FGreen[2].geometry.faces[1].color = this.FGreen[8].geometry.faces[1].color;
          this.FGreen[8].geometry.faces[0].color = this.FGreen[6].geometry.faces[0].color;
          this.FGreen[8].geometry.faces[1].color = this.FGreen[6].geometry.faces[1].color;
          this.FGreen[6].geometry.faces[0].color = temp;
          this.FGreen[6].geometry.faces[1].color = temp;

          let temp2 = this.FGreen[1].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[0].color = this.FGreen[5].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[1].color = this.FGreen[5].geometry.faces[1].color;
          this.FGreen[5].geometry.faces[0].color = this.FGreen[7].geometry.faces[0].color;
          this.FGreen[5].geometry.faces[1].color = this.FGreen[7].geometry.faces[1].color;
          this.FGreen[7].geometry.faces[0].color = this.FGreen[3].geometry.faces[0].color;
          this.FGreen[7].geometry.faces[1].color = this.FGreen[3].geometry.faces[1].color;
          this.FGreen[3].geometry.faces[0].color = temp2;
          this.FGreen[3].geometry.faces[1].color = temp2;

          let temp3 = this.UWhite[2].geometry.faces[0].color;
          let temp4 = this.UWhite[5].geometry.faces[0].color;
          let temp5 = this.UWhite[8].geometry.faces[0].color;

          this.UWhite[2].geometry.faces[0].color = this.LOrange[2].geometry.faces[0].color;
          this.UWhite[2].geometry.faces[1].color = this.LOrange[2].geometry.faces[1].color;
          this.UWhite[5].geometry.faces[0].color = this.LOrange[5].geometry.faces[0].color;
          this.UWhite[5].geometry.faces[1].color = this.LOrange[5].geometry.faces[1].color;
          this.UWhite[8].geometry.faces[0].color = this.LOrange[8].geometry.faces[0].color;
          this.UWhite[8].geometry.faces[1].color = this.LOrange[8].geometry.faces[1].color;

          this.LOrange[2].geometry.faces[0].color = this.DYellow[8].geometry.faces[0].color;
          this.LOrange[2].geometry.faces[1].color = this.DYellow[8].geometry.faces[1].color;
          this.LOrange[5].geometry.faces[0].color = this.DYellow[5].geometry.faces[0].color;
          this.LOrange[5].geometry.faces[1].color = this.DYellow[5].geometry.faces[1].color;
          this.LOrange[8].geometry.faces[0].color = this.DYellow[2].geometry.faces[0].color;
          this.LOrange[8].geometry.faces[1].color = this.DYellow[2].geometry.faces[1].color;

          this.DYellow[8].geometry.faces[0].color = this.RRed[8].geometry.faces[0].color;
          this.DYellow[8].geometry.faces[1].color = this.RRed[8].geometry.faces[1].color;
          this.DYellow[5].geometry.faces[0].color = this.RRed[7].geometry.faces[0].color;
          this.DYellow[5].geometry.faces[1].color = this.RRed[7].geometry.faces[1].color;
          this.DYellow[2].geometry.faces[0].color = this.RRed[6].geometry.faces[0].color;
          this.DYellow[2].geometry.faces[1].color = this.RRed[6].geometry.faces[1].color;

          this.RRed[8].geometry.faces[0].color = temp3;
          this.RRed[8].geometry.faces[1].color = temp3;
          this.RRed[7].geometry.faces[0].color = temp4;
          this.RRed[7].geometry.faces[1].color = temp4;
          this.RRed[6].geometry.faces[0].color = temp5;
          this.RRed[6].geometry.faces[1].color = temp5;


        }
        else if(dir === -1){
          let temp = this.FGreen[0].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[0].color = this.FGreen[6].geometry.faces[0].color;
          this.FGreen[0].geometry.faces[1].color = this.FGreen[6].geometry.faces[1].color;
          this.FGreen[6].geometry.faces[0].color = this.FGreen[8].geometry.faces[0].color;
          this.FGreen[6].geometry.faces[1].color = this.FGreen[8].geometry.faces[1].color;
          this.FGreen[8].geometry.faces[0].color = this.FGreen[2].geometry.faces[0].color;
          this.FGreen[8].geometry.faces[1].color = this.FGreen[2].geometry.faces[1].color;
          this.FGreen[2].geometry.faces[0].color = temp;
          this.FGreen[2].geometry.faces[1].color = temp;

          let temp2 = this.FGreen[1].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[0].color = this.FGreen[3].geometry.faces[0].color;
          this.FGreen[1].geometry.faces[1].color = this.FGreen[3].geometry.faces[1].color;
          this.FGreen[3].geometry.faces[0].color = this.FGreen[7].geometry.faces[0].color;
          this.FGreen[3].geometry.faces[1].color = this.FGreen[7].geometry.faces[1].color;
          this.FGreen[7].geometry.faces[0].color = this.FGreen[5].geometry.faces[0].color;
          this.FGreen[7].geometry.faces[1].color = this.FGreen[5].geometry.faces[1].color;
          this.FGreen[5].geometry.faces[0].color = temp2;
          this.FGreen[5].geometry.faces[1].color = temp2;

          let temp3 = this.UWhite[2].geometry.faces[0].color;
          let temp4 = this.UWhite[5].geometry.faces[0].color;
          let temp5 = this.UWhite[8].geometry.faces[0].color;

          this.UWhite[2].geometry.faces[0].color = this.RRed[8].geometry.faces[0].color;
          this.UWhite[2].geometry.faces[1].color = this.RRed[8].geometry.faces[1].color;
          this.UWhite[5].geometry.faces[0].color = this.RRed[7].geometry.faces[0].color;
          this.UWhite[5].geometry.faces[1].color = this.RRed[7].geometry.faces[1].color;
          this.UWhite[8].geometry.faces[0].color = this.RRed[6].geometry.faces[0].color;
          this.UWhite[8].geometry.faces[1].color = this.RRed[6].geometry.faces[1].color;

          this.RRed[8].geometry.faces[0].color = this.DYellow[8].geometry.faces[0].color;
          this.RRed[8].geometry.faces[1].color = this.DYellow[8].geometry.faces[1].color;
          this.RRed[7].geometry.faces[0].color = this.DYellow[5].geometry.faces[0].color;
          this.RRed[7].geometry.faces[1].color = this.DYellow[5].geometry.faces[1].color;
          this.RRed[6].geometry.faces[0].color = this.DYellow[2].geometry.faces[0].color;
          this.RRed[6].geometry.faces[1].color = this.DYellow[2].geometry.faces[1].color;

          this.DYellow[8].geometry.faces[0].color = this.LOrange[2].geometry.faces[0].color;
          this.DYellow[8].geometry.faces[1].color = this.LOrange[2].geometry.faces[1].color;
          this.DYellow[5].geometry.faces[0].color = this.LOrange[5].geometry.faces[0].color;
          this.DYellow[5].geometry.faces[1].color = this.LOrange[5].geometry.faces[1].color;
          this.DYellow[2].geometry.faces[0].color = this.LOrange[8].geometry.faces[0].color;
          this.DYellow[2].geometry.faces[1].color = this.LOrange[8].geometry.faces[1].color;

          this.LOrange[2].geometry.faces[0].color = temp3;
          this.LOrange[2].geometry.faces[1].color = temp3;
          this.LOrange[5].geometry.faces[0].color = temp4;
          this.LOrange[5].geometry.faces[1].color = temp4;
          this.LOrange[8].geometry.faces[0].color = temp5;
          this.LOrange[8].geometry.faces[1].color = temp5;

        }
      }
    }

    private reset(){
      for(let i = 0; i < 9; i++ ){
        this.DYellow[i].geometry.faces[0].color = this.Yellow;
        this.DYellow[i].geometry.faces[1].color = this.Yellow;
        this.BBlue[i].geometry.faces[0].color = this.Blue;
        this.BBlue[i].geometry.faces[1].color = this.Blue;
        this.RRed[i].geometry.faces[0].color = this.Red;
        this.RRed[i].geometry.faces[1].color = this.Red;
        this.FGreen[i].geometry.faces[0].color = this.Green;
        this.FGreen[i].geometry.faces[1].color = this.Green;
        this.LOrange[i].geometry.faces[0].color = this.Orange;
        this.LOrange[i].geometry.faces[1].color = this.Orange;
        this.UWhite[i].geometry.faces[0].color = this.White;
        this.UWhite[i].geometry.faces[1].color = this.White;
      }
    }

    private UpdateFaces(){
      for(let i = 0; i < 9; i++ ){
        this.UWhite[i].geometry.elementsNeedUpdate = true;
        this.LOrange[i].geometry.elementsNeedUpdate = true;
        this.DYellow[i].geometry.elementsNeedUpdate = true;
        this.BBlue[i].geometry.elementsNeedUpdate = true;
        this.RRed[i].geometry.elementsNeedUpdate = true;
        this.FGreen[i].geometry.elementsNeedUpdate = true;
        //mesh.geometry.elementsNeedUpdate = true;
      }
    }

    private saveState() {

      for(let i = 0; i < 9; i++) {
        this.savedYellow1[i] = this.DYellow[i].geometry.faces[0].color;
        this.savedBlue1[i] = this.BBlue[i].geometry.faces[0].color;
        this.savedRed1[i] = this.RRed[i].geometry.faces[0].color;
        this.savedGreen1[i] = this.FGreen[i].geometry.faces[0].color;
        this.savedOrange1[i] = this.LOrange[i].geometry.faces[0].color;
        this.savedWhite1[i] = this.UWhite[i].geometry.faces[0].color;

        this.savedYellow2[i] = this.DYellow[i].geometry.faces[1].color;
        this.savedBlue2[i] = this.BBlue[i].geometry.faces[1].color;
        this.savedRed2[i] = this.RRed[i].geometry.faces[1].color;
        this.savedGreen2[i] = this.FGreen[i].geometry.faces[1].color;
        this.savedOrange2[i] = this.LOrange[i].geometry.faces[1].color;
        this.savedWhite2[i] = this.UWhite[i].geometry.faces[1].color;
      }
    }

    private resetState() {
      if(this.savedYellow1[0] !== null) {
        for(let i = 0; i < 9; i++ ){
          this.DYellow[i].geometry.faces[0].color = this.savedYellow1[i];
          this.DYellow[i].geometry.faces[1].color = this.savedYellow2[i];
          this.BBlue[i].geometry.faces[0].color = this.savedBlue1[i];
          this.BBlue[i].geometry.faces[1].color = this.savedBlue2[i];
          this.RRed[i].geometry.faces[0].color = this.savedRed1[i];
          this.RRed[i].geometry.faces[1].color = this.savedRed2[i];
          this.FGreen[i].geometry.faces[0].color = this.savedGreen1[i];
          this.FGreen[i].geometry.faces[1].color = this.savedGreen2[i];
          this.LOrange[i].geometry.faces[0].color = this.savedOrange1[i];
          this.LOrange[i].geometry.faces[1].color = this.savedOrange2[i];
          this.UWhite[i].geometry.faces[0].color = this.savedWhite1[i];
          this.UWhite[i].geometry.faces[1].color = this.savedWhite2[i];
        }
      }
    }
  
  @HostListener('window:keydown', ['$event'])
  private onDocumentKeyDown(event: KeyboardEvent) {
    
    var keyCode = event.which;
    // Q
      if (keyCode === 81) {
      this.turnX(-1,1);
      this.UpdateFaces();
    }
    // A
      if (keyCode === 65) {
      this.turnX(-1,-1);
      this.UpdateFaces();
    }
    // W
    if (keyCode === 87) {
      this.turnX(0,1);
      this.UpdateFaces();
    }
    // S
    if (keyCode === 83) {
      this.turnX(0,-1);
      this.UpdateFaces();
    }
    // E
    if (keyCode === 69) {
      this.turnX(1,1);
      this.UpdateFaces();
    }
    // D
    if (keyCode === 68) {
      this.turnX(1,-1);
      this.UpdateFaces();
    }
    // U
      if (keyCode === 85) {
      this.turnY(1,1);
      this.UpdateFaces();
    }
    // I
      if (keyCode === 73) {
      this.turnY(1,-1);
      this.UpdateFaces();
    }
    // J
    if (keyCode === 74) {
      this.turnY(0,1);
      this.UpdateFaces();
    }
    // K
    if (keyCode === 75) {
      this.turnY(0,-1);
      this.UpdateFaces();
    }
    // N
    if (keyCode === 78) {
      this.turnY(-1,1);
      this.UpdateFaces();
    }
    // M
    if (keyCode === 77) {
      this.turnY(-1,-1);
      this.UpdateFaces();
    }
    // z
    if (keyCode === 90) {
      this.turnZ(1,1);
      this.UpdateFaces();
    }
    // x
    if (keyCode === 88) {
      this.turnZ(1,-1);
      this.UpdateFaces();
    }
    // c
    if (keyCode === 67) {
      this.turnZ(-1,-1);
      this.UpdateFaces();
    }

    //T
    if(keyCode === 84) {
      this.saveState();
    }
    //R
    if(keyCode === 82) {
      this.resetState();
      this.UpdateFaces();
    }

    //Space
    if (keyCode === 32) {
      this.reset();
      this.UpdateFaces();
    }
    //Up Arrow
    if (keyCode === 38) {
      this.Cube.rotation.x += 0.1;
    }
    //Down Arrow
    if (keyCode === 40) {
      this.Cube.rotation.x -= 0.1;
    }
    //Left Arrow
    if (keyCode === 37) {
      this.Cube.rotation.y -= 0.1;
    }
    //Right Arrow
    if (keyCode === 39) {
      this.Cube.rotation.y += 0.1;
    }
    //BackSpace	
    if (keyCode === 8) {
      this.Cube.rotation.y = 0;
      this.Cube.rotation.x = 0;
    }	
      
  }
}
