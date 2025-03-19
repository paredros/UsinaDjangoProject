import * as THREE from 'three';

import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { VignetteShader } from 'three/addons/shaders/VignetteShader.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

function buildPostpro(scene, camera, renderer){
    const renderScene = new RenderPass(scene, camera);
    const composer = new EffectComposer(renderer);
    composer._r=renderScene;
    composer.addPass(renderScene);
    composer.renderTarget1.stencilBuffer = true;
    composer.renderTarget2.stencilBuffer = true;
    const effectFilm = new FilmPass( 0.95 );
    const shaderVignette = VignetteShader;
    const effectVignette = new ShaderPass( shaderVignette );
    //effectVignette.uniforms[ 'offset' ].value = 1.6;
    //effectVignette.uniforms[ 'darkness' ].value = 0.75;
    //effectVignette.uniforms[ 'offset' ].value = 2.6;
    //effectVignette.uniforms[ 'darkness' ].value = 0.75;
    //effectVignette.uniforms[ 'offset' ].value = 0.9;
    //effectVignette.uniforms[ 'darkness' ].value = 1.95;
    effectVignette.uniforms[ 'offset' ].value = 1.2;
    effectVignette.uniforms[ 'darkness' ].value = 0.95;
    
    composer.addPass(effectVignette);
    composer.addPass(effectFilm);
    

    const outputPass = new OutputPass();
    composer.addPass( outputPass );
    return composer;
}

export default buildPostpro;