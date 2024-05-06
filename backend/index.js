const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = 3000;
const schedule = require('node-schedule');
const moment = require('moment');

app.use(express.json());
app.use(cors());

const userRouter = require("./routes/userRouter");
const { users } = require("./model/user");
const { sendWhatsAppMessage, createPosterCanvas } = require("./controller/userController");

app.use("/api/v1", userRouter.router);
// * * * * * --> every minute
// 0 0 * * * --> everyday 12 AM
schedule.scheduleJob('0 0 * * *', async () => {
    try {
        // Get current month and day in MM-DD format
        const currentMonthDay = moment().format('MM-DD');

        // Extract current month and day
        const [currentMonth, currentDay] = currentMonthDay.split('-');
        console.log(currentMonth, currentDay);
        // Query the database to find users with matching birthdays (only considering month and day)
        const myuser = await users.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$dob" }, parseInt(currentMonth)] },
                    { $eq: [{ $dayOfMonth: "$dob" }, parseInt(currentDay)] }
                ]
            }
        });
        console.log('user', myuser);
        // Loop through the users and send WhatsApp messages
        for (const user of myuser) {
            console.log(user.name, user.phone);
            const formattedDob = moment(user.dob).format('YYYY-MM-DD');
            const canvas = await createPosterCanvas(user.name, formattedDob, user.avatar.url);
            const canvasImage = canvas.toBuffer("image/jpeg");
            await sendWhatsAppMessage(user.name, user.phone, canvasImage);
        }
    } catch (error) {
        console.error('Error processing birthdays:', error);
    }
});

const connect = async () => {
    try{
        await mongoose.connect("mongodb+srv://yashdanej2004:ixEoKnALhDom9zSQ@cluster0.acpm1rg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Conected to backend")
    }catch (error){
        throw error;
    }
}

app.listen(PORT, () => {
    connect();
    console.log("Server started");
});