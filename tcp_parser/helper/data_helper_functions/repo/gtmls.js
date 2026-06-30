import dotenv from "dotenv";
dotenv.config();
import { pool } from "../../../../database/dbConnection.js";

export function insertGTMLS(packet) {
    const row = {
        message_type: "GTMLS",
        protocol: packet.protocol,
        imei: packet.imei,
        device_name: packet.deviceName,
        lock_type: packet.lockType,
        lock_state: packet.lockState,
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