import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { trainee } from '../interfaces/lumpsum';

@Injectable({
  providedIn: 'root'
})
export class TraineeService {

  constructor(private http: HttpClient) { }

  checkTrainee (person: trainee) {
    let obs = new Observable<boolean>((observer) => {
      this.http
        .get<boolean>(`/api/trainee?fname=${person.fname}&lname=${person.lname}`, { observe: 'response' })
        .subscribe({
          next: (data) => {
            observer.next(data.body!);
          },
          error: (err) => {            
            console.error(err);
            observer.next(false);
          },
        });
    });
    return obs;
  }
}
