let buttonElem = document.querySelector("#generate");
let zipCode = document.getElementById("zip");
let feelingToday = document.getElementById("feelings");
let handlermessage = document.querySelector("#handlermessage");
let entryholder = document.querySelector("#entryHolder");
let dateDiv = document.querySelector("#date");
let content = document.querySelector("#content");
let temp = document.querySelector("#temp");
const keyapi = "1b98c80bf061870eee963028845726ed"; //key API FOR WEATHERAPP
const baseurl = "api.openweathermap.org/data/2.5/weather?zip="; //baseurl for the weather api
let date = new Date();
let newDate = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear();
/*console.log(newDate);
console.log(buttonElem);
console.log(zipCode);
console.log(feelingToday);*/
buttonElem.addEventListener("click", updateSite);
let zipCodeValue, feelingTodayValue;
//event listener function through which we get our data from api and update our site dynamically.
function updateSite() {
    //these 4 lines used to clear the tag on each click
    handlermessage.innerHTML = "";
    temp.innerHTML = "";
    content.innerHTML = "";
    dateDiv.innerHTML = "";
    //to get the value of zipcode and input from user
    zipCodeValue = zipCode.value;
    feelingTodayValue = feelingToday.value;
    /*console.log(zipCodeValue);
    console.log(feelingTodayValue);*/
    //to make sure that the user has entered a zipcode.
    if (zipCodeValue === "") {
        //  console.log("please Enter a zipcode");
        handlermessage.innerHTML = " <p> You should enter Zipcode to get the desired data </p>";

    } //this to make sure or zip is 5 digit number.
    else if (zipCodeValue.length === 5 && (isNaN(zipCodeValue) === false)) {
        if (feelingTodayValue !== "") {
            getExternalDataFun(baseurl, zipCodeValue, keyapi);
        } else {
            handlermessage.innerHTML = "<p> you should tells us how you feel today </p>";

        }

    } else {
        // console.log("das ist falsch zip");
        handlermessage.innerHTML = "<p> This zip code you have entered is not valid. <br> please try a valid Zipcode. </p>";

    }
}



//FUNCTIONS TO GET Data  from the external API.
let getData = async (url = "") => {
    let response = await fetch(url);
    try {
        let ExternalData = response.json();
        // console.log(ExternalData);
        return ExternalData;
    } catch (err) {
        console.log("error", err);
    }
};
let place;

function getExternalDataFun(baseurl, zip, keyapi) {
    getData("https://" + baseurl + zip + "&appid=" + keyapi)
        .then(function (data) {
            /*console.log("data from weatherapi is ");
            console.log(data);*/
            if (data.message === "city not found" || data.cod === 404) {
                console.log("this is a false zip");
            } else {
                postData("http://localhost:55775/addData", {
                    place: data.name,
                    temperature: data.main.temp,
                    date: newDate,
                    userinput: feelingTodayValue
                }).then(getServerData("http://localhost:55775/addData"));
            }
        })

}

//functions to get data from server
let getEndpointData = async (url) => {
    let res = await fetch(url, {
        method: "Get"
    });
    /*console.log(res);
    console.log(typeof res);*/
    try {
        let EndpointData = res.json();
        console.log(EndpointData);
        return EndpointData;
    } catch (err) {
        console.log("error", err);
    }
};
let des; // the place of the required zipcode
function getServerData(url) {
    getEndpointData(url)
        .then(function (data) {
            console.log(data);
            des = data.place;
            let tempo = data.temperature;
            /*console.log(des);
            console.log(tempo);*/
            temp.innerHTML = "the temperatue todoy in " + des + " is " + tempo;
            content.innerHTML = "Today, I am feeling " + data.userInput;
            dateDiv.innerHTML = "Today Is " + new Date(data.date);
        })
}


//make a post asyncronous javascript function
let postData = async (url = "", data = {}) => {
    let response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        let ourData = response.json();
        console.log(ourData);

    } catch (err) {
        console.log("Error", err);
    }
}
