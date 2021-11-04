
		<script src="<?php echo get_template_directory_uri() ?>/three-jsm-master/build/bundle.js" defer></script>

        <style>

            #c{
                 position: absolute;
                 top: 15rem; /*90px;*/
                 left: 0;
                 width: 100vw;
                 height: calc( 100vh - 150px );
                 cursor: pointer;
                 visibility: hidden;

            }


            #see_applications--section{
                 position: absolute;
                 top: 80vh;
                 left: 25vw;
                 width: 50vw;
                 height: calc( 50vh - 10px );
                 cursor: pointer;
              
            }

            .on-page-nav .menu {
                height: calc(100vh - 15em) !important;
            }

            .gui-wrap {

                display : none; 

            }

            #fullpage {

                pointer-events : none;
                user-select: none;

            }

            .footer {
                position: sticky;
                bottom  : 0;
            }

            .on-page-nav #nextSection{

                    bottom: unset !important;  
            }

            #floating-island-labels {
                position: absolute;
                 top: 15rem; /*90px;*/
                 left: 0;
                 width: 100vw;
                 height: calc( 100vh - 150px );
                 cursor: pointer;
                 pointer-events : none;


            }
            .map-item   {
                position: absolute;   
                overflow: visible;          
                visibility: hidden;
            }
            .floating-label  {
                position: absolute;             
                min-width: 12rem;
            }
            .map-item img {
           
            }

        </style>

        

        <div class="spinner"></div>


		<script id="vertexShader" type="x-shader/x-vertex">

			precision mediump float;
			precision mediump int;

			uniform mat4 modelViewMatrix; // optional
			uniform mat4 projectionMatrix; // optional

            uniform mat3 normalMatrix; // pod
            
			attribute vec3 position;
			attribute vec4 color;

            attribute vec3 normal;       // pod

			varying vec3 vPosition;
			varying vec4 vColor;

            /*
			void main()	{

				vPosition = position;
				vColor = color;

				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

			}
            */  

            varying vec3 vNormal;

            void main() {

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
                vNormal = normalize( normalMatrix * normal );

            }

		</script>

		<script id="fragmentShader" type="x-shader/x-fragment">

        precision mediump float;
        precision mediump int;
        
        uniform float time;
        
        /*
			varying vec3 vPosition;
			varying vec4 vColor;

			void main()	{

				// vec4 color = vec4( vColor );
				// color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

				gl_FragColor = vec4(1,0,0,1);

			}
        */

            uniform vec3 uBaseColor;
            uniform vec3 uLineColor1;
            uniform vec3 uLineColor2;
            uniform vec3 uLineColor3;
            uniform vec3 uLineColor4;

            uniform vec3 uDirLightPos;
            uniform vec3 uDirLightColor;

            uniform vec3 uAmbientLightColor;

            varying vec3 vNormal;

            void main() {

                float camera = max( dot( normalize( vNormal ), vec3( 0.0, 0.0, 1.0 ) ), 0.4);
                float light = max( dot( normalize( vNormal ), uDirLightPos ), 0.0);

                // gl_FragColor = vec4( uBaseColor, 1.0 );
                
                
                gl_FragColor = vec4( vNormal, 1.0 );

                /*
                if ( length(uAmbientLightColor + uDirLightColor * light) < 1.00 ) {

                    gl_FragColor *= vec4( uLineColor1, 1.0 );

                }

                if ( length(uAmbientLightColor + uDirLightColor * camera) < 0.50 ) {

                    gl_FragColor *= vec4( uLineColor2, 1.0 );

                }
                */
            }

		</script>

        