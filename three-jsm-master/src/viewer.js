const silverless_folder_path = '../../wp-content/themes/poulton-tech/inc/silverless/';
import {
  AmbientLight,
  AnimationMixer,
  AxesHelper,
  Box3,
  Cache,
  CircleBufferGeometry,
  Color,
  CubeTextureLoader,
  DataTexture,
  DirectionalLight,
  DirectionalLightHelper,
  DoubleSide,
  Fog,
  GridHelper,
  Group,
  HemisphereLight,
  IcosahedronGeometry,
  LinearEncoding,
  LoaderUtils,
  LoadingManager,
  LuminanceFormat,
  MeshPhongMaterial,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshToonMaterial,
  NearestFilter,
  OrthographicCamera,
  PMREMGenerator,
  PerspectiveCamera,
  PlaneBufferGeometry,
  PointLight,
  PointLightHelper,
  Quaternion,
  RawShaderMaterial,
  RGBFormat,
  Scene,
  ShaderChunk,
  SkeletonHelper,
  UnsignedByteType,
  Vector2,
  Vector3,
  WebGLRenderer,
  sRGBEncoding,
} from 'three/build/three.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';


import { MechanicalStressShader } from './MechanicalStressShader.js';

import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js';
import { KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader.js';
import  { ToonShader1, ToonShader2, ToonShaderHatching, ToonShaderDotted } from 'three/examples/jsm/shaders/ToonShader.js';

import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
//import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import { UnrealBloomPass } from "./TransparentBackgroundFixedUnrealBloomPass.js";  // ts";

import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass.js';


import { WebGLProgram } from 'three/src/renderers/webgl/WebGLProgram.js';


window.ShaderChunk = ShaderChunk;
window.OrbitControls = OrbitControls;
window.Quaternion = Quaternion;
window.WebGLProgram = WebGLProgram;

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper.js';

import { GUI } from 'dat.gui/build/dat.gui.module.js';

import { environments } from '../../inc/silverless/assets/environment/index.js';
import { CylinderBufferGeometry, Mesh, Object3D } from 'three';
//import { createBackground } from '../lib/three-vignette.js';






window._USING_CONTROLS = true;



const ƒ = () => {}

const DEFAULT_CAMERA = '[default]';

const IS_IOS = isIOS();

// glTF texture types. `envMap` is deliberately omitted, as it's used internally
// by the loader but not part of the glTF format.
const MAP_NAMES = [
  'map',
  'aoMap',
  'emissiveMap',
  'glossinessMap',
  'metalnessMap',
  'normalMap',
  'roughnessMap',
  'specularMap',
];

const Preset = {ASSET_GENERATOR: 'assetgenerator'};

const INTERVAL_DURATION_FOR_ROWS_ANIMATION = 1000;

const DEFAULT_AUTOROTATESPEED = 0.33;

const LITTLE_BIT_OF_A_GAP = 1;

Cache.enabled = true;

export class Viewer {

  constructor (el, options) {

    this.el = el;
    this.options = options;

    this.lights = [];
    this.content = null;
    this.mixer = null;
    this.clips = [];
    this.gui = null;

    this.intervalId = null;

    this.tempV = new Vector3();

		window.viewer = this; 


    this.state = {
      environment: options.preset === Preset.ASSET_GENERATOR
        ? environments.find((e) => e.id === 'footprint-court').name
        : environments[1].name,
      background: false,
      playbackSpeed: 1.0,
      actionStates: {},
      camera: DEFAULT_CAMERA,
      wireframe: false,
      skeleton: false,
      grid: false,

      // Lights
      addLights: true,
      exposure: 1.0,
      textureEncoding: 'sRGB',
      ambientIntensity: 0, ///1.5,
      ambientColor: 0xFFFFFF,
      directIntensity: 0.8 * Math.PI, // TODO(#116)
      directColor: 0xFFFFFF,
      bgColor1: '#ffffff',
      bgColor2: '#353535'
    };

    this.prevTime = 0;

    this.stats = new Stats();
    this.stats.dom.height = '48px';
    [].forEach.call(this.stats.dom.children, (child) => (child.style.display = ''));

    this.scene = new Scene();
    window.scene = this.scene;

    const fov = options.preset === Preset.ASSET_GENERATOR
      ? 0.8 * 180 / Math.PI
      : 60;

    const use_isometric = false;

    if(use_isometric){

      this.defaultCamera = new OrthographicCamera( el.clientWidth / - 2, el.clientWidth / 2, el.clientHeight / 2, el.clientHeight / - 2, 1, 1000 );

    }else{

      this.defaultCamera = new PerspectiveCamera( fov, el.clientWidth / el.clientHeight, 0.00001, 10000 );
    }


    //this.defaultCamera.addEventListener('change', (e)=>{ console.log('update', e) });
    window.defaultCamera = this.defaultCamera;

    this.activeCamera = this.defaultCamera;
    this.scene.add( this.defaultCamera );

    window.activeCamera = this.activeCamera;

    window.composer_enabled = true;

  // this.renderer = window.renderer = new WebGLRenderer({});
    this.renderer = window.renderer = new WebGLRenderer({antialias: true, logarithmicDepthBuffer: true, alpha: true, preserveDrawingBuffer:true  });

    
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = sRGBEncoding;
    this.renderer.setClearColor( 0x000000, 0 ); // the default
    //    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( el.clientWidth, el.clientHeight );
    
    //  this.renderer.extensions.get( 'EXT_color_buffer_float' ); // https://github.com/mrdoob/three.js/issues/15493
    
    
    // postprocessing
    
    this.composer = new EffectComposer( this.renderer );
    this.composer.setSize( el.clientWidth, el.clientHeight );
    
    const use_gizmo = false;
    if(use_gizmo) {
      
          window.gizmo = new TransformControls( this.defaultCamera, this.renderer.domElement );
          
  
          const radius = 50;  
          const detail = 2;  
          
          const geometry = new IcosahedronGeometry(radius, detail);
          const material = new MeshBasicMaterial();    
          
          
          window.gizmoTarget = new Mesh(geometry,material);
          window.gizmo.attach( window.gizmoTarget );
          this.scene.add(window.gizmo);    
          this.scene.add(window.gizmoTarget);    
          

    }

    this.renderPass =  new RenderPass( this.scene, this.defaultCamera );

    this.composer.addPass( this.renderPass );


				// var afterimagePass = new AfterimagePass();
				// this.composer.addPass( afterimagePass );
        
        // window.glitchPass = new GlitchPass();
        // this.composer.addPass( window.glitchPass );
        
        window.afterImage = new AfterimagePass();
        window.afterImage.enabled = false;

        this.composer.addPass( window.afterImage );

        // going to need 
        // bloom for hot pipes
        // frame buffer for stress (rotate camera too)
        // depth of field

        const params = {
          exposure: 1,
          bloomStrength: 1.5,
          bloomThreshold: 0,
          bloomRadius: 0.75
        };




				window.bloomPass = new UnrealBloomPass( new Vector2( el.clientWidth, el.clientHeight ), 1.5, 0.4, 0.85 );
				window.bloomPass.threshold = params.bloomThreshold;
				window.bloomPass.strength  = params.bloomStrength;
				window.bloomPass.radius    = params.bloomRadius;

        bloomPass.bloomTintColors[0].set(1.5,0,0);
        bloomPass.bloomTintColors[1].set(1.5,0,0);
        bloomPass.bloomTintColors[2].set(1.5,0,0);
        bloomPass.bloomTintColors[3].set(1.5,0,0);
        bloomPass.bloomTintColors[4].set(1.5,0,0);

        
        
				this.composer.addPass( bloomPass );
        



        window.mechanicalStressShader = new ShaderPass( MechanicalStressShader );
        window.mechanicalStressShader.renderToScreen = true;
        this.composer.addPass( window.mechanicalStressShader );

        

        
        this.pmremGenerator = new PMREMGenerator( this.renderer );
        this.pmremGenerator.compileEquirectangularShader();
        


    if(window._USING_CONTROLS){
      
            this.controls = new OrbitControls( this.defaultCamera, this.renderer.domElement );
            this.controls.screenSpacePanning = true;

            this.controls.enableZoom      = false;
            this.controls.autoRotate      = true;
            this.controls.enableDamping   = true;
            this.controls.autoRotateSpeed = DEFAULT_AUTOROTATESPEED;
      
          window.controls = this.controls;
    }
    window.set_using_controls = this.set_using_controls;

    // this.vignette = createBackground({
    //   aspect: this.defaultCamera.aspect,
    //   grainScale: IS_IOS ? 0 : 0.001, // mattdesl/three-vignette-background#1
    //   colors: [this.state.bgColor1, this.state.bgColor2]
    // });
    // this.vignette.name = 'Vignette';
    // this.vignette.renderOrder = -1;

    this.el.appendChild(this.renderer.domElement);

    this.cameraCtrl = null;
    this.cameraFolder = null;
    this.animFolder = null;
    this.animCtrls = [];
    this.morphFolder = null;
    this.morphCtrls = [];
    this.skeletonHelpers = [];
    this.gridHelper = null;
    this.axesHelper = null;

    this.addAxesHelper();
    this.addGUI();
    if (options.kiosk) this.gui.close();

    this.animate = this.animate.bind(this);
    requestAnimationFrame( this.animate );
    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();
  }

  translate ( dom, x, y ) {

    const style = dom.style;
      style.transform = `translate(${x}px,${y}px)`;
  }


  island_track (island) {

    island.getWorldPosition(this.tempV);

    this.tempV.project(this.activeCamera);

    const {clientHeight, clientWidth} = this.el.parentElement;

    const x = (this.tempV.x *  .5 + .5) * clientWidth;
    const y = (this.tempV.y * -.5 + .5) * clientHeight - 120;

    const { icon, label, height } = island.map_dom;

    this.translate(icon , x - 10 , y );
    this.translate(label, x      , y - height );

    
  }

  animate (time) {

    requestAnimationFrame( this.animate );

    const dt = (time - this.prevTime) / 1000;

    
    switch (this.anchor) {

      // case 'introducing': 


      // break;
      // case 'size': 

      // break;

      case 'rugged': 
                      this.group.rotation.x = 0.1 * Math.sin(0.001 * time);
                      this.group.position.y = 5.0 * Math.sin(0.00169 * time);
                      this.group.position.z = 5.0 * Math.sin(0.00042 * time);
      break;
      // case 'fireproof': 

      // break;
      // case 'metal': 

      // break;
      // case 'welding': 

      // break;
      // case 'pressure': 

      // break;
      // case 'integrity': 

      // break;
      // case 'cost': 

      // break;
      // case 'type': 

      // break;
      // case 'patented': 
 
      // break;
      // case 'installation': 

      // break;
      // case 'safer': 

      // break;
      // case 'benefits': 

      // break;


    default:
      break;
  }



  

    //this.scene.rotation.z = 5.0 * Math.sin(0.0001 * time);

    window._USING_CONTROLS && this.controls.update();
    this.stats.update();
    this.mixer && this.mixer.update(dt);
    this.render();

    this.prevTime = time;

  }


  //this.moveCamera = (arg) => {

    // moon.rotation.x += 0.05;
    // moon.rotation.y += 0.075;
    // moon.rotation.z += 0.05;
  
    // jeff.rotation.y += 0.01;
    // jeff.rotation.z += 0.01;
  
    // camera.position.z = t * -0.01;
    // camera.position.x = t * -0.0002;
    // camera.rotation.y = t * -0.0002;
  //}
  
  
 

  set_using_controls = (using)=>{

    window._USING_CONTROLS = using;

    if(using){
      this.renderer.domElement.removeEventListener( 'wheel', window.scroll_arg );

      var current_position = this.defaultCamera.position.clone();

      if(!this.controls){
        window.controls = this.controls = new OrbitControls( defaultCamera, renderer.domElement );
      }

      this.controls.enabled = true;
      this.controls.position0.set(current_position);
      this.controls.reset();
      this.controls.enablePan = false;

     // this.controls.target0
    }else{
  
      this.set_seyshelles_orbit_camera_postition();
    }
  
  }

 
    render () {



      switch (this.anchor) {

        // case 'introducing': 


        // break;
        case 'size': 

                this.island_track(this.islands['ptone_row_item_2_3' ]);
                this.island_track(this.islands['flange_row_item_2_2']);
                
                break;
                
        case 'rugged': 
             //  this.island_track(this.islands['gold_ring_0']);
                
        break;
        // case 'fireproof': 

        // break;
        // case 'metal': 

        // break;
        // case 'welding': 

        // break;
        // case 'pressure': 

        // break;
        // case 'integrity': 

        // break;
        // case 'cost': 

        // break;
        // case 'type': 

        // break;
        // case 'patented': 
  
        // break;
        // case 'installation': 

        // break;
        // case 'safer': 

        // break;
        // case 'benefits': 

        // break;


      default:
        break;
    }
    
    if ( window.composer_enabled ) {

      this.composer.render();

    } else {

      this.renderer.render( this.scene, this.defaultCamera );

    }



    if (this.state.grid) {
      this.axesCamera.position.copy(this.defaultCamera.position)
      this.axesCamera.lookAt(this.axesScene.position)
      this.axesRenderer.render( this.axesScene, this.axesCamera );
    }
  }

  resize () {

    const {clientHeight, clientWidth} = this.el.parentElement;

    this.defaultCamera.aspect = clientWidth / clientHeight;
    this.defaultCamera.updateProjectionMatrix();
    this.renderer.setSize(clientWidth, clientHeight);
    this.composer.setSize(clientWidth,clientHeight);




    this.axesCamera.aspect = this.axesDiv.clientWidth / this.axesDiv.clientHeight;
    this.axesCamera.updateProjectionMatrix();
    this.axesRenderer.setSize(this.axesDiv.clientWidth, this.axesDiv.clientHeight);
  }



  load ( url, rootPath, assetMap ) {

    const baseURL = LoaderUtils.extractUrlBase(url);

    // Load.
    return new Promise((resolve, reject) => {

      const manager = new LoadingManager();

      // Intercept and override relative URLs.
      manager.setURLModifier((url, path) => {

        // URIs in a glTF file may be escaped, or not. Assume that assetMap is
        // from an un-escaped source, and decode all URIs before lookups.
        // See: https://github.com/donmccurdy/three-gltf-viewer/issues/146
        const normalizedURL = rootPath + decodeURI(url)
          .replace(baseURL, '')
          .replace(/^(\.?\/)/, '');

        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
          const blobURL = URL.createObjectURL(blob);
          blobURLs.push(blobURL);
          return blobURL;
        }

        return (path || '') + url;

      });

      const loader = new GLTFLoader( manager )
        .setCrossOrigin('anonymous')
        .setDRACOLoader(
          new DRACOLoader( manager ).setDecoderPath( silverless_folder_path + 'assets/wasm/' )
        )
        .setKTX2Loader(
          new KTX2Loader( manager )
            .setTranscoderPath( silverless_folder_path + 'assets/wasm/' )
            .detectSupport( this.renderer )
        )
        .setMeshoptDecoder( MeshoptDecoder );

      const blobURLs = [];

      loader.load(url, (gltf) => {

        const scene = gltf.scene || gltf.scenes[0];
        const clips = gltf.animations || [];

        if (!scene) {
          // Valid, but not supported by this viewer.
          throw new Error(
            'This model contains no scene, and cannot be viewed here. However,'
            + ' it may contain individual 3D resources.'
          );
        }

        this.setContent(scene, clips);

        blobURLs.forEach(URL.revokeObjectURL);

        // See: https://github.com/google/draco/issues/349
        // DRACOLoader.releaseDecoderModule();

        resolve(gltf);

      }, undefined, reject);

    });

  }

  island_visible(name, visible){

    const dom = this.islands[name]?.map_dom?.dom;
    if(dom) dom.style.visibility = visible ? 'visible' : 'hidden';

  }

  set_anchor (anchor) {

    this.anchor = anchor;

    console.log('set anchor' , anchor );

    window.afterImage.enabled = anchor == 'rugged';
    window.afterImage.uniforms['damp'].value = (anchor == 'rugged') ? 0.84 : 0.1;
    window.bloomPass.enabled = anchor == 'fireproof';

    this.controls.autoRotate = anchor !== 'rugged';

    const installation = anchor === 'installation';

    this.Flange .visible =  installation
    this.PT1    .visible = !installation;
    
    window.mechanicalStressShader.enabled = installation;
    
    this.scene.environment = installation ? null : this.envMap;
    this.defaultCamera.children[0].visible = !installation;

    this.stress_objects.forEach(installation ? this.stress_material : this.restore_material);



    if(anchor !== 'size'){

      PTOneRows.visible = false;
      FlangeRows.visible = false;

      this.island_visible('ptone_row_item_2_3'  , false);
      this.island_visible('flange_row_item_2_2' , false);
  

      if(this.intervalId){ clearInterval(this.intervalId); this.intervalId = null; }
    } 
    else {
      
      this.PTOneRows.children.forEach( (c)=>c.visible = false);
      this.FlangeRows.children.forEach((c)=>c.visible = false);

      this.PTOneRows.visible  = true;
      this.FlangeRows.visible = true;

      this.FlangeRows.getObjectByName(0).visible = true;
      this.PTOneRows.getObjectByName(0).visible = true;

      this.step_animation_counter = 1;
      


      this.intervalId = setInterval(()=>{

        console.log( 'interval', this.step_animation_counter );

        const flange = this.FlangeRows.getObjectByName(this.step_animation_counter); 
        const PTone  = this.PTOneRows.getObjectByName(this.step_animation_counter); 

        if(flange) flange.visible = true;
        if(PTone)  PTone.visible = true;

        this.step_animation_counter ++;

        if(this.step_animation_counter > 4) {
          this.island_visible('ptone_row_item_2_3'  , true);
          this.island_visible('flange_row_item_2_2' , true);
          clearInterval(this.intervalId);
        }

      }, INTERVAL_DURATION_FOR_ROWS_ANIMATION);
    }

    


    // anchor == 'fireproof' ? bloomPass.bloomTintColors[0].set(1.5,0,0) : bloomPass.bloomTintColors[0].set(1,1,1);
    // anchor == 'fireproof' ? bloomPass.bloomTintColors[1].set(1.5,0,0) : bloomPass.bloomTintColors[1].set(1,1,1);
    // anchor == 'fireproof' ? bloomPass.bloomTintColors[2].set(1.5,0,0) : bloomPass.bloomTintColors[2].set(1,1,1);
    // anchor == 'fireproof' ? bloomPass.bloomTintColors[3].set(1.5,0,0) : bloomPass.bloomTintColors[3].set(1,1,1);
    // anchor == 'fireproof' ? bloomPass.bloomTintColors[4].set(1.5,0,0) : bloomPass.bloomTintColors[4].set(1,1,1);


    this
    .set_position(this.scene, { x: 0, y: 0, z: 0 } )
    .set_rotation(this.scene, { _x: 0, _y: 0, _z: 0, _order: "XYZ" } )
    .set_quaternion(this.scene, { _x: 0, _y: 0, _z: 0, _w: 0 })
    

     

  }


  load_silverless ( url ) {

    // Load.
    return new Promise((resolve, reject) => {

      const loader = new GLTFLoader()
        .setPath(silverless_folder_path)
        .setCrossOrigin('anonymous')
        .setDRACOLoader(
          new DRACOLoader(  ).setDecoderPath( silverless_folder_path + 'assets/wasm/' )
        )
        .setKTX2Loader(
          new KTX2Loader(  )
            .setTranscoderPath( silverless_folder_path + 'assets/wasm/' )
            .detectSupport( this.renderer )
        )
        .setMeshoptDecoder( MeshoptDecoder );

      const blobURLs = [];

      loader.load(url, (gltf) => {

        const scene = gltf.scene || gltf.scenes[0];
        const clips = gltf.animations || [];

        if (!scene) {
          // Valid, but not supported by this viewer.
          throw new Error(
            'This model contains no scene, and cannot be viewed here. However,'
            + ' it may contain individual 3D resources.'
          );
        }


        this.setContent(scene, clips);

        blobURLs.forEach(URL.revokeObjectURL);

        // See: https://github.com/google/draco/issues/349
        // DRACOLoader.releaseDecoderModule();

        resolve(gltf);

      }, undefined, reject);

    });

  }

  get_new_loader () {

    return new GLTFLoader()
    .setPath(silverless_folder_path)
    .setCrossOrigin('anonymous')
    .setDRACOLoader(
      new DRACOLoader(  ).setDecoderPath( silverless_folder_path + 'assets/wasm/' )
    )
    .setKTX2Loader(
      new KTX2Loader(  )
        .setTranscoderPath( silverless_folder_path + 'assets/wasm/' )
        .detectSupport( this.renderer )
    )
    .setMeshoptDecoder( MeshoptDecoder );

  }

  loadModel(url) {
    return new Promise(resolve => {
      this.get_new_loader().load(url, resolve);
    });
  }



  


  load_silverless3 ( url1 , url2 , url3) {


      const environment = environments.filter((entry) => entry.name === this.state.environment)[0];

      return Promise.all([
        this.loadModel(url1),
        this.loadModel(url2),
        this.loadModel(url3),
        this.getCubeMapTexture( environment )
      ]).then(values =>{

        console.log('values', values);

        const k = 229.5;
        const l = 64;
        const m = 64;

        window.gltf0    = values[0];
        window.gltf1    = values[1];
        window.gltf2    = values[2];
        window.envMap   = values[3].envMap;

        this.scene.environment = this.envMap = window.envMap;
//      this.scene.background  = this.state.background ? envMap : null;

        window.islands = this.islands = {};


        window.pipe   = this.pipe   = window.gltf0.scene.getObjectByName('short');
        window.heaven = this.heaven = window.gltf0.scene.getObjectByName('heaven');
        
        window.PT1    = this.PT1    = window.gltf1.scene; //.getObjectByName('PT1');
        window.Flange = this.Flange = window.gltf2.scene.getObjectByName('Flange');

        window.pipe2  = this.pipe2  = this.pipe.clone();
        window.heaven2= this.heaven2= this.heaven.clone();
        
        
        this.pipe    .position.z =  k;
        this.pipe2   .position.z = -k;

        this.heaven  .position.z =  k + LITTLE_BIT_OF_A_GAP;
        this.heaven2 .position.z = -k - LITTLE_BIT_OF_A_GAP;
        
        this.heaven  .position.x = -5;
        this.heaven2 .position.x = -5;


        
        console.log('pipe'  ,  this.pipe  );
        console.log('pipe2' ,  this.pipe2 );

        console.log('heaven'  ,  this.heaven  );
        console.log('heaven2' ,  this.heaven2 );

        console.log('PT1'   ,  this.PT1   );
        console.log('Flange',  this.Flange);
        

        this._PT1_visible('path1011'             ,  false);
        this._PT1_visible('gold_ring_0'          ,  false);
        this._PT1_visible('gold_ring_1'          ,  false);
        this._PT1_visible('gold_ring_2'          ,  false);
        this._PT1_visible('gold_ring_3'          ,  false);



        window.group = this.group = new Group();
        
        this.group.name = "main";
        
        this.group.add(this.pipe  );
        this.group.add(this.pipe2 );

        this.group.add(this.heaven  );
        this.group.add(this.heaven2 );

        this.group.add(this.PT1   );
        this.group.add(this.Flange);
        
        
        this.PT1.position.x = 10;

        //for ( var alpha = 0, alphaIndex = 0; alpha <= 1.0; alpha += stepSize, alphaIndex ++ ) {

        const using_toon_shader = false;

        
        var alpha = 0.9;
        var alphaIndex = 8;
        var colors = new Uint8Array( alphaIndex + 2 );
        for ( var c = 0; c <= colors.length; c ++ ) {
          
          colors[ c ] = ( c / colors.length ) * 256;
          
        }
        
        var gradientMap = new DataTexture( colors, colors.length, 1, LuminanceFormat );
        gradientMap.minFilter = NearestFilter;
        gradientMap.magFilter = NearestFilter;
        gradientMap.generateMipmaps = false;
        
        //for ( var beta = 0; beta <= 1.0; beta += stepSize ) {
          // for ( var gamma = 0; gamma <= 1.0; gamma += stepSize ) {
            
            var beta = 2;
            var gamma = 2;
            
            // basic monochromatic energy preservation
            var diffuseColor = new Color().setHSL( alpha, 0.5, gamma * 0.5 + 0.1 ).multiplyScalar( 1 - beta * 0.2 );
            
            var toonMaterial = new MeshToonMaterial( {
              color: diffuseColor,
              gradientMap: gradientMap
            } );

      window.toonMaterial = toonMaterial;
            
				// material

				const shaderMaterial = new RawShaderMaterial( {

					uniforms: {
						time: { value: 1.0 },
            'uDirLightPos': { value: new Vector3(10,10,10) },
            'uDirLightColor': { value: new Color( 0xeeeeee ) },
        
            'uAmbientLightColor': { value: new Color( 0x050505 ) },
        
            'uBaseColor' : { value: new Color( 0x00ff00 ) },
            'uLineColor1': { value: new Color( 0x808080 ) },
            'uLineColor2': { value: new Color( 0x0000ff ) },
            'uLineColor3': { value: new Color( 0xf00f00 ) },
            'uLineColor4': { value: new Color( 0x0f000f ) }


					},
					vertexShader    : document.getElementById( 'vertexShader' ).textContent,
					fragmentShader  : document.getElementById( 'fragmentShader' ).textContent,
					side            : DoubleSide,
					transparent     : false

				} );

        window.shaderMaterial = shaderMaterial;

        
        // if(using_toon_shader){
        //     this.Flange.children[0].material = toonMaterial;
        // }else{
        //     window.shaderMaterial = this.Flange.children[0].material = shaderMaterial;
        // }

        window.pointLight1 = new PointLight( 0xffffff, 800, 1000 );
        window.pointLight1.position.set( 10, 120, 170 );
        scene.add( window.pointLight1 );

        window.pointLight2 = new PointLight( 0xffffff, 600, 1000 );
        window.pointLight2.position.set( 10, 0,  170 );
        scene.add( window.pointLight2 );

        window.pointLight3 = new PointLight( 0xffffff, 600, 1000 );
        window.pointLight3.position.set( 10, 0, -170 );
        scene.add( window.pointLight3 );
        
        
        // const sphereSize = 250;
        // window.pointLightHelper = new PointLightHelper( window.pointLight, sphereSize );
        // scene.add( window.pointLightHelper );
        
        window.meshPhongMaterial = new MeshPhongMaterial({ shininess : 0, reflectivity : 0 });
        window.meshPhongMaterial.color.setRGB(0.4,0.4,0.4);

        this.backup_material  = obj =>  obj.backup_material = obj.material;
        this.restore_material = obj =>                        obj.material = obj.backup_material;
        this.stress_material  = obj =>                        obj.material = window.meshPhongMaterial;

        this.stress_objects = [  this.pipe , this.pipe2, this.Flange.children[0], this.Flange.children[1]  ];
        this.stress_objects.forEach(this.backup_material);



        const add_to_islands = (islands, item) => {

          islands[item.name] = item;

          const dom    = document.getElementById(item.name);
          const icon   = dom.querySelector('img');
          const label  = dom.querySelector('.floating-label');
          const height = label.clientHeight;
          item.map_dom = { dom, icon, label, height }

          console.log('island', item.name, item.map_dom);
        }


        const make_row = (name, depth, item, left, islands) => {

          const group = new Group();

          const pipe1 = this.pipe.clone();
          const item2 = item.clone()
          const pipe3 = this.pipe.clone();

          pipe1.name = name + '_row_pipe_1_' + depth;
          item2.name = name + '_row_item_2_' + depth;
          pipe3.name = name + '_row_pipe_3_' + depth;

          if(islands) add_to_islands(islands, item2);
          


          pipe1.position.z =  left ? k : -k;
          pipe3.position.z = !left ? k : -k;

          if(name === 'flange'){

            item2.position.z =  left ? l : -(k-l);
            group.position.y = (depth - 3) * 256;
            
          }else{

            item2.position.z =  left ? (k-m) : -(k-m);

            group.position.y = (depth - 3) * (256-64) - 3 * 64;

            // item2.rotateX(1.5707964611537577);

          }

          group.add(pipe1);
          group.add(item2);
          group.add(pipe3);

          group.name = depth;

          return group;

        }

        const flange_row = (depth, left, islands) => make_row('flange', depth, this.Flange, left, islands); 
        const ptone_row  = (depth, left, islands) => make_row('ptone' , depth, this.PT1   , left, islands); 


        window.FlangeRows = this.FlangeRows = new Group();
        
        this.FlangeRows.add( flange_row(0, true ) ).add( flange_row(1, false ) ).add( flange_row(2, true, this.islands ) );

        
        window.PTOneRows  = this.PTOneRows  = new Group();
        
        this.PTOneRows.add( ptone_row(0, false ) ).add( ptone_row(1, true ) ).add( ptone_row(2, false ) ).add( ptone_row(3, true, this.islands ) );
        

        this.FlangeRows.position.z =  2.2 * k;
        this.PTOneRows .position.z = -2.2 * k;
        
        this.FlangeRows.position.y = 
        this.PTOneRows .position.y = 200;
        
        
				scene.add( this.FlangeRows ).add( this.PTOneRows );



        // const gltf = values[0];
        // const scene = gltf.scene || gltf.scenes[0];
        // const clips = gltf.animations || [];
        // this.setContent(scene, clips);
        
        this.setContent(this.group, []);


      setTimeout( window.setup_and_run_fullpage, 50 );

      });

  }





  /**
   * @param {THREE.Object3D} object
   * @param {Array<THREE.AnimationClip} clips
   */
  setContent ( object, clips ) {

    this.clear();

    const box = new Box3().setFromObject(object);
    const size = box.getSize(new Vector3()).length();
    const center = box.getCenter(new Vector3());

    if(window._USING_CONTROLS){
      
      this.controls.reset();
    }  

    object.position.x += (object.position.x - center.x);
    object.position.y += (object.position.y - center.y);
    object.position.z += (object.position.z - center.z);

    window.defaultCamera = this.defaultCamera;

    if(window._USING_CONTROLS){

      this.controls.maxDistance = size * 10;
      this.defaultCamera.near = size / 100;
      this.defaultCamera.far = size * 100;
      this.defaultCamera.updateProjectionMatrix();



      if (this.options.cameraPosition) {

        this.defaultCamera.position.fromArray( this.options.cameraPosition );
        this.defaultCamera.lookAt( new Vector3() );

      } else {

        this.defaultCamera.position.copy(center);
        this.defaultCamera.position.x += size / 2.0;
        this.defaultCamera.position.y += size / 5.0;
        this.defaultCamera.position.z += size / 2.0;
        this.defaultCamera.lookAt(center);

      }
    }

    this.setCamera(DEFAULT_CAMERA);

    this.axesCamera.position.copy(this.defaultCamera.position)
    this.axesCamera.lookAt(this.axesScene.position)
    this.axesCamera.near = size / 100;
    this.axesCamera.far = size * 100;
    this.axesCamera.updateProjectionMatrix();
    this.axesCorner.scale.set(size, size, size);

    if(window._USING_CONTROLS){
      this.controls.saveState();
    }

    this.scene.add(object);
    this.content = object;

    this.state.addLights = true;

    this.content.traverse((node) => {
      if (node.isLight) {
        this.state.addLights = false;
      } else if (node.isMesh) {
        // TODO(https://github.com/mrdoob/three.js/pull/18235): Clean up.
        node.material.depthWrite = !node.material.transparent;
      }
    });

    this.setClips(clips);

    this.updateLights();
    this.updateGUI();
    this.updateEnvironment();
    this.updateTextureEncoding();
    this.updateDisplay();

    window.content = this.content;
    console.info('[glTF Viewer] THREE.Scene exported as `window.content`.');
    this.printGraph(this.content);

  }

  printGraph (node) {

    console.group(' <' + node.type + '> ' + node.name);
    node.children.forEach((child) => this.printGraph(child));
    console.groupEnd();

  }

  /**
   * @param {Array<THREE.AnimationClip} clips
   */
  setClips ( clips ) {
    if (this.mixer) {
      this.mixer.stopAllAction();
      this.mixer.uncacheRoot(this.mixer.getRoot());
      this.mixer = null;
    }

    this.clips = clips;
    if (!clips.length) return;

    this.mixer = new AnimationMixer( this.content );
  }

  playAllClips () {
    this.clips.forEach((clip) => {
      this.mixer.clipAction(clip).reset().play();
      this.state.actionStates[clip.name] = true;
    });
  }

  /**
   * @param {string} name
   */
  setCamera ( name ) {
    if (name === DEFAULT_CAMERA) {

      if(window._USING_CONTROLS){

        this.controls.enabled = true;
      }

      this.activeCamera = this.defaultCamera;
    } else {
      this.controls.enabled = false;
      this.content.traverse((node) => {
        if (node.isCamera && node.name === name) {
          this.activeCamera = node;
        }
      });
    }
  }

  updateTextureEncoding () {
    const encoding = this.state.textureEncoding === 'sRGB'
      ? sRGBEncoding
      : LinearEncoding;
    traverseMaterials(this.content, (material) => {
      if (material.map) material.map.encoding = encoding;
      if (material.emissiveMap) material.emissiveMap.encoding = encoding;
      if (material.map || material.emissiveMap) material.needsUpdate = true;
    });
  }

  updateLights () {
    const state = this.state;
    const lights = this.lights;

    if (state.addLights && !lights.length) {
      this.addLights();
    } else if (!state.addLights && lights.length) {
      this.removeLights();
    }

    this.renderer.toneMappingExposure = state.exposure;

    if (lights.length === 2) {
      lights[0].intensity = state.ambientIntensity;
      lights[0].color.setHex(state.ambientColor);
      lights[1].intensity = state.directIntensity;
      lights[1].color.setHex(state.directColor);
    }
  }

  addLights () {
    const state = this.state;
    const using_ambient_light = false;

    if (this.options.preset === Preset.ASSET_GENERATOR) {
      const hemiLight = new HemisphereLight();
      hemiLight.name = 'hemi_light';
      this.scene.add(hemiLight);
      this.lights.push(hemiLight);
      return;
    }

    if(using_ambient_light){
      
          const light1  = new AmbientLight(state.ambientColor, state.ambientIntensity);
          light1.name = 'ambient_light';
          this.defaultCamera.add( light1 );
    }


    const light2  = new DirectionalLight(state.directColor, state.directIntensity);
    light2.position.set(0.5, 0, 0.866); // ~60º
    light2.name = 'main_light';

    light2.castShadow = true;

    this.defaultCamera.add( light2 );

    using_ambient_light ? this.lights.push(light1, light2) : this.lights.push(light2);
  }

  removeLights () {

    this.lights.forEach((light) => light.parent.remove(light));
    this.lights.length = 0;

  }

  updateEnvironment () {

    /* moving the loading of the environment to the model load promise-all for simple syncing of init 


    // return; ////////////// disable environment

    const environment = environments.filter((entry) => entry.name === this.state.environment)[0];

    this.getCubeMapTexture( environment ).then(( { envMap } ) => {

      // if ((!envMap || !this.state.background) && this.activeCamera === this.defaultCamera) {
      //   this.scene.add(this.vignette);
      // } else {
      //   this.scene.remove(this.vignette);
      // }

      this.scene.environment = this.envMap = envMap;

      this.scene.background = this.state.background ? envMap : null;

    });

    */
  }

  getCubeMapTexture ( environment ) {
    const { path } = environment;

    // no envmap
    if ( ! path ) return Promise.resolve( { envMap: null } );

    return new Promise( ( resolve, reject ) => {

      new RGBELoader()
        .setDataType( UnsignedByteType )
        .load( path, ( texture ) => {

          const envMap = this.pmremGenerator.fromEquirectangular( texture ).texture;
          this.pmremGenerator.dispose();

          resolve( { envMap } );

        }, undefined, reject );

    });

  }

  updateDisplay () {
    if (this.skeletonHelpers.length) {
      this.skeletonHelpers.forEach((helper) => this.scene.remove(helper));
    }

    traverseMaterials(this.content, (material) => {
      material.wireframe = this.state.wireframe;
    });

    this.content.traverse((node) => {
      if (node.isMesh && node.skeleton && this.state.skeleton) {
        const helper = new SkeletonHelper(node.skeleton.bones[0].parent);
        helper.material.linewidth = 3;
        this.scene.add(helper);
        this.skeletonHelpers.push(helper);
      }
    });

    if (this.state.grid !== Boolean(this.gridHelper)) {
      if (this.state.grid) {
        this.gridHelper = new GridHelper();
        this.axesHelper = new AxesHelper();
        this.axesHelper.renderOrder = 999;
        this.axesHelper.onBeforeRender = (renderer) => renderer.clearDepth();
        this.scene.add(this.gridHelper);
        this.scene.add(this.axesHelper);
      } else {
        this.scene.remove(this.gridHelper);
        this.scene.remove(this.axesHelper);
        this.gridHelper = null;
        this.axesHelper = null;
        this.axesRenderer.clear();
      }
    }
  }

  updateBackground () {
 //   this.vignette.style({colors: [this.state.bgColor1, this.state.bgColor2]});
  }

  /**
   * Adds AxesHelper.
   *
   * See: https://stackoverflow.com/q/16226693/1314762
   */
  addAxesHelper () {
    this.axesDiv = document.createElement('div');
    this.el.appendChild( this.axesDiv );
    this.axesDiv.classList.add('axes');

    const {clientWidth, clientHeight} = this.axesDiv;

    this.axesScene = new Scene();
    this.axesCamera = new PerspectiveCamera( 50, clientWidth / clientHeight, 0.1, 10 );
    this.axesScene.add( this.axesCamera );

    this.axesRenderer = new WebGLRenderer( { alpha: true } );
    this.axesRenderer.setPixelRatio( window.devicePixelRatio );
    this.axesRenderer.setSize( this.axesDiv.clientWidth, this.axesDiv.clientHeight );

    this.axesCamera.up = this.defaultCamera.up;

    this.axesCorner = new AxesHelper(5);
    this.axesScene.add( this.axesCorner );
    this.axesDiv.appendChild(this.axesRenderer.domElement);
  }

  addGUI () {

    const gui = this.gui = new GUI({autoPlace: false, width: 260, hideable: true});

    // Display controls.
    const dispFolder = gui.addFolder('Display');
    const envBackgroundCtrl = dispFolder.add(this.state, 'background');
    envBackgroundCtrl.onChange(() => this.updateEnvironment());
    const wireframeCtrl = dispFolder.add(this.state, 'wireframe');
    wireframeCtrl.onChange(() => this.updateDisplay());
    const skeletonCtrl = dispFolder.add(this.state, 'skeleton');
    skeletonCtrl.onChange(() => this.updateDisplay());
    const gridCtrl = dispFolder.add(this.state, 'grid');
    gridCtrl.onChange(() => this.updateDisplay());

    if(window._USING_CONTROLS){

      dispFolder.add(this.controls, 'autoRotate');
      dispFolder.add(this.controls, 'screenSpacePanning');
    }


    const bgColor1Ctrl = dispFolder.addColor(this.state, 'bgColor1');
    const bgColor2Ctrl = dispFolder.addColor(this.state, 'bgColor2');
    bgColor1Ctrl.onChange(() => this.updateBackground());
    bgColor2Ctrl.onChange(() => this.updateBackground());

    // Lighting controls.
    const lightFolder = gui.addFolder('Lighting');
    const encodingCtrl = lightFolder.add(this.state, 'textureEncoding', ['sRGB', 'Linear']);
    encodingCtrl.onChange(() => this.updateTextureEncoding());
    lightFolder.add(this.renderer, 'outputEncoding', {sRGB: sRGBEncoding, Linear: LinearEncoding})
      .onChange(() => {
        this.renderer.outputEncoding = Number(this.renderer.outputEncoding);
        traverseMaterials(this.content, (material) => {
          material.needsUpdate = true;
        });
      });
    const envMapCtrl = lightFolder.add(this.state, 'environment', environments.map((env) => env.name));
    envMapCtrl.onChange(() => this.updateEnvironment());
    [
      lightFolder.add(this.state, 'exposure', 0, 2),
      lightFolder.add(this.state, 'addLights').listen(),
      lightFolder.add(this.state, 'ambientIntensity', 0, 2),
      lightFolder.addColor(this.state, 'ambientColor'),
      lightFolder.add(this.state, 'directIntensity', 0, 4), // TODO(#116)
      lightFolder.addColor(this.state, 'directColor')
    ].forEach((ctrl) => ctrl.onChange(() => this.updateLights()));

    // Animation controls.
    this.animFolder = gui.addFolder('Animation');
    this.animFolder.domElement.style.display = 'none';
    const playbackSpeedCtrl = this.animFolder.add(this.state, 'playbackSpeed', 0, 1);
    playbackSpeedCtrl.onChange((speed) => {
      if (this.mixer) this.mixer.timeScale = speed;
    });
    this.animFolder.add({playAll: () => this.playAllClips()}, 'playAll');

    // Morph target controls.
    this.morphFolder = gui.addFolder('Morph Targets');
    this.morphFolder.domElement.style.display = 'none';

    // Camera controls.
    this.cameraFolder = gui.addFolder('Cameras');
    this.cameraFolder.domElement.style.display = 'none';

    // Stats.
    const perfFolder = gui.addFolder('Performance');
    const perfLi = document.createElement('li');
    this.stats.dom.style.position = 'static';
    perfLi.appendChild(this.stats.dom);
    perfLi.classList.add('gui-stats');
    perfFolder.__ul.appendChild( perfLi );

    const guiWrap = document.createElement('div');
    this.el.appendChild( guiWrap );
    guiWrap.classList.add('gui-wrap');
    guiWrap.appendChild(gui.domElement);
    gui.open();

  }

  updateGUI () {
    this.cameraFolder.domElement.style.display = 'none';

    this.morphCtrls.forEach((ctrl) => ctrl.remove());
    this.morphCtrls.length = 0;
    this.morphFolder.domElement.style.display = 'none';

    this.animCtrls.forEach((ctrl) => ctrl.remove());
    this.animCtrls.length = 0;
    this.animFolder.domElement.style.display = 'none';

    const cameraNames = [];
    const morphMeshes = [];
    this.content.traverse((node) => {
      if (node.isMesh && node.morphTargetInfluences) {
        morphMeshes.push(node);
      }
      if (node.isCamera) {
        node.name = node.name || `VIEWER__camera_${cameraNames.length + 1}`;
        cameraNames.push(node.name);
      }
    });

    if (cameraNames.length) {
      this.cameraFolder.domElement.style.display = '';
      if (this.cameraCtrl) this.cameraCtrl.remove();
      const cameraOptions = [DEFAULT_CAMERA].concat(cameraNames);
      this.cameraCtrl = this.cameraFolder.add(this.state, 'camera', cameraOptions);
      this.cameraCtrl.onChange((name) => this.setCamera(name));
    }

    if (morphMeshes.length) {
      this.morphFolder.domElement.style.display = '';
      morphMeshes.forEach((mesh) => {
        if (mesh.morphTargetInfluences.length) {
          const nameCtrl = this.morphFolder.add({name: mesh.name || 'Untitled'}, 'name');
          this.morphCtrls.push(nameCtrl);
        }
        for (let i = 0; i < mesh.morphTargetInfluences.length; i++) {
          const ctrl = this.morphFolder.add(mesh.morphTargetInfluences, i, 0, 1, 0.01).listen();
          Object.keys(mesh.morphTargetDictionary).forEach((key) => {
            if (key && mesh.morphTargetDictionary[key] === i) ctrl.name(key);
          });
          this.morphCtrls.push(ctrl);
        }
      });
    }

    if (this.clips.length) {
      this.animFolder.domElement.style.display = '';
      const actionStates = this.state.actionStates = {};
      this.clips.forEach((clip, clipIndex) => {
        // Autoplay the first clip.
        let action;
        if (clipIndex === 0) {
          actionStates[clip.name] = true;
          action = this.mixer.clipAction(clip);
          action.play();
        } else {
          actionStates[clip.name] = false;
        }

        // Play other clips when enabled.
        const ctrl = this.animFolder.add(actionStates, clip.name).listen();
        ctrl.onChange((playAnimation) => {
          action = action || this.mixer.clipAction(clip);
          action.setEffectiveTimeScale(1);
          playAnimation ? action.play() : action.stop();
        });
        this.animCtrls.push(ctrl);
      });
    }
  }

  clear () {

    if ( !this.content ) return;

    this.scene.remove( this.content );

    // dispose geometry
    this.content.traverse((node) => {

      if ( !node.isMesh ) return;

      node.geometry.dispose();

    } );

    // dispose textures
    traverseMaterials( this.content, (material) => {

      MAP_NAMES.forEach( (map) => {

        if (material[ map ]) material[ map ].dispose();

      } );

    } );

  }

  set_position   (target, obj) { target?.position   .set(obj.x, obj.y, obj.z);                 return this }

  set_rotation   (target, obj) { target?.rotation   .set(obj._x, obj._y, obj._z, obj?._order); return this }

  set_quaternion (target, obj) { target?.quaternion .set(obj._x, obj._y, obj._z, obj._w);      return this }


  camera_position    (obj) { return this.set_position(this.defaultCamera  , obj) }

  camera_rotation    (obj) { return this.set_rotation(this.defaultCamera  , obj) }

  camera_quaternion  (obj) { return this.set_quaternion(this.defaultCamera, obj) }


  scale_to_top () {

    ///console.log('scale to top');

    this.FlangeRows.visible = false;
    this.PTOneRows .visible = false;
    this.scene.getObjectByName('main').visible = true;


    // return this
    // .set_position(defaultCamera, { x: 248.91816168066524, y: 102.78006127214093, z: 257.8721258903753 } )
    // .set_rotation(defaultCamera, { _x: -0.3792729040453658, _y: 0.7309773585469104, _z: 0.2600586099076709, _order: "XYZ" } )
    // .set_quaternion(defaultCamera, { _x: -0.12905338836444089, _y: 0.370862728634079, _z: 0.05212497714805605, _w: 0.9181988053896916 })
    

    return this
    .camera_position({x: 1084.5821061329725, y: 129.10931764251197, z: -75.24551147168158})
    .set_rotation(defaultCamera, {_x: -2.098476230999719, _y: 1.433876355534701, _z: 2.1025763384118505, _order: "XYZ", _onChangeCallback: ƒ})
    .set_quaternion(defaultCamera, {_x: -0.040294987106487094, _y: 0.7298906610830888, _z: 0.0431874075147682, _w: 0.6810071840369476, _onChangeCallback: ƒ});


  }
  
  scale_to_bottom ( ) {

    console.log('scale to bottom');

    this.FlangeRows.visible = false;
    this.PTOneRows .visible = false;
    this.scene.getObjectByName('main').visible = true;

    return this
    .camera_position({ x: 322.6465966397588, y: 186.86117203775356, z: 2.0252363483627636 })
    .set_rotation(defaultCamera, { _x: -1.5599585640170028, _y: 1.0458224162411818, _z: 1.5582721654322298, _order: "XYZ" } )
    .set_quaternion(defaultCamera, { _x: -0.1840455679703853, _y: 0.6807432633457641, _z: 0.1828939489308174, _w: 0.6850296648790544 })



  }

  _scale_shared (rows) {
    
    this.FlangeRows.visible = rows;
    this.PTOneRows .visible = rows;
    this.scene.getObjectByName('main').visible = !rows;
  
    this.PT1.position.x = 10;
    
    return this;

  }

  scale_out () {

    return this
    ._scale_shared(false)
    .camera_position({ x: 683.8742946093997, y: 790.9430664177894, z: -16.354783430068668 })
    .set_rotation(defaultCamera, { _x: -1.5599585640170022, _y: 1.0458224162411818, _z: 1.5582721654322291, _order: "XYZ" })
    .set_quaternion(defaultCamera, { _x: -0.18404556797038535, _y: 0.680743263345764, _z: 0.18289394893081745, _w: 0.6850296648790545 })
  
  
  }

  scale_size () {

    return this
    ._scale_shared(true)
    .camera_position({x: 1672.8546884291777, y: 767.5267226868676, z: -142.61937768036697})
    .set_rotation(defaultCamera, {_x: -1.987438840242487, _y: 1.4433497749383921, _z: 1.9904607314603184, _order: "XYZ", _onChangeCallback: ƒ})
    .set_quaternion(defaultCamera, {_x: -0.0400827852305286, _y: 0.723955762233322, _z: 0.042215247254848556, _w: 0.6873858432907568, _onChangeCallback: ƒ})

  }

  scale_rugged () {

    return this
        // ._scale_shared(false)
        // .camera_position(  { x: -1040.6254712706943, y: 24.02544384093507, z: 100.31884505823226})
        // .camera_rotation(  {_x: -0.23506348953542602, _y: -1.4719905915023666, _z: -0.23395848662053578, _order: "XYZ", _onChangeCallback: ƒ})
        // .camera_quaternion({_x: -0.008504213128602606, _y: -0.6722808534814431, _z: -0.00772381142454373, _w: 0.7402070488305309, _onChangeCallback: ƒ})
        ._scale_shared(false)
        .camera_position(  {x: -623.0609095620978, y: 14.384920709164716, z: 60.064598238093865})
        .camera_rotation(  {_x: -0.23506348953542602, _y: -1.4719905915023666, _z: -0.23395848662053578, _order: "XYZ", _onChangeCallback: ƒ})
        .camera_quaternion({_x: -0.008504213128602606, _y: -0.6722808534814431, _z: -0.00772381142454373, _w: 0.7402070488305309, _onChangeCallback: ƒ})
  }



  _reset_PT1_PQR (){

    return this
    .set_position(this.PT1, {x: 0, y: 0, z: 0})
    .set_quaternion(this.PT1, {_x: 0, _y: 0, _z: 0, _w: 1, _onChangeCallback: ƒ})
    .set_rotation(this.PT1, {_x: 0, _y: 0, _z: -0, _order: "XYZ", _onChangeCallback: ƒ} );

  }

  _PT1_visible (name, visible){

    this.PT1.getObjectByName(name).visible = visible;
    
    return this;
  }

  _reset_PT1_rugged (rugged){


    this.pipe   .visible  = this.pipe2   .visible = !rugged;
    this.heaven .visible  = this.heaven2 .visible =  rugged;

    PT1.children.filter(q => q.name.startsWith('bolt')).forEach(b => b.visible = !rugged);

    return this
    ._PT1_visible('radial_wedge_seal_0'  , !rugged)
    ._PT1_visible('radial_wedge_seal_1'  , !rugged)
    
    ._PT1_visible('joining_stock'        , !rugged)
    ._PT1_visible('joining_stock_cutaway',  rugged)
    ._PT1_visible('clamshell001'         , !rugged)
    ._PT1_visible('clamshell003'         , !rugged)

    ._PT1_visible('spigot_ring_1'        , !rugged)
    ._PT1_visible('spigot_ring_3'        , !rugged)


    ._PT1_visible('path1011'             ,  rugged)
    ._PT1_visible('gold_ring_0'          ,  rugged)
    ._PT1_visible('gold_ring_1'          ,  rugged)
    ._PT1_visible('gold_ring_2'          ,  rugged)
    ._PT1_visible('gold_ring_3'          ,  rugged)

  }
  reset_PT1 () {
    
    console.log('reset PT1');
    
    return this
    ._reset_PT1_PQR()
    ._reset_PT1_rugged(false)
    
  }
  
  rugged_PT1 (){

    console.log('rugged PT1');
    
    return this
    ._reset_PT1_PQR()
    ._reset_PT1_rugged(true)
    
  }


  _reset_installation () {


  }
  
  reset_Flange () {
    
    //console.log('reset Flange');

    if(this.Flange) this.Flange.visible = false;

    return this
    .set_position(this.Flange, {x: 0, y: 0, z: 0})
    .set_rotation(this.Flange, {_x: 0, _y: 0, _z: -0, _order: "XYZ", _onChangeCallback: ƒ} )
    .set_quaternion(this.Flange, {_x: 0, _y: 0, _z: 0, _w: 0, _onChangeCallback: ƒ});
    
    return this;
  }


  side_by_side () {

    //console.log('side by side');

    if(this.Flange) this.Flange.visible = true;

    return this
    .set_position(this.Flange, {x: 0, y: 0, z: 200})
    .set_position(this.PT1, {x: 0, y: 0, z: -200})

    return this;

  }

  autoRotateDirection (direction) {
  
    this.controls.autoRotateSpeed = direction * DEFAULT_AUTOROTATESPEED;

    return this;
  
  }

};


function traverseMaterials (object, callback) {
  object.traverse((node) => {
    if (!node.isMesh) return;
    const materials = Array.isArray(node.material)
      ? node.material
      : [node.material];
    materials.forEach(callback);
  });
}

// https://stackoverflow.com/a/9039885/1314762
function isIOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
}
