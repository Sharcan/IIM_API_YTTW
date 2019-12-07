

const urlParam = location.search;
const searchName = urlParam.substr(8);
// console.log(searchName);



function getApiDataDaily(name) {
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);

            // console.log(data);

            const listLength = data.list.length;
            const result = data.list;
            for(let j=0; j<listLength; j++){
                const titleDaily = result[j].title;
                const imgDaily = result[j].thumbnail_1080_url;
                const idDaily = result[j].id;

                //IMPOSSIBLE DE RECUPERER LES DONNEES...
                // const channelName = result[j].username;
                // const channelImgDaily = result[j].owner.avatar_720_url;

                document.getElementById('videoDaily').innerHTML += '<div class="col-sm-3" id="video"><a href="video.html?idDaily='+ idDaily +'"><img width="400" height="200" src="'+ imgDaily +'"><h6>'+ titleDaily +'</h6></a></div>';
            }
        }

    };

    xhr.open('GET', 'https://api.dailymotion.com/videos?search='+ name +'&fields=title%2Cthumbnail_1080_url%2Cowner.avatar_720_url%2Cowner.description%2Cowner.username%2Cid&limit=8');
    xhr.send();
}


function getApiDataYT(name) {
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);

            // console.log(data);
            const listLength = data.items.length;
            for(let i =0; i<listLength; i++){

                const verif= data.items[i].id.kind;
                if(verif === "youtube#video"){
                    const titleYT = data.items[i].snippet.title;
                    const imgYT = data.items[i].snippet.thumbnails.medium.url;
                    const idYT = data.items[i].id.videoId;
                    document.getElementById('videoYT').innerHTML += '<div class="col-sm-3 text-justify" id="video"> <a href="video.html?idYT='+ idYT +'"><img width="400" src="'+ imgYT +'" alt="miniature"><h6>'+ titleYT +'</h6></a> </div>';
                }
                else{
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



document.getElementById('search').addEventListener('click', function(){

    const value = document.getElementById('content').value;
    
    document.location.href= "search.html?search="+value;

});


getApiDataYT(searchName);
getApiDataDaily(searchName);








