import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  public apiUrl = "https://ide-bccccbfdfbfcabebbbaadbddfacbfafafdaeb.premiumproject.examly.io/proxy/8080"

  constructor(private http: HttpClient) { }


  getAllProjects(): Observable<Project[]> {

    return this.http.get<Project[]>(`${this.apiUrl}/api/projects`);

  }


  getProjectById(projectId: number): Observable<Project> {

    return this.http.get<Project>(`${this.apiUrl}/api/projects/${projectId}`);

  }

  

  addProject(project: Project): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/api/projects`, project);

  }

  updateProject(projectId: number, project: Project): Observable<any> {

    return this.http.put<any>(`${this.apiUrl}/api/projects/${projectId}`, project);

  }

  deleteProject(projectId: number): Observable<any> {

    return this.http.delete<any>(`${this.apiUrl}/api/projects/${projectId}`);
    
  }

}
