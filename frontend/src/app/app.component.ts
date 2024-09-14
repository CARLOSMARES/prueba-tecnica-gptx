import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Persona } from './interface/persona';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Persona';
  persona: Persona[] = [];

  constructor(private personaServicio: ApiService) {
    personaServicio.getPersonas().subscribe((peronsa: Persona[]) => {
      this.persona = peronsa;
    });
  }
}
