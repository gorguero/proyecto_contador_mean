import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }

  async actualizarPDF(
    archivo: File, 
    coleccion: 'usuarios' | 'documentos',
    id: string
    ){
    try {
      
      const url = `${base_url}/upload/${coleccion}/${id}`;
      const formData = new FormData();
      formData.append('pdf', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      })

      const data = await resp.json();
      return 'El archivo se ha subido';

    } catch (error) {
      console.log(error);
      return false;
    }
  }

}
