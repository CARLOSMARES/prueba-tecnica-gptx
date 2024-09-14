import { turso } from "../config/db";

export default function tbDatosUsuario(): void {
  const tablaSchema: string = `
   CREATE TABLE IF NOT EXISTS Usuario (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombres VARCHAR(100) NOT NULL,
  apellidoPaterno VARCHAR(100) NOT NULL,
  apellidoMaterno VARCHAR(100),
  direccion VARCHAR(255) NOT NULL,
  telefono VARCHAR(15)
);
  `;

  turso.execute(tablaSchema);
}
