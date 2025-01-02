import { GoogleMapsService } from '@/infra/external-services/GoogleMapsService';
import dotenv from 'dotenv';
dotenv.config();

let googleMapsService: GoogleMapsService;
beforeEach(() => {
  googleMapsService = new GoogleMapsService();
  googleMapsService.GOOGLE_MAPS_KEY = 'fake-key';
});

describe('GoogleMapsService', () => {
  it('should calculate route correctly', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        routes: [
          {
            lengs: [
              {
                distance: { value: 5000 },
                duration: { text: '10 mins' },
                start_location: { lat: 0, lng: 0 },
                end_location: { lat: 1, lng: 1 },
              },
            ],
          },
        ],
      }),
    });
    global.fetch = fetchMock as any;

    const result = await googleMapsService.calculateRoute('origin', 'destination');
    expect(result.routes[0].lengs[0].distance.value).toBe(5000);
    expect(result.routes[0].lengs[0].duration.text).toBe('10 mins');
  });

  it('should throw an error if API key is missing', async () => {
    googleMapsService.GOOGLE_MAPS_KEY = undefined;
    await expect(googleMapsService.calculateRoute('origin', 'destination')).rejects.toThrow('Google Maps API key is missing or undefined');
  });
});

describe('GoogleMapService - API Key is invalid', () => {
  it('should throw an error if API key is invalid', async () => {
    googleMapsService.GOOGLE_MAPS_KEY = 'invalid-key';

    const fetchMock = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        error_message: 'The provided API key is invalid.',
        routes: [],
        status: 'REQUEST_DENIED',
      }),
    });

    global.fetch = fetchMock as any;
    await expect(googleMapsService.calculateRoute('origin', 'destination')).rejects.toThrow('The provided API key is invalid.');
  });
});
