const express =require('express');
const app = express();
const PORT = 3000;
const db = require("./app/models");
const dbconfig = require("./app/config/db.config");
const bodyParser = require("body-parser");
const cors = require("cors");


app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors()); 
app.listen(PORT,()=>{
    console.log(`E-Com Application is running on http://localhost:${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("Welcom to E-Com");
})


db.mongoose.connect(`mongodb://${dbconfig.HOSTNAME}:${dbconfig.PORT}/${dbconfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB Connected Successfully"); 
}).catch((err)=>{
        console.log(err);
        process.exit();
})

require("./app/routes/products.route")(app);
require("./app/routes/cart.route")(app);