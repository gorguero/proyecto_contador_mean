import { environment } from "src/environments/environment";

const base_url = environment.url;

export class Documentos{
    
    constructor(
        public nombre: string,
        public fecha?: string,
        public usuario?: any,
        public pdf?: string,
        public _id?: string,
    ){}

    get documentoUrl(){
        if(!this.pdf){
            return '';
        }else if(this.pdf.includes('https')){
            return this.pdf;
        }else if(this.pdf){
            return `${base_url}/upload/documentos/${this.pdf}`;
        } else{
            return;
        }
    }

}