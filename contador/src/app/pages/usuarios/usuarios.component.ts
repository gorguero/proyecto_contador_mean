import { Component, OnInit } from '@angular/core';
import Usuarios from 'src/app/models/usuarios.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit{

  public cargando:boolean = false;
  public usuarios!: Usuarios[];
  public usuariosTemp: Usuarios[] = [];
  public p: any = 1;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.usuarioService.cargarUsuarios().subscribe( (usuarios) => {
      this.usuarios = usuarios;
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios().subscribe( (usuarios) => {
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }

  cambiarRol( usuario:Usuarios ){
    this.usuarioService.guardarUsuario( usuario )
    .subscribe( resp => console.log( resp ) );
  }

  eliminarUsuario( usuario:Usuarios ): any{

    if(usuario.uid === this.usuarioService.uid){
      return Swal.fire('Error', 'No puede eliminarse el mismo usuario');
    }

    Swal.fire({
      title: `¿Desea borrar a ${usuario.nombre}?`,
      icon: 'warning',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText:'No, gracias'
    }).then((result) => {

      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario( usuario ).subscribe( resp => {
          this.cargarUsuarios();
          Swal.fire(
            'Eliminado!',
            'Usuario eliminado correctamente.',
            'success'
          )
        }, (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.msg
          });
        });
        
      }else if(result.isDenied){
        Swal.fire(
          'Cancelado!',
          'Se cancelo la operación',
          'error'
        )
      }

    })
  }

}
