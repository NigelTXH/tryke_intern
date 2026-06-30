import { pool } from "../../database/dbConnection.js";

export function queryImei(imei) {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM packets WHERE imei = ?",
            [imei],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

export function queryImeis(imeiList) {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM packets WHERE imei IN (?)",
            [imeiList],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}


const PAGE_SIZE = 20;

function buildFilters(
    deviceName,
    messageType,
    startDate,
    endDate
) {
    let where = " WHERE 1=1";

    const params = [];

    if (deviceName) {
        where += " AND device_name = ?";
        params.push(deviceName);
    }

    if (messageType) {
        where += " AND message_type = ?";
        params.push(messageType);
    }

    if (startDate) {
        where += " AND generated_time >= ?";
        params.push(startDate);
    }

    if (endDate) {
        where += " AND generated_time < DATE_ADD(?, INTERVAL 1 DAY)";
        params.push(endDate);
    }

    return {
        where,
        params
    };
}

// packetRepository.js
export function queryAll(
    page,
    deviceName,
    messageType,
    startDate,
    endDate
) {


    return new Promise((resolve, reject) => {

        const { where, params } = buildFilters(
            deviceName,
            messageType,
            startDate,
            endDate
        );

        const sql = `
            SELECT *
            FROM packets
            ${where}
            ORDER BY generated_time ASC
            LIMIT ?
            OFFSET ?
        `;

        const countSql = `
            SELECT COUNT(*) AS totalRows
            FROM packets
            ${where}
        `;

        const queryParams = [
            ...params,
            PAGE_SIZE,
            (page - 1) * PAGE_SIZE
        ];

        pool.query(sql, queryParams, (err, rows) => {

            if (err)
                return reject(err);

            pool.query(countSql, params, (err, countRows) => {

                if (err)
                    return reject(err);

                resolve({
                    rows,
                    totalRows: countRows[0].totalRows,
                    page,
                    pageSize: PAGE_SIZE
                });

            });

        });

    });

}

export function queryExport(
    deviceName,
    messageType,
    startDate,
    endDate
) {

    return new Promise((resolve, reject) => {

        const { where, params } = buildFilters(
            deviceName,
            messageType,
            startDate,
            endDate
        );

        const sql = `
            SELECT *
            FROM packets
            ${where}
            ORDER BY generated_time ASC
        `;

        pool.query(sql, params, (err, rows) => {

            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}

export function queryDateRange(date1, date2) {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT generated_time FROM packets WHERE generated_time >= ? AND generated_time < ?",
            [date1, date2],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

export function queryWeeklyError() {
    const currDate = new Date(2025, 2 - 1, 2);
    const tomorrow = new Date(2025, 2 - 1, 3);

    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
                DATE_FORMAT(generated_time, '%Y-%m-%d') AS error_date,
                COUNT(ecu_error_type) AS error_count
             FROM packets
             WHERE generated_time >= ? - INTERVAL 6 DAY
               AND generated_time < ?
               AND ecu_error_type = 2
             GROUP BY DATE_FORMAT(generated_time, '%Y-%m-%d')`,
            [currDate, tomorrow],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

export function queryBattery(deviceNameList) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
                p.device_name,
                p.scooter_battery_percent,
                p.generated_time AS last_seen
            FROM packets p
            INNER JOIN (
                SELECT
                    device_name,
                    MAX(generated_time) AS latest_time
                FROM packets
                WHERE device_name IN (?)
                GROUP BY device_name
            ) latest
            ON p.device_name = latest.device_name
            AND p.generated_time = latest.latest_time
            WHERE p.scooter_battery_percent IS NOT NULL`,
             [deviceNameList],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}


// might remove this
export function queryTotalPacketsWeekly() {
    const currDate = new Date(2025, 2 - 1, 2);
    const tomorrow = new Date(2025, 2 - 1, 3);

    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
                DATE(generated_time) AS date,
                COUNT(*) AS received_packets
             FROM packets
             WHERE generated_time >= ? - INTERVAL 6 DAY
               AND generated_time < ?
             GROUP BY DATE(generated_time)`,
            [currDate, tomorrow],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

export function queryDeviceActivity(deviceName) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
                generated_time,
                latitude,
                longitude,
                scooter_battery_percent
            FROM packets
            WHERE device_name = ?
                AND latitude IS NOT NULL
                AND longitude IS NOT NULL
            ORDER BY generated_time`,
            [deviceName],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

export function queryDeviceLastSent(imei) {
    return new Promise((resolve, reject) => {
        pool.query(
            `SELECT
                imei,
                MAX(generated_time) AS last_sent,
                TIMESTAMPDIFF(HOUR,
                    MAX(generated_time),
                    CURDATE()
                ) AS hours_active
            FROM packets
            GROUP BY imei`,
            [imei],
            (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            }
        );
    });
}

export function queryFilters() {
    return Promise.all([
        new Promise((resolve, reject) =>
            pool.query(
                "SELECT DISTINCT device_name FROM packets ORDER BY device_name",
                (err, rows) => err ? reject(err) : resolve(rows)
            )
        ),
        new Promise((resolve, reject) =>
            pool.query(
                "SELECT DISTINCT message_type FROM packets ORDER BY message_type",
                (err, rows) => err ? reject(err) : resolve(rows)
            )
        )
    ]).then(([deviceRows, messageRows]) => ({
        devices: deviceRows.map(r => r.device_name),
        messageTypes: messageRows.map(r => r.message_type)
    }));
}