export interface GenerateCsvResponseModel {
  key: string;
  status: GenerateCsvFileStatus;
  message: string;
  requestDate: Date;
  validUntil: Date;
}

export enum GenerateCsvFileStatus {
  GENERATED = 1,
  IN_PROGRESS = 2,
  ERROR = 3,
}
