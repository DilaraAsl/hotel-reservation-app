import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ReservationDto } from '../models/reservation-dto';
import { Router,ActivatedRoute } from '@angular/router'; // activatedroute allows to see the pathvariable
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{
  // inject FormBuilder
  constructor(private formBuilder:FormBuilder, 
    private reservationService:ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute ){

  }
  // ngOnInit(): void {
  //   this.reservationForm=this.formBuilder.group({
  //     checkInDate: ['',Validators.required], // sets the initial value and the validator- check in date cannot be empty
  //     checkOutDate: ['',Validators.required],
  //     guestName: ['',[Validators.required,Validators.minLength(2)]],// array for validators which also checks the minLength
  //     guestEmail: ['',[Validators.required,Validators.email]], // create an erray which also checks the  email if it is real
  //     roomNumber: ['',Validators.required] 
  //        }
  //     )
  //     // this.activatedRoute.snapshot.paramMap.get('id') expects string - the pathvariable is a string 
  //     let idString= this.activatedRoute.snapshot.paramMap.get('id');
  //     if(idString){
  //       let id = +idString; // or parseInt(idString, 10);
  //       if(!isNaN(id)){// The conversion to number was successful, and id is a valid number.
  //       let reservation=this.reservationService.getReservationById(id).subscribe(
  //         (savedReservation: ReservationDto) => {
  //           console.log('Reservation saved successfully:', savedReservation);
  //           this.reservationForm.patchValue(savedReservation);
  //         },
  //         (error) => {
  //           console.error('Error saving reservation:', error);
  //         }
  //       );
  //       // if(reservation)
  //       // this.reservationForm.patchValue(reservation);
  //     }
  //     }
  // }
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', [Validators.required, Validators.minLength(2)]],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required],
    });
    // read the parameter and convert it to numeric value
    let idString = this.activatedRoute.snapshot.paramMap.get('id');
    if (idString) {
      let id = +idString;
      if (!isNaN(id)) {
        this.reservationService.getReservationById(id).subscribe(
          (savedReservation: ReservationDto) => {
            console.log('Reservation retrieved successfully:', savedReservation);
            // Move the patchValue inside the subscription
            this.reservationForm.patchValue(savedReservation);
          },
          (error) => {
            console.error('Error retrieving reservation:', error);
          }
        );
      }
    }
  }

  reservationForm: FormGroup= new FormGroup({});

  onSubmit(){
    if(this.reservationForm.valid){

      console.log("valid");
      //reservationForm.value => reservation obj

      let idString = this.activatedRoute.snapshot.paramMap.get('id');
      let updatedReservation: ReservationDto = this.reservationForm.value;
    if (idString) {
      let id = +idString;
    
      if (!isNaN(id)) {
        this.reservationService.updateReservation(id,updatedReservation).subscribe(
          (newReservation: ReservationDto) => {
            console.log('Reservation updated successfully:', newReservation);
            this.reservationForm.patchValue(newReservation);
            window.alert("Reservation successfully updated!!!");
            this.router.navigate(['/list']);
          },
          (error) => {
            console.error('Error retrieving reservation:', error);
          }
        );
        window.alert("Reservation successfully updated!!!");
      }
    }
    else{
      let newReservation: ReservationDto=this.reservationForm.value;
      
      this.reservationService.addReserVation(newReservation).subscribe(
        (savedReservation: ReservationDto) => {
          console.log('Reservation saved successfully:', savedReservation);
        },
        (error) => {
          console.error('Error saving reservation:', error);
        }

        
      );
      window.alert("Reservation successfully saved!!!");
    }
        
      // this.reservationForm.reset();
      //redirecting the user to list
      this.router.navigate(['/list']);
      
    

    }


    
  }



}
