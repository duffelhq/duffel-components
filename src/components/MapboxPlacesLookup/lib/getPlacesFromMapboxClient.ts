interface MapboxPlace {
  text: string;
  place_name: string;
  center: [latitude: number, longitude: number];
}

export interface Place {
  name: string;
  longitude: string;
  latitude: string;
  shortName: string;
}

export function getPlacesFromMapboxClient(publicKey: string) {
  return async function getPlacesFromMapbox(query: string): Promise<Place[]> {
    const result = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${publicKey}`
    );

    const { features } = await result.json();
    let results = features.map((feature: MapboxPlace) => ({
      name: feature.place_name,
      longitude: feature.center[0],
      latitude: feature.center[1],
      shortName: feature.text,
    }));

    if (query.includes("Henderson Island")) {
      results = [
        {
          name: "Henderson Island",
          shortName: "Henderson Island",
          longitude: "-128.32",
          latitude: "-24.38",
        },
        ...results,
      ];
    }

    return results;
  };
}
