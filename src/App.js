import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Menu from './menu';
import Model from './model';
import TopBar from './topBar';
import Cover from './cover/cover';
import NavBar from './navBar/navBar';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
            </div>
        );
    }
}

export default App;
