import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


class DisplayTimer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.minutes !== this.props.minutes ||
      nextProps.seconds !== this.props.seconds
    )
      return true;
    return false;
  }

  render() {
    let textTime;
    if (this.props.minutes < 10) textTime = '0' + this.props.minutes.toString();
    else if (this.props.minutes === 0) textTime = '00';
    else textTime = this.props.minutes.toString();
    textTime += ':';

    if (this.props.seconds < 10)
      textTime += '0' + this.props.seconds.toString();
    else if (this.props.seconds === 0) textTime += '00';
    else textTime += this.props.seconds.toString();

    return (
      <Text style={{ fontSize: 26, color: '#000' }}>
        Pomodoro Timer!:{textTime}
      </Text>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: { minutes: 25, seconds: 0 },
      countermode: 'stop',
      counterminutes: { minutes: 25, seconds: 0 },
      timerLoop: '',
    };
    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.handleClickStop = this.handleClickStop.bind(this);
    this.counter = this.counter.bind(this);
    this.handleClickToggleLength = this.handleClickToggleLength.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.timer !== this.state.timer ||
      nextState.counterminutes !== this.state.counterminutes
    )
      return true;
    return false;
  }

  counter() {
    if ((this.state.timer.seconds === this.state.timer.minutes) === 0) {
      /*Vibration.vibrate()*/
      this.handleClickStop();
    } else {
      if (this.state.timer.seconds !== 0) {
        this.setState((prevState, props) => ({
          timer: {
            seconds: prevState.timer.seconds - 1,
            minutes: prevState.timer.minutes,
          },
        }));
      } else {
        this.setState((prevState, props) => ({
          timer: { seconds: 59, minutes: prevState.timer.minutes - 1 },
        }));
      }
    }
  }
  handleClickStart(e) {
    this.setState(() => ({ countermode: 'start' }));
    this.setState({ timerLoop: setInterval(this.counter, 1000) });
  }
  handleClickReset() {
    this.setState(() => ({ countermode: 'stop' }));
    clearTimeout(this.state.timerLoop);
    this.setState((prevState) => ({ timer: prevState.counterminutes }));
  }
  handleClickStop() {
    this.setState({ countermode: 'stop' });
    clearTimeout(this.state.timerLoop);
  }
  handleClickToggleLength() {
    this.handleClickStop();
    if (this.state.counterminutes.minutes === 25)
      this.setState({ counterminutes: { minutes: 5, seconds: 0 } });
    else this.setState({ counterminutes: { minutes: 25, seconds: 0 } });
    this.handleClickReset();
    this.render();
  }

  render() {
      const buttonLength25 = (
        <TouchableOpacity
           style={styles.button} onPress={this.handleClickToggleLength}>
          <Text style={styles.button.notstrongText}>
            5 minutes/</Text><Text style={styles.button.strongText}>25minutes
          </Text>
        </TouchableOpacity>
      );
      const buttonLength5 = (
        <TouchableOpacity
           style={styles.button} onPress={this.handleClickToggleLength}>
          <Text style={styles.button.strongText}>
            5 minutes</Text><Text style={styles.button.notstrongText}>/25minutes
          </Text>
        </TouchableOpacity>
      );
    return (
      <View style={styles.container}>
        <DisplayTimer
          minutes={this.state.timer.minutes}
          seconds={this.state.timer.seconds}
        />
        <TouchableOpacity
           style={styles.button} onPress={this.handleClickStart}>
          <Text style={{ fontSize: 20, color: '#fff' }}>start</Text>
        </TouchableOpacity>
        <TouchableOpacity
           style={styles.button} onPress={this.handleClickStop}>
          <Text style={{ fontSize: 20, color: '#fff' }}>stop</Text>
        </TouchableOpacity>
        <TouchableOpacity
           style={styles.button} onPress={this.handleClickReset}>
          <Text style={{ fontSize: 20, color: '#fff' }}>reset</Text>
        </TouchableOpacity>
        {this.state.counterminutes.minutes === 25
          ? buttonLength25
          : buttonLength5}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fed',
    alignItems: 'center',
    justifyContent: 'center',
  },
      button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      strongText:{
          fontSize: 20,
          color: '#fff'
      },
      notstrongText:{
          fontSize: 10,
          color: '#fff'
      },
    },
});
