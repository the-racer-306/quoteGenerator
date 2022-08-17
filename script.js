const quoteContainer = document.getElementById("quotecontainer");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuote = [];

// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hide loading
function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Come Up With New Quote
function newQuote() {
  loading();
  const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];
  // Check if the author text is blank and modify it with unknown
  if (quote.author === null) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set the quote and hide the loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuote = await response.json();
    newQuote();
  } catch (err) {
    // CATCH ERROR
    console.log(err);
  }
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} __ ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// on Load

getQuotes();
