import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICountry } from '../models/country';

const url = '../../assets/data/vaccinations.json';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  constructor(private http: HttpClient) { }

  getLatestData(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(url);
  }

}
