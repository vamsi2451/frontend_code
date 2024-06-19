import React, { useState } from "react";
import "./Search.scss";
import maplibregl from "maplibre-gl";

interface LocationData {
  place_id: string;
  display_name: string;
  lat: number;
  lon: number;
}

interface SearchComponentProps {
  onLocationSelected: (lat: number, lon: number) => void;
  markerRef: React.MutableRefObject<maplibregl.Marker[]>;
  selectedLocation: { lat: number; lon: number };
  mapRef: maplibregl.Map | null;
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onLocationSelected,
  markerRef,
  selectedLocation,
  mapRef,
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Fetching suggestions for:', query);

      const response = await fetch(`${process.env.REACT_APP_MAPTILER_AUTOCOMPLETE_API}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key':`${process.env.REACT_APP_MAPTILER_AUTOCOMPLETE_API_KEY}` ,
        },
        body: JSON.stringify({
          refNum: "Test",
          location: query,
          source: `${process.env.REACT_APP_MAPTILER_AUTOCOMPLETE_API_SOURCE}`,
          boundaryCountry: [],
          size: 10
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Suggestions data:', data);

      // Transform the API response to match the LocationData structure
      const transformedData = data.locations.map((item: any, index: number) => ({
        place_id: `location_${index}`,  // generate a unique place_id for each location
        display_name: item.location,    // use the location field for display name
        lat: item.latitude,             // latitude as a number
        lon: item.longitude,            // longitude as a number
      }));
      console.log('Transformed suggestions:', transformedData);

      setSuggestions(transformedData);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setError("Error fetching suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    console.log('Query changed:', newQuery);
    setQuery(newQuery);
    fetchSuggestions(newQuery);
  };

  const handleLocationSelect = (suggestion: LocationData) => {
    console.log('Location selected:', suggestion);

    onLocationSelected(suggestion.lat, suggestion.lon);
    setQuery(suggestion.display_name);
    setSuggestions([]);

    if (mapRef) {
      mapRef.flyTo({
        center: [suggestion.lon, suggestion.lat],
        zoom: 16,
      });

      if (markerRef.current.length > 0) {
        markerRef.current[0].setLngLat([suggestion.lon, suggestion.lat]);
        console.log('Marker updated:', markerRef.current[0]);
      } else {
        markerRef.current = [
          new maplibregl.Marker()
            .setLngLat([suggestion.lon, suggestion.lat])
            .addTo(mapRef),
        ];
        console.log('New marker added:', markerRef.current[0]);
      }
    }
  };

  return (
    <div className="search-component">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a location"
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.place_id}
            onClick={() => handleLocationSelect(suggestion)}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
