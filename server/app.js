import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3001;

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs");
})


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}/`)
});
