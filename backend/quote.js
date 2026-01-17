import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 2000;

app.use(cors());
app.use(express.json()); // Parse JSON automatically

const quotes = [
  { quote: "Either write something worth reading or do something worth writing.", author: "Benjamin Franklin" },
  { quote: "I should have been more kind.", author: "Clive James" },
];

// Helper to get a random quote
function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

// GET route - return a random quote
app.get("/", (req, res) => {
  console.log("Received GET request");
  const quote = randomQuote();
  res.send(`"${quote.quote}" -${quote.author}`);
});

// POST route - add a new quote
app.post("/", (req, res) => {
  const { quote, author } = req.body;

  // Backend validation
  if (!quote || !author || !quote.trim() || !author.trim()) {
    return res.status(400).send("Quote and author must be non-empty strings.");
  }

  quotes.push({ quote: quote.trim(), author: author.trim() });
  console.log(`New quote added: "${quote}" - ${author}`);
  res.send("ok");
});

app.listen(port, '0.0.0.0', () => {
  console.error(`Quote server listening on port ${port}`);
});
