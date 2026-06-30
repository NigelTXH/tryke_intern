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
function ViewWeeklyErrors() {
    const [errors, setErrors] = useState([]);

    useEffect(() => {
    fetch('http://localhost:5000/query/weekly_error')
        .then(res => res.json())
        .then(data => setErrors(data))
        .catch(console.error);
    }, []);

    const data = errors.map(p => ({
        date: new Date(p.error_date).toLocaleDateString(),
        errors: p.error_count
    }));

    return (
    <div class = 'card'>
        <h1>Errors received per week</h1>

        <ul>
        {errors.map(packet => (
            <li key={packet.error_date}>
            <strong>
                {new Date(packet.error_date).toLocaleDateString()}
            </strong>
            {' : '}
            {packet.error_count}
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
                dataKey="errors"
                barSize={20}
            />
            </BarChart>
        </ResponsiveContainer>
        </div>

    </div>


    );
}

export default ViewWeeklyErrors;