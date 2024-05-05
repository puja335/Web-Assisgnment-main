const { restart } = require("nodemon")
const Contact = require("../models/contact-model")

const addContact = async (req, res) => {
  const { name, phone, email } = req.body

  if (!name || !phone || !email) {
    return res
      .json({ success: false, message: "Enter all the required field!!" })
  }
  try {
    const phoneExists = await Contact.findOne({ phone })
    if (phoneExists) {
      return res

        .json({ success: false, message: "Phone number already exists!!" })
    }
    const newContact = await Contact.create({ name, phone, email })
    return res.json({
      success: true,
      message: "Contact created successfully",
      contact: newContact,
    })
  } catch (error) {
  res.json({ success: false, message: `Server problem ${error}` })
    console.log(error)
  }
}

module.exports = { addContact }
