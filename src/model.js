import React, { Component } from 'react';
import * as THREE from 'three-full';
import {OBJLoader, OrbitControls} from 'three-addons';
import { TechnicolorShader } from 'three-full/builds/Three.es';

class model extends Component {
    ringObj;
    ringMesh;
    decalTexture;

    constructor(props){
        super(props);
        this.state = {
            width: window.innerWidth*0.8,
            height: window.innerHeight*0.9,
            selectedRing: ""
        };
    }

    getColor = () => {
        return this.props.color;
    }

    async addRing() {
        const color = this.props.color;
        this.ringObj = await this.loadRing('http://127.0.0.1:8080/ring2.OBJ')
        this.decalTexture = await this.loadTexture('http://127.0.0.1:8080/engrave.png')

        this.ringObj.traverse(
            child => {
                if ( child.type === 'Mesh') {
                    this.ringMesh = child;
                    child.material = this.ringMaterial(color);
                }
            }
        )

        this.scene.add(this.ringObj);
        this.ringEngrave(this.ringMesh, this.decalTexture);
    }

    loadRing(url) {
        return new Promise((resolve, reject) => {
            new OBJLoader().load(url,
                (object) => {
                    object.name = "Ring";
                    resolve(object);
                })
        })
    }

    loadTexture(url) {
        return new Promise((resolve, reject) => {
            new THREE.TextureLoader().load(url,
                (object) => {
                    object.name = "Decal texture";
                    resolve(object);
                })
        })
    }

    ringMaterial(color) {
        return new THREE.MeshPhongMaterial( { color: color, shininess: 200 } );
    }

    ringEngrave(ringMesh, decalTexture) {
        const decalMat = new THREE.MeshPhongMaterial( {
            specular: 0x444444,
            map: decalTexture,
            normalScale: new THREE.Vector2( 1, 1 ),
            shininess: 30,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: - 4,
            wireframe: false
        } );

        const pos = this.getPositionFromRayCasterToRing();
        const ringPos = new THREE.Vector3(pos.x, pos.y, pos.z);

        const decalGeo = new THREE.DecalGeometry(ringMesh, ringPos, new THREE.Euler(-70.55, 0, 0), new THREE.Vector3(1, .3, 1));
        const decalMesh = new THREE.Mesh(decalGeo, decalMat);
        decalMesh.name = 'decalMesh';
        // console.log(decalMesh);
        this.scene.add(decalMesh);
    }

    getPositionFromRayCasterToRing() {
        const origin = new THREE.Vector3(0, .5, 0);
        // const downDirection = new THREE.Vector3().subVectors(origin, new THREE.Vector3(0, -1, 0)).normalize();
        const downDirection = new THREE.Vector3(0, -1, 0);
        let rayCaster = new THREE.Raycaster(origin, downDirection);

        // rayCaster.set(origin, downDirection);
        const intersects = rayCaster.intersectObjects([ this.ringObj ], true);
        return intersects[0].point;
    }

    changeRing() {
        if (this.ringObj) {
            this.ringObj.traverse(
                child => {
                    if ( child.type === 'Mesh') {
                        this.ringMesh = child;
                        child.material = this.ringMaterial(this.props.color);
                    }
                }
            );
        }
    }

    componentDidMount = () => {

        //ADD SCENE
        this.scene = new THREE.Scene();
        this.rayCaster = new THREE.Raycaster();

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

        this.camera2 = new THREE.PerspectiveCamera(
            75,
            this.state.width / this.state.height,
            0.1,
            1000
        )
        this.camera2.position.z = 4

        this.control = new OrbitControls(this.camera);
        this.control.autoRotate = true;
        this.control.enableZoom = false;

        //ADD RENDERER
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
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
        this.bufferScene.add(cube);
        let blueMaterial = new THREE.MeshBasicMaterial({color:0x7074FF})
        let plane = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
        let planeObject = new THREE.Mesh(plane,blueMaterial);
        planeObject.position.z = -15;
        this.bufferScene.add(planeObject);

        this.addRing();
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
        this.renderer.render(this.bufferScene, this.camera2, this.bufferTexture);
        this.renderer.render(this.scene, this.camera);
    }

    render() {
        this.changeRing();
        return (
            <div
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}

export default model
