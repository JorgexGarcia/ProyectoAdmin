
interface _HospitalUser {
  nombre: string,
  _id:string,
  img:string
}

export class Hospital{

  constructor(
    public _id: string,
    public nombre: string,
    public img?: string,
    public usuario?: _HospitalUser
  ) {}

}
