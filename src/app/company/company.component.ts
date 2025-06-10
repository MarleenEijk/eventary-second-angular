import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../company.service';
import { Company } from '../../models/company';

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  newCompanyName: string = '';
  loading = false;
  error: string | null = null;

  constructor(private companyService: CompanyService) {}

  ngOnInit() {
    this.fetchCompanies();
  }

  fetchCompanies() {
    this.loading = true;
    this.companyService.getCompanies().subscribe({
      next: (data) => {
        this.companies = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load companies';
        this.loading = false;
      }
    });
  }

  addCompany() {
    if (!this.newCompanyName.trim()) return;
    const newCompany: Omit<Company, 'id'> = { name: this.newCompanyName.trim() };
    this.companyService.addCompany(newCompany as Company).subscribe({
      next: (company) => {
        this.companies.push(company);
        this.newCompanyName = '';
      },
      error: () => {
        this.error = 'Failed to add company';
      }
    });
  }
}