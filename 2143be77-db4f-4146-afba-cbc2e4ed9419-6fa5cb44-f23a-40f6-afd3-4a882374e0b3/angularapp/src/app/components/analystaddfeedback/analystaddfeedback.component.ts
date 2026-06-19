import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-analystaddfeedback',
  templateUrl: './analystaddfeedback.component.html',
  styleUrls: ['./analystaddfeedback.component.css']
})
export class AnalystaddfeedbackComponent {

  feedbacks: Feedback={
    FeedbackId : 0,
    UserId: 0,
    FeedbackText: '',
    Date:new Date()
  }
 
  formsubmitted: boolean=false;
  message= '';
 
  constructor(private feedbackService: FeedbackService, private router: Router,private authService:AuthService){}
  ngOnInit(){
    this.feedbacks.UserId = Number(this.authService.getUserId());
  }
 
  addFeedback(): void{
    this.formsubmitted=true;
 
    if(!this.feedbacks.UserId || !this.feedbacks.FeedbackText || !this.feedbacks.Date)
    {
      return;
    }
 
    this.feedbackService.sendFeedback(this.feedbacks).subscribe((data)=>{
      console.log(data);
      this.router.navigate(['/analyst/view-feedback']);
    })
 
  }
}
