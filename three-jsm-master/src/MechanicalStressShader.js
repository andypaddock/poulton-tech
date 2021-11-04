const MechanicalStressShader = {

uniforms: {

    'tDiffuse': { value: null }

},

vertexShader: /* glsl */`

    varying vec2 vUv;

    void main() {

    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,

fragmentShader: /* glsl */`

    #include <common>

    uniform sampler2D tDiffuse;

    varying vec2 vUv;

    void main() {

    vec4 texel = texture2D( tDiffuse, vUv );

    
    float l = linearToRelativeLuminance( texel.rgb );


    int level = int(floor(l * 9.0));

    vec3 switched;

    switch(level){

        case 0: switched = vec3(0.035,0.,0.996);
                break;
        case 1: switched = vec3(0.004,0.698,1.);
                break;

        case 2: switched = vec3(0.,1.,1.);
                break;  

        case 3: switched = vec3(0.,1.,0.675);
                break;  

        case 4: switched = vec3(0.,1.,0.);
                break;  

        case 5: switched = vec3(0.624,1.,0.);
                break;  

        case 6: switched = vec3(0.984,1.,0.02);
                break;  

        case 7: switched = vec3(1.,0.682,0.004);
                break;  

        case 8: switched = vec3(1.,0.,0.);
                break;  

        case 9: switched = vec3(1.,0.,0.);
                break;   
    }

    gl_FragColor = vec4( switched, texel.w );

    }`

};

export { MechanicalStressShader }  