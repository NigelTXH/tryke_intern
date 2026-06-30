import { Router } from "express";
import { weeklyErrorController, batteryController, weeklyPacketsController, imeiController, dateRangeController, allPacketsController, multipleImeisController, deviceActivityController, filterController, csvController } from "../main/apiController.js";
const router = Router();

router.get("/", (req, res) => {
    res.send("test");
});

router.get("/weekly_error", weeklyErrorController);
router.get("/weekly_packets", weeklyPacketsController);
router.get("/filters", filterController);
router.get("/battery_status?", batteryController);
router.get("/devices?", multipleImeisController);
router.get("/all?", allPacketsController);
router.get("/csv", csvController);
router.get("/device_activity/:device_name", deviceActivityController);
router.get("/:imei", imeiController);

router.get("/:year1/:month1/:day1/to/:year2/:month2/:day2", dateRangeController);


export default router;