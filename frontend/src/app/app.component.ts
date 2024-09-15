import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Persona } from './interface/persona';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
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

  constructor(
    private personaServicio: ApiService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.personaServicio.getPersonas().subscribe((personas) => {
      this.personas = personas;
    });
  }

  trackById(index: number, persona: Persona): number | undefined {
    return persona.id;
  }

  openNewDialog(): void {
    const dialog = document.getElementById('new') as HTMLDialogElement;
    if (dialog) {
      dialog.className = 'modal-dialog';
      dialog.showModal();
    }
  }

  openEditDialog(): void {
    const dialog = document.getElementById('modify') as HTMLDialogElement;
    if (dialog) {
      dialog.className = 'modal-dialog';
      dialog.showModal();
    }
  }

  closeNewDialog(): void {
    const dialog = document.getElementById('new') as HTMLDialogElement;
    if (dialog) {
      dialog.className = 'modal-dialog-hide';
      dialog.close();
    }
  }

  closeEditDialog(): void {
    const dialog = document.getElementById('modify') as HTMLDialogElement;
    if (dialog) {
      dialog.className = 'modal-dialog-hide';
      dialog.close();
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
        };
        this.closeNewDialog();
      });
  }

  editPersona(persona: Persona): void {
    this.personaServicio
      .getPersona(persona.telefono)
      .subscribe((personaEncontrada) => {
        if (personaEncontrada) {
          this.selectedPersona = personaEncontrada; // Asigna la persona encontrada directamente
          this.openEditDialog();
        } else {
          console.error('No se encontró ninguna persona con ese teléfono');
        }
      });
    this.closeEditDialog();
  }

  updatePersona(): void {
    if (this.selectedPersona) {
      this.personaServicio
        .updatePersona(this.selectedPersona)
        .subscribe((updatedPersona) => {
          const index = this.personas.findIndex(
            (p) => p.telefono === updatedPersona.telefono
          );
          if (index !== -1) {
            this.personas[index] = updatedPersona;
          }
          this.selectedPersona = undefined;
          this.closeNewDialog(); // Cierra el diálogo después de la actualización
        });
    }
  }

  onSubmit(): void {
    if (this.selectedPersona) {
      this.updatePersona(); // Actualizar persona si existe una seleccionada
      window.location.reload();
    } else {
      this.addPersona(); // Agregar nueva persona si no hay una seleccionada
      window.location.reload();
    }
    window.location.reload();
  }
}
