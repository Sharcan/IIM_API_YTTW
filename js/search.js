
//On récupère via ces deux variables la donnée envoyé dans l'URL
const urlParam = location.search;
const searchName = urlParam.substr(8);
// console.log(searchName);




//On récupère ici les vidéos dailymotion qui sont en lien avec la recherche
function getApiDataDaily(name) {
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);

            // console.log(data);

            const listLength = data.list.length;
            const result = data.list;

            //on affiche les résultats avec la boucle for.
            for(let j=0; j<listLength; j++){
                const titleDaily = result[j].title;
                const imgDaily = result[j].thumbnail_1080_url;
                const idDaily = result[j].id;

                //IMPOSSIBLE DE RECUPERER CES DONNEES...
                // const channelName = result[j].owner.username;
                // const channelImgDaily = result[j].owner.avatar_720_url;

                document.getElementById('videoDaily').innerHTML += '<div class="col-sm-3" id="video"><a href="video.html?idDaily='+ idDaily +'"><img width="400" height="200" src="'+ imgDaily +'"><h6>'+ titleDaily +'</h6></a></div>';
            }
        }

    };

    xhr.open('GET', 'https://api.dailymotion.com/videos?search='+ name +'&fields=title%2Cthumbnail_1080_url%2Cowner.avatar_720_url%2Cowner.description%2Cowner.username%2Cid&limit=8');
    xhr.send();
}


//On récupère ici les vidéos youtube qui sont en lien avec la recherche
function getApiDataYT(name) {
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);

            // console.log(data);
            const listLength = data.items.length;
            for(let i =0; i<listLength; i++){

                //Etant donnée, que l'api youtube retourne des chaines et des vidéos, il faut dissocier les deux.
                const verif= data.items[i].id.kind;
                if(verif === "youtube#video"){
                    //Ici on ne récupère que les vidéos
                    const titleYT = data.items[i].snippet.title;
                    const imgYT = data.items[i].snippet.thumbnails.medium.url;
                    const idYT = data.items[i].id.videoId;
                    document.getElementById('videoYT').innerHTML += '<div class="col-sm-3 text-justify" id="video"> <a href="video.html?idYT='+ idYT +'"><img width="400" src="'+ imgYT +'" alt="miniature"><h6>'+ titleYT +'</h6></a> </div>';
                }
                else{
                    //Ici on récupère les chaines
                    const channelYT = data.items[i].snippet.channelTitle;
                    const channelDescription = data.items[i].snippet.description;
                    const channelImg = data.items[i].snippet.thumbnails.default.url;
                    document.getElementById('channelYT').innerHTML += '<div class="col-sm-12 text-justify" id="channel"><img src="'+ channelImg +'" style="float: left;"><h5>'+ channelYT +'</h5><p>'+ channelDescription +'</p></div>';
                }

            }


        }

    };

    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q='+ name +'&key=AIzaSyCiWX29S3HcNWEd6uCy21HXZ3iMEpxK6cs');
    xhr.send();
}


//Si l'utilisateur effectue une recherche
document.getElementById('search').addEventListener('click', function(){

    const value = document.getElementById('content').value;
    
    document.location.href= "search.html?search="+value;

});


//On lance ici les appelle aux API avec comme paramètre la valeur de l'URL
getApiDataYT(searchName);
getApiDataDaily(searchName);








