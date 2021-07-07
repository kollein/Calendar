import React from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import styles from './Month.scss';
import placeholder from './placeholder.html';
import DetailMonthBlock from '@components/detail-month-block/DetailMonthBlock';

export default class MonthScreen extends React.PureComponent {
  year;
  month;
  layoutSheetList;

  constructor(props) {
    super(props);

    this.layoutSheetList = [];
    const { year, month } = this.props.route.params;
    this.year = parseInt(year);
    this.month = parseInt(month);
    this.state = {
      ready: false,
    };
  }

  componentDidMount() {
    // delay to show the loading icon
    setTimeout(() => {
      this.setState({ ready: true });
    }, 0);
  }

  scrollToActiveMonth() {
    const offsetMonthHeight = this.layoutSheetList
      .slice(0, this.month - 1)
      .reduce((acc, cur) => {
        return acc + cur.height;
      }, 0);
    this.scrollViewRef.scrollTo({
      x: 0,
      y: offsetMonthHeight - 200,
      duration: 330,
    });
  }

  onLayout(event) {
    this.layoutSheetList.push(event.nativeEvent.layout);
    if (this.layoutSheetList.length < 12) return;

    this.scrollToActiveMonth();
  }

  render() {
    let iYear = this.year;
    let calendar = [];
    let sheet = [];

    for (let j = 1; j <= 12; j++) {
      let block = (
        <View onLayout={(event) => this.onLayout(event)} key={j}>
          <DetailMonthBlock key={1 + j} month={j} year={iYear} />
        </View>
      );
      sheet.push(block);
    }

    calendar.push(
      <View key="year" style={styles['sheet-container']}>
        {sheet}
      </View>,
    );

    const htmlSource = placeholder;

    const placeholderView = (
      <View style={styles.loader}>
        {/* <WebView originWhitelist={['*']} source={htmlSource} /> */}
        {/* <Text>{this.state.ready.toString()}</Text> */}
        <ActivityIndicator size="large" />
      </View>
    );
    const mainView = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={(ref) => {
          this.scrollViewRef = ref;
        }}>
        <View style={[styles.container]}>{calendar}</View>
      </ScrollView>
    );

    const activeView = this.state.ready ? mainView : placeholderView;
    return activeView;
  }
}
