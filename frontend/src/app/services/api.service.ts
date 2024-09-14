import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interface/persona';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL: string = 'http://localhost:300/personas';
  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseURL}/getAll`);
  }

  getPersona(nombre: string): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseURL}/getName`, {
      params: { nombre },
    });
  }
}
