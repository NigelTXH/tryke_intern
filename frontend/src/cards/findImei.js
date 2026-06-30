import { useEffect, useState } from 'react';
import { formatValue } from '../utils/utils.js';

function ViewPacketByImei(){
    const [imei, setImei] = useState("");
    const [searchImei, setSearchImei] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (!searchImei) return;

        fetch(`http://localhost:5000/query/${searchImei}`)
            .then(response => response.json())
            .then(data => setResult(data))
            .catch(error => console.error(error));
        }, [searchImei]);
    return (
        <div class = 'card'>
            <input
                value={imei}
                onChange={(e) => setImei(e.target.value)}
                placeholder="Enter IMEI"
            />

            <button onClick={() => setSearchImei(imei)}>
                Search
            </button>

            {result &&
            Object.entries(result[0])
                .filter(([key, value]) => value !== null)
                .map(([key, value]) => (
                <div key={key}>
                    <strong>{key}:</strong> {formatValue(key, value)}
                </div>
                ))
            }`
        </div>
    );
}

export default ViewPacketByImei;