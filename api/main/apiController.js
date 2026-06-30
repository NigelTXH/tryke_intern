import { findByImei, findDateRange, findBatteryStatus, findWeeklyError, findWeeklyPackets, findAllPackets,findImeis, findDeviceActivity, findFilters, toCSV} from "../services/service.js";
import { convertDate } from "../utils/utils.js"

export async function imeiController(req, res, next) {

    try {
        const imei = await findByImei(req.params.imei);
        
        res.json(imei);
    } catch (err) {
        next(err);
    }

}

export async function multipleImeisController(req, res, next) {

    try {
        const imeis = await findImeis(req.query.imei);
        
        res.json(imeis);
    } catch (err) {
        next(err);
    }

}

export async function allPacketsController(req, res, next) {

    try {
        const page = Number(req.query.page) || 1;
        const startDate = req.query.startDate
            ? `${req.query.startDate} 00:00:00`
            : null;

        const endDate = req.query.endDate
            ? `${req.query.endDate} 00:00:00`
            : null;
        const packets = await findAllPackets(page,
            req.query.deviceName,
            req.query.messageType,
            startDate, endDate);
        
        res.json(packets);
    } catch (err) {
        next(err);
    }

}

export async function csvController(req, res, next) {

    try {
        const page = Number(req.query.page) || 1;
        const startDate = req.query.startDate
            ? `${req.query.startDate} 00:00:00`
            : null;

        const endDate = req.query.endDate
            ? `${req.query.endDate} 00:00:00`
            : null;
        const csv = await toCSV(
            req.query.deviceName,
            req.query.messageType,
            startDate, endDate);
        
        res.setHeader("Content-Type", "text/csv");

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="packets.csv"'
        );

        res.send(csv);

    } catch (err) {
        next(err);
    }

}

export async function dateRangeController(req, res, next) {

    try {
        const date1 = await convertDate(req.params.year1,req.params.month1,req.params.day1);
        const date2 = await convertDate(req.params.year2,req.params.month2,req.params.day2);
        date2.setDate(date2.getDate()+1);
        const dateRange = await findDateRange(date1, date2);
        
        res.json(dateRange);
    } catch (err) {
        next(err);
    }

}

export async function weeklyErrorController(req, res, next) {
    try {
        const weeklyError = await findWeeklyError();
        res.json(weeklyError);
    } catch (err) {
        next(err);
    }

}

export async function batteryController(req, res, next) {
    try {
        const batteryStatus = await findBatteryStatus(req.query.deviceName);
        res.json(batteryStatus);
    } catch (err) {
        next(err);
    }

}

export async function deviceActivityController(req, res, next) {
    try {
        const deviceActivity = await findDeviceActivity(req.params.device_name);
        res.json(deviceActivity);
    } catch (err) {
        next(err);
    }

}

export async function weeklyPacketsController(req, res, next) {
    try {
        const weeklyPackets = await findWeeklyPackets();
        res.json(weeklyPackets);
    } catch (err) {
        next(err);
    }

}

export async function filterController(req, res, next) {
    try {
        const filters = await findFilters();
        res.json(filters);
    } catch (err) {
        next(err);
    }
}