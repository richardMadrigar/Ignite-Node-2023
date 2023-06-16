import { Appointments } from "../../entities/appointments";
import { IAppointmentRepository } from "../Iappointment-repositories";
import { areIntervalsOverlapping } from "date-fns";

export class InMemoryAppointmentRepository implements IAppointmentRepository {
  items: Appointments[] = [];

  async create(appointment: Appointments) {
    await this.items.push(appointment);
  }

  async findOverLappingAppointment(
    startAt: Date,
    endsAt: Date
  ): Promise<Appointments | null> {
    const overlappingAppointment = this.items.find((item) => {
      return areIntervalsOverlapping(
        { start: startAt, end: endsAt },
        { start: item.startAt, end: item.endsAt },
        { inclusive: true }
      );
    });

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }
}
