$(document).ready(function(){
    // set our onclicks
    var wrapper = $('#wrapper');
    
    // we want to have a playlist of our audio built... test for it
    // this really needs to be moved from an object into an array
    var audio = {}
    audio["1"] = new Audio();
    audio["1"].src = "music/23.mp3";

    audio["2"] = new Audio();
    audio["2"].src = "music/s14.mp3";
    
    audio["3"] = new Audio();
    audio["3"].src = "music/thirsty-work.mp3";
    
    var audioSize = 3;
    
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
                playAudio(audio, nowPlaying, -1);
            }
        }
        
        // if we hit next, then we want to increment NowPlaying, provided it's not longer
        // than the size of audio
        
        if(doThis === 'next') {
            // first we want to pause/stop what's currently playing
            audio[nowPlaying].pause();
            if(nowPlaying === audioSize) {
                // if it's the same length as audio size, set nowPlaying to 1
                nowPlaying = 1;
            } else {
                nowPlaying++;
            }
            
            // then we want to play that track
            playAudio(audio, nowPlaying, 0);
        }
        
        // For prev, if it's at 1, then we don't want to decrement it
        if(doThis === 'prev') {
            // first we want to pause/stop what's currently playing
            audio[nowPlaying].pause();
            if(nowPlaying === 1) {
                // if it's the same length as audio size, set nowPlaying to 1
                nowPlaying = audioSize;
            } else {
                nowPlaying--;
            }
            
            // then we want to play that track
            playAudio(audio, nowPlaying, 0);
        }
        
        // handle volume/up down now, which shouldn't be too difficult we hope
        if(doThis === 'volUp') {
            // test to make sure volume isn't aalready at 100%
            if(audio[nowPlaying].volume === 1.0) { 
                alert('Volume is already at max.')
            } else {
                audio[nowPlaying].volume += .05;
            }
        }
        
        if(doThis === 'volDown') {
            // test to make sure volume isn't aalready at 100%
            if(audio[nowPlaying].volume === 0) { 
            } else {
                audio[nowPlaying].volume -= .05;
            }
        }
        
    });
});

function playAudio(audio, nowPlaying, time) {
    
    // the original play/pause functions will pass -1, so that it doesn't start
    // from the beginning every time we hit play/pause.
    if(time === -1) {
        audio[nowPlaying].play();
    }
    // but, next/prev will pass in a 0
    else {
        var playThis = audio[nowPlaying];
        playThis.src = audio[nowPlaying].src + '#t=' + time;
        playThis.play();
    }
}

function pauseAudio(audio, nowPlaying)  {
    audio[nowPlaying].pause();
}