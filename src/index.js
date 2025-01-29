const express = require("express") //import ExpressJS
const path = require("path") //import PathJS -> for the utilities for working with files and directory paths
const hbs = require("hbs") //import HandlebarsJS
const collection = require("./mongodb")
const session = require("express-session");
const router = express.Router();
const app = express() //starting ExpressJS

const templatePath = path.join(__dirname, "../templates") //preparing our templatePath to replace the views path

app.use(express.json()) //get the hbs files and get mongodb successfully connected


app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.use(session({
    secret: "speechup_secret", // Change this to a secure random string
    resave: false,
    saveUninitialized: true
}));


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/therapistlogin", (req, res) => {
    res.render("therapistlogin")
})

app.get("/therapistsignup", (req, res) => {
    res.render("therapistsignup")
})

app.get("/patientlogin", (req, res) => {
    res.render("patientlogin")
})

app.get("/patientsignup", (req, res) => {
    res.render("patientsignup")
})

app.get("/therapists", (req, res) => {
    res.render("therapists")
})

app.get("/patients", (req, res) => {
    res.render("patients")
})

app.get("/courses", (req, res) => {
    res.render("courses")
})

app.get("/apraxiagameselection", (req, res) => {
    res.render("apraxiagameselection")
})

app.get("/dysarthriagameselection", (req, res) => {
    res.render("dysarthriagameselection")
})

app.get("/aphasiagameselection", (req, res) => {
    res.render("aphasiagameselection")
})

app.get("/animalsounds", (req, res) => {
    res.render("animalsounds")
})

app.get("/bookreading", (req, res) => {
    res.render("bookreading")
})

app.get("/wordsearch", (req, res) => {
    res.render("wordsearch")
})

app.get("/wordflipbook", (req, res) => {
    res.render("wordflipbook")
})

app.get("/matchinggames", (req, res) => {
    res.render("matchinggames")
})

app.get("/tonguetwisters", (req, res) => {
    res.render("tonguetwisters")
})

app.get("/communityforum", (req, res) => {
    res.render("communityforum")
})

app.get("/therapistprofile", (req, res) => {
    res.render("therapistprofile")
})

app.get("/patientprofile", (req, res) => {
    res.render("patientprofile")
})

app.get("/therapisthome", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/therapistlogin"); // Redirect if not logged in
    }

    res.render("therapisthome", { firstName: req.session.user.firstName });
});

app.get("/patienthome", (req, res) => {
    if (!req.session.user) {
        return res.redirect("/therapistlogin"); // Redirect if not logged in
    }

    res.render("patienthome", { firstName: req.session.user.firstName });
});

app.post("/therapistlogin", async (req, res) => {
    try{
        const check = await collection.therapistUsersCollection.findOne({username : req.body.username})

        if(check && check.password === req.body.password){          
            req.session.user = { firstName: check.firstName };
            res.redirect("therapisthome")

    }else{
        res.send("Password is incorrect!")

    }
    }catch {
        res.send("There seems to be no account connected to the username")
    }
})

app.post("/therapistsignup", async (req, res) => {
    var newUser = {

    firstName : req.body.firstName,
    lastName : req.body.lastName,    
    username : req.body.username,
    password : req.body.password

    }

    await collection.therapistUsersCollection.insertMany([newUser])

    res.redirect("therapisthome")
})

app.post("/patientlogin", async (req, res) => {
    try{
        const check = await collection.patientUsersCollection.findOne({username : req.body.username})

        if(check && check.password === req.body.password){          
            req.session.user = { firstName: check.firstName };
            res.redirect("patienthome")

    }else{
        res.send("Password is incorrect!")

    }
    }catch {
        res.send("There seems to be no account connected to the username")
    }
})

app.post("/patientsignup", async (req, res) => {
    var newUser = {

    firstName : req.body.firstName,
    lastName : req.body.lastName,
    username : req.body.username,
    password : req.body.password

    }

    await collection.patientUsersCollection.insertMany([newUser])

    res.redirect("patienthome")
})

router.get("/therapisthome", (req, res) => {
    res.render("therapisthome", { firstName: req.user.firstName });
});

router.get("/patienthome", (req, res) => {
    res.render("patienthome", { firstName: req.user.firstName });
});

app.get('/content/:page', (req, res) => {
    const page = req.params.page;
    res.render(page);  // This will render therapists.hbs, patients.hbs, or courses.hbs
});

// Route to fetch dynamic content
router.get("/:page", (req, res) => {
    const page = req.params.page;

    // Allowed pages
const allowedPages = ["home", "therapists", "patients", "courses", "communityforum", 
    "therapistprofile", "patientprofile", "animalsounds", "bookreading", 
    "wordsearch", "wordflipbook", "matchinggames", "tonguetwisters", 
    "apraxiagameselection", "dysarthriagameselection", "aphasiagameselection"];
    
    if (!allowedPages.includes(page)) {
        return res.status(404).send("Page not found");
    }
    
    // Check if the requested page exists
    res.render(page, (err, html) => {
        if (err) {
            console.error(`Error rendering page: ${page}`, err);
            return res.status(404).send("Page not found");
        }
        res.send(html);
    });
});

module.exports = router;

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Listening to Port 3000")
})

   