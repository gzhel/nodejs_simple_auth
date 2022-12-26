const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
// There was a problem, that nodemon is crashing on 5000 port,
// the reason is that macOS newest version using AirPlay on 5000 port.
const authRouter = require('./authRouter');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://gregory:Zezar712@cluster0.eashmby.mongodb.net/simple-nodejs-auth?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`Server works on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();