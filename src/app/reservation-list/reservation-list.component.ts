import { Component,ChangeDetectionStrategy } from '@angular/core';
import { ReservationDto } from '../models/reservation-dto';
import { ReservationService } from '../reservation/reservation.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  constructor(private reservationService: ReservationService){}
  reservations: ReservationDto[]=[];
  reservations$: Observable<ReservationDto[]>=this.reservationService.reservations$;

  ngOnInit() {

      // Fetch reservations when the component initializes
  
  this.fetchReservations();
  }
  public fetchReservations() {
    console.log('Fetching reservations...');

    this.reservationService.getReservations().subscribe(
      (reservations) => {
        console.log('Reservations received:', reservations);
        // Successfully fetched, update the local array
        this.reservations = reservations;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

}
