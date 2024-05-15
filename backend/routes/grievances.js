const express = require("express");
const router = express.Router();
const Grievances = require("../models/Other/Grievances");
const { sendEmailNotification } = require("./sendEmailNotification");



// API endpoint to send email notification
router.post("/sendEmailNotifications", async (req, res) => {
    try {
        const recipientEmail = req.body.email;
        const grievanceDetails = req.body;
        console.log('/sendEmailNotifications: recipientEmail:', recipientEmail, 'grievanceDetails:', grievanceDetails);
        await sendEmailNotification(recipientEmail, grievanceDetails);
        console.log(recipientEmail, grievanceDetails);
        res.status(200).json({ message: "Email notification sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});



// API endpoint to store grievance data
router.post("/addGrievances", async (req, res) => {
  try {
    const { scholarID, email, category, description, addressed } = req.body;
    const grievance = new Grievances({ scholarID, email, category, description, addressed });
    await grievance.save();
    res.status(201).json({ message: "Grievance filed successfully" });
    //sendEmailNotification(email, { scholarID, category, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// API endpoint to retrieve all grievances
router.get("/getGrievances", async (req, res) => {
  try {
    const grievances = await Grievances.find().sort({ createdAt: -1 });
    res.json(grievances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API endpoint to delete a grievance
router.delete("/deleteGrievance/:id", async (req, res) => {
  try {
    const grievanceId = req.params.id;
    console.log("Grievance ID:", grievanceId);
    // Find the grievance by ID and delete it
    await Grievances.findByIdAndDelete(grievanceId);
    


    res.status(200).json({ message: "Grievance deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// API endpoint to mark a grievance as addressed
router.put("/addressGrievance/:id", (req, res) => {
  const grievanceId = req.params.id;
  //console.log("Grievance ID:", grievanceId);

  // Assuming grievances is an array of grievances
  const index = Grievances.findIndex((g) => g._id === grievanceId);

  if (index !== -1) {
    const addressedGrievance = grievances[index];
    addressedGrievance.addressed = true; // Assuming you add a property to mark grievance as addressed
    res.json({ success: true, grievance: addressedGrievance, message: "Grievance addressed successfully" });
  } else {
    res.status(404).json({ success: false, message: "Grievance not found" });
  }
});

module.exports = router;
