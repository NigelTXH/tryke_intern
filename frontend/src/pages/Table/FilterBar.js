function FilterBar({
    filters,
    deviceName,
    setDeviceName,
    messageType,
    setMessageType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    resetPage
}) {

    return (
        <div style={{ marginBottom: 20 }}>

            <label>Device </label>

            <select
                value={deviceName}
                onChange={(e) => {
                    setDeviceName(e.target.value);
                    resetPage();
                }}
            >
                <option value="">All</option>

                {filters.devices.map(device => (
                    <option
                        key={device}
                        value={device}
                    >
                        {device}
                    </option>
                ))}
            </select>

            <label style={{ marginLeft: 20 }}>
                Message Type
            </label>

            <select
                value={messageType}
                onChange={(e) => {
                    setMessageType(e.target.value);
                    resetPage();
                }}
            >
                <option value="">All</option>

                {filters.messageTypes.map(type => (
                    <option
                        key={type}
                        value={type}
                    >
                        {type}
                    </option>
                ))}
            </select>

            <label style={{ marginLeft: 20 }}>
                Start Date
            </label>

            <input
                type="date"
                value={startDate}
                onChange={(e) => {
                    setStartDate(e.target.value);
                    resetPage();
                }}
            />

            <label style={{ marginLeft: 20 }}>
                End Date
            </label>

            <input
                type="date"
                value={endDate}
                onChange={(e) => {
                    setEndDate(e.target.value);
                    resetPage();
                }}
            />

        </div>
    );
}

export default FilterBar;