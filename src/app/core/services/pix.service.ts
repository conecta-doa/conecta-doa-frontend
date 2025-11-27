import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PixResponse {
  isSuccess: boolean;
  copyPaste?: string;
  qrCode?: string;
  error?: string;
}

@Injectable({ providedIn: 'root' })
export class PixService {
  private readonly endpoint = 'http://localhost:5080/generate-qr-code';

  private readonly defaultPixReceiver = '11222333000181';

  constructor(private http: HttpClient) {}

  generatePix(
    value: number,
    name: string,
    city: string,
    pixKeyReceiver?: string,
    message?: string
  ): Observable<PixResponse> {
    const body: any = {
      PixKeyReceiver: pixKeyReceiver || this.defaultPixReceiver,
      Value: value,
      Name: name || '',
      City: city || '',
    };

    if (message) body.Message = message;

    return this.http.post<PixResponse>(this.endpoint, body);
  }
}
