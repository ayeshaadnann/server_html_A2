
const mongoose = require('mongoose');
const bookController = require('./controllers/bookcontroller');
const bodyParser = require('body-parser');
const methodOverride = require("method-override");
require("dotenv").config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true }
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
})
express = require("express"),
app = express();
app.set("port", process.env.PORT || 3000);
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use(express.static("public"));

router = express.Router();
app.use("/", router);

router.get("/home", bookController.index);
router.get("/book/:id", bookController.bookRequest);
router.get("/DeleteABook", bookController.load_page);
router.get("/addNewBook", bookController.add);

router.post("/newbook/create", bookController.create, bookController.redirectView);
router.delete("/newbook/:bookId/delete", bookController.delete, bookController.redirectView);


app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

app.listen(app.get("port"), () => {
    console.log(`Server Running on http://localhost:${app.get("port")}`);
  });