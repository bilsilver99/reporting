import React from "react";
import Scheduler, { View } from "devextreme-react/scheduler";
import SelectBox from "devextreme-react/select-box";
import "./schedule.scss";
import { appointments } from "./data";

const employees = ["sam", "lou"];
const views = ["Day", "Week", "Month"];
const durations = [
  { label: "Haircut", value: 15 },
  { label: "Trim", value: 60 },
  { label: "Dye", value: 90 },
];
const currentDate = new Date();

// const bookedAppointments = [
//   // Mock data for booked appointments
//   { startTime: "10:00", endTime: "11:00" },
//   { startTime: "13:00", endTime: "14:00" },
// ];

const SchedulerComponent = () => {
  const [currentViewName, setCurrentViewName] = React.useState("Day");
  const [currentCellDuration, setCurrentCellDuration] = React.useState(60);
  const [currentEmployeeName, setCurrentEmployeeName] = React.useState("");

  const startDayHour = 8; // Start at 8:00 AM
  const endDayHour = 18; // End at 6:00 PM

  // const isAppointmentDisabled = (appointmentData) => {
  //   // Check if the appointment falls within any existing appointments
  //   for (const appt of bookedAppointments) {
  //     const start = new Date(appt.startTime);
  //     const end = new Date(appt.endTime);

  //     if (
  //       appointmentData.startDate >= start &&
  //       appointmentData.endDate <= end
  //     ) {
  //       return true; // Disable the appointment
  //     }
  //   }

  //   return false; // Enable the appointment
  // };

  return (
    <div className="app">
      <div className="dropdown" style={{ width: "850px", margin: "20px auto" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: "10px" }}>Employee:</p>
          <SelectBox
            style={{ width: "200px" }}
            items={employees}
            value={currentEmployeeName}
            onValueChanged={(e) => setCurrentEmployeeName(e.value)}
          />
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <p style={{ marginRight: "10px" }}>View:</p>
          <SelectBox
            style={{ width: "200px" }}
            items={views}
            value={currentViewName}
            onValueChanged={(e) => setCurrentViewName(e.value)}
          />
        </div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <p style={{ marginRight: "10px" }}>Duration:</p>
          <SelectBox
            style={{ width: "200px" }}
            items={durations}
            valueExpr="value"
            displayExpr="label"
            value={currentCellDuration}
            onValueChanged={(e) => setCurrentCellDuration(e.value)}
          />
        </div>
      </div>
      <div className="scheduler">
        <Scheduler
          dataSource={appointments}
          defaultCurrentDate={currentDate}
          height={600}
          useDropDownViewSwitcher={false}
          currentView={currentViewName}
          cellDuration={currentCellDuration}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          editing={{
            allowAdding: true,
            allowDeleting: true,
            // allowEditing: ({ appointmentData }) =>
            //   !isAppointmentDisabled(appointmentData),
          }}
        >
          <View name="Day" type="day" />
          <View name="Week" type="week" />
          <View name="Month" type="month" />
        </Scheduler>
      </div>
    </div>
  );
};

export default SchedulerComponent;
