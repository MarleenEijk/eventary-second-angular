import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
    private apiUrl = `${environment.apiUrl}/company`;

    constructor(private http: HttpClient) { }

    getCompanies(): Observable<Company[]> {
      return this.http.get<Company[]>(this.apiUrl);
    }

    getCompanyById(id: number): Observable<Company> {
      return this.http.get<Company>(`${this.apiUrl}/${id}`);
    }

    addCompany(company: Company): Observable<Company> {
      return this.http.post<Company>(this.apiUrl, company);
    }
}
