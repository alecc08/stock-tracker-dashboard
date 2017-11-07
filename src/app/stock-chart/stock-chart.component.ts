import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as Moment from 'moment';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit, OnChanges {

  @Input()
  data: any;

  structuredData: any;
  options: any;
  defaults: any;
  normalized = true;

  chartCtx;
  myLineChart;
  colors;

  constructor() {
    Chart.defaults.global.elements.point.radius = 1.5;
    Chart.defaults.global.elements.line.tension = 0;
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.myLineChart) {
      this.chartCtx = $("#stockChart");
      this.myLineChart = new Chart(this.chartCtx, {
        type: 'line',
        data: [],
        options: {
          spanGaps: true,
          lineTension: 0,
          fill: true,
          pointRadius: 0,
          elements: {
            points: {
              radius: 0
            }
          }
        },
        defaults: {
          spanGaps: true,
          lineTension: 0,
          fill: true,
          pointRadius: 0,
          point: {
            radius: 0
          }
        }
      });
      this.myLineChart.defaults.global.elements.points.radius = 0;
    }
    this.colors = ["yellow", "orange", "violet", "black", "#cc3300", "#22cc08", "#1122CC" ];
    this.structuredData = this.convertDataForLineChart(this.data);
    if (this.structuredData) {
      this.myLineChart.data = this.structuredData;
      this.myLineChart.update();
    }
  }

  convertDataForLineChart(apiData): any {
    const dataSets = [];
    const labels = this.generateDateLabels(this.findFullRangeOfData(apiData));
    Object.keys(apiData).forEach((stock) => {
      const dataSet = {
        label: stock,
        data: [],
        fill: false,
        borderColor : this.colors.pop(),
      };
      let firstVal;
      let stockTimestamps = [];
      apiData[stock].forEach((element) => {
        stockTimestamps.push(element.timestamp);
      });
      labels.forEach((label) => {
        let stockIndex = stockTimestamps.indexOf(label);
        if (stockIndex === -1) {
          dataSet.data.push(NaN);
        } else {
          if (!firstVal) {
            firstVal = apiData[stock][stockIndex].close;
          }
          if (this.normalized) {
            dataSet.data.push((apiData[stock][stockIndex].close / firstVal - 1) * 100);
          } else {
            dataSet.data.push(apiData[stock][stockIndex].close);
          }
        }
      });
      
      dataSets.push(dataSet);
    });
    return {
      labels: labels,
      datasets: dataSets
    };
  }

  findFullRangeOfData(data): any {
    let start;
    let end;

    Object.keys(data).forEach((stock) => {
      let currentStart = Moment(data[stock][0].timestamp, "YYYY-MM-DD").unix();
      if (!start || start > currentStart) {
        start = currentStart;
      }
      let currentEnd = Moment(data[stock][data[stock].length - 1].timestamp, "YYYY-MM-DD").unix();
      if (!end || end < currentEnd) {
        end = currentEnd;
      }
    });
    return {
      start: start,
      end: end
    };
  }

  generateDateLabels(range) {
    let startDay = Moment.unix(range.start);
    let endDay = Moment.unix(range.end);
    let daysBetween = endDay.diff(startDay, 'days');
    let labels = [];
    labels.push(startDay.format("YYYY-MM-DD"));
    for (let i = 0; i < daysBetween; i++) {
      startDay = startDay.add(1, 'd');
      labels.push(startDay.format("YYYY-MM-DD"));
    }
    return labels;

  }

  

}

