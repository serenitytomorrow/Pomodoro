import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import 'react-native-web';
/*import {vibrate} from './utils'*/

class DisplayTimer extends React.Component{

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.minutes !== this.props.minutes || (nextProps.seconds !== this.props.seconds)) return true
        return false
    }

    render(){
        console.log(this.props.minutes.toString() + '' + this.props.seconds.toString() + 'displayrender')
        let textTime
        if(this.props.minutes < 10) textTime = '0' + this.props.minutes.toString()
        else if (this.props.minutes === 0) textTime = '00'
        else textTime = this.props.minutes.toString()
        textTime += ':'
        console.log(textTime)
        if(this.props.seconds < 10) textTime += '0' + this.props.seconds.toString()
        else if (this.props.seconds === 0) textTime += '00'
        else textTime += this.props.seconds.toString()

        return (
            <Text>!Pomodoro Timer: {textTime}</Text>
        );
    }
}

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        timer: {minutes: 25, seconds: 0},
        countermode: 'stop',
        counterminutes: {minutes: 25, seconds: 0},
        timerLoop: ''
      }
      this.handleClickStart = this.handleClickStart.bind(this);
      this.handleClickReset = this.handleClickReset.bind(this);
      this.handleClickStop = this.handleClickStop.bind(this);
      this.counter = this.counter.bind(this);
      this.handleClickToggleLength = this.handleClickToggleLength.bind(this);
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(nextState.timer!==this.state.timer || nextState.counterminutes !== this.state.counterminutes) return true
        return false
    }

    counter(){
        if(this.state.timer.seconds === this.state.timer.minutes === 0){
            console.log(this.state.timer.minutes+' stopcouinter')

            /*vibrate()*/
            this.handleClickStop();
        }
        else {
            console.log('counter')
            if( this.state.timer.seconds !== 0 ){
                this.setState((prevState, props) => ({timer: {seconds: prevState.timer.seconds-1, minutes: prevState.timer.minutes}}))
            }
            else {
                this.setState((prevState, props) => ({timer: {seconds: 59, minutes: prevState.timer.minutes-1}}))
            }
        }
    }
    handleClickStart(e) {
        this.setState(() => ({countermode: 'start'}));
        this.setState({timerLoop: setInterval(this.counter, 1000)});
    }
    handleClickReset() {console.log(this.state.timerLoop+' '+this.state.counter); console.log('reset');
        this.setState(() => ({countermode: 'stop'}))
        clearTimeout(this.state.timerLoop);
        this.setState((prevState) => ({timer: prevState.counterminutes}))
    }
    handleClickStop() {console.log('stop')
        this.setState({countermode: 'stop'})
        clearTimeout(this.state.timerLoop);
    }
    handleClickToggleLength() {
        this.handleClickStop()
        if(this.state.counterminutes.minutes === 25) this.setState({counterminutes: {minutes: 5, seconds: 0}})
        else this.setState({counterminutes: {minutes: 25, seconds: 0}})
        this.render()
    }

    render() {console.log('mainrender')
        const buttonLength25 = <button onClick={this.handleClickToggleLength}>5 minutes/<b>25minutes</b></button>
        const buttonLength5 = <button onClick={this.handleClickToggleLength}><b>5 minutes</b>/25minutes</button>
        return (<div>
          <View style={styles.container}>{console.log(this.state.timer.minutes.toString()+' '+this.state.timer.seconds.toString())}
                <DisplayTimer minutes={this.state.timer.minutes} seconds={this.state.timer.seconds} />
                <button onClick={this.handleClickStart}>start</button>
                <button onClick={this.handleClickStop}>stop</button>
                <button onClick={this.handleClickReset}>reset</button>
                {this.state.counterminutes.minutes === 25 ? buttonLength25 : buttonLength5}
          </View></div>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
