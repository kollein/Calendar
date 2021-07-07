import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import styles from './Home.scss';
import MonthBlock from '@components/month-block/MonthBlock';
import IconSearch from '@/assets/images/icon-search.svg';

export default class HomeScreen extends React.PureComponent {
  // Initial: Conditions of ScrollView `
  lastScrollTop = 0;
  validScroll = true;
  timerSearch;
  inputYear;
  currentYear;
  insets;

  constructor(props) {
    super(props);

    const d = new Date();
    const year = d.getFullYear().toString();
    this.currentYear = year;

    this.state = {
      year,
      message: 'Init',
    };
  }

  componentDidMount() {
    this.updateHeader();
  }

  updateHeader() {
    this.props.navigation.setOptions({
      header: ({ scene, insets }) => {
        const { options } = scene.descriptor;
        const { top } = insets;
        options.headerStyle = {
          paddingTop: top + 6, // safe area
        };
        const { search } = this.state;
        return (
          <View style={[options.headerStyle, styles['header-wrapper']]}>
            <View style={styles['input-wrapper']}>
              <TextInput
                style={styles['search-input']}
                keyboardType="number-pad"
                textContentType="none"
                maxLength={4}
                placeholder="Year"
                defaultValue={this.state.year}
                onChangeText={(val) => (this.inputYear = val)}
              />
              <IconSearch style={styles['icon-search']} />
              <TouchableOpacity
                style={styles['btn-search']}
                onPress={() => this.showYear(this.inputYear)}>
                <Text style={styles['btn-search-text']}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      },
    });
  }

  showYear = (yy) => {
    Keyboard.dismiss();
    console.log('showYear', yy);
    if (!yy || parseInt(yy) < 1000) return;

    const prevYear = this.state.year;
    this.setState({ year: yy });
    this.setState({ message: `Changed from ${prevYear} to ${yy}` });
  };

  onScroll(event) {
    const trackScrollTop = event.nativeEvent.contentOffset.y;
    const validDistance = 45;

    if (trackScrollTop > this.lastScrollTop) {
      if (trackScrollTop > validDistance && this.validScroll) {
        this.validScroll = false;
        const year = this.state.year + 1;
        this.inputYear = year;
        this.setState({ year });
      }
    } else {
      if (trackScrollTop < -validDistance && this.validScroll) {
        this.validScroll = false;
        const year = this.state.year - 1;
        this.inputYear = year;
        this.setState({ year });
      }
    }

    // Update
    this.lastScrollTop = trackScrollTop;
  }

  onMomentumScrollEnd() {
    this.validScroll = true;
  }

  onPress(mm, yy) {
    this.props.navigation.setParams({ title: `${yy}` });
    this.props.navigation.navigate('Month', {
      month: mm,
      year: yy,
    });
  }

  render() {
    const { year } = this.state;
    let monthList = [];

    let header = (
      <View style={styles.header}>
        <Text
          style={[
            styles['header-title'],
            styles[
              this.currentYear === year ? 'current-year' : 'not-current-year'
            ],
          ]}>
          {year}
        </Text>
      </View>
    );

    for (let j = 1; j <= 12; j++) {
      let block = (
        <TouchableOpacity
          style={styles['container-month-block']}
          key={year + j}
          onPress={() => this.onPress(j, year)}>
          <MonthBlock month={j} year={year} />
        </TouchableOpacity>
      );
      monthList.push(block);
    }

    const calendarBox = (
      <View style={styles['calendar-wrapper']} key={year}>
        {header}
        <View style={styles['sheet-container']}>{monthList}</View>
      </View>
    );

    return (
      <ScrollView
        contentContainerStyle={[styles.container]}
        // onScroll={(event) => this.onScroll(event)}
        // onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
        // scrollEventThrottle={16}
      >
        {/* <Text>{this.state.message}</Text>
        <Text>{this.state.year}</Text> */}
        {calendarBox}
      </ScrollView>
    );
  }
}
