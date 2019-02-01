import React, { Component } from 'react';
import { Dropdown, Button, Menu, TextArea, Form, Grid } from 'semantic-ui-react'
import './semantic/dist/semantic.min.css';
import './menu.css';
import Model from './model';

const rings=[ {key: 'r1', value: 'Ring1', text: 'Ring1'},
                {key: 'r2', value: 'Ring2', text: 'Ring2'},
                {key: 'r3', value: 'Ring3', text: 'Ring3'}]
const size = [
    { key: 's48', value: '48', text: '48' },
    { key: 's49', value: '49', text: '49' },
    { key: 's50', value: '50', text: '50' },
    { key: 's51', value: '51', text: '51' },
    { key: 's52', value: '52', text: '52' },
    { key: 's53', value: '53', text: '53' },
    { key: 's54', value: '54', text: '54' },
    { key: 's55', value: '55', text: '55' },
    { key: 's56', value: '56', text: '56' },
    { key: 's57', value: '57', text: '57' },
]
const fonts = [
    { key: 'f1', value: 'San Serif', text: 'Sand Serif'},
    { key: 'f2', value: 'San Serif', text: 'Sand Serif'},
    { key: 'f3', value: 'San Serif', text: 'Sand Serif'},
    { key: 'f4', value: 'San Serif', text: 'Sand Serif'},
]

class _Menu extends Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedColor: '#C0C0C0',
            selectedRing: "Ring1",
            selectedSize: "48",
            selectedFont: "San Serif",
            engraving: "",
        }
    }

    handleModelChange = (e, data) => {
        this.setState({selectedRing: data.value});
    }
    handleSizeChange = (e, data) => {
        this.setState({selectedSize: data.value});
    }
    handleFontChange = (e, data) => {
        this.setState({selectedFont: data.value});
    }
    handleTextChange = (event) => {
        console.log(event.target.value);
        // this.setState({engraving: event.target.value});
    }

    render () {
        return (
            <div>
                {/* <Grid centered>
                    <Grid.Column width={12}> */}
                        <Grid columns={2}>
                            <Grid.Column width={4}>
                                <Menu vertical size={'massive'} >
                                    <Menu.Item>
                                    <Menu.Header>แบบแหวน</Menu.Header>
                                        <Dropdown text={this.state.selectedRing} selection options={rings} onChange={this.handleModelChange}/>
                                    </Menu.Item>
                                    <Menu.Item>
                                    <Menu.Header>สีตัวเรือน</Menu.Header>
                                        <Button className="ring color1" onClick={()=>{this.setState({selectedColor: '#C0C0C0'})}}/>
                                        <Button className="ring color2" onClick={()=>{this.setState({selectedColor: '#FFC30D'})}}/>
                                        <Button className="ring color3" onClick={()=>{this.setState({selectedColor: '#FFD2B4'})}}/>
                                        <Button className="ring color4" onClick={()=>{this.setState({selectedColor: '#402F27'})}}/>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Menu.Header>ขนาด</Menu.Header>
                                        <Dropdown text={this.state.selectedSize} selection options={size} onChange={this.handleSizeChange}/>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Menu.Header>สลัก</Menu.Header>
                                        <div>ลักษณะตัวหนังสือ</div>
                                        <Dropdown text={this.state.selectedFont} selection options={fonts} onChange={this.handleFontChange}/>
                                        <div>ข้อความ</div>
                                        <Form>
                                            <TextArea autoHeight placeholder='ใส่ข้อความบนแหวน'/>
                                        </Form>
                                    </Menu.Item>
                                </Menu>
                                <Button color="green" onClick={()=>{console.log(this.state)}}>OKAY</Button>
                                {/* <Button color="red">RESET</Button> */}
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Model ring={this.state.selectedRing} color={this.state.selectedColor}/>
                            </Grid.Column>
                        </Grid>
                    {/* </Grid.Column>
                </Grid> */}
            </div>
        );
    }
}

export default _Menu