//get quote from api
const quoteContainer  =document.getElementById('quote-container');
const quoteText  =document.getElementById('quote-text');
const authorText  =document.getElementById('author-text');
const twitterBtn  =document.getElementById('twitter');
const newQuoteBtn  =document.getElementById('new-quote');
const loader = document.getElementById('loader')
const errScreen = document.getElementById('error-screen')
var errorCount = 0;
//show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden= true;
    errScreen.hidden=true;
}
//hide loader
function hideLoader(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
        errScreen.hidden=true;
    }
}
function showErrorScreen(){
    if(!loader.hidden && quoteContainer.hidden){
        quoteContainer.hidden=true;
        loader.hidden=true;
        errScreen.hidden=false;
    }
}


//fetch quote from quotes api
async function getQuote(){
    loading();
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

    try{
        const response = await fetch(proxyUrl+apiUrl);
        const data = await response.json();
        console.log(response)
        //check for epmty author
        if(data.quoteAuthor==''){
            authorText.innerText='Unknown'
        }
        //reduce fotn size fro long quote
        if(data.quoteText.length>120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

        authorText.innerText = data.quoteAuthor;
        quoteText.innerText = data.quoteText;
        
        hideLoader();
        errorCount=0;
    }catch(error){
        errorCount++;
        if(errorCount<=5){
            getQuote();
        }else if(errorCount>5){
            showErrorScreen();
        }
        else{

            console.log("Sorry we seem to be facing an issue")
        }
    }

}
//tweet quote
function tweetQuote(){

    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');

}
//Event listners
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//on Load
getQuote();