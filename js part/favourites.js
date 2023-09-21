
var canvas = document.getElementById("canvas");

// Print on Console that it has stored.
console.log(localStorage.length);


for(let i=0;i<localStorage.length;i++)
{
    if(localStorage.key(i) == 'id'){
        continue;
    }
    // Get data from local storage in form of JSON
    let myStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));

    // Print the JSon Data on Console 
    console.log(myStorage);

    //  Create a Canvas  for Showing results
    var templateCanvas = canvas.content.cloneNode(true);
    
    //  I will add all the data of favourite character.

            templateCanvas.getElementById("name").innerHTML = '<b>Name: </b> ' + myStorage.name;
            templateCanvas.getElementById("id").innerHTML = '<b>Hero ID: </b> ' + myStorage.id ;
            templateCanvas.getElementById("comic").innerHTML = '<b>Comic Available: </b>'+ myStorage.comics.available ;
            templateCanvas.getElementById("series").innerHTML = '<b>Series Available: </b>'+ myStorage.series.available ;
            templateCanvas.getElementById("stories").innerHTML = '<b>Stories Available: </b>'+ myStorage.stories.available ;
            
            //  on More Button Clicks, about us pages will be opens
    templateCanvas.getElementById("learn-more").addEventListener('click',function(){
        localStorage.setItem('id',myStorage.id);
        window.location.assign('./about.html');
    });

    // remove Button
    templateCanvas.getElementById("fav").addEventListener('click',function (){
        myStorage.innerHTML = null;
        localStorage.removeItem(localStorage.key(i));
        window.location.assign('./favourites.html');

    });
// Appending the list
    document.getElementById("superhero-list").appendChild(templateCanvas);
}