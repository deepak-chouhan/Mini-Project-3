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

    // Setting tongue twister

    const twisterButton = document.getElementById("twister");

    const setTwister = data => {
        const random = Math.floor(Math.random() * 1200);
        if (data[random].twister.length <= 200) {
            document.getElementById("twister-body").innerHTML = data[random].twister;
            console.log(data[random].twister.length)
        } else {
            setTwister(data);
        }
    }

    fetch("./resources/twisters/twisters.json")
        .then(response => response.json())
        .then(data => {
            setTwister(data);
            $(twisterButton).click((e) => {
                e.preventDefault();
                setTwister(data);
            })

        })
        .catch(error => console.log(error));

    const url = "https://raw.githubusercontent.com/deepak-chouhan/Mini-Project-3/main/resources/twisters/twisters.json";


    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, false);
    xhttp.send(null);

    console.log(xhttp.responseText)

    // let resp_s = JSON.parse(xhttp.responseText)
    // console.log(resp_s)

})