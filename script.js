"use strict";
const base_url = "https://api.github.com"

function appendRepoRender(repoName,repoLink){
    $(".js-Results-ul").append(`
    <li>${repoName} <span><strong>link at:</strong> <a target="_blank" href ="${repoLink}">${repoLink}</a></span></li>
    `)
}

function jsonIterator(jsonObj){
    console.log("iterating through object")
    for (let i = 0; i < jsonObj.length; i++){
        const gitRepoName = jsonObj[i].name
        const gitRepoLink = jsonObj[i].html_url
        appendRepoRender(gitRepoName,gitRepoLink)
    }
}
function emptyRequest(){
    $(".js-Results-ul").empty()
}

function mainRunner(jsonObj,user){
    $(".js-userName").text(`See below ${user} repos:`)
    emptyRequest();
    jsonIterator(jsonObj)
}

function fetchUser(user){
    const options = {
    headers: new Headers({
      "Accept": "application/vnd.github.v3+json"})};
    const full_url = base_url+`/users/${user}/repos`
    fetch(full_url,options).then(response=>{
        //display error or success message
        $(".results-page").removeClass("hidden")
        if (response.ok){
            return response.json();
        } 
        emptyRequest();
        throw new Error(response.statusText);
    }).then(responseJson=>{
        mainRunner(responseJson,user)
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