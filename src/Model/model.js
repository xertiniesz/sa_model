import React, { Component } from 'react';
import * as THREE from 'three-full';
import {OrbitControls, OBJLoader} from 'three-addons';
import ModelLoader from './modelLoader'

class model extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: ""
        };
    }

    componentDidMount = () => {
        //ADD SCENE
        this.scene = new THREE.Scene();

        //ADD BUFFER SCENE
        this.bufferScene = new THREE.Scene();
        this.bufferTexture = new THREE.WebGLRenderTarget(
            window.innerWidth, 
            window.innerHeight,
            {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.NearestFilter
            }
        );

        //ADD CAMERA
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.state.width / this.state.height,
            0.1,
            1000
        )
        this.camera.position.z = 4

        // this.camera2 = new THREE.PerspectiveCamera(
        //     75,
        //     this.state.width / this.state.height,
        //     0.1,
        //     1000
        // )
        // this.camera2.position.z = 4

        this.control = new OrbitControls(this.camera);
        this.control.autoRotate = true;
        this.control.enableZoom = false;

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor('#FFFFFF')
        this.renderer.setSize(this.state.width, this.state.height)
        this.mount.appendChild(this.renderer.domElement)

        this.pLight = new THREE.PointLight(0xffffff, 0.7);
        this.pLight.position.set(5, 8, 0);
        this.scene.add(this.pLight);

        this.pLight2 = new THREE.PointLight(0xffffff, 0.7);
        this.pLight2.position.set(-5, 8, 0);
        this.scene.add(this.pLight2);

        //ADD CUBE
        let geometry = new THREE.BoxGeometry( 2, 2, 2 );
        let material2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        let cube = new THREE.Mesh( geometry, material2 );
        this.scene.add(cube);
        let blueMaterial = new THREE.MeshBasicMaterial({color:0x7074FF})
        let plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
        let planeObject = new THREE.Mesh(plane,blueMaterial);
        planeObject.position.z = -15;
        this.bufferScene.add(planeObject);

        const loader = new OBJLoader();
        loader.load('http://127.0.0.1:8080/ring2.OBJ', 
            (object) => {
                object.traverse( function ( child ) {
                    if ( child.type === 'Mesh' ) {
                        let material = new THREE.MeshPhongMaterial( { color: 0xC0C0C0, shininess: 200 } );
                        child.material = material;
                    }
                });
                // this.scene.add(object);
            }  
        );
        this.start();
    }

    componentWillUnmount(){
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    start = () => {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate)
        }
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    animate = () => {
        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
        this.control.update();
    }

    renderScene = () => {
        // this.renderer.render(this.bufferScene, this.camera2, this.bufferTexture);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        return (
            <div
                style={{ float: 'right' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default model