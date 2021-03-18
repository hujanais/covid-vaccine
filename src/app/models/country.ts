export interface ICountry {
  country: string,
  iso_code: string,
  data: IVaccineData[]
}

export interface IVaccineData {
  date: Date,
  total_vaccinations: number,
  people_vaccinated: number,
  people_vaccinated_per_hundred: number,
}


// "date": "2021-03-12",
// "total_vaccinations": 275851,
// "people_vaccinated": 275851,
// "daily_vaccinations_raw": 25942,
// "daily_vaccinations": 23277,
// "total_vaccinations_per_hundred": 0.85,
// "people_vaccinated_per_hundred": 0.85,
// "daily_vaccinations_per_million": 719