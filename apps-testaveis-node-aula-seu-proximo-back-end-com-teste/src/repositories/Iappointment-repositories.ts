import { Appointments } from "../entities/appointments";

export interface IAppointmentRepository {
  create(appointment: Appointments): Promise<void>;
  findOverLappingAppointment(
    startAt: Date,
    endsAt: Date
  ): Promise<Appointments | null>;
}
