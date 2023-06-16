import { describe, it, expect } from "vitest";
import { Appointments } from "./appointments";
import { getFutureDate } from "../tests/utils/get-future-date";

describe("create an appointment", () => {

  const startAt = getFutureDate("2022-08-10");
  const endsAt = getFutureDate("2022-08-11");;
  it("", () => {
    const appointment = new Appointments({
      customer: "richard",
      startAt,
      endsAt,
    });

    expect(appointment).toBeInstanceOf(Appointments);
    expect(appointment.customer).toEqual("richard");
  });

  it("cannot create an appointment with end date before start date", () => {
    
    const startAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-09");;

    startAt.setDate(startAt.getDate() + 2);
    endsAt.setDate(endsAt.getDate() + 1);

    expect(() => {
      return new Appointments({
        customer: "richard",
        startAt,
        endsAt,
      });
    }).toThrow();
  });
  it("cannot create an appointment with end date before now", () => {
    const startAt = new Date();
    const endsAt = new Date();

    startAt.setDate(startAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() + 3);

    expect(() => {
      return new Appointments({
        customer: "richard",
        startAt,
        endsAt,
      });
    }).toThrow();
  });
});
