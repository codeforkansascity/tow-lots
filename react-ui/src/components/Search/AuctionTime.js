import React, { Component } from 'react';
import moment from 'moment';

export default class AuctionTime extends Component {
    render() {

        let currentYear = moment().year();
        let currentMonth = moment().month();

        const getThirdTuesday = (year, month) => {
          let currentMonth = moment({ year: year, month: month});
          let nextMonth = moment({ year: year, month: month += 1});
          let thirdTuesdayCurrent = currentMonth.weekday(2);
          let thirdTuesdayNext = nextMonth.weekday(2);
          let nWeeks = 2;

          if (moment().isAfter(thirdTuesdayCurrent)) {
            nWeeks++
            return thirdTuesdayNext.add(nWeeks, 'weeks').format("MMMM DD YYYY");
          } else {
            return thirdTuesdayCurrent.add(nWeeks, 'weeks').format("MMMM DD YYYY");
          }
        }

        return (
            <div style={{ textAlign: 'center', padding: 10, fontWeight: 'bold' }}>
                Next Auction: {getThirdTuesday(currentYear, currentMonth)}
            </div>
        );
    }
}
