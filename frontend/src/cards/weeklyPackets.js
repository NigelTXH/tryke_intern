import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from 'react';
import "./cards.css";
function ViewWeeklyPackets() {
    const [packets, setPackets] = useState([]);

    useEffect(() => {
    fetch('http://localhost:5000/query/weekly_packets')
        .then(res => res.json())
        .then(data => setPackets(data))
        .catch(console.error);
    }, []);

    const data = packets.map(p => ({
        date: new Date(p.date).toLocaleDateString(),
        packets: p.received_packets
    }));

    return (
    <div class = 'card'>
        <h1>Packets Received Per week</h1>

        <ul>
        {packets.map(packet => (
            <li key={packet.date}>
            <strong>
                {new Date(packet.date).toLocaleDateString()}
            </strong>
            {' : '}
            {packet.received_packets}
            </li>
        ))}
        </ul>

        <div style={{ width: "100%", height: 200 }}>
        <ResponsiveContainer>
            <BarChart 
            data={data}
            >
            
            <XAxis 
                dataKey="date" 
                tick={{ fontSize: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Bar 
                dataKey="packets"
                barSize={20}
            />
            </BarChart>
        </ResponsiveContainer>
        </div>

    </div>


    );
}

export default ViewWeeklyPackets;