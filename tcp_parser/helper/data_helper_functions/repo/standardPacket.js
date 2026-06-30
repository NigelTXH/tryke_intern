import dotenv from "dotenv";
dotenv.config();
import { pool } from "../../../../database/dbConnection.js"

export function insertStandardPacket(packet, packetType) {
    const row = {
        message_type: packetType,
        protocol: packet.protocol,
        imei: packet.imei,
        device_name: packet.deviceName,

        gps_accuracy: packet.gps.accuracy,
        speed: packet.gps.speed,
        azimuth: packet.gps.azimuth,
        altitude: packet.gps.altitude,
        longitude: packet.gps.longitude,
        latitude: packet.gps.latitude,
        time_utc: packet.gps.utcTime,

        mcc: packet.network.mcc,
        mnc: packet.network.mnc,
        lac: packet.network.lac,
        cell_id: packet.network.cellId,

        state: packet.state,

        power_supply: packet.power.powerSupply,
        main_voltage_mv: packet.power.mainVoltageMv,
        backup_battery_percent: packet.power.backupBatteryPercent,
        backup_voltage_mv: packet.power.backupVoltageMv,

        generated_time: packet.generatedTime,
        count_number: packet.countNumber
    };

    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO packets SET ?",
            row,
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
}