
interface _MedicoUser {
  nombre: string,
  _id:string,
  img:string
}

interface _MedicoHospital {
  nombre: string,
  _id:string,
  img:string
}

export class Medico{

  constructor(
    public _id: string,
    public nombre: string,
    public img?: string,
    public usuario?: _MedicoUser,
    public hospital?: _MedicoHospital
  ) {}

}
