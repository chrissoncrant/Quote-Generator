const twitterBtn = document.getElementById('twitter');
const quoteBtn = document.getElementById('new-quote');

const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');

let apiQuotes = [];

function fillAuthor(author) {
    if (!author) {
        authorText.textContent = `- unknown`;
    } else authorText.textContent = `- ${author}`;
}

function adjustQuoteFontSize(text) {
    if (text.length > 90) {
        console.log(text.length)
        quoteText.classList.add('long-quote');
        console.log(quoteText)
    } else quoteText.classList.remove('long-quote');
}

function populateQuote(text, author) {
    adjustQuoteFontSize(text);
    quoteText.textContent = text;
    fillAuthor(author);
}

function newQuote(quoteArray) {
    const randomNumber = Math.floor(Math.random() * quoteArray.length);
    const { text, author } = quoteArray[randomNumber];
    populateQuote(text, author);
}

async function getQuotes() {
    const API_URL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(API_URL);
        apiQuotes = await response.json();
        newQuote(apiQuotes);
    } catch(err) {
        console.error(err)
    }
}

getQuotes();

quoteBtn.addEventListener('click', getQuotes);

function tweetQuote() {
    let string = `${quoteText.textContent} - ${authorText.textContent}`;
    const twitterURL = `https://twitter.com/intent/tweet?text=${string}`;
    window.open(twitterURL, '_blank') 
}

twitterBtn.addEventListener('click', tweetQuote);