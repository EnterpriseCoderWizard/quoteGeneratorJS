let apiQuotes = [];

// Show new Quote

function newQuote() {
  // set a random quote from apiquotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
}

// Get Quotes from API
async function getQuotes() {
  const url = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(url);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("Error trying to get a new Quote", error);
  }
}

// On Load so we need to call our funtion once content is loaded

getQuotes();
