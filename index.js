import express from "express";

const app = express();
const port = 3000;
let items = { todayItems: [], workItems: [], goToWork: 0, dateString: "" };
const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = monthList[new Date().getMonth()];
let weekday = weekList[new Date().getDay()];
let day = new Date().getDate();
items.dateString = `${weekday}, ${month} ${day}`;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  items.goToWork = 0;
  res.render("index.ejs", items);
});

app.get("/work", (req, res) => {
  items.goToWork = 1;
  res.render("index.ejs", items);
});

app.listen(port, () => {
  console.log(`Listenting on port ${port}`);
});

app.post("/", (req, res) => {
  if (req.body.todayItem) {
    items.todayItems.push(req.body.todayItem);
  } else {
    items.workItems.push(req.body.workItem);
  }
  res.render("index.ejs", items);
});
