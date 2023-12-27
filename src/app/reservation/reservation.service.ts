import { Injectable } from '@angular/core';
import { ReservationDto } from '../models/reservation-dto';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject,Observable } from 'rxjs';
import { map,catchError,tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:6003/reservation';
  private reservationSubject=new BehaviorSubject<ReservationDto[]>([]);
  reservations$: Observable<ReservationDto[]> = this.reservationSubject;

  constructor(private http: HttpClient) { }

  private reservations: ReservationDto[]=[];
 
  getReservations(): Observable<ReservationDto[]>{
    return this.http.get<ReservationDto[]>(`${this.apiUrl}/list`).pipe(
      tap((appointments) => {
        this.reservationSubject.next(appointments);
      })
    );
  }
 
  getReservation(id: number): ReservationDto |undefined{ // we can run into an undefined value
    return this.reservations.find(res=> res.id===id);

  }
  addReserVation(reservation: ReservationDto){
    this.reservations.push(reservation);
    console.log(this.reservations);
  }
  deleteReserVation(id: number):void{
    let index=this.reservations.findIndex(res=>res.id==id);
    this.reservations.splice(index,1);
  }

  updateReserVation(updatedReservation:ReservationDto):void{
    let index=this.reservations.findIndex(res=>res.id===updatedReservation.id);
    this.reservations[index]=updatedReservation;
  }
}
