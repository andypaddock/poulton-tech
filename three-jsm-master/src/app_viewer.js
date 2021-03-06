import { WEBGL } from 'three/examples/jsm/WebGL.js';
import { Viewer } from './viewer.js';
//import { SimpleDropzone } from '../node_modules/simple-dropzone/index.js';
//import { ValidationController } from './validation-controller.js';
//import queryString from '../node_modules/query-string/index.js';

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  console.error('The File APIs are not fully supported in this browser.');
} else if (!WEBGL.isWebGLAvailable()) {
  console.error('WebGL is not supported in this browser.');
}

class App {

  /**
   * @param  {Element} el
   * @param  {Location} location
   */
  constructor (el, location) {

    const hash = {}; // location.hash ? queryString.parse(location.hash) : {};
    this.options = {
      kiosk: Boolean(hash.kiosk),
      model: hash.model || '',
      preset: hash.preset || '',
      cameraPosition: hash.cameraPosition
        ? hash.cameraPosition.split(',').map(Number)
        : null
    };

    this.el = el;
    this.viewer = null;
    this.viewerEl = null;
    this.spinnerEl = document.querySelector('.spinner');
    //.dropEl = el.querySelector('.dropzone');
    //this.inputEl = el.querySelector('#file-input');

    this.hideSpinner();

    const options = this.options;

    if (options.kiosk) {
      const headerEl = document.querySelector('header');
      headerEl.style.display = 'none';
    }

    if (options.model) {
      this.view(options.model, '', new Map());
    }
  }

  createViewer () {
    this.viewerEl = document.createElement('div');
    this.viewerEl.classList.add('viewer');
    //this.dropEl.innerHTML = '';
    //.dropEl.appendChild(this.viewerEl);

    this.el.appendChild(this.viewerEl);

    this.viewer = new Viewer(this.viewerEl, this.options);
    return this.viewer;
  }

  load (fileMap) {
    let rootFile;
    let rootPath;
    Array.from(fileMap).forEach(([path, file]) => {
      if (file.name.match(/\.(gltf|glb)$/)) {
        rootFile = file;
        rootPath = path.replace(file.name, '');
      }
    });

    if (!rootFile) {
      this.onError('No .gltf or .glb asset found.');
    }

    this.view(rootFile, rootPath, fileMap);
  }


  /**
   * Passes a model to the viewer, given file and resources.
   * @param  {File|string} rootFile
   * @param  {string} rootPath
   * @param  {Map<string, File>} fileMap
   */
  view (rootFile, rootPath, fileMap) {

    if (this.viewer) this.viewer.clear();

    const viewer = this.viewer || this.createViewer();

    const fileURL = typeof rootFile === 'string'
      ? rootFile
      : URL.createObjectURL(rootFile);

    const cleanup = () => {
      this.hideSpinner();
      if (typeof rootFile === 'object') URL.revokeObjectURL(fileURL);
    };

    viewer
      .load(fileURL, rootPath, fileMap)
      .catch((e) => this.onError(e))
      .then((gltf) => {
        if (!this.options.kiosk) {
          this.validationCtrl.validate(fileURL, rootPath, fileMap, gltf);
        }
        cleanup();
      });
  }

  load_silverless (path){

    if (this.viewer) this.viewer.clear();

    const viewer = this.viewer || this.createViewer();

    viewer
      .load_silverless(path)
      .catch((e) => this.onError(e))
      .then((gltf) => { console.log('silverless load', gltf) });
  
  }

  load_silverless3 (path1, path2, path3){

    if (this.viewer) this.viewer.clear();

    const viewer = this.viewer || this.createViewer();

    viewer
      .load_silverless3(path1,path2,path3)
      .catch((e) => this.onError(e))
      .then((gltf) => { console.log('silverless load two', gltf) });
  
  }


  /**
   * @param  {Error} error
   */
  onError (error) {
    let message = (error||{}).message || error.toString();
    if (message.match(/ProgressEvent/)) {
      message = 'Unable to retrieve this file. Check JS console and browser network tab.';
    } else if (message.match(/Unexpected token/)) {
      message = `Unable to parse file content. Verify that this file is valid. Error: "${message}"`;
    } else if (error && error.target && error.target instanceof Image) {
      message = 'Missing texture: ' + error.target.src.split('/').pop();
    }
    window.alert(message);
    console.error(error);
  }

  showSpinner () {
    this.spinnerEl.style.display = '';
  }

  hideSpinner () {
    this.spinnerEl.style.display = 'none';
  }
}

export default App;
