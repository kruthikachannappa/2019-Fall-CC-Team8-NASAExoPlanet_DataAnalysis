import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({})
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private routerData : any;
  private confirmData = [];
  private apiKey = '&api_key=ofVrVVbDilF0ziVtYyyLWdorl7M9SI2W6tzeSFf4';
  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }
  setData(data) {
    this.routerData = data;
  }
  getData() {
    return this.routerData;
  }
  getConfirmedData() {
    if(JSON.parse(localStorage.getItem('confirmedPlanet'))){
      this.confirmData = JSON.parse(localStorage.getItem('confirmedPlanet'));
    } else {
      this.confirmData = [];
    }
    return this.confirmData;
  }
  getConfirmedPlanets(): Observable<any> {
    const apiurl = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&' +
      '&order=dec&format=json' + this.apiKey;
    /*const dataUrl = '../assets/data/confirmed.json';
    return this.http.get(dataUrl);*/
    return this.http.get(apiurl, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

}
