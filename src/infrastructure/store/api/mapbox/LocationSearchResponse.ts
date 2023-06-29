    export interface Properties {
        wikidata: string;
        foursquare: string;
        landmark?: boolean;
        address: string;
        category: string;
        maki: string;
    }

    export interface Geometry {
        type: string;
        coordinates: number[];
    }

    export interface Context {
        id: string;
        wikidata: string;
        text: string;
        language: string;
        short_code: string;
    }

    export interface Feature {
        id: string;
        type: string;
        place_type: string[];
        relevance: number;
        properties: Properties;
        text: string;
        language: string;
        place_name: string;
        bbox: number[];
        center: number[];
        geometry: Geometry;
        context: Context[];
        matching_text: string;
        matching_place_name: string;
    }

    export interface LocationSearchResponse {
        type: string;
        query: string[];
        features: Feature[];
        attribution: string;
    }

