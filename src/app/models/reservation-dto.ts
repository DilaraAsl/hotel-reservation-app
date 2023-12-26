export interface ReservationDto {
    id: string,
    checkInDate: Date;
    checkOutDate: Date;
    guestName: string,
    guestEmail: string,
    roomNumber: number
}
