import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import * as Highcharts from 'highcharts';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public items = [];
  public seriesDataobj = [];

  constructor(private api: ApiService) {
  }

  public options: any = {
  chart: {
    type: 'scatter',
    zoomType: 'xy'
  },
  title: {
    text: 'Temperature'
  },
  subtitle: {
    text: 'Source: NASA Exoplanet Archive'
  },
  xAxis: {
    title: {
      enabled: true,
      text: 'Distance (LY)'
    },
    startOnTick: true,
    endOnTick: true,
    floor: 0,
    max : 4000,
    pointInterval: 1000,
    showLastLabel: true
  },
  yAxis: {
    title: {
      text: 'Temperature (K)'
    }
  },
  legend: {
    enabled : false
  },

  plotOptions: {
    series: {
      cursor: 'pointer'
    },
    scatter: {
      cursor: 'pointer',
      marker: {
        radius: 5,
        states: {
          hover: {
            enabled: true,
            lineColor: 'rgb(100,100,100)'
          }
        }
      },
      states: {
        hover: {
          marker: {
            enabled: false
          }
        }
      },
      tooltip: {
        headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.y} K  {point.x} LY'
      }
    }
  },
  series: []
};

  ngOnInit() {
    this.api.getConfirmedPlanets()
      .subscribe(res => {
        this.items = res;
        console.log(this.items);
      }, err => {
        console.log(err);
      });
  }

  temperature() {
    this.items.forEach(obj => {
      const dobj = {name: obj.pl_hostname, color: 'rgba(223, 83, 83, .5)', data: [[obj.st_dist, obj.st_teff]]}
      this.seriesDataobj.push(dobj);
    });
    this.options.series = this.seriesDataobj.slice(0, 500);
    console.log(this.options.series);
    Highcharts.chart('first-chart', this.options);
  }
}

