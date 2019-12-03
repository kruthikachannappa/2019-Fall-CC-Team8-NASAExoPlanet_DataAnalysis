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
  public tempItems = [];
  public metal = [];
  public massItems = [];
  public insolationFlux = [];
  public seriesDataobj = [];
  public densityItem = [];
  public luminosityItem = [];
  public gravityItem = [];
  public discItem = [];
  tabClick: any;
  constructor(private api: ApiService) {
  }

  public tempOptions: any = {
  chart: {
    type: 'scatter',
    zoomType: 'xy'
  },
  subtitle: {
    text: 'Source: NASA Exoplanet Archive'
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
        radius: 3,
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
      }
    }
  },
  series: []
};

  public pie: any = {
    subtitle: {
      text: 'Source: NASA Exoplanet Archive'
    },
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Planets',
        colorByPoint: true,
        data: []
      }]
  };

  public bubble: any = {
    subtitle: {
      text: 'Source: NASA Exoplanet Archive'
    },
  chart: {
    type: 'packedbubble',
    height: '80%'
  },
  tooltip: {
    useHTML: true,
    pointFormat: '<b>{point.name}:</b> {point.value}'
  },
  plotOptions: {
    packedbubble: {
      minSize: '10%',
      maxSize: '50%',
      zMin: 0,
      zMax: 1000,
      layoutAlgorithm: {
        gravitationalConstant: 0.05,
        splitSeries: true,
        seriesInteraction: false,
        dragBetweenSeries: true,
        parentNodeLimit: true
      },
      dataLabels: {
        enabled: true,
        format: '{point.name}',
        filter: {
          property: 'y',
          operator: '>',
          value: 250
        },
        style: {
          color: 'black',
          textOutline: 'none',
          fontWeight: 'small'
        }
      },
      series: {
        animation: false
      }
    },
  },
  series: []
};

  public scatterLine: any = {
    subtitle: {
      text: 'Source: NASA Exoplanet Archive'
    },
    title: {
    },
    xAxis: {
      min: -0.5
    },
    yAxis: {
    },
    series: [{
      type: 'line',
      name: 'Earth Density',
      data: [[0, 5.51], [1500, 5.51]],
      marker: {
        enabled: false
      },
      states: {
        hover: {
          lineWidth: 0
        }
      },
      enableMouseTracking: false
    }, {
      type: 'scatter',
      name: 'Exoplanets',
      data: [],
      marker: {
        radius: 4
      }
    }]
  };

  public cylinder: any = {
    chart: {
      type: 'column',
      styledMode: true,
      options3d: {
        enabled: true,
        alpha: 15,
        beta: 15,
        depth: 50
      }
    },
    subtitle: {
      text: 'Source: NASA Exoplanet Archive'
    },
    title: {},
    plotOptions: {
      column: {
        depth: 25
      }
    },
    xAxis: {
      categories: []
    },
      series: [{
      data: [],
      colorByPoint: true
    }]
  };
  ngOnInit() {
    if (this.api.getBulkData()) {
      this.items = this.api.getBulkData();
      if (this.items){
        this.graph('temperature');
      }
    } else {
      this.api.getConfirmedPlanets()
        .subscribe(res => {
          this.items = res;
          this.graph('temperature');
          this.api.setBulkData(this.items);
        }, err => {
          console.log(err);
        });
    }
  }
  graph(name) {
    this.tabClick = name;
    this.seriesDataobj = [];
    switch (name) {
      case 'temperature':
        this.tempItems = this.items;
        this.temperature();
        break;
      case 'mass':
        this.massItems = this.items;
        this.mass();
        break;
      case 'metallicity':
        this.metal = this.items;
        this.metallicity();
        break;
      case 'insolation':
        this.insolationFlux = this.items;
        this.insolation();
        break;
      case 'density':
        this.densityItem = this.items;
        this.density();
        break;
      case 'luminosity':
        this.luminosityItem = this.items;
        this.luminosity();
        break;
      case 'gravity':
        this.gravityItem = this.items;
        this.gravity();
        break;
      case 'discovery':
        this.discItem = this.items;
        this.discovery();
        break;
    }
  }

  mass() {
    this.massItems.forEach(obj => {
      const dobj = {name: obj.fpl_hostname, color: 'rgba(173, 183, 23, .5)', data: [[ obj.fpl_bmasse, obj.fpl_rade]]};
      this.seriesDataobj.push(dobj);
    });
    this.tempOptions.series = this.seriesDataobj.slice(0, 2000);

    this.tempOptions.title = {text: 'Mass'};
    this.tempOptions.yAxis = {title: {text: 'Radius (*Earth)'}};
    this.tempOptions.xAxis = {
      title: {
        enabled: true,
        text: 'Mass (*Earth)'
      },
      startOnTick: true,
      endOnTick: true,
      floor: 0,
      max : 50,
      pointInterval: 5,
      showLastLabel: true
    };
    this.tempOptions.tooltip = {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.y} M     {point.x} R'
    };
    console.log(this.tempOptions.series);
    Highcharts.chart('second-chart', this.tempOptions);
  }

  temperature() {
    this.tempItems.forEach(obj => {
      const dobj = {name: obj.fpl_hostname, color: 'rgba(223, 83, 83, .5)', data: [[obj.fst_dist, obj.fpl_eqt]]};
      this.seriesDataobj.push(dobj);
    });
    this.tempOptions.series = this.seriesDataobj.slice(0, 2000);
    this.tempOptions.title = {text: 'Temperature'};
    this.tempOptions.yAxis = {title: {text: 'Temperature (K)'}};
    this.tempOptions.xAxis = {
      title: {
        enabled: true,
          text: 'Distance (LY)'
      },
      startOnTick: true,
        endOnTick: true,
        floor: 0,
        max : 1000,
        pointInterval: 100,
        showLastLabel: true
    };
    this.tempOptions.tooltip = {
      headerFormat: '<b>{series.name}</b><br>',
        pointFormat: '{point.y} K  {point.x} LY'
    };
    console.log(this.tempOptions.series);
    Highcharts.chart('first-chart', this.tempOptions);
  }

  metallicity() {
    let fe = 0;
    let m = 0;
    let o = 0;
    this.metal.forEach(obj => {
      if (obj.fst_metratio === '[Fe/H]') {fe++; } else if (obj.fst_metratio === '[M/H]') {m++; } else { o++; }
    });
    const dobj = {name: 'Fe/H', y: ((fe / (fe + m + o)) * 100)};
    const dobj1 = {name: 'M/H', y: ((m / (fe + m + o)) * 100)};
    if (o !== 0) {
      const dobj2 = {name: 'Others', y: ((o / (fe + m + o)) * 100)};
      this.seriesDataobj.push(dobj2);
    }
    this.seriesDataobj.push(dobj);
    this.seriesDataobj.push(dobj1);
    this.pie.series[0].data = this.seriesDataobj;
    this.pie.title = {text: 'Metal Content'};
    /*this.tempOptions.tooltip = {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.y} K  {point.x} LY'
    };*/
    console.log(this.pie.series);
    Highcharts.chart('third-chart', this.pie);
  }

  insolation() {
    let first = [];
    let second = [];
    let third = [];
    let fourth = [];
    let fifth = [];
    this.insolationFlux.forEach(obj => {
      if (obj.fpl_insol != null) {
        if (obj.fpl_insol >= 0 && obj.fpl_insol < 5) { const ob = {name: obj.fpl_hostname, value : obj.fpl_insol}; first.push(ob);}
        else if (obj.fpl_insol >= 5 && obj.fpl_insol < 10) {const ob = {name: obj.fpl_hostname, value : obj.fpl_insol}; second.push(ob);}
        else if (obj.fpl_insol >= 10 && obj.fpl_insol < 50) { const ob = {name: obj.fpl_hostname, value : obj.fpl_insol}; third.push(ob);}
        else if (obj.fpl_insol >= 50 && obj.fpl_insol < 100) { const ob = {name: obj.fpl_hostname, value : obj.fpl_insol}; fourth.push(ob);}
        else{ const ob = {name: obj.fpl_hostname, value : obj.fpl_insol}; fifth.push(ob);}
      }
    });
    first = first.slice(0, 50);
    second = first.slice(0, 50);
    third = first.slice(0, 50);
    fourth = first.slice(0, 50);
    fifth = first.slice(0, 50);
    this.bubble.series = [{name : 'First' , data: first}, {name : 'Second' , data: second},
      {name : 'Third' , data: third}, {name : 'Fourth' , data: fourth}, {name : 'Fifth' , data: fifth}];
    this.bubble.title = {text: 'Insolation Flux'};
    this.tempOptions.tooltip = {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.y} K  {point.x} LY'
    };
    console.log(this.bubble.series);
    Highcharts.chart('fourth-chart', this.bubble);
  }

  density() {
    this.densityItem.forEach(obj => {
      // const dobj = {name: obj.fpl_hostname, data: [[obj.fst_dist, obj.fpl_eqt]]};
      this.seriesDataobj.push(obj.fpl_dens);
    });
    this.scatterLine.series[1].data = this.seriesDataobj.slice(0, 1500);;
    this.scatterLine.title = {text: 'Density'};
    this.scatterLine.yAxis = { min: 0, title: {text: 'Density (g/cm³)'}};
    this.scatterLine.tooltip = {
      pointFormat: '<b>{point.y}</b><br/>',
        valueSuffix: ' g/cm³',
        shared: true
    }
    Highcharts.chart('fifth-chart', this.scatterLine);
  }

  luminosity() {
    this.luminosityItem.forEach(obj => {
      const dobj = {name: obj.fpl_hostname,  data: [[ obj.fpl_eqt, obj.fst_lum]]};
      this.seriesDataobj.push(dobj);
    });
    this.tempOptions.series = this.seriesDataobj.slice(0, 500);
    this.tempOptions.title = {text: 'Luminosity'};
    this.tempOptions.yAxis = {title: {text: 'Luminosity (log(Solar luminosity))'}};
    this.tempOptions.xAxis = {
      title: {
        enabled: true,
        text: 'Temperature (K)'
      },
      startOnTick: true,
      endOnTick: true,
      floor: 0,
      pointInterval: 300,
      showLastLabel: true
    };
    this.tempOptions.tooltip = {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.y} log(Solar luminosity)  {point.x} K'
    };
    console.log(this.tempOptions.series);
    Highcharts.chart('sixth-chart', this.tempOptions);
  }

  gravity() {
    this.gravityItem.forEach(obj => {
      const dobj = {name: obj.fpl_hostname,   color: 'rgba(123, 53, 133, .5)', data: [[ obj.fst_logg , obj.fpl_rade]]};
      this.seriesDataobj.push(dobj);
    });
    this.tempOptions.series = this.seriesDataobj.slice(0, 500);;
    this.tempOptions.title = {text: 'Surface Gravity'};
    this.tempOptions.yAxis = {title: {text: 'Radius (*Earth)'}};
    this.tempOptions.xAxis = {
      title: {
        enabled: true,
        text: 'Gravity (log10(cm/s**2))'
      },
      startOnTick: true,
      endOnTick: true,
      floor: 0,
      pointInterval: 300,
      showLastLabel: true
    };
    this.tempOptions.tooltip = {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x} G  {point.y} R'
    };
    console.log(this.tempOptions.series);
    Highcharts.chart('seventh-chart', this.tempOptions);
  }
  discovery() {
    const categories = {2000 : 0, 2001 : 0 , 2002 : 0, 2003 : 0, 2004 : 0, 2005 : 0,
      2006 : 0, 2007 : 0, 2008 : 0, 2009 : 0, 2010 : 0, 2011 : 0, 2012: 0, 2013: 0, 2014: 0, 2015: 0, 2016: 0, 2017: 0, 2018: 0, 2019: 0};
    let year = [0, 0, 0, 0, 0, 0, 0, 0];
    this.discItem.forEach(obj => {
      if (obj.fpl_disc) {
        categories[obj.fpl_disc]++;
      }
    });
    this.cylinder.xAxis.categories = Object.keys(categories);
    this.cylinder.series[0].data = Object.values(categories);
    this.cylinder.title = {text: 'Year of discovery'};
    this.cylinder.tooltip = {
      pointFormat: '{point.y}'
    };
    Highcharts.chart('eight-chart', this.cylinder);
  }

}

