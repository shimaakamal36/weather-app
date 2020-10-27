let buttonElem=document.querySelector("#generate");
let zipCode=document.getElementById("zip");
let feelingToday=document.getElementById("feelings");
let dateDiv=document.querySelector("#date");
let content=document.querySelector("#content");
let temp=document.querySelector("#temp");
const keyapi = "1b98c80bf061870eee963028845726ed"; //key API FOR WEATHERAPP
const baseurl = "api.openweathermap.org/data/2.5/weather?zip=";
let date=new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();
console.log(newDate);
/*console.log(buttonElem);
console.log(zipCode);
console.log(feelingToday);*/
buttonElem.addEventListener("click",doFun);
function doFun(){
    zipCode=zipCode.value;
    feelingToday=feelingToday.value;
/*console.log(zipCode);
console.log(feelingToday)*/
    getExternalDataFun(baseurl,zipCode,keyapi);
   
}



//FUNCTIONS TO GET Data  from the external API.
let getData = async (url = "") => {
    let response = await fetch(url);
    try {
        let ExternalData = response.json();
        return ExternalData;
        console.log(ExternalData);
    } catch (err) {
        console.log("error", err);
    }
};

function getExternalDataFun(baseurl,zip,keyapi) {
    getData("http://" + baseurl +zip+"&appid=" + keyapi)
        .then(function (data) {
            console.log("data from weatherapi is ");      
        console.log(data);
postData("http://localhost:55775/addData",{temperature:data.main.temp,date:newDate,userinput:feelingToday});
        })
    .then(getServerData("http://localhost:55775/addData"))
}

//functions to get data from server
let getEndpointData = async (url) => {
    let res = await fetch(url,{method:"Get"});
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

function getServerData(url) {
    getEndpointData(url)
        .then(function (data) {
        console.log("shimaa");
            console.log(data);
        temp.innerHTML=data.temperature;
        content.innerHTML=data.userInput;
        dateDiv.innerHTML=new Date(data.date);
        })
}


//make a post asyncronous javascript function
let postData = async (url = "", data = {})=> {
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

