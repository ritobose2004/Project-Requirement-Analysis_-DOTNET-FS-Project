import { Component, OnInit } from '@angular/core';
import { ProjectRequirement } from 'src/app/models/projectRequirement.model';
import { ProjectRequirementService } from 'src/app/services/project-requirement.service';

@Component({
  selector: 'app-manager-view-requirement',
  templateUrl: './manager-view-requirement.component.html',
  styleUrls: ['./manager-view-requirement.component.css']
})
export class ManagerViewRequirementComponent implements OnInit {

  constructor(private myService: ProjectRequirementService) { }

  searchInput = '';
  // Renamed sort variable to filterStatus to reflect new behavior
  filterStatus = ''; 

  list: ProjectRequirement[] = [];
  filteredlist: ProjectRequirement[] = [];
  paginatedList: ProjectRequirement[] = [];

  isLoading = false;

  currentPage = 1;
  pageSize = 4;
  totalPages = 0;

  ngOnInit() {
    this.loadManagerViewRequirements();
  }

  loadManagerViewRequirements() {
    this.isLoading = true;

    this.myService.getAllProjectRequirements().subscribe({
      next: (data) => {
        this.list = data || [];
        // Call the unified filter method after loading data
        this.applyFilters(); 
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  setupPagination() {
    this.totalPages = Math.ceil(this.filteredlist.length / this.pageSize);
    this.changePage(1);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedList = this.filteredlist.slice(start, end);
  }

  acceptRequirement(id: number) {
    this.isLoading = true;
    this.myService.updateRequirementStatus(id, 'Approved').subscribe(() => {
      this.loadManagerViewRequirements();
    });
  }

  rejectRequirement(id: number) {
    this.isLoading = true;
    this.myService.updateRequirementStatus(id, 'Rejected').subscribe(() => {
      this.loadManagerViewRequirements();
    });
  }

  searchProjectRequirements() {
    this.applyFilters();
  }

  filterByStatus() {
    this.applyFilters();
  }

  applyFilters() {
    const text = this.searchInput.toLowerCase();
    const statusFilter = this.filterStatus;

    this.filteredlist = this.list.filter(p => {
      const matchesSearch = p['requirementTitle']?.toLowerCase().includes(text) ||
        p['requirementDescription']?.toLowerCase().includes(text) ||
        p['status']?.toLowerCase().includes(text);

      const matchesStatus = !statusFilter || p['status'] === statusFilter;

      return matchesSearch && matchesStatus;
    });

    this.setupPagination();
  }
}
