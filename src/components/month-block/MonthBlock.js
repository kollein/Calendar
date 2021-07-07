import React from 'react';
import { View, Text } from 'react-native';
import styles from './MonthBlock.scss';
import * as caProvider from '@/provider/calendar';

export default class MonthBlock extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    // In JavaScript, the first month (January) is month number 0, so December returns month number 11.
    // let naturalMonth = this.props.month;
    let month = this.props.month - 1;
    let year = parseInt(this.props.year);
    // Get first dat of month: 3 numbers specify year, month, and day
    let firstdayofmonth = new Date(year, month, 1);
    // In JavaScript, the first day of the week (0) means "Sunday"
    let weekDay = firstdayofmonth.getDay();
    // Get last day of month
    let lastdayofmonth = new Date(year, month + 1, 0);
    // Get the day as a number (1-31)
    let lastday = lastdayofmonth.getDate();
    // We start the first day of the week from monday
    let modifyWeekDay = weekDay === 0 ? 7 : weekDay;
    let numRowInTable = 6;
    let numDayInWeek = 7;
    let table = [];
    let monthDay = 0; // 1 - 42 days
    let realMonthDay = 0; // 1 ~ 31 days

    for (let i = 1; i <= numRowInTable; i++) {
      // i = row ordinary
      let td = [];
      let cell, className;
      for (let j = 1; j <= numDayInWeek; j++) {
        monthDay++;
        // j = cell ordinary
        if (monthDay >= modifyWeekDay && realMonthDay < lastday) {
          realMonthDay++;
          className = 'day-of-current-month';
          let todayCellClassName, todayCellTextClassName;
          if (
            caProvider.today.dd === realMonthDay &&
            caProvider.today.mm === month &&
            caProvider.today.yy === year
          ) {
            todayCellClassName = 'today-cell';
            todayCellTextClassName = 'today-cell-text';
          }

          cell = (
            <View
              key={realMonthDay}
              style={[
                styles.cell,
                styles[className],
                styles[todayCellClassName],
              ]}>
              <Text
                style={[styles['cell-text'], styles[todayCellTextClassName]]}>
                {realMonthDay}
              </Text>
            </View>
          );
        } else {
          className = 'day-of-other-month';
          cell = (
            <View
              key={Math.random()}
              style={[styles.cell, styles[className]]}
            />
          );
        }
        td.push(cell);
      }
      table.push(
        <View key={i} style={styles.row}>
          {td}
        </View>,
      );
    }
    return (
      <View className={styles['month-box']}>
        {/* <Text>{`${naturalMonth}/${year} total: ${lastday} days, first day is ${weekDay}`}</Text> */}
        <Text className={styles['month-name']}>{caProvider.months[month]}</Text>
        <View className={styles.table}>{table}</View>
      </View>
    );
  }
}
