

document.getElementById("search-form").addEventListener('keyup' , function(){
    var url = getUrl();
    var xhrRequest = new XMLHttpRequest();
    xhrRequest.open('get',url,true);
    xhrRequest.send();    
    xhrRequest.onload = function(){
        var data = JSON.parse(xhrRequest.responseText);
        display(data);  
    }
});


// Get URL from  API
function getUrl(){

    // From Id I'll get value.
    var searchQuery = document.getElementById('search-string').value;

    //  Search Query in to Console.
    console.log(searchQuery);

    //  main heading for user to know what user searched for.
    document.getElementById('querySection').innerHTML = 'You have searched for : '+ searchQuery;

//   search query matches the results then it  execute  function.
    if(!searchQuery){
        console.log('Name cannot be empty!');
        return "http://gateway.marvel.com/v1/public/comics?ts=1&apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4"
    }else{
        return `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&apikey=c2595c6e10b8e75e6bd3b3c61b14547c&hash=77964d9b5c2bef6213992685d7c2dfd4&ts=1`
    }
}

//  Canvas 
let canvas = document.getElementById('canvas');

// Search String
let searchHero = document.getElementById('search-string').value;


// Function will display the Data on the Screen
function display(data){
    var superHeroList = document.getElementById('superhero-list');
    superHeroList.innerHTML = "";
    var results = data.data.results;

//   results that are get from searched 
    console.log(results);
    if(!results){

        //  Search character matches the results then it will forward to next 
        document.getElementById('search-character').value = "";
        window.alert("No super hero found!");
    }else{
        
        // Creating a For Loop because there will be n number of results for same query
        for(let result of results){
            var templateCanvas = canvas.content.cloneNode(true);

//  Get all the elemets from id and then changes Inner HTMl
            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + result.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + result.id ;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ result.comics.available ;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ result.series.available ;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ result.stories.available ;
            //  Set Event listenet for   more 
            templateCanvas.getElementById('learn-more').addEventListener('click', function(){
                localStorage.setItem('id', result.id);
                window.location.assign('./about.html');
            });
            //  Set Event listenet for Fav  

            templateCanvas.getElementById('fav').addEventListener('click', function(){
                var index = localStorage.length;
                var data = JSON.stringify(result);
                localStorage.setItem(result.id,data);
            });
            superHeroList.appendChild(templateCanvas);
        }
    }
};
//  function for displaying a alert box type message on the bottom of the screen, when we add to fav. heros.
function addFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}