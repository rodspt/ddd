import Address from './address';

export default class Customer {

     private _id: string;
     private _name: string = "";
     private _address!: Address; //Inicializa em branco
     private _active: boolean = false ;
     private _rewardPoints: number = 0;

     constructor(id: string, name: string){
         this._id = id;
         this._name = name;
         this.validate();
     }

     get id(): string {
        return this._id;
     }

     get name(): string {
         return this._name;
     }

     get rewardPoints(): number {
        return this._rewardPoints;
     }

     get active(): boolean {
       return this._active;
     }

     get address(): Address {
      return this._address;
    }

  
    changeAddress(address: Address){
      this._address = address;
   }

     validate() {
         if(this._name.length === 0){
            throw new Error("Name is required");
         }
         if(this._id.length === 0) {
            throw new Error("Id is required");
         }
     }

     isActive(): boolean {
         return this._active;
     }

     changeName(name: string){
        this._name = name;
        this.validate();
     }

     addRewardPoints(points: number){
        this._rewardPoints += points;
     }


     activate() {
         if(this._address === undefined){
            throw new Error("Address is mandatory to activate a customer");
         }
         this._active = true;
     }

     desactivate() {
         this._active = false;
     }

     set Address(address: Address){
        this._address = address;
     }
}