const Appointment = require("../models/appointment-model")


const addAppointment = async (req, res) => {
  const { date,time } = req.body

  if (!date || !time ) {
    return res
      
      .json({ success: false, message: "Enter all the required field!!" })
  }
  function isFutureDateTime(idate, itime) {
    var today = new Date().getTime(),
        parts = idate.split("/"),
        timeParts = itime.split(":");
    
    var futureDate = new Date(parts[2], parts[1] - 1, parts[0], timeParts[0], timeParts[1]).getTime();
    return (today - futureDate) < 0;
}

if (!isFutureDateTime(date, time)) {
    return res.json({ success: false, message: "Please enter a future date and time" });
}
if(time=="15:00"){
    return res.json({ success: false, message: " This timeslot is unavailable" });
}

   
  try {
    
    const newAppointment = await Appointment.create({ date,time })
    return res.json({
      success: true,
      message: "Appointment created successfully",
      appointment: newAppointment,
    })
  } catch (error) {
    res.json({ success: false, message: `Server problem ${error}` })
    console.log(error)
  }
}

module.exports = {addAppointment}
