export function formatValue(key, value) {
    if (key === "network_type") {
        const networkTypes = {
            0: "None",
            1: "GSM",
            2: "LTE",
            3: "3G"
        };

        return networkTypes[value] || value;
    }

    if (key === "state") {
        const stateTypes = {
            41: "Stationary",
            42: "Motion"
        };

        return stateTypes[value] || value;
    }

    if (key === "power_supply") {
        const powerSupplyTypes = {
            0: "Main",
            1: "Backup"
        };

        return powerSupplyTypes[value] || value;
    }

    if (key === "ecu_error_type") {
        const ecuErrorTypeTypes = {
            0: "Normal",
            1: "No Response",
            2: "Error"
        };

        return ecuErrorTypeTypes[value] || value;
    }

    if (key === "alive") {
        const aliveTypes = {
            0: "Disable Riding",
            1: "Enable"
        };

        return aliveTypes[value] || value;
    }

    if (key === "ecu_lock_state") {
        const ecuLockStateTypes = {
            0: "Unlocked",
            1: "Locked"
        };

        return ecuLockStateTypes[value] || value;
    }

    if (key === "lock_type") {
        const lockTypes = {
            4: "Mechanical Lock (V80.39)"
        };

        return lockTypes[value] || value;
    }
    
    if (key === "lock_state") {
        const lockStateTypes = {
            0: "Unlocked",
            1: "Locked"
        };

        return lockStateTypes[value] || value;
    }
    return value;
}