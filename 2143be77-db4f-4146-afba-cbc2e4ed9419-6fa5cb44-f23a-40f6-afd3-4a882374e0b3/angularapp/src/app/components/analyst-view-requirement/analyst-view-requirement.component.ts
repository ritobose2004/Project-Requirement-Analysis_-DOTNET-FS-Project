
import { Component, OnInit } from '@angular/core';
import { ProjectRequirementService } from 'src/app/services/project-requirement.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-analyst-view-requirement',
  templateUrl: './analyst-view-requirement.component.html',
  styleUrls: ['./analyst-view-requirement.component.css']
})
export class AnalystViewRequirementComponent implements OnInit {

  requirements: any[] = [];
  filteredRequirements: any[] = [];
  paginatedList: any[] = [];

  searchText: string = '';
  isLoading: boolean = false;

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;

  showDeletePopup = false;
  selectedReq: any;
  userId!: number;

  sortKey: '' | 'title' | 'description' | 'status' = '';
  sortDir: 'asc' | 'desc' = 'asc';

  constructor(
    private service: ProjectRequirementService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.authService.getUserId());
    this.loadRequirements();
  }

  loadRequirements(): void {
    if (!this.userId) return;

    this.isLoading = true;

    this.service.getProjectRequirementsByUserId(this.userId).subscribe({
      next: (data) => {
        this.requirements = Array.isArray(data) ? data : [data];
        this.applySearch();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load requirements', err);
        this.requirements = [];
        this.filteredRequirements = [];
        this.isLoading = false;
      }
    });
  }

  applySearch(): void {
    const search = this.searchText.toLowerCase().trim();

    this.filteredRequirements = !search
      ? [...this.requirements]
      : this.requirements.filter(req =>
          req.requirementTitle?.toLowerCase().includes(search) ||
          req.requirementDescription?.toLowerCase().includes(search) ||
          req.status?.toLowerCase().includes(search)
        );

    this.currentPage = 1;
    this.applySort();
  }

  applySort(): void {
    if (!this.sortKey) {
      this.calculatePagination();
      return;
    }

    const getterMap: Record<'title' | 'description' | 'status', (r: any) => string> = {
      title:       (r) => (r.requirementTitle ?? '').toString(),
      description: (r) => (r.requirementDescription ?? '').toString(),
      status:      (r) => (r.status ?? '').toString(),
    };

    const getter = getterMap[this.sortKey];

    this.filteredRequirements.sort((a, b) => {
      const va = getter(a);
      const vb = getter(b);
      const cmp = va.localeCompare(vb, undefined, { sensitivity: 'base', numeric: true });
      return this.sortDir === 'asc' ? cmp : -cmp;
    });

    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredRequirements.length / this.pageSize);
    this.updatePaginatedList();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedList();
  }

  updatePaginatedList(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedList = this.filteredRequirements.slice(start, end);
  }

  openDelete(req: any): void {
    this.selectedReq = req;
    this.showDeletePopup = true;
  }

  cancelDelete(): void {
    this.showDeletePopup = false;
    this.selectedReq = null;
  }

  confirmDelete(): void {
    if (!this.selectedReq) {
      this.cancelDelete();
      return;
    }

    const requirementId = Number(
      this.selectedReq?.requirementId ?? this.selectedReq?.RequirementId
    );

    this.service.deleteProjectRequirement(requirementId).subscribe({
      next: () => {
        this.loadRequirements();
        this.cancelDelete();
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Delete failed.');
        this.cancelDelete();
      }
    });
  }
}
