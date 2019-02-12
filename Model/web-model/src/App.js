import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Menu from './menu';
import Model from './model';
import './App.css';

class App extends Component {
  render() {
    return (
      <Grid columns={2}>
        <Grid.Column width={4}>
          <Menu />
        </Grid.Column>
        <Grid.Column width={12}>
          <Model />
        </Grid.Column>
      </Grid>
    );
  }
}

export default App;
