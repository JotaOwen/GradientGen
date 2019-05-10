import React, { Component } from 'react';
import './App.css';

var randomHex = function(){ return '#'+Math.floor(Math.random()*16777215).toString(16);};

class GradientInput extends Component {

    setColor(){
        console.log("settingColor")
        this.props.updateColor(randomHex());
    }

    colorChanged(event){
        this.props.updateColor(event.target.value);
    }

    render() {
        console.log("rendering Input");
        return (
            <div >
                <input type={'color'} className="GradientInput" value={this.props.color} onChange={this.colorChanged.bind(this)} ></input>
                <button onClick={this.setColor.bind(this)}><li className='fa fa-random'></li></button>
            </div>
        );
    }
}

class GradientButton extends Component {

    setType(){
        console.log("settingColor")
        this.props.updateType='';
    }

    gradientTypeChanged(event){
        this.props.updateType(event.target.value);
    }

    render() {
        console.log("rendering Type");
        return (
            <div >
                <button className="GradientButton" value={this.props.Type} onClick={this.gradientTypeChanged.bind(this)}>{this.props.Label}</button>
            </div>
        );
    }
}

class GradientButtonPosition extends Component {

    setPosition(){
        console.log("settingColor")
        this.props.updatePosition='';
    }

    gradientPositionChanged(event){
        this.props.updatePosition(event.target.value);
    }

    render() {
        console.log("rendering Position");
        return (
            <div >
                <button className="GradientButtonPosition" value={this.props.Position} onClick={this.gradientPositionChanged.bind(this)}>{this.props.Label}</button>
            </div>
        );
    }
}

var gradStyle = function(gradientType, left, right, gradientPosition){
    if(gradientType === 'radial-gradient'){
        return {
            background: gradientType +'('+left+', '+right+')'
        };
    }
    return {
        background: gradientType  + '(' + gradientPosition + ', ' + left + ', ' + right + ')'
    };
};

class Gradient extends Component {
    render() {
        console.log("rendering css gradient");
        console.info('current type:'+this.props.gradientType)
        console.info('current position:'+this.props.gradientPosition)
        return (
            <div  className="GradientBox"
                style={gradStyle(this.props.gradientType, this.props.color1, this.props.color2, this.props.gradientPosition)} >
            </div>
        );
    }
}

class App extends Component {

    constructor(props){
        super(props);
        this.state = ({
            'color1' : this.props.color1,
            'color2' : this.props.color2,
            'gradientType' : this.props.gradientType,
            'gradientPosition' : this.props.gradientPosition
        });
    }

    updateState(which){
        return function(arg){
            console.log("updated", which, arg);
            var obj = {};
            obj[which] = arg;
            this.setState( obj );
            console.log(this.state);
        }
    }

    render() {
        return (
            <div className="App">

                <div className="Controls">
                    <div className="HButtons">
                        <GradientButton
                            Type={'linear-gradient'}
                            updateType={this.updateState('gradientType').bind(this)}
                            Label={'Linear'}
                        />
                        <GradientButton
                            Type={'radial-gradient'}
                            updateType={this.updateState('gradientType').bind(this)}
                            Label={'Radial'}
                        />
                    </div>

                    <GradientInput
                        color={this.state.color1}
                        updateColor={this.updateState('color1').bind(this)}
                    />
                    <GradientInput
                        color={this.state.color2}
                        updateColor={this.updateState('color2').bind(this)}
                    />

                    <div className="HButtons">
                        <GradientButtonPosition
                            Position={'to top'}
                            updatePosition={this.updateState('gradientPosition').bind(this)}
                            Label={'Top'}
                        />
                        <GradientButtonPosition
                            Position={'to right'}
                            updatePosition={this.updateState('gradientPosition').bind(this)}
                            Label={'Right'}
                        />
                        <GradientButtonPosition
                            Position={'to left'}
                            updatePosition={this.updateState('gradientPosition').bind(this)}
                            Label={'Left'}
                        />
                        <GradientButtonPosition
                            Position={'to bottom'}
                            updatePosition={this.updateState('gradientPosition').bind(this)}
                            Label={'Bottom'}
                        />
                    </div>

                </div>

                <Gradient
                    gradientType={this.state.gradientType}
                    gradientPosition={this.state.gradientPosition}
                    color1={this.state.color1}
                    color2={this.state.color2}
                />
            </div>
        );
    }
}

App.defaultProps = {
    color1: randomHex(),
    color2: randomHex(),
    gradientType: 'linear-gradient',
    gradientPosition: 'to right'
}

export default App;
