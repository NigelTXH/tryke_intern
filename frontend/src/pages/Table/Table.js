import React, { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import DataTable from "./DataTable";
import Pagination from "./Pagination";

function Table() {

    function downloadCSV() {

        const params = new URLSearchParams();

        if (deviceName)
            params.append("deviceName", deviceName);

        if (messageType)
            params.append("messageType", messageType);

        if (startDate)
            params.append("startDate", startDate);

        if (endDate)
            params.append("endDate", endDate);

        window.open(
            `http://localhost:5000/query/csv?${params.toString()}`,
            "_blank"
        );
    }

    const [data, setData] = useState([]);

    const [filters, setFilters] = useState({
        devices: [],
        messageTypes: []
    });

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 20,
        totalRows: 0
    });

    const [deviceName, setDeviceName] = useState("");
    const [messageType, setMessageType] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/query/filters")
            .then(res => res.json())
            .then(setFilters)
            .catch(console.error);
    }, []);

    useEffect(() => {

        const params = new URLSearchParams();

        params.append("page", pagination.page);

        if (deviceName)
            params.append("deviceName", deviceName);

        if (messageType)
            params.append("messageType", messageType);

        if (startDate)
            params.append("startDate", startDate);

        if (endDate)
            params.append("endDate", endDate);

        fetch(`http://localhost:5000/query/all?${params.toString()}`)
            .then(res => res.json())
            .then(json => {

                setData(json.rows);

                setPagination({
                    page: json.page,
                    pageSize: json.pageSize,
                    totalRows: json.totalRows
                });

            })
            .catch(console.error);

    }, [
        pagination.page,
        deviceName,
        messageType,
        startDate,
        endDate
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(
            pagination.totalRows / pagination.pageSize
        )
    );

    function resetPage() {
        setPagination(prev => ({
            ...prev,
            page: 1
        }));
    }

    return (
        <div>

            <h1>Packets Table</h1>

            <button onClick={downloadCSV}>
                Download CSV
            </button>
            <FilterBar
                filters={filters}
                deviceName={deviceName}
                setDeviceName={setDeviceName}
                messageType={messageType}
                setMessageType={setMessageType}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                resetPage={resetPage}
            />

            <DataTable
                data={data}
            />

            <Pagination
                page={pagination.page}
                totalPages={totalPages}
                setPagination={setPagination}
            />

        </div>
    );
}

export default Table;