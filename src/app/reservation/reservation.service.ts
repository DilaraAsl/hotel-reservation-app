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
      tap((reservations) => {
        this.reservationSubject.next(reservations);
      })
    );
  }
 getReservationById(id: number): Observable<ReservationDto>{
  // getReservation(id: number): ReservationDto |undefined{ // we can run into an undefined value
    // return this.reservations.find(res=> res.id===id);
   // Use the backticks (`) for template literals and interpolate the id
  return this.http.get<ReservationDto>(`${this.apiUrl}/${id}`).pipe(
    catchError((error) => {
      console.error('Error getting reservation:', error);
      throw error;
    })
  );
}
addReserVation(reservation: ReservationDto): Observable<ReservationDto> {
  return this.http.post<any>(`${this.apiUrl}/new`, reservation).pipe(
    map((response) => {
      console.log('Full response:', response);

      // Check if response.reservation is truthy before accessing its properties
      const savedReservation = response.reservation ? response.reservation : null;

      if (savedReservation) {
        const currentReservations = this.reservationSubject.value;
        const updatedReservations = [...currentReservations, savedReservation];
        this.reservationSubject.next(updatedReservations);
      }

      return savedReservation;
    }),
    catchError((error) => {
      console.error('Error saving reservation:', error);
      throw error;
    })
  );
}

  
  deleteReservation(id: number): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      tap((response:any) => {
        const currentReservations = this.reservationSubject.value;
        const updatedReservations = currentReservations.filter((reservation) => reservation.id !== id);
        this.reservationSubject.next(updatedReservations);
        console.log(response);
        return response;
      }),
      catchError((error) => {
        console.error('Error deleting reservation:', error);
        // You can handle the error as needed, e.g., rethrow it or return a default value.
        throw error;
      }),
    );
  }

  updateReservation(updatedReservation:ReservationDto):void{
    let index=this.reservations.findIndex(res=>res.id===updatedReservation.id);
    this.reservations[index]=updatedReservation;
  }
  // initial methods written before connecting to backend

  // getReservation(id: number): ReservationDto |undefined{ // we can run into an undefined value
  //   return this.reservations.find(res=> res.id===id);

  // }
  // addReserVation(reservation: ReservationDto){
  //   this.reservations.push(reservation);
  //   console.log(this.reservations);
  // }
  // deleteReserVation(id: number):void{
  //   let index=this.reservations.findIndex(res=>res.id==id);
  //   this.reservations.splice(index,1);
  // }

  // updateReserVation(updatedReservation:ReservationDto):void{
  //   let index=this.reservations.findIndex(res=>res.id===updatedReservation.id);
  //   this.reservations[index]=updatedReservation;
  // }
}
