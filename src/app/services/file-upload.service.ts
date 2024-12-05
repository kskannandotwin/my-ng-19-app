import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  upload(file: File): Observable<number> {
    // Simulated upload progress
    return of(100);
  }
}
