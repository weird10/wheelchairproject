const express = require("express"); 
const cors = require("cors");
const app = express();  
const PORT = 8000
const cookieParser = require('cookie-parser');

require('dotenv').config();
require("./config/mongoose.config")

app.use(cookieParser());

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));


require('./routes/user.routes')(app);
require('./routes/wheelchair.routes')(app);
require('./routes/patient.routes')(app);


    app.listen(PORT, () => {
        console.log(`Listening at Port ${PORT}`)
    })