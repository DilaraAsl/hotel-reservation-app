import { Injectable } from '@angular/core';
import { ReservationDto } from '../models/reservation-dto';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // constructor() { }

  private reservations: ReservationDto[]=[];

  getReservations(): ReservationDto[]{
    return this.reservations;
  }
 
  getReservation(id: string): ReservationDto |undefined{ // we can run into an undefined value
    return this.reservations.find(res=> res.id===id);

  }
  addReserVation(reservation: ReservationDto){
    this.reservations.push(reservation);
    console.log(this.reservations);
  }
  deleteReserVation(id: string):void{
    let index=this.reservations.findIndex(res=>res.id===id);
    this.reservations.splice(index,1);
  }

  updateReserVation(updatedReservation:ReservationDto):void{
    let index=this.reservations.findIndex(res=>res.id===updatedReservation.id);
    this.reservations[index]=updatedReservation;
  }
}
