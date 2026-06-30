import dotenv from "dotenv";
dotenv.config();
import { pool } from "../../../../database/dbConnection.js"

export function insertGTHBD(packet) {
    const row = {
        message_type: "GTHBD",
        protocol: packet.protocol,
        imei: packet.imei,
        device_name: packet.deviceName,
        ble: packet.ble,
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