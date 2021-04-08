var searchbutton = document.querySelector('.is-info')
var input = document.querySelector('#search')

var videoLocation = document.querySelector('.boxVideo')
var lyricsLocation = document.querySelector('.boxLyrics')



//searches for the song to get lyrics 


$('#form').on('click', function (event) {
    event.preventDefault()
    var search = $('#search').val()
    getSongs(search)
    lyricsLocation.innerHTML = "";
})

function getSongs(songTitle) {
    var apiUrl = 'https://api.musixmatch.com/ws/1.1/track.search?q_track=' + songTitle + '&page_size=5&s_track_rating=desc&apikey=6a4d09aa7c7bc21dd8f981caaf324cda';
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (currentData) {
                console.log(currentData);
                var songList = currentData.message.body.track_list;
                console.log(songList);
                displayList(songList);
                // return songList;
            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
        .catch(function (error) {
            alert('Unable to connect to MusiXmatch');
        });
};

function displayList(songArray) {
    var appendEl = document.querySelector(".list-group");
    appendEl.innerHTML = "";
    songArray.forEach(song => {
        var liEl = document.createElement("button")

        liEl.addEventListener("click", function () { apiFX(song.track.track_id, song.track.artist_name, song.track.track_name) })

        liEl.textContent = "Artist: " + song.track.artist_name + " - Song: " + song.track.track_name;

        liEl.classList.add("list-group-item", "songbuttons");

        appendEl.appendChild(liEl)
    })


}



function apiFX(songID, songArtist, songName) {
    var apiUrl2 = 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + songID + '&apikey=6a4d09aa7c7bc21dd8f981caaf324cda';

    console.log(apiUrl2);

    fetch(apiUrl2).then(function (response) {
        if (response.ok) {
            response.json().then(data => {
                console.log(lyrics);
                console.log(songArtist);
                console.log(songName);
                // var songList=currentData.message.body.track_list;
                // console.log(songList);
                // displayList(songList);

                var lyricsPop = data['message']['body']['lyrics']['lyrics_body'];

                lyricsLocation.innerHTML = lyricsPop;

            });
        } else {
            alert('Error: ' + response.statusText);
        }
    })
        .catch(function (error) {
            alert('Unable to connect to MusiXmatch');
        });

}




// youtube video function 

var youtubekey = 'AIzaSyDGxdfjPLDMkjD0Cvi9dU8d66Pv1SlJ08k'
var video = ''
$('#form').on('click', function (event) {
    event.preventDefault()
    console.log('clicked')
    var search = $('#search').val()
    videoSearch(youtubekey, search, 5)
    console.log(search.value)
})
function videoSearch(key, search, maxResults) {
    $('#videos').empty()
    $.get('https://www.googleapis.com/youtube/v3/search?key=' + key +
        '&type=video&part=snippet&maxResults=' + maxResults + '&q=' + search, function (data) {
            console.log(data)
            data.items.forEach(item => {
                video = `
                <iframe class="has-ratio" width="360" height="360" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0" 
                allowfullscreen></iframe>
                `
                $('#videos').append(video)
            });
        })
}