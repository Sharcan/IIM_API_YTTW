



function wichId() {
    const urlParam = location.search;
    const isThere = urlParam.includes("idYT");

    if(isThere){
        const id = urlParam.substr(6);
        getChannelYtData(id);

    }
    else{
        const id = urlParam.substr(9);
        getInformationDaily(id);

    }
}


function getChannelYtData(id) {
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);
            // console.log(data);
            templateYT(data);
        }
        

    }
    
    xhr.open('GET', 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+ id +'&key=AIzaSyCiWX29S3HcNWEd6uCy21HXZ3iMEpxK6cs');
    xhr.send();
}


function getInformationDaily(id){
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4){
            const data = JSON.parse(xhr.responseText);
            console.log(data);
            templateDaily(data);

        }
        

    }
    
    xhr.open('GET', 'https://api.dailymotion.com/video/'+ id +'?fields=description%2Cowner%2Cthumbnail_720_url%2Ctitle%2Cviews_total%2Clikes_total');
    xhr.send();
}


function templateYT(data){


    const imgVideo = data.items[0].snippet.thumbnails.maxres.url;
    document.getElementById('miniature').innerHTML += '<img src="'+ imgVideo +'" class="card-img" alt="..." width="500">';

    const titleVideo = data.items[0].snippet.title;
    const descVideo = data.items[0].snippet.description.slice(0, 400);
    
    const channelVideo = data.items[0].snippet.channelTitle;
    document.getElementById('body').innerHTML += '<div class="card-header"><h5 class="card-title">'+ titleVideo +'</h5></div><p class="card-text">'+ descVideo +'...</p><br>Nom de la chaine: <a href="#">'+ channelVideo +'</a>';

    const commentVideo = data.items[0].statistics.commentCount;
    const viewVideo = data.items[0].statistics.viewCount;
    const like = data.items[0].statistics.likeCount;
    document.getElementById('footer').innerHTML += `<ul><li>${commentVideo} commentaires</li><li>${viewVideo} vues</li><li>${like} likes</li></ul>`;

}



function templateDaily(data){

    const imgVideo = data.thumbnail_720_url;
    document.getElementById('miniature').innerHTML += '<img src="'+ imgVideo +'" class="card-img" alt="..." width="500">';


    const titleVideo = data.title;
    const descVideo = data.description.slice(0, 400);
    document.getElementById('body').innerHTML += '<div class="card-header"><h5 class="card-title">'+ titleVideo +'</h5></div><p class="card-text">'+ descVideo +'...</p><br>Nom de la chaine: <a href="#"></a>';

    const viewVideo = data.views_total;
    const like = data.likes_total;
    document.getElementById('footer').innerHTML += `<ul><li>${viewVideo} vues</li><li>${like} likes</li></ul>`;

}




let verif = false;
function addContent(){
    

    if(!verif){
        document.getElementById('footer').style.transition='0.5s';
        document.getElementById('footer').style.height= '120px';
        document.getElementById('footer').style.opacity='100%';
        verif = true;
    }
    else{
        document.getElementById('footer').style.height= '0px';
        // document.getElementById('footer').style.visibility='hidden';
        document.getElementById('footer').style.opacity='0%';

        verif = false;  
    }
}

wichId();