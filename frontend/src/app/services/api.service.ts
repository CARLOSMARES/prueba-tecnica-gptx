import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../interface/persona';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL: string = 'http://localhost:3000/persona';

  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseURL}/getAll`);
  }

  getPersona(nombre: string): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.baseURL}/getName`, {
      params: new HttpParams().set('name', nombre),
    });
  }

  updatePersona(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.baseURL}/update`, persona, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deletePersona(id: number): Observable<void> {
    return this.http.request<void>('DELETE', `${this.baseURL}/delete`, {
      body: { id: id },
      headers: { 'Content-Type': 'application/json' },
    });
  }

  addPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.baseURL}/create`, persona, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
