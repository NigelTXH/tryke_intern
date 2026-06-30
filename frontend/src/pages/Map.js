import { useEffect, useState } from "react";
import {
    LoadScript,
    GoogleMap,
    Marker
} from "@react-google-maps/api";

const defaultCenter = {
    lat: 1.46342,
    lng: 103.76241
};

function MapPage() {
    
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState("");
    const [locations, setLocations] = useState([]);
    const API_KEY = process.env.REACT_APP_GOOGLE_API;
    console.log(API_KEY);

    // Load list of devices
    useEffect(() => {
        fetch("http://localhost:5000/query/filters")
            .then(res => res.json())
            .then(data => setDevices(data.devices))
            .catch(console.error);
    }, []);

    // Load locations when a device is selected
    useEffect(() => {
        if (!selectedDevice) {
            setLocations([]);
            return;
        }

        fetch(`http://localhost:5000/query/device_activity/${selectedDevice}`)
            .then(res => res.json())
            .then(setLocations)
            .catch(console.error);
    }, [selectedDevice]);

    const center =
        locations.length > 0
            ? {
                  lat: locations[0].latitude,
                  lng: locations[0].longitude
              }
            : defaultCenter;

    return (
        <>
            <div style={{ marginBottom: "20px" }}>
                <label>
                    Device:&nbsp;
                    <select
                        value={selectedDevice}
                        onChange={(e) => {
                            setLocations([]); // Remove old markers immediately
                            setSelectedDevice(e.target.value);
                        }}
                    >
                        <option value="">Select a device</option>

                        {devices.map(device => (
                            <option
                                key={device}
                                value={device}
                            >
                                {device}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <LoadScript googleMapsApiKey={API_KEY}>
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: "600px"
                    }}
                    center={center}
                    zoom={12}
                >
                    {locations.map(location => (
                        <Marker
                            key={location.generated_time}
                            position={{
                                lat: location.latitude,
                                lng: location.longitude
                            }}
                            label={new Date(location.generated_time).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        />
                    ))}
                </GoogleMap>
            </LoadScript>
        </>
    );
}

export default MapPage;