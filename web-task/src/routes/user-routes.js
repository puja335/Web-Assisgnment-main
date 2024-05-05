const express = require("express")
const contactController = require("../controllers/contact-controller")
const appointmentController = require("../controllers/appointment-controller")
const reservationController = require("../controllers/reservation-controller")

const router = express.Router()

router.route("/addContact").post(contactController.addContact)
router.route("/book-appointment").post(appointmentController.addAppointment)
router.route("/reservations").post(reservationController.addReservation)

module.exports = router
