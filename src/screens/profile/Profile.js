import React from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '@/store/modules/app/actions';

class ProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      counters: this.props.counters,
      message: 'Nothing',
    };
  }

  componentDidUpdate(prevProps) {
    const { counters } = this.props;
    const prevVal = prevProps.counters['1'];
    const newVal = counters['1'];
    if (prevVal !== newVal) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ message: `Has change from ${prevVal} to ${newVal}` });
    }
  }

  showState() {
    setTimeout(() => {
      console.log('this.props', this.props.counters);
    }, 0);
  }

  createCounter() {
    this.props.addNewCounter();
    this.showState();
  }

  increaseCounterById(id) {
    this.props.increment(id);
    this.showState();
  }

  decreaseCounterById(id) {
    this.props.decrement(id);
    this.showState();
  }

  async increaseCounterByIdWithDelay(id) {
    await this.props.incrementWithDelay(id);
    this.showState();
  }

  render() {
    return (
      <View>
        <Button title="Create Counter" onPress={() => this.createCounter()} />
        <Button
          title="Increase Counter Value By Id"
          onPress={() => this.increaseCounterById(1)}
        />
        <Button
          title="Decrease Counter Value By Id"
          onPress={() => this.decreaseCounterById(1)}
        />
        <Button
          title="Increase Counter Value By Id With Delay"
          onPress={() => this.increaseCounterByIdWithDelay(1)}
        />
        <Text>{this.state.counters['1']}</Text>
        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

export default connect(
  (state) => ({
    counters: state.app.counters,
  }),
  (dispatch) => ({
    addNewCounter: () => dispatch(actions.newCounter()),
    increment: (id) => dispatch(actions.increment(id)),
    decrement: (id) => dispatch(actions.decrement(id)),
    incrementWithDelay: async (id) => dispatch(actions.incrementWithDelay(id)),
  }),
)(ProfileScreen);
