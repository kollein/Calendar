import React from 'react';
import { View, Text } from 'react-native';
import styles from './DetailMonthBlock.scss';
import * as caProvider from '@/provider/calendar';

export default class DetailMonthBlock extends React.Component {
  render() {
    // In JavaScript, the first month (January) is month number 0, so December returns month number 11.
    let naturalMonth = this.props.month;
    let month = naturalMonth - 1;
    let year = this.props.year;
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
          let todayCellClassName,
            todayCellTextClassName,
            sasuDayClassName,
            titleMonthClassName,
            titleMonth;
          if (
            caProvider.today.dd === realMonthDay &&
            caProvider.today.mm === month &&
            caProvider.today.yy === year
          ) {
            todayCellClassName = 'today-cell';
            todayCellTextClassName = 'today-cell-text';
          }

          if (j > 5) {
            sasuDayClassName = 'sasu-day';
          } else {
            sasuDayClassName = '';
          }

          // Add month title inside the cell which is 1/1
          if (realMonthDay === 1) {
            titleMonthClassName = 'title-month';
            let todayMonthClassName;
            if (caProvider.today.mm === month && caProvider.today.yy === year) {
              todayMonthClassName = 'today-month';
            } else {
              todayMonthClassName = '';
            }
            titleMonth = (
              <Text
                style={[
                  styles['cell-text'],
                  styles[todayCellTextClassName],
                  styles[titleMonthClassName],
                  styles[todayMonthClassName],
                ]}>
                {caProvider.months[month]}
              </Text>
            );
          }

          let lunarDate = caProvider.convertSolar2Lunar(
            realMonthDay,
            naturalMonth,
            year,
            7,
          );
          let lunarDay, firstDayOfLunarMonthClassName;

          if (lunarDate[0] === 1) {
            lunarDay = `${lunarDate[0]}/${lunarDate[1]}`;
            firstDayOfLunarMonthClassName = 'first-lunar-day';
          } else {
            firstDayOfLunarMonthClassName = '';
            lunarDay = lunarDate[0];
          }

          cell = (
            <View
              key={realMonthDay}
              style={[
                styles.cell,
                styles[className],
                styles[todayCellClassName],
              ]}>
              {titleMonth}
              <Text
                style={[
                  styles['cell-text'],
                  styles[sasuDayClassName],
                  styles[todayCellTextClassName],
                ]}>
                {realMonthDay}
              </Text>
              <Text
                style={[
                  styles['cell-text'],
                  styles['cell-lunar-text'],
                  styles[firstDayOfLunarMonthClassName],
                  styles[sasuDayClassName],
                  styles[todayCellTextClassName],
                ]}>
                {lunarDay}
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
      <View style={[styles['month-box'], styles[`month-box-${month}`]]}>
        {/* <Text>{`${naturalMonth}/${year} total: ${lastday} days, first day is ${weekDay}`}</Text> */}
        {/* <Text className={styles["month-name"]}>{caProvider.months[month]}</Text> */}
        {table}
      </View>
    );
  }
}
