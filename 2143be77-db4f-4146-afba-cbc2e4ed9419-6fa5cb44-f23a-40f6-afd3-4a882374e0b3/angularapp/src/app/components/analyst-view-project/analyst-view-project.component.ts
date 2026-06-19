
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-analyst-view-project',
  templateUrl: './analyst-view-project.component.html',
  styleUrls: ['./analyst-view-project.component.css']
})
export class AnalystViewProjectComponent implements OnInit {

  projects: any[] = [];
  filteredProjects: any[] = [];
  paginatedProjects: any[] = [];

  searchText: string = '';
  isLoading: boolean = false;

  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;

  sortKey: '' | 'projectTitle' | 'projectDescription' = '';
  sortDir: 'asc' | 'desc' = 'asc';

  constructor(
    private projectService: ProjectService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.isLoading = true;

    this.projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data || [];
        this.filteredProjects = [...this.projects];

        this.applySort(false); 
        this.calculatePagination();
        this.isLoading = false;
      },
      error: () => {
        this.projects = [];
        this.filteredProjects = [];
        this.isLoading = false;
      }
    });
  }

  applySearch(): void {
    const value = this.searchText.toLowerCase().trim();

    this.filteredProjects = this.projects.filter(p =>
      (p.projectTitle ?? '').toLowerCase().includes(value) ||
      (p.projectDescription ?? '').toLowerCase().includes(value)
    );

    this.applySort();

    this.currentPage = 1;
    this.calculatePagination();
  }

  applySort(resetPage: boolean = true): void {
    if (!this.sortKey) {
      if (resetPage) this.currentPage = 1;
      this.calculatePagination();
      return;
    }

    const dir = this.sortDir === 'asc' ? 1 : -1;

    this.filteredProjects = [...this.filteredProjects].sort((a, b) => {
      const av = (a?.[this.sortKey] ?? '').toString().toLowerCase();
      const bv = (b?.[this.sortKey] ?? '').toString().toLowerCase();
      return av.localeCompare(bv) * dir;
    });

    if (resetPage) this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProjects.length / this.pageSize);
    this.updatePaginatedProjects();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedProjects();
  }

  updatePaginatedProjects(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProjects = this.filteredProjects.slice(startIndex, endIndex);
  }
}
