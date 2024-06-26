import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
/*
app.get("/", async (req, res) => {
    try {
      const response = await axios.get("https://catfact.ninja/breeds?limit=1");
     
      res.render("api.ejs", {result : response.data });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("index.ejs", {
        error: error.message
      });
    }
  });
 */ 

app.get("/", async (req, res) => {
  try {
    const result = await axios.get("https://catfact.ninja/fact");
    const response = await axios.get("https://catfact.ninja/breeds?page=2&limit=1");
    const value = response.data;
    res.render("api.ejs", {
      fact: result.data.fact,
      length: result.data.length,
      cat: value.data[0] 
      
    });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    console.log(error.response.data);
    res.status(500);
  }
});



app.post("/", async (req, res) => {
  
     try {
      console.log(req.body);
      
      const pageno = req.body.page;
      const limit = req.body.limit;  

      const result = await axios.get("https://catfact.ninja/fact");
      console.log(result.data.fact);
      
      
      const response = await axios.get(`https://catfact.ninja/breeds?page=${pageno}&limit=${limit}`);
      const value = response.data;

      res.render("api.ejs", {
        fact: result.data.fact,
        length: result.data.length,
        cat: value.data[Math.floor(Math.random() * value.data.length)]      
      });
    } catch (error) {
      console.error("Failed to make request:", error.message);
      res.render("api.ejs", {
        error:"No activities that match your criteria."
      });
     
    }
    
    

});   

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
