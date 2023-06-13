export class Usuarios {

    constructor(
        public nombre: string, 
        public email: string, 
        public curp: string,
        public telefono: string,
        public password: string,
        public password2: string,
        public rol: 'ADMIN_ROL' | 'USER_ROL',
        public uid: string
    ){}

}


export default Usuarios;