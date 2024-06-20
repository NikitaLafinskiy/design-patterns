// Without the mediator

// // Booking class
// class BookingComponent {
//     notifier: NotificationComponent
//     username: string
//     reservationNumber: number
//     constructor(notifier: NotificationComponent, username: string, reservationNumber: number) {
//         this.notifier = notifier
//         this.username = username
//         this.reservationNumber = reservationNumber
//     }

//     setUsername(username:string){
//         this.username = username
//     }

//     setReservationNumber(reservationNumber:number){
//         this.reservationNumber = reservationNumber
//     }

//     reserveNumber(){
//         this.notifier.sendNotification(this.username, this.reservationNumber)
//     }
// }

// // Notification component
// class NotificationComponent {
//   sendNotification(username: string, reservationNumber: number): string {
//     return `Reservation acquired for user ${username} with the number of ${reservationNumber}`;
//   }
// }

// With the mediator

// Mediator
interface IMediator {
  notify(sender: object, event: string): string;
}

class BookingMediator implements IMediator {
  bookingComponent: BookingComponent;
  notifierComponent: NotificationComponent;

  constructor(
    bookingComponent: BookingComponent,
    notifierComponent: NotificationComponent
  ) {
    this.bookingComponent = bookingComponent;
    this.bookingComponent.setMediator(this);
    this.notifierComponent = notifierComponent;
    this.notifierComponent.setMediator(this);
  }

  notify(sender: object, event: string): string {
    if (event === "ReserveNumber") {
      return this.notifierComponent.sendNotification(
        this.bookingComponent.username,
        this.bookingComponent.reservationNumber
      );
    }

    return "Unknown event";
  }
}

// Booking class
class BookingComponent {
  username: string;
  reservationNumber: number;
  mediator: IMediator | null = null;
  constructor(username: string, reservationNumber: number) {
    this.username = username;
    this.reservationNumber = reservationNumber;
  }

  setMediator(mediator: IMediator) {
    this.mediator = mediator;
  }

  setUsername(username: string) {
    this.username = username;
  }

  setReservationNumber(reservationNumber: number) {
    this.reservationNumber = reservationNumber;
  }

  reserveNumber(): string {
    return this.mediator!.notify(this, "ReserveNumber");
  }
}

// Notification component
class NotificationComponent {
  mediator: IMediator | null = null;

  setMediator(mediator: IMediator) {
    this.mediator = mediator;
  }

  sendNotification(username: string, reservationNumber: number): string {
    return `Reservation acquired for user ${username} with the number of ${reservationNumber}`;
  }
}

const booking = new BookingComponent("nikita", 123);
const notifier = new NotificationComponent();
const mediator = new BookingMediator(booking, notifier);

console.log(booking.reserveNumber());
