interface _DocumentoUser{
    _id: string;
    nombre: string;
    fecha: string;
    pdf: string;
}

export class NuevoDocumento{
    constructor(
        public nombre: string,
        public fecha: string,
        public pdf?: string,
        public _id?: string,
        public usuario?: _DocumentoUser
    ) {}
}