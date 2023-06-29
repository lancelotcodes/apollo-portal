import { LocationSearchResponse } from "./LocationSearchResponse";

export class ExternalAPI {
    public static async SearchMapbox(value:string): Promise<LocationSearchResponse|null> {
        try {
            let result: LocationSearchResponse;
            const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?limit=5&language=en-US&access_token=pk.eyJ1IjoiamNhYmFndWEiLCJhIjoiY2w3MWJwMGZtMGp0ejNwcDZ3c2owenplaSJ9.qRWFluRBOhzE0RDxJl7YNA`;
            const response = await fetch(endpoint);
            result = await response.json();
            return result;
        } catch (error) {
            console.log("Error fetching data, ", error);
            return null;
        }
    }
  }   
  