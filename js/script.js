console.log('Bonsoir');



function getApiDataDaily() {
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);

            console.log(data);
            const listLength = data.list.length;

            for(let i = 0; i<listLength; i++){
                document.getElementById('list').innerHTML += data.list[i].title + "</br>" ;
            }

        }

    };


    xhr.open('GET', 'https://api.dailymotion.com/user/x2b761k/features');
    xhr.send();
}

function getApiDataYT() {
    const xhr = new XMLHttpRequest();


    xhr.onreadystatechange = function (){

        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);

            console.log(data);

            const listLength = data.items.length;

            for(let i = 0; i<listLength; i++){
                const imgYT = data.items[i].snippet.thumbnails.medium.url;
                const titleYT = data.items[i].snippet.title;
                const descriptionYT = data.items[i].snippet.description;
                document.querySelector('.list').innerHTML += '<div class="col-sm-4"><div class="card" style="width: 18rem;"><img src="'+ imgYT +'" class="card-img-top" alt="..."><div class="card-body"><h5 class="card-title">'+ titleYT +'</h5><p class="card-text">'+ descriptionYT +'</p></div></div></div>';
            }



        }

    };


    // xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=AIzaSyCiWX29S3HcNWEd6uCy21HXZ3iMEpxK6cs&part=snippet,contentDetails,statistics,status');
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCiWX29S3HcNWEd6uCy21HXZ3iMEpxK6cs&channelId=UCA5sfitizqs1oEbB5KY4uKQ&part=snippet,id&order=date&maxResults=20');
    xhr.send();
}


getApiDataYT();
// getApiDataDaily();