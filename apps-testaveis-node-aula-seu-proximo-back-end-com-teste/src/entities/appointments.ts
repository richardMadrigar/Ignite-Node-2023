export interface IAppointmentsProps {
  customer: string;
  startAt: Date;
  endsAt: Date;
}

export class Appointments {
  private props: IAppointmentsProps;

  get customer() {
    return this.props.customer
  }
  get startAt() {
    return this.props.startAt
  }
  get endsAt() {
    return this.props.endsAt
  }

  constructor(props: IAppointmentsProps){
    if(props.endsAt <= props.startAt){
      throw new Error("invalid en date")
    }

    if(props.startAt <= new Date()){
      throw new Error("invalid start date")
    }
    this.props = props
  }
}
