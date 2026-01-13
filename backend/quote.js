import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json()); // <---- add this to parse JSON automatically

const quotes = [
  {
    quote: "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// GET route
app.get("/", (req, res) => {
   console.log("Received GET request"); 
   const quote = randomQuote();
   res.send(`"${quote.quote}" -${quote.author}`);
});

// POST route
app.post("/", (req, res) => {
   const { quote, author } = req.body;

   if (!quote || !author) {
       return res.status(400).send("Expected body to have quote and author");
   }

   quotes.push({ quote, author });
   console.log(`New quote added: "${quote}" - ${author}`);
   res.send("ok");
});

app.listen(port, () => {
   console.error(`Quote server listening on port ${port}`);
});
