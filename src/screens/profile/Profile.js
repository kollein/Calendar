import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '@/store/modules/app/actions';
import styles from './Profile.scss';

class ProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Nothing',
    };
    console.log('constructor called');
    // init model list
    this.getModelList();
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
      console.log('showState', this.props.counters);
    }, 0);
  }

  async getModelList() {
    await this.props.getModelList();
    this.showState();
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

  prepareModelList() {
    return this.props.modelList.map((item, i) => {
      return (
        <Image
          key={i}
          source={{ uri: item.media.images[1] }}
          style={styles['main-image']}
          resizeMode="contain"
          PlaceholderContent={<ActivityIndicator />}
        />
      );
    });
  }

  render() {
    const modelListBox = this.prepareModelList();
    return (
      <ScrollView>
        <Button title="Get Vehicles" onPress={() => this.getModelList()} />
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
        <Text>
          modelList: {this.props.modelList.length} -{' '}
          {typeof this.props.modelList}
        </Text>
        <Text>counters['1'] value: {this.props.counters['1']}</Text>
        <Text>message: {this.state.message}</Text>
        {modelListBox}
      </ScrollView>
    );
  }
}

export default connect(
  (state) => {
    // console.log('state.app.modelList', state.app.modelList);
    return {
      counters: state.app.counters,
      modelList: state.app.modelList,
    };
  },
  (dispatch) => ({
    getModelList: async () => dispatch(actions.getModelList()),
    addNewCounter: () => dispatch(actions.newCounter()),
    increment: (id) => dispatch(actions.increment(id)),
    decrement: (id) => dispatch(actions.decrement(id)),
    incrementWithDelay: async (id) => dispatch(actions.incrementWithDelay(id)),
  }),
)(ProfileScreen);
