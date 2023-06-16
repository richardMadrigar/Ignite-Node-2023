import { Appointments } from "../entities/appointments";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointment-repository";

interface ICreateAppointmentRequest {
  customer: string;
  startAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointments;

export class CreateAppointment {
  constructor(private appointmentsRepository: InMemoryAppointmentRepository) {}
  async execute({
    customer,
    endsAt,
    startAt,
  }: ICreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overLappingAppointment =
      await this.appointmentsRepository.findOverLappingAppointment(
        startAt,
        endsAt
      );
console.log({overLappingAppointment});

    if (overLappingAppointment) {
      throw new Error("another appointment overlaps this appointment dates");
    }

    const appointment = new Appointments({ customer, endsAt, startAt });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}
