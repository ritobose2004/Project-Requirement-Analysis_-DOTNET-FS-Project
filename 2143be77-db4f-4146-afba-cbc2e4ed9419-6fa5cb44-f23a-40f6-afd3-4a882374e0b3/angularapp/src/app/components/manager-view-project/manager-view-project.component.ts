import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
 
@Component({
  selector: 'app-manager-view-project',
  templateUrl: './manager-view-project.component.html',
  styleUrls: ['./manager-view-project.component.css']
})
export class ManagerViewProjectComponent {
 
  projects: any[] = [];
  filteredProjects: any[] = [];
  paginatedProjects: any[] = [];
 
  searchText = '';
  selectedStatus = ''; // Dropdown value
 
  showDeletePopup = false;
  selectedProjectId: number | null = null;
 
  isLoading = false;
  banner: { type: string; message: string } | null = null;
 
  currentPage = 1;
  pageSize = 4;
  totalPages = 0;
 
  constructor(private service: ProjectService, private router: Router) { }
 
  ngOnInit(): void {
    this.loadProjects();
  }
 
  private showBanner(type: string, message: string, hideAfter = 2000) {
    this.banner = { type, message };
    setTimeout(() => (this.banner = null), hideAfter);
  }
 
  private isSuccessTextError(err: any): boolean {
    return (
      err?.status === 200 &&
      (err.message?.includes('parsing') ||
        typeof err.error === 'string' ||
        typeof err.error?.text === 'string')
    );
  }
 
  loadProjects() {
    this.isLoading = true;
 
    this.service.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res || [];
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        if (this.isSuccessTextError(err)) {
          this.applyFilters();
          return;
        }
        this.showBanner('danger', 'Failed to load projects.');
      }
    });
  }
 
  // FIXED FILTER LOGIC
  applyFilters() {
    const text = this.searchText.toLowerCase().trim();
    const statusFilter = this.selectedStatus; 
 
    this.filteredProjects = this.projects.filter(p => {
      const matchesSearch = !text ||
        p.projectTitle?.toLowerCase().includes(text) ||
        p.projectDescription?.toLowerCase().includes(text) ||
        p.status?.toLowerCase().includes(text);
 
      const matchesStatus = (statusFilter === '') || (p.status === statusFilter);
 
      return matchesSearch && matchesStatus;
    });
 
    this.setupPagination();
  }
 
  setupPagination() {
    this.totalPages = Math.ceil(this.filteredProjects.length / this.pageSize);
    this.changePage(1);
  }
 
  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
 
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
 
    this.paginatedProjects = this.filteredProjects.slice(start, end);
  }
 
  editProject(id: number) {
    this.router.navigate([`manager/edit-projectmanager/view-project/${id}`]);
  }
 
  openDeletePopup(id: number) {
    this.selectedProjectId = id;
    this.showDeletePopup = true;
  }
 
  cancelDelete() {
    this.showDeletePopup = false;
    this.selectedProjectId = null;
  }
 
  confirmDelete() {
    if (this.selectedProjectId === null) return;
 
    this.isLoading = true;
 
    this.service.deleteProject(this.selectedProjectId).subscribe({
      next: () => this.handleDeleteSuccess(),
      error: (err) => {
        this.isLoading = false;
        if (this.isSuccessTextError(err)) {
          this.handleDeleteSuccess();
          return;
        }
        this.showBanner('danger', 'Failed to delete project.');
      }
    });
  }
 
  private handleDeleteSuccess() {
    this.loadProjects();
    this.cancelDelete();
    this.isLoading = false;
    this.showBanner('success', 'Project deleted successfully.');
  }
}
 