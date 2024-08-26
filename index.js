import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const PORT = 3000;
let revil = [];


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const getDateString = () => {
  const monthNamelist = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const weekday = [
    "Sunday", "Monday", "Tuesday", "Wednesday", 
    "Thursday", "Friday", "Saturday"
  ];

  const date = new Date();
  const d = weekday[date.getDay()];
  const year = date.getFullYear();

  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  
  const m = monthNamelist[month - 1];
  const day = `${date.getDate()}`.padStart(2, "0");
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}(year), ${m}(${month})(month) ${day}(date), Time = ${hour}(h) ${minutes}(m) ${seconds}(s), ${d}(day)`;
};


const data = getDateString();
const date = new Date();
const time = date.getTime();
const filePath = path.join(__dirname, 'files', `Timestamp_${time}_Date_${data}.txt`);

fs.writeFile(filePath, `Timestamp = ${time} && Date = ${data}`, (err) => {
  if (err) {
    console.error("Failed to write file:", err);
  } else {
    console.log("File successfully created");
  }
});


const storeDir = path.join(__dirname, 'files');

fs.readdir(storeDir, (err, files) => {
  if (err) {
    console.error("Failed to read directory:", err);
  } else {
    revil = files; 
  }
});


app.get("/", (request, response) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      response.status(500).send("Failed to read the file.");
    } else {
      response.send(data);
    }
  });
});

app.get("/files", (request, response) => {
  response.send(revil);
});


app.listen(PORT, () => {
  console.log(`App is started on port ${PORT}`);
});
