import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProjectRequirement } from '../models/projectRequirement.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectRequirementService {

  public apiUrl = "https://ide-bccccbfdfbfcabebbbaadbddfacbfafafdaeb.premiumproject.examly.io/proxy/8080"

  constructor(private http: HttpClient) { }


  getAllProjectRequirements(): Observable<ProjectRequirement[]> {

    return this.http.get<ProjectRequirement[]>(`${this.apiUrl}/api/projectrequirements`);
    
  }

  getProjectRequirementById(requirementId: number): Observable<ProjectRequirement> {

    return this.http.get<ProjectRequirement>(`${this.apiUrl}/api/projectrequirements/${requirementId}`);
   

  }

  getProjectRequirementsByUserId(userId: number): Observable<ProjectRequirement[]> {

    return this.http.get<ProjectRequirement[]>(`${this.apiUrl}/api/projectrequirements/user/${userId}`);

  }

  addProjectRequirement(projectRequirement: ProjectRequirement): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/api/projectrequirements`, projectRequirement, {responseType: 'text' as 'json'});

  }

  updateProjectRequirement(requirementId: number, projectRequirement: ProjectRequirement): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/api/projectrequirements/${requirementId}`, projectRequirement);

  }

  deleteProjectRequirement(requirementId: number): Observable<any> {

    return this.http.delete<any>(`${this.apiUrl}/api/projectrequirements/${requirementId}`, {responseType:'text' as 'json' });

  }



  updateRequirementStatus(id: number, status: string): Observable<any> {
    
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const statusPayload = JSON.stringify(status); 

    return this.http.put(
      `${this.apiUrl}/api/projectrequirements/${id}/status`, 
      statusPayload, 
      { 
        headers: headers,
        responseType: 'text' 
      }
    );
  }

}
