
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');


let apiQuotes = [];

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//Loading complete (hide loading)
function loadingComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Pick random quote
function newQuote() {
    loading();
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is null and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = "Unkown";         
    } else {
        authorText.textContent = quote.author;          
    }
    //Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote, Hide loader
    quoteText.textContent = quote.text;
    loadingComplete();
    
}

//Pick random quote from local quotes file
function newLocalQuote() {
    let quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    //Check if author field is null and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = "Unkown";         
    } else {
        authorText.textContent = quote.author;          
    }
    //Check quote length to determine styling
    if (quoteText.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    //Set Quote, Hide loader
    loadingComplete();
    quoteText.textContent = quote.quote;
}

//Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://api.quotable.io';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json(); 
        newQuote();       
    } catch (error) {
        newLocalQuote();
    }
}


//Tweet Qoute
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners for Buttons
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

getQuotes();
// loadingComplete();
