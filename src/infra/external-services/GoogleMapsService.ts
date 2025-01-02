import dotenv from 'dotenv';
dotenv.config();

export class GoogleMapsService {
  private readonly GOOGLE_MAPS_ENDPOINT: string = 'https://maps.googleapis.com/maps/api/directions/json';
  private readonly METERS_TO_KILOMETERS: number = 1000;
  public GOOGLE_MAPS_KEY: string | undefined = process.env.GOOGLE_MAPS_KEY;

  async calculateRoute(origin: string, destination: string): Promise<any> {
    this.verifyGoogleMapsKey(this.GOOGLE_MAPS_ENDPOINT);
    const response = await fetch(`${this.GOOGLE_MAPS_ENDPOINT}?origin=${origin}&destination=${destination}&key=${this.GOOGLE_MAPS_KEY}`);
    const data = await response.json();
    if (data.status === 'REQUEST_DENIED') {
      throw new Error(data.error_message);
    }
    return data;
  }

  public verifyGoogleMapsKey(GOOGLE_MAPS_KEY: string): void {
    if (!this.GOOGLE_MAPS_KEY) {
      throw new Error('Google Maps API key is missing or undefined');
    }
  }
}
