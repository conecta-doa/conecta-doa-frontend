import { Injectable } from '@angular/core';
import { InstitutionData } from './institution.service';

@Injectable({
  providedIn: 'root',
})
export class DonationContextService {
  private _selectedInstitution: InstitutionData | null = null;
  private readonly STORAGE_KEY = 'conecta_donation_institution';

  constructor() {
    // Try to load from sessionStorage on initialization
    try {
      const raw = sessionStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        this._selectedInstitution = JSON.parse(raw) as InstitutionData;
      }
    } catch (e) {
      // ignore parse/storage errors
      this._selectedInstitution = null;
    }
  }

  setSelectedInstitution(inst: InstitutionData) {
    this._selectedInstitution = inst;
    try {
      sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(inst));
    } catch (e) {
      // ignore storage errors (quota, disabled storage, etc.)
    }
  }

  getSelectedInstitution(): InstitutionData | null {
    if (this._selectedInstitution) return this._selectedInstitution;
    try {
      const raw = sessionStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as InstitutionData;
        this._selectedInstitution = parsed;
        return parsed;
      }
    } catch (e) {
      // ignore
    }
    return null;
  }

  clear(): void {
    this._selectedInstitution = null;
    try {
      sessionStorage.removeItem(this.STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  }
}
