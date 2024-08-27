const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote() {
  loading();
  // set a random quote from apiquotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // check if author exists
  !quote.author
    ? (authorText.textContent = "Unknown")
    : (authorText.textContent = quote.author);
  // Check if quote is large
  quote.text.length > 50
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;

  complete();
}

// Get Quotes from API
async function getQuotes() {
  loading();
  const url = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(url);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("Error trying to get a new Quote", error);
  }
}

// Tweet Quote

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listener

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load so we need to call our funtion once content is loaded
getQuotes();
