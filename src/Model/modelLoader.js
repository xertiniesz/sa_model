import React, { Component } from 'react';
import * as THREE from 'three-full';
import {OBJLoader} from 'three-addons'

class ModelLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: null
        };
    }

    load = async function() {
        const loader = new OBJLoader();
        await loader.load('http://127.0.0.1:8080/ring2.OBJ', 
            (object) => {
                object.traverse( function ( child ) {
                    if ( child.type === 'Mesh' ) {
                        let material = new THREE.MeshPhongMaterial( { color: 0xC0C0C0, shininess: 200 } );
                        child.material = material;
                    }
                });
                this.setState({obj: object})
                console.log(this.state.obj);
            }  
        );
        console.log(this.state.obj);
    }.bind(this)
}


export default ModelLoader;