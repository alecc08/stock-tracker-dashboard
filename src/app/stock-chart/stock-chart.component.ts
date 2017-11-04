import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Message } from 'primeng/primeng';

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

  msgs: Message[];

  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  colors = ["#cc3300", "#22cc08", "#1122CC"];

  constructor() { }

  ngOnInit() {
    this.structuredData = {

    };
    this.options = {
     scales: {
       yAxes: [{
          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, values) {
                if (this.normalized) {
                  return value + "%";
                } else {
                  return "$ " + value;
                }
            }.bind(this)
          }
       }]
      }
    };
    this.defaults = {
      global: {
        elements: {
          point: {
            radius: 1
          },
          line: {
            tension: 0
          }
        }
      }
    };
  }

  ngOnChanges() {
    this.structuredData = this.convertDataForLineChart(this.data);
  }

  selectData(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }

  convertDataForLineChart(apiData): any {
    const labels = [];
    const dataSets = [];
    let labelsSet = false;
    Object.keys(apiData).forEach((stock) => {
      const dataSet = {
        label: stock,
        data: [],
        fill: false,
        borderColor : this.colors.pop(),
      };
      let firstVal;
      apiData[stock].forEach((element) => {
        if (!firstVal) {
          firstVal = element.close;
        }
        if (this.normalized) {
          dataSet.data.push((element.close / firstVal - 1) * 100);
        } else {
          dataSet.data.push(element.close);
        }

        if (!labelsSet) {
          labels.push(labels.length % 4 ? '' : element.timestamp);
        }
      });
      labelsSet = true;
      dataSets.push(dataSet);
    });
    return {
      labels: labels,
      datasets: dataSets
    };
  }

}
