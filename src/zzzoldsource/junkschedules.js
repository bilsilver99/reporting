import React from "react";
import Scheduler, {
  View,
  Editing,
  AppointmentTooltip,
} from "devextreme-react/scheduler";

import SelectBox from "devextreme-react/select-box";
import "./schedule.scss";

const views = ["Day", "Week", "Month"];
const durations = [
  { label: "Haircut", value: 15 },
  { label: "Trim", value: 60 },
  { label: "Dye", value: 90 },
];
const currentDate = new Date();

const bookedAppointments = [
  {
    //id: 1,
    text: "Haircut",
    startDate: new Date("2023-06-03T10:00:00"),
    endDate: new Date("2023-06-03T11:00:00"),
    disabled: false,
  },
  {
    //id: 2,
    text: "Trim",
    startDate: new Date("2023-06-031T13:00:00"),
    endDate: new Date("2023-06-031T14:00:00"),
    disabled: true,
  },
];

const SchedulerComponent = () => {
  const [currentViewName, setCurrentViewName] = React.useState("Day");
  const [currentCellDuration, setCurrentCellDuration] = React.useState(60);

  const startDayHour = 8; // Start at 8:00 AM
  const endDayHour = 18; // End at 6:00 PM

  const onAppointmentFormOpening = (e) => {
    const appointment = e.appointmentData;
    if (appointment.disabled) {
      e.cancel = true; // Cancel the form opening for disabled appointments
    }
  };

  const appointmentTooltipRender = (model) => {
    const { appointmentData } = model;
    if (appointmentData.disabled) {
      return (
        <div>
          <div>{appointmentData.text}</div>
          <div>This appointment is disabled for editing.</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app">
      <div className="dropdown" style={{ width: "600px", margin: "20px auto" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
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
          dataSource={bookedAppointments}
          defaultCurrentDate={currentDate}
          height={600}
          useDropDownViewSwitcher={false}
          currentView={currentViewName}
          cellDuration={currentCellDuration}
          startDayHour={startDayHour}
          endDayHour={endDayHour}
          onAppointmentFormOpening={onAppointmentFormOpening}
        >
          <View name="Day" type="day" />
          <View name="Week" type="week" />
          <View name="Month" type="month" />
          <Editing allowAdding={true} allowDeleting={true} />
        </Scheduler>
      </div>
    </div>
  );
};

export default SchedulerComponent;
