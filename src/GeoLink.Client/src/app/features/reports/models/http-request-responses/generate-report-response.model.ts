export interface GenerateReportResponseModel {
  key: string;
  status: GenerateReportFileStatus;
  message: string;
  requestDate: Date;
  validUntil: Date;
}

export enum GenerateReportFileStatus {
  GENERATED = 1,
  IN_PROGRESS = 2,
  ERROR = 3,
}
