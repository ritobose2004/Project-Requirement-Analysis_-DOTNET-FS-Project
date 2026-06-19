import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public apiUrl = "https://ide-bccccbfdfbfcabebbbaadbddfacbfafafdaeb.premiumproject.examly.io/proxy/8080"

  constructor(private http:HttpClient) { }

  sendFeedback(feedback:Feedback):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/api/feedback`,feedback);
  }

  getAllFeedbacksByUserId(userId:string):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback/user/${userId}`);
  }

  deleteFeedback(feedbackId:string):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/api/feedback/${feedbackId}`);
  }

  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}/api/feedback`);
  }





}
