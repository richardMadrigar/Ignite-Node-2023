import { describe, it, expect } from "vitest";
import { CreateAppointment } from "./create-appointment";
import { Appointments } from "../entities/appointments";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentRepository } from "../repositories/in-memory/in-memory-appointment-repository";

describe("", () => {
  it("should be able to create an appointment", () => {
    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    const startAt = getFutureDate("2022-08-22");
    const endsAt = getFutureDate("2022-08-23");

    expect(
      createAppointment.execute({
        customer: "richard",
        startAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointments);
  });
  it("should not be able to create an appointment with overlapping dates", async () => {
    const startAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    const appointmentRepository = new InMemoryAppointmentRepository();
    const createAppointment = new CreateAppointment(appointmentRepository);

    await createAppointment.execute({
      customer: "richard",
      startAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "richard",
        startAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);

    expect(
      createAppointment.execute({
        customer: "richard",
        startAt: getFutureDate("2022-08-09"),
        endsAt: getFutureDate("2022-08-12"),
      })
    ).rejects.toBeInstanceOf(Error);
    expect(
      createAppointment.execute({
        customer: "richard",
        startAt: getFutureDate("2022-08-09"),
        endsAt: getFutureDate("2022-08-17"),
      })
    ).rejects.toBeInstanceOf(Error);
    expect(
      createAppointment.execute({
        customer: "richard",
        startAt: getFutureDate("2022-08-11"),
        endsAt: getFutureDate("2022-08-12"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
