import { Schema } from "mongoose";
import dbConnection from "../config/db";

interface IVaccine {
  YearWeekISO: string;
  ReportingCountry: string;
  Denominator: number;
  NumberDosesReceived: number;
  NumberDosesExported: number;
  FirstDose: number;
  SecondDose: number;
  DoseAdditional1: number;
  DoseAdditional2: number;
  UnknownDose: number;
  Region: string;
  TargetGroup: string;
  Vaccine: string;
  Population: number;
}

const vaccineSchema = new Schema<IVaccine>({
  YearWeekISO: String,
  ReportingCountry: String,
  Denominator: Number,
  NumberDosesReceived: Number,
  NumberDosesExported: Number,
  FirstDose: Number,
  SecondDose: Number,
  DoseAdditional1: Number,
  DoseAdditional2: Number,
  UnknownDose: Number,
  Region: String,
  TargetGroup: String,
  Vaccine: String,
  Population: Number,
});

export default dbConnection.model<IVaccine>("Vaccine", vaccineSchema);
