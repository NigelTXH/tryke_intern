import ViewWeeklyPackets from "../cards/weeklyPackets";
import ViewPacketByImei from '../cards/findImei';
import ViewBatteryStatus from '../cards/batteryStatus';
import ViewWeeklyErrors from '../cards/weeklyErrors';
import "../cards/cards.css"
function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <div class = "card-grid">

        < ViewWeeklyPackets />
        < ViewPacketByImei />
        < ViewBatteryStatus />
        < ViewWeeklyErrors />
      </div>
    </>


  )
}

export default Dashboard;
