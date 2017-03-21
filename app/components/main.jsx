import React, {Component} from 'react'
import axios from 'axios'
import Container1 from './container1.jsx'
import Container2 from './container2.jsx'
import Container3 from './container3.jsx'

var calendar, endDay, firstDay, firstWeekDay, headerRow, i, j, lastWeekDay, len, len1, month, monthRange, row, startDate, week, weekRange, weeks, year,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

function get_calendar(year, month){

    startDate = moment([year, month]);
    firstDay = moment(startDate).startOf('month');
    endDay = moment(startDate).endOf('month');
    monthRange = moment.range(firstDay, endDay);
    
    weeks = [];

    monthRange.by('days', function(moment) {
      var ref;
      if (ref = moment.week(), indexOf.call(weeks, ref) < 0) {
        return weeks.push(moment.week());
      }
    });
   
    calendar = [];

    for (i = 0, len = weeks.length; i < len; i++) {
      week = weeks[i];
      if (i > 0 && week < weeks[i-1]){
        // We have switched to the next year
        
        firstWeekDay = moment([year, month]).add(1, "year").week(week).day(1);
        lastWeekDay = moment([year, month]).add(1, "year").week(week).day(7);
      }
      else{
        firstWeekDay = moment([year, month]).week(week).day(1);
        lastWeekDay = moment([year, month]).week(week).day(7);
      }
      weekRange = moment.range(firstWeekDay, lastWeekDay);
      calendar.push(weekRange);
    }
  
    return calendar;
}

var Calendar = React.createClass({
  
    getDefaultProps: function(){
      return {
          date: moment()
        }
    },
    getInitialState: function(){
      month = moment().month();
        year = moment().year();
      return {
          date: this.props.date,
          month: month,
            year: year,
          calendar: get_calendar(year, month)
        }
    },
    setDate: function(day, e){
      e.preventDefault();
        console.log(day);
      this.setState({
          date: day
        })
    },
    nextMonth: function(e){
      e.preventDefault();
        if (this.state.month == 11){
          month = 0;
            year = this.state.year + 1;
        }
        else{
          month = this.state.month + 1;
            year = this.state.year;
        }
        
        this.setState({
          month: month,
            year: year,
          calendar: get_calendar(year, month)
        })
    },
    previousMonth: function(e){
      e.preventDefault();
        if (this.state.month == 0){
          month = 11;
            year = this.state.year - 1;
        }
        else {
          month = this.state.month - 1;
            year = this.state.year;
        }

        this.setState({
          month: month,
            year: year,
          calendar: get_calendar(year, month)
        })

    },
    render: function() {
      let context = this
      let state = this.state;
        let setDate = this.setDate;
        let weekCount = 0;
      let weeks = state.calendar.map(function(week){
          weekCount++;
          let dayList = []
      week.by('days', function(day){
              dayList.push(day) 
            })
      let days = dayList.map(function(day){
              let isCurrentMonth = day.month() == state.month
            let isToday = day.format('DD-MM-YYYY') == moment().format('DD-MM-YYYY')
                let isSelected = day.format('DD-MM-YYYY') == state.date.format('DD-MM-YYYY')
            let dayClasses = "calendar__day";
                if (!isCurrentMonth){
          dayClasses += " calendar__day--muted";
                }
                if (isSelected){
          dayClasses += " calendar__day--selected";
                }
                if (isToday){
          dayClasses += " calendar__day--today";
                }
                return <td key={day.format('D-MM')}>
                  <a href="#" className={ dayClasses } onClick={ setDate.bind(context, day) }>{ day.format('D') }</a></td>
            })
          return <tr key={ weekCount }>{ days }</tr>
        })
        return <div>
          <div className="calendar">
            <table>
                  <thead>
                        <tr>
                            <td>
                                <a href="#" className="calendar__nav calendar__nav--previous" onClick={ this.previousMonth }>&lt;</a>
                            </td>
                            <td colSpan="5"><span className="calendar__selected-date">{ moment().month(this.state.month).format("MMMM") } { this.state.year }</span></td>
                            <td>
                                <a href="#" className="calendar__nav calendar__nav--next" onClick={ this.nextMonth }>&gt;</a>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                    {weeks}
                    </tbody>
                </table>
            </div>
            <div>
              Selection: { this.state.date.format("D MMMM YYYY") }
            </div>
            </div>;
    }
});
 



export default Calendar
