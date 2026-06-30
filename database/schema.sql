CREATE TABLE IF NOT EXISTS packets (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    message_type VARCHAR(5) NOT NULL,

    protocol VARCHAR(16) NOT NULL,
    imei VARCHAR(32) NOT NULL,
    device_name VARCHAR(32),

    report_type INT,

    termination_code INT,

    ble TEXT,

    ecu_error_code VARCHAR(16),

    gps_accuracy INT,
    speed DECIMAL(4,1),
    azimuth INT,
    altitude DECIMAL(6,1),
    longitude DECIMAL(9,2),
    latitude DECIMAL(8,2),
    time_utc DATETIME,

    mcc VARCHAR(4),
    mnc VARCHAR(4),
    lac VARCHAR(4),
    cell_id VARCHAR(8),
    rssi INT,
    ber INT,
    network_type VARCHAR(4),

    state VARCHAR(15),

    power_supply TINYINT,
    main_voltage_mv INT,
    backup_battery_percent INT,
    backup_voltage_mv INT,

    ecu_error_type TINYINT,
    alive TINYINT,
    ecu_lock_state TINYINT,

    lock_type VARCHAR(16),
    lock_state TINYINT,

    scooter_battery_percent INT,
    generated_time DATETIME NOT NULL,
    count_number VARCHAR(4),

    inserted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_imei_time UNIQUE (imei, generated_time, count_number),

    INDEX idx_imei_time (imei, generated_time, count_number)
);