const twitterBtn = document.getElementById('twitter');
const quoteBtn = document.getElementById('new-quote');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const loader = document.querySelector('.loader');

let apiQuotes = [];

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    quoteContainer.hidden = false;
    loader.style.display = 'none';
}

function fillAuthor(author) {
    if (!author) {
        authorText.textContent = `- unknown`;
    } else authorText.textContent = `- ${author}`;
}

function adjustQuoteFontSize(text) {
    if (text.length > 90) {
        quoteText.classList.add('long-quote');
    } else quoteText.classList.remove('long-quote');
}

function populateQuote(text, author) {
    adjustQuoteFontSize(text);
    quoteText.textContent = text;
    fillAuthor(author);
    hideLoadingSpinner();
}

function newQuote(quoteArray) {
    showLoadingSpinner();
    const randomNumber = Math.floor(Math.random() * quoteArray.length);
    const { text, author } = quoteArray[randomNumber];
    populateQuote(text, author);
}

async function getQuotes() {
    showLoadingSpinner();
    const API_URL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(API_URL);
        apiQuotes = await response.json();
        if (!apiQuotes) {
            apiQuotes = emergencyQuotes;
        };
        newQuote(apiQuotes);
    } catch(err) {
        console.error(err);
        newQuote(emergencyQuotes);
    };
}

quoteBtn.addEventListener('click', () => {
    getQuotes();
});

function tweetQuote() {
    let string = `${quoteText.textContent} - ${authorText.textContent}`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${string}`;
    window.open(twitterURL, '_blank') 
}

twitterBtn.addEventListener('click', tweetQuote);

getQuotes();