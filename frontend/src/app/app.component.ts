import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Persona } from './interface/persona';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Persona';
  personas: Persona[] = [];
  selectedPersona?: Persona;
  newPersona: Persona = {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    direccion: '',
    telefono: '',
  };

  constructor(private personaServicio: ApiService) {}

  ngOnInit(): void {
    this.personaServicio.getPersonas().subscribe((personas) => {
      this.personas = personas;
    });
  }

  editPersona(persona: Persona): void {
    this.selectedPersona = { ...persona };
  }

  updatePersona(): void {
    if (this.selectedPersona) {
      this.personaServicio
        .updatePersona(this.selectedPersona)
        .subscribe((updatedPersona) => {
          const index = this.personas.findIndex(
            (p) => p.id === updatedPersona.id
          );
          if (index !== -1) {
            this.personas[index] = updatedPersona;
          }
          this.selectedPersona = undefined;
        });
    }
  }

  deletePersona(id: number): void {
    this.personaServicio.deletePersona(id).subscribe(() => {
      this.personas = this.personas.filter((p) => p.id !== id);
    });
  }

  addPersona(): void {
    this.personaServicio
      .addPersona(this.newPersona)
      .subscribe((addedPersona) => {
        this.personas.push(addedPersona);
        this.newPersona = {
          nombres: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          direccion: '',
          telefono: '',
        }; // Limpiar el formulario
      });
  }
}
