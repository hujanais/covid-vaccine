import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ICountry, IVaccineData } from './models/country';
import { DataProviderService } from './services/data-provider.service';

import { ChartDataSets, ChartType, ChartOptions, ChartPoint } from 'chart.js';
import { BaseChartDirective, Label, ThemeService } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covid-vaccine';

  countries: ICountry[];
  lastUpdated: Date;

  public _selectedCountry: ICountry;
  public latestData: IVaccineData;

  // charts stuff.
  // scatter
  public scatterChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  };

  private chartPoints: ChartPoint[] = [];
  public scatterChartData: ChartDataSets[] = [
    {
      data: this.chartPoints,
      label: 'Vaccinated',
      pointRadius: 5,
      backgroundColor: 'purple'
    }
  ];
  public scatterChartType: ChartType = 'scatter';

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(private service: DataProviderService, private overlay: OverlayContainer, private themeService: ThemeService) {
    this.refresh();
  }

  ngOnInit(): void {
    // setup charts dark-theme
    const overrides: ChartOptions = {
      legend: {
        labels: { fontColor: 'blue' }
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: { fontColor: 'white' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      }
    };
    this.themeService.setColorschemesOptions(overrides);

    this.overlay.getContainerElement().classList.add('darkMode');
  }

  get selectedCountry(): ICountry {
    return this._selectedCountry;
  }

  set selectedCountry(country: ICountry) {
    this._selectedCountry = country;

    this.updateCharts(country);

    // get the latest data summary.
    this.latestData = country.data[country.data.length - 1];
  }

  private updateCharts(country: ICountry) {
    this.chartPoints.length = 0;
    country.data.forEach((d, index) => {
      this.chartPoints.push({ x: index, y: d.people_vaccinated });
    });

    this.chart.update();
  }

  private refresh() {
    this.service.getLatestData().subscribe(obs => {
      this.countries = [...obs];

      // get the last updated data by just looking at US data.
      const usa = this.countries.find(c => c.country === "United States");
      if (usa) {
        this.lastUpdated = usa.data[usa.data.length - 1].date;
      }

      this.selectedCountry = this.countries.find(c => c.country === "Malaysia");
    });
  }
}
