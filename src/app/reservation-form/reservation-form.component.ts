import { Component,OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { ReservationDto } from '../models/reservation-dto';
@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit{
// inject FormBuilder
  constructor(private formBuilder:FormBuilder, private reservationService:ReservationService){

  }
  ngOnInit(): void {
    this.reservationForm=this.formBuilder.group({
      checkInDate: ['',Validators.required], // sets the initial value and the validator- check in date cannot be empty
      checkOutDate: ['',Validators.required],
      guestName: ['',[Validators.required,Validators.minLength(2)]],// array for validators which also checks the minLength
      guestEmail: ['',[Validators.required,Validators.email]], // create an erray which also checks the  email if it is real
      roomNumber: ['',Validators.required] 
         }
      )
    
  }

  reservationForm: FormGroup= new FormGroup({});

  onSubmit(){
    if(this.reservationForm.valid){
      console.log("valid");
      //reservationForm.value => reservation obj
      let newReservation: ReservationDto=this.reservationForm.value;
      this.reservationService.addReserVation(newReservation);
      window.alert("Reservation successfully saved!!!")
      this.reservationForm.reset();
      
    

    }
    
  }



}
