const app = () => {
    const song = document.querySelector('.song'),
        play = document.querySelector('.play'),
        outline = document.querySelector('.moving-outline circle'),
        video = document.querySelector('.vid-container video'),
        replay = document.querySelector('.replay');

    //Sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //Time Display 
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');
    //Get the Length oof the outline 
    const outlineLength = outline.getTotalLength();

    //Durection
    let fakeDurection = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Pick different sounds and video
    sounds.forEach(sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //Song Play
    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    //Select Sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDurection = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(fakeDurection / 60)}:${Math.floor(fakeDurection % 60)}`;
        });
    });
    //Function to play and stop song and video
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg'
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg'
        };
    };

    //Animation the circle 
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = fakeDurection - currentTime;
        let second = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        let progress = outlineLength - (currentTime / fakeDurection) * outlineLength;
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${second}`;

        if (currentTime >= fakeDurection) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg'
        };
    };

    //Replay song and video
    replay.addEventListener('click', () => {
        song.currentTime = 0;
        song.play();
        video.currentTime = 0;
        video.play();
        play.src = './svg/pause.svg'
    });
}

app();
