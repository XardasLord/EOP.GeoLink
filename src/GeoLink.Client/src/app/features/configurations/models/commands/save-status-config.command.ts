export interface SaveStatusConfigCommand {
  id: number;
  sourceStatus: string;
  sourceStatusDescription: string | null;
  geoLinkStatus: number;
}
