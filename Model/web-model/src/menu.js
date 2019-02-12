import React, { Component } from 'react';
import { Dropdown, Button, Menu } from 'semantic-ui-react'
import './semantic/dist/semantic.min.css';
import './menu.css'

const rings=[ {key: 'r1', value: 'r1', text: 'Ring1'},
                  {key: 'r2', value: 'r2', text: 'Ring2'},
                  {key: 'r3', value: 'r3', text: 'Ring3'}]
const items = [
  { key: 'editorials', active: true, name: 'Editorials' },
  { key: 'review', name: 'Reviews' },
  { key: 'events', name: 'Upcoming Events' },
]
class _Menu extends Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedRing: "Ring1"
    }
  }

  handleChange = (event) => {
    this.setState({selectedRing: event.target.value});
  }

  render () {
    return (
      <Menu vertical size={'massive'} >
        <Menu.Item>
          <Menu.Header>แบบแหวน</Menu.Header>
          <Dropdown text={this.state.selectedRing} selection options={rings} onChange={this.handleChange}/>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>สีตัวเรือน</Menu.Header>
          <Button color='#000000'/>
          <Button className="ring color2"/>
          <Button className="ring color3"/>
          <Button className="ring color4"/>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>ขนาด</Menu.Header>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>สลัก</Menu.Header>
        </Menu.Item>
      </Menu>
    );
  }
}

export default _Menu