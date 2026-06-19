import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-analystviewfeedback',
  templateUrl: './analystviewfeedback.component.html',
  styleUrls: ['./analystviewfeedback.component.css']
})
export class AnalystviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  filteredFeedbacks: Feedback[] = [];
  paginatedFeedbacks: Feedback[] = [];

  searchText = '';
  isLoading = false;

  showDeletePopup = false;
  selectedFeedbackId!: string;

  currentPage = 1;
  pageSize = 4;
  totalPages = 0;

  userId: string;

  constructor(
    private authservice: AuthService,
    private feedback: FeedbackService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.authservice.getUserId();
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoading = true;

    this.feedback.getAllFeedbacksByUserId(this.userId).subscribe({
      next: (data) => {
        this.feedbacks = data || [];
        this.applySearch();
        this.isLoading = false;
      },
      error: () => {
        this.feedbacks = [];
        this.filteredFeedbacks = [];
        this.paginatedFeedbacks = [];
        this.isLoading = false;
      }
    });
  }

  applySearch(): void {
    const search = this.searchText.toLowerCase().trim();

    this.filteredFeedbacks = !search
      ? [...this.feedbacks]
      : this.feedbacks.filter(f =>
          f['feedbackText']?.toLowerCase().includes(search) 
        );

    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredFeedbacks.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedFeedbacks = this.filteredFeedbacks.slice(start, start + this.pageSize);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  deleteFeedback(feedbackId: string): void {
    this.feedback.deleteFeedback(feedbackId).subscribe(() => {
      this.loadFeedbacks();
    });
  }

  openDelete(item: Feedback): void {
    this.selectedFeedbackId = item['feedbackId'];
    this.showDeletePopup = true;
  }

  cancelDelete(): void {
    this.showDeletePopup = false;
    this.selectedFeedbackId = '';
  }

  confirmDelete(): void {
    this.feedback.deleteFeedback(this.selectedFeedbackId).subscribe(() => {
      this.loadFeedbacks();
      this.cancelDelete();
    });
  }

  addFeedback(): void {
    this.router.navigate(['/analyst/add-feedback']);
  }
}
