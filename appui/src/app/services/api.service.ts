import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { catchError, retry } from 'rxjs/operators';
import { CookieService } from "ngx-cookie-service";
import { Turntabl_Project, Endpoints, Status,RequestInput } from './endpoint';

// @Injectable({
//   providedIn: 'root'
// })
// export class ApiService {

//   constructor(private http: HttpClient) { }
// }



///////////////////////////////////////////////////////////////////////////////////////////
@Injectable({providedIn: 'root'})
 export class EmpireService {

  statusUrl:string 
  turntablproject_url:string 
  addNewProject: string 
  addNewEndpoints: string

  constructor(private http: HttpClient, private cookieservice: CookieService) {
    this.statusUrl = this.cookieservice.get("statusUrl");
    this.turntablproject_url = this.cookieservice.get("turntablproject_url");
    this.addNewProject = this.cookieservice.get("addNewProject_url");
    this.addNewEndpoints = this.cookieservice.get("addNewEndpoint_url");
    
    this.http.get<any>(window.location.origin + '/').subscribe(res => {
      sessionStorage.setItem('turntablproject_url', res.turntablproject_url)
      sessionStorage.setItem('endpoints_url', res.endpoints_url)
      sessionStorage.setItem('addNewProject_url', res.addNewProject_url)
      sessionStorage.setItem('addNewEndpoint_url', res.addNewEndpoints_url)
    })
  }
  getProjects(): Observable<Turntabl_Project[]> {
    // return this.http.get<Turntabl_Project[]>(sessionStorage.getItem('turntablproject_url'));
    return this.http.get<Turntabl_Project[]>(this.turntablproject_url);
  }
  
  getProjectById(id: number): Observable<Turntabl_Project>{
    return this.http.get<Turntabl_Project>(this.turntablproject_url + id);
  }

  getEndpoints(): Observable<Endpoints[]> {
    return this.http.get<Endpoints[]>(sessionStorage.getItem('endpoints_url'));
  }
  
  getEndpointById(id: number): Observable<Endpoints>{
    return this.http.get<Endpoints>(sessionStorage.getItem('endpoints_url') + id);
  }

  getStatus(): Observable<Status[]> {
  // return this.http.get<Status[]>(sessionStorage.getItem('status_url'));
  return this.http.get<Status[]>(this.statusUrl);
  }

  getStatusByProjectId(project_id: number): Observable<Status[]> {
    return this.http.get<Status[]>(this.statusUrl + project_id);
  }

  addProject(project:RequestInput): Observable<any>{
    return this.http.post<RequestInput>(this.addNewProject, project);  
  }
  
  addEndpoints(endpoint:Endpoints): Observable<Endpoints>{
    return this.http.post<Endpoints>(this.addNewEndpoints, endpoint);  
  }
}