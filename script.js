"use strict";
const base_url = "https://api.github.com"

function jsonIterator(jsonObj){
    console.log("iterating through object")
    for (let i = 0; i < jsonObj.length; i++){
        const gitRepoName = jsonObj[i].name
        const gitRepoLink = jsonObj[i].html_url
    }
}
function emptyRequest(){
    $(".js-Results-ul").empty()
}
function fetchUser(user){
    const options = {
    headers: new Headers({
      "Accept": "application/vnd.github.v3+json"})};
    const full_url = base_url+`/users/${user}/repos`
    fetch(full_url,options).then(response=>{
        $(".results-page").removeClass("hidden")
        if (response.ok){
            return response.json();
        } 
        throw new Error(response.statusText);
    }).then(responseJson=>{
        empty
        jsonIterator(responseJson)
        $(".js-userName").text(`See below ${user} repos:`)
    }).catch(err=>
        $(".js-userName").text(err));
}//End of fetchUser function

function watchSubmit(){
    console.log("watching a submit on form")
    $("form").submit(event=>{
        event.preventDefault()
        const userToSearch = $("#js-userInput").val()
        console.log(`Pressed to retrieve ${userToSearch}`)
        fetchUser(userToSearch)
    });
}

//document ready function
function readyfx(){
    watchSubmit()
    console.log("ready!")
}

$(readyfx)