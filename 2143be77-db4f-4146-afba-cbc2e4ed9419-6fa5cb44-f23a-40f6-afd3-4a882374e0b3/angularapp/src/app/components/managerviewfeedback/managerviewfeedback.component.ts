import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-managerviewfeedback',
  templateUrl: './managerviewfeedback.component.html',
  styleUrls: ['./managerviewfeedback.component.css']
})
export class ManagerviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  filteredList: Feedback[] = [];
  paginatedList: Feedback[] = [];

  selectedUser: any = null;

  
  searchInput: string = '';
  isLoading: boolean = false;

  currentPage: number = 1;
  pageSize: number = 4;
  totalPages: number = 0;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoading = true;

    this.feedbackService.getFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.filteredList = data;
        this.calculatePagination();
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  searchFeedbacks(): void {
    const value = this.searchInput.toLowerCase().trim();

    this.filteredList = this.feedbacks.filter(f =>
      f['feedbackText']?.toLowerCase().includes(value) 
    );

    this.currentPage = 1;
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredList.length / this.pageSize);
    this.updatePaginatedList();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePaginatedList();
  }

  updatePaginatedList(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedList = this.filteredList.slice(startIndex, endIndex);
  }

  openProfile(row: any) {
    this.selectedUser = {
      userId: row?.userId,
      feedbackText: row?.feedbackText,
      date: row?.date
    };

    const modalEl = document.getElementById('profileModal');
    if (!modalEl) return;

    const modal = Modal.getOrCreateInstance(modalEl);
    modal.show();
  }

 
}
