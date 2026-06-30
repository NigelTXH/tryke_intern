import dotenv from "dotenv";
dotenv.config();
import { pool } from "../../../../database/dbConnection.js"

export function insertGTFRI(packet) {
    const row = {
        message_type: "GTFRI",
        protocol: packet.protocol,
        imei: packet.imei,
        device_name: packet.deviceName,

        report_type: packet.reportType,
        ecu_error_code: packet.ecuErrorCode,

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
        rssi: packet.network.csq.rssi,
        ber: packet.network.csq.ber,
        network_type: packet.network.networkType,

        state: packet.state,

        power_supply: packet.power.powerSupply,
        main_voltage_mv: packet.power.mainVoltageMv,
        backup_battery_percent: packet.power.backupBatteryPercent,
        backup_voltage_mv: packet.power.backupVoltageMv,

        ecu_error_type: packet.ecu.errorType,
        alive: packet.ecu.alive,
        ecu_lock_state: packet.ecu.locked,

        scooter_battery_percent: packet.scooterBatteryPercent,

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