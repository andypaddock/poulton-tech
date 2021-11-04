import App from './app_viewer';



document.addEventListener('DOMContentLoaded', () => {

    const el = document.getElementById('c');
    
    console.log('Hello World', el);

    const app = new App(el, location);
  
    app.load_silverless3('pipe heaven 3.glb', 'test 2 q.glb', 'FLANGE 224.glb' );
  
  });

//  const app = new App();
//  app.init();
