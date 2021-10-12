$(document).ready(() => {

    // Random word function
    const setWord = () => {

        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', "https://random-words-api.vercel.app/word", false);
        xhttp.send(null);

        let resp = JSON.parse(xhttp.responseText)

        document.getElementById("word").innerHTML = resp[0].word;
        document.getElementById("meaning").innerHTML = resp[0].definition;

        console.log(resp)
    }

    const word = document.getElementById("getword");

    $(word).click(function (e) {
        e.preventDefault();
        setWord();

    });

    setWord();

    // ------------

    

})