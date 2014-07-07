$(document).ready(function(){
    // set our onclicks
    var wrapper = $('#wrapper');
    
    // we want to have a playlist of our audio built... test for it
    var audio = {}
    audio["1"] = new Audio();
    audio["1"].src = "music/23.mp3";

    audio["2"] = new Audio();
    audio["2"].src = "music/s14.mp3";
    
    audio["3"] = new Audio();
    audio["3"].src = "music/thirsty-work.mp3";
    
    // set these up to track if something's playing and which track to play
    var audioPlaying = false;
    var nowPlaying = 1;
    
    // when wrapper is clicked, determine what to do
    wrapper.on('click', function(e) {
       var doThis = e.target.className;

        // So now figure out what fired the event, and then do things with it
        
        if(doThis === 'play') {
            console.log(audioPlaying);
            
            // If something's playing, we want to pause it. Else, play audio.
            if(audioPlaying) {
                console.log('top if');
                audioPlaying = false;
                pauseAudio(audio, nowPlaying);
            } else {
                console.log('else');
                audioPlaying = true;
                playAudio(audio, nowPlaying);
            }
        }
    });
});

// Ideally I'd want to just grab everything out of the music directory, but for now... we'll just do this
function createPlaylist() {
    audio = {}
    audio["1"] = new Audio();
    audio["1"].src = "music/23.mp3";

    audio["2"] = new Audio();
    audio["2"].src = "music/s14.mp3";
    
    audio["3"] = new Audio();
    audio["3"].src = "music/thirsty-work.mp3";
}

function playAudio(audio, nowPlaying) {
    audio[nowPlaying].play();
}

function pauseAudio(audio, nowPlaying)  {
    audio[nowPlaying].pause();
}