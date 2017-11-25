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
    Chart.defaults.global.elements.point.radius = 0.6; // How big points are
    Chart.defaults.global.elements.point.hitRadius = 5; // Radius to trigger mouseOver on points
    Chart.defaults.global.elements.line.tension = 0; // Make lines flat instead of curved
    Chart.defaults.global.elements.line.borderWidth = 1; // Line thickness
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
          showLines: true,
          fill: true,
          borderWidth: 0.1,
          lineWidth: 0.1,
          pointRadius: 0,
          elements: {
            points: {
              radius: 0
            }
          }
        }
      });
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
    console.log(JSON.stringify(labels));
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
        stockTimestamps.push(Moment.unix(element.timestamp).format("YYYY-MM-DD"));
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
    if (data) {
      let start;
      let end;
      Object.keys(data).forEach((stock) => {
        let currentStart = data[stock][0].timestamp;
        if (!start || start > currentStart) {
          start = currentStart;
        }
        let currentEnd = data[stock][data[stock].length - 1].timestamp;
        if (!end || end < currentEnd) {
          end = currentEnd;
        }
      });
      console.log("Start:" + start);
      console.log("End:" + end);
      return {
        start: start,
        end: end
      };
    }
  }

  generateDateLabels(range) {
    // TODO Refactor this disgusting function
    let startDay = range.start;
    let endDay = range.end;
    let daysBetween = Moment.unix(endDay).diff(Moment.unix(startDay), 'days');
    console.log("Days between:" + daysBetween);
    let labels = [];
    labels.push(Moment.unix(startDay).format("YYYY-MM-DD"));
    startDay = Moment.unix(startDay).format("YYYY-MM-DD");
    for (let i = 0; i < daysBetween; i++) {
      startDay = Moment(startDay, "YYYY-MM-DD").add(1, 'd').format("YYYY-MM-DD");
      labels.push(startDay);
    }
    return labels;

  }

}

