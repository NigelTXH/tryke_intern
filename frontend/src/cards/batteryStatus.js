import { useEffect, useState } from "react";
import "./cards.css";

function ViewBatteryStatus() {
    const [filters, setFilters] = useState({
        devices: []
    });

    const [selectedDevices, setSelectedDevices] = useState([]);
    const [battery, setBattery] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Load all available devices
    useEffect(() => {
        fetch("http://localhost:5000/query/filters")
            .then(res => res.json())
            .then(data => {
                setFilters(data);
            })
            .catch(console.error);
    }, []);

    // Fetch battery status whenever selected devices change
    useEffect(() => {
        if (selectedDevices.length === 0) {
            setBattery([]);
            return;
        }

        const params = new URLSearchParams();

        selectedDevices.forEach(device => {
            params.append("deviceName", device);
        });

        fetch(`http://localhost:5000/query/battery_status?${params.toString()}`)
            .then(res => res.json())
            .then(setBattery)
            .catch(console.error);

    }, [selectedDevices]);

    function toggleDevice(device) {
        setSelectedDevices(prev =>
            prev.includes(device)
                ? prev.filter(d => d !== device)
                : [...prev, device]
        );
    }

    return (
        <div className="card">
        <h3>Devices</h3>

        <button
            onClick={() => setDropdownOpen(prev => !prev)}
            style={{ marginBottom: "10px" }}
        >
            Devices ({selectedDevices.length} selected)
        </button>

        {dropdownOpen && (
            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "200px"
                }}
            >
                {filters.devices.map(device => (
                    <label
                        key={device}
                        style={{ display: "block", marginBottom: "5px" }}
                    >
                        <input
                            type="checkbox"
                            checked={selectedDevices.includes(device)}
                            onChange={() => toggleDevice(device)}
                        />
                        {" "}
                        {device}
                    </label>
                ))}
            </div>
        )}

            <hr />

            <ul>
                {battery.map(packet => (
                    <li key={packet.device_name}>
                        <strong>{packet.device_name}</strong> :{" "}
                        {packet.scooter_battery_percent}% (Last seen: {packet.last_seen})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ViewBatteryStatus;