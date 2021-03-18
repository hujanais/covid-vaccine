import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as moment from 'moment';
import { BaseChartDirective, Label } from 'ng2-charts';
import { ICountry } from 'src/app/models/country';

@Component({
  selector: 'app-animated-graph',
  templateUrl: './animated-graph.component.html',
  styleUrls: ['./animated-graph.component.scss']
})
export class AnimatedGraphComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '% vaccinated' },
  ];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  @Input() countries: ICountry[]

  constructor() { }

  ngOnInit(): void {

  }

  private sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * restart the simulation
   */
  restart(): void {
    // for simplicity, start Dec 19, 2020.  Using Israel as start.
    let startTime = moment('2020-12-19');
    let endTime = moment();
    let dailyData = [];
    let top10 = [];

    this.countries = this.countries.filter(p => !p.iso_code.includes('OWID'));

    const timerObj = setInterval(() => {
      if (startTime <= endTime) {
        dailyData.length = 0;
        this.countries.forEach(country => {
          var dayData = country.data.find(d => moment(d.date).isSame(startTime));
          if (dayData) {
            dailyData.push({ name: country.country, percentage: dayData.people_vaccinated_per_hundred });
          }
        });

        // get the highest vaccination country.
        dailyData = dailyData.sort((a, b) => {
          if (a.percentage === undefined) a.percentage = 0;
          if (b.percentage === undefined) a.percentage = 0;

          return b.percentage - a.percentage;
        });

        top10 = dailyData.slice(0, 10);
        let len = top10.length; // at the beginning, this can be less than 10.
        for (let idx = 0; idx < len; idx++) {
          this.barChartLabels = [...top10.map(t => t.name)];
          this.barChartData[0].data = [...top10.map(t => t.percentage)];
        }
        this.chart.update(0);

        startTime = startTime.add(1, 'day');
      }
    }, 100);
  }
}