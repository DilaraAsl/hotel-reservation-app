export interface ReservationDto {
    id: number,
    checkInDate: Date;
    checkOutDate: Date;
    guestName: string,
    guestEmail: string,
    roomNumber: number
}
