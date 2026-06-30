import { queryImei, queryDateRange, queryWeeklyError, queryBattery, queryTotalPacketsWeekly, queryAll, queryImeis, queryDeviceActivity, queryFilters, queryExport } from "../main/apiQueries.js";

export async function findByImei(imei) {
    if (!imei || Array.isArray(imei)) {
        throw new Error("IMEI required");
    }

    return await queryImei(imei);
}

export async function findImeis(imeis) {
    if (!imeis) {
        throw new Error("invalid input");
    }

    return await queryImeis(imeis);
}

export async function findDateRange(date1, date2) {
    if (date1 > date2) {
        throw new Error(`date1 more than date2, ${date1}-${date2}`);
    }

    return await queryDateRange(date1, date2);
}

export async function findAllPackets(page,deviceName,messageType,startDate,endDate) {
    if(page < 0){
        throw new Error(`page is a negative value, ${page}`);
    }

    if (startDate > endDate) {
        throw new Error(`date1 more than date2, ${startDate}-${endDate}`);
    }
    
    return await queryAll(page,deviceName,messageType,startDate,endDate);
}

export async function toCSV(deviceName, messageType, startDate, endDate) {
    if (startDate > endDate) {
        throw new Error(`date1 more than date2, ${startDate}-${endDate}`);
    }

    const rows = await queryExport(
        deviceName,
        messageType,
        startDate,
        endDate
    );

    if (rows.length === 0) {
        return "";
    }

    // Get column names
    const headers = Object.keys(rows[0]);

    // Build CSV
    const csv = [
        headers.join(","),
        ...rows.map(row =>
            headers.map(header => {
                const value = row[header];

                if (value == null) return "";

                // Escape commas, quotes and newlines
                const str = String(value);
                if (/[",\n]/.test(str)) {
                    return `"${str.replace(/"/g, '""')}"`;
                }

                return str;
            }).join(",")
        )
    ].join("\n");
    return csv;
}

export async function findWeeklyError() {

    return await queryWeeklyError();
}

export async function findBatteryStatus(deviceNames) {
    if (!deviceNames) {
        throw new Error("invalid input");
    }


    return await queryBattery(deviceNames);
}

export async function findDeviceActivity(deviceName) {
    if (!deviceName) {
        throw new Error("invalid input");
    }


    return await queryDeviceActivity(deviceName);
}

export async function findWeeklyPackets() {

    return await queryTotalPacketsWeekly();
}

export async function findFilters() {

    return await queryFilters();
}