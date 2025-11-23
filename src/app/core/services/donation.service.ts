import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  private readonly api = 'http://localhost:3000/donations';
  private readonly donorsApi = 'http://localhost:3000/donors';

  constructor(private http: HttpClient) {}

  /**
   * Get all donations or donations filtered by donorId
   */
  getAll(donorId?: string): Observable<any[]> {
    if (donorId) return this.http.get<any[]>(`${this.api}?donorId=${encodeURIComponent(donorId)}`);
    return this.http.get<any[]>(this.api);
  }

  // Get a donor by id from the json-server
  getDonorById(donorId: string): Observable<any> {
    return this.http.get<any>(`${this.donorsApi}/${encodeURIComponent(donorId)}`);
  }

  // Get all donors
  getDonors(): Observable<any[]> {
    return this.http.get<any[]>(this.donorsApi);
  }

  getById(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  /**
   * Create a donation. Optionally provide donorId and pointsToAdd to increment donor points
   */
  create(donation: any, donorId?: string, pointsToAdd?: number): Observable<any> {
    return new Observable((subscriber) => {
      this.http.post<any>(this.api, donation).subscribe({
        next: (res) => {
          if (donorId && pointsToAdd && pointsToAdd > 0) {
            // fetch donor, update points
            this.http.get<any>(`${this.donorsApi}/${encodeURIComponent(donorId)}`).subscribe({
              next: (donor) => {
                const current = donor && donor.points ? Number(donor.points) : 0;
                const updated = current + Number(pointsToAdd);
                this.http
                  .patch<any>(`${this.donorsApi}/${encodeURIComponent(donorId)}`, {
                    points: updated,
                  })
                  .subscribe({
                    next: (patched) => {
                      subscriber.next({ donation: res, donor: patched });
                      subscriber.complete();
                    },
                    error: (err) => subscriber.error(err),
                  });
              },
              error: (err) => subscriber.error(err),
            });
          } else {
            subscriber.next({ donation: res });
            subscriber.complete();
          }
        },
        error: (err) => subscriber.error(err),
      });
    });
  }

  update(id: string, donation: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, donation);
  }

  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
