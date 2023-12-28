import { Component,ChangeDetectionStrategy } from '@angular/core';
import { ReservationDto } from '../models/reservation-dto';
import { ReservationService } from '../reservation/reservation.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent {
  reservations: ReservationDto[]=[];
  reservations$: Observable<ReservationDto[]>=this.reservationService.reservations$;

  constructor(private reservationService: ReservationService,private router: Router){
  }

//  Life cycle hook
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
  public onDeleteReservation(id: number){

    // this.reservationService.deleteReservation(id);
    this.reservationService.deleteReservation(id).subscribe(
      (response) => {
        window.alert('Reservation deleted successfully');
        // Update local state
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
        this.router.navigate(['/list']);
      },
      (error) => {
        console.error(`Error deleting reservation with ID ${id}`, error);
        // Handle error as needed
      }
    );
    
  }
  
  }

