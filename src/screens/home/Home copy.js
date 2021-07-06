import React from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Button,
  VirtualizedList,
} from 'react-native';
// import { SearchBar } from 'react-native-elements';
import styles from './Home.scss';
import MonthBlock from '@components/month-block/MonthBlock';
import IconSearch from '@/assets/images/icon-search.svg';

export default class HomeScreen extends React.PureComponent {
  // Initial: Conditions of ScrollView `
  lastScrollTop = 0;
  validScroll = true;
  timerSearch;
  currentYear;
  inputYear;
  insets;
  DATA = [];

  getItem = (data, index) => ({
    id: index,
    key: index + 1,
  });

  getItemCount = (data) => 1;

  Item = ({ id }) => {
    const year = this.state.year + id;
    let monthList = [];

    let header = (
      <View style={styles.header} key={id + 10}>
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
    return calendarBox;
  };

  constructor(props) {
    super(props);

    const d = new Date();
    const year = d.getFullYear();
    this.currentYear = year;

    this.state = {
      year,
      message: 'Init2',
      search: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      header: ({ scene, insets }) => {
        const { options } = scene.descriptor;
        const { top } = insets;
        options.headerStyle = {
          marginTop: top, // safe area
          height: 0,
        };
        return <View style={options.headerStyle} />;
      },
    });
  }

  updateSearch(event) {
    setTimeout(() => {
      console.log('updateSearch', event);
      this.setState({ search: '2131' });
    }, 1000);
  }

  save() {
    console.log('saved!');
    // this.showYear(1993);
  }

  showYear = (yy) => {
    Keyboard.dismiss();
    const year = parseInt(yy);
    if (!year || year < 1000) return;

    const prevYear = this.state.year;
    this.setState({ year });
    this.setState({ message: `Changed from ${prevYear} to ${year}` });
  };

  onScroll(event) {
    const trackScrollTop = event.nativeEvent.contentOffset.y;
    const validDistance = 45;

    if (trackScrollTop > this.lastScrollTop) {
      if (trackScrollTop > validDistance && this.validScroll) {
        this.validScroll = false;
        const year = this.state.year + 1;
        this.setState({ year });
      }
    } else {
      if (trackScrollTop < -validDistance && this.validScroll) {
        this.validScroll = false;
        const year = this.state.year - 1;
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
    // const searchBar = (
    //   <SearchBar
    //     placeholder="Type Here..."
    //     onChangeText={() => this.updateSearch}
    //     platform="ios"
    //   />
    // );

    return (
      // <ScrollView
      //   onScroll={(event) => this.onScroll(event)}
      //   onMomentumScrollEnd={(event) => this.onMomentumScrollEnd(event)}
      //   scrollEventThrottle={16}>
      //   <Text>{this.state.message}</Text>
      //   <Text>{this.state.year}</Text>
      //   {calendarBox}
      // </ScrollView>
      <View>
        {/* {searchBar} */}
        <TextInput value="vinh" />
      </View>
    );
  }
}
