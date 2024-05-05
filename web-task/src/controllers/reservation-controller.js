const Reservation = require("../models/reservation-model")

const addReservation = async (req, res) => {
  const { userId, eventDate, numberOfGuests } = req.body

  if (!userId || !eventDate || !numberOfGuests) {
    return res
      
      .json({ success: false, message: "Enter all the required field!!" })
  }
  const newEventDate = new Date(eventDate)
  function isFutureDate(idate) {
    var today = new Date().getTime(),
      idate = idate.split("/")

    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime()
    return today - idate < 0 ? true : false
  }
  if (!isFutureDate(eventDate)) {
    return res
      
      .json({ success: false, message: "please enter future date" })
  }
  if (numberOfGuests < 1) {
    return res
      
      .json({ success: false, message: "Number of guest must be positive" })
  }
  try {
    const newReservation = await Reservation.create({
      userId,
      eventDate,
      numberOfGuests,
    })
    return res.json({
      success: true,
      message: "Reservation created successfully",
      reservation: newReservation,
    })
  } catch (error) {
    res.json({ success: false, message: `Server problem ${error}` })
    console.log(error)
  }
}

module.exports = { addReservation }
