


//On récupère les vidéos en tendances via l'api Dailymotion
function getApiDataDaily() {
    const xhr = new XMLHttpRequest();
    

    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);
            // console.log(data);

            const itemsList = data.list.length;

            //A chaque itération, on récupère les données que l'on ajoute à la page HTML via la propriété "innerHTML"
            for(let i = 0; i< itemsList; i++){
                let imgDaily = data.list[i].thumbnail_720_url;
                let titleDaily = data.list[i].title;
                let idDaily = data.list[i].id;
                // console.log(idDaily);

                document.querySelector('.dailyVideo').innerHTML += '<div class="col-sm-3 text-center" id="video"><a href="video.html?idDaily='+ idDaily +'"><img width="400" height="200" src="'+ imgDaily +'" alt="miniature"><h6>'+ titleDaily +'</h6></a></div>';
            }
            
        }
        
    };
    
    
    
    xhr.open('GET', 'https://api.dailymotion.com/videos?fields=title%2Cthumbnail_720_url%2Cid');
    xhr.send();
    
    
    
}


// function getTitleData(place) {
//     const xhrThumb = new XMLHttpRequest();
    
//     xhrThumb.onreadystatechange = function() {
//         if(xhrThumb.readyState === 4){
//             const results = JSON.parse(xhrThumb.responseText);
//             // console.log(results);
            
//             const title = results.list[place].title;
//             const id = results.list[place].id;
//             document.querySelector('.dailyVideo').innerHTML += '<div class="col-sm-3"><a href="video.html?idDaily='+ id +'"><h6>'+ title +'</h6></a></div>';
            
//             // console.log('titre: ',title);
//             return title;

//         }
//     };
    
//     xhrThumb.open('GET', 'https://api.dailymotion.com/videos?country=FR');
//     xhrThumb.send();
// }












//On récupère les vidéos en tendances via l'api Youtube
function getApiDataYT() {
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);
            // console.log(data);

            const listLength = data.items.length;

            //A chaque itération, on récupère les données que l'on ajoute à la page HTML via la propriété "innerHTML"
            for(let i = 0; i<listLength; i++){
                const imgYT = data.items[i].snippet.thumbnails.medium.url;
                const titleYT = data.items[i].snippet.title;
                const idChannel = data.items[i].id;
                // const descriptionYT = data.items[i].snippet.description;
                document.querySelector('.video').innerHTML += '<div class="col-sm-3 text-justify" id="video"><a href="video.html?idYT='+ idChannel +'"><img width="400" src="'+ imgYT +'" alt="miniature"><h6>'+ titleYT +'</h6></a></div>';
            }



        }

    };


    // xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCiWX29S3HcNWEd6uCy21HXZ3iMEpxK6cs&part=snippet,contentDetails,statistics,status');
    // xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCiWX29S3HcNWEd6uCy21HXZ3iMEpxK6cs&channelId=UCA5sfitizqs1oEbB5KY4uKQ&part=snippet,id&order=date&maxResults=20');
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=FR&key=AIzaSyCiWX29S3HcNWEd6uCy21HXZ3iMEpxK6cs&maxResults=12');
    xhr.send();
}


//Si l'utilisateur effectue une recherche
document.getElementById('search').addEventListener('click', function(){
    //On récupère la valeur entrée dans l'input
    const value = document.getElementById('content').value;
    //Et on le redirige vers une seconde page.
    document.location.href= "search.html?search="+value;

});



//On lance ici les appelle aux API
getApiDataYT();
getApiDataDaily();