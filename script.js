let currentsong = new Audio();
let songs;
let currFolder;

function secondsToMinuteSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    // Ensure both minutes and seconds are always two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

async function getsongs(folder) {
    currFolder = folder;
    let a = await fetch(`/${folder}`);
    let response = await a.text();
    // console.log(response);        //to get at console


    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    // console.log(as);

    songs = [];
    for (let i = 0; i < as.length; i++) {
        const element = as[i];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`${folder}`)[1]);
        }
    }

    //show all the songs in the playlist
    let songOL = document.querySelector(".songlist").getElementsByTagName("ol")[0];
    songOL.innerHTML = "";
    for (const song of songs) {
        songOL.innerHTML = songOL.innerHTML + `<li>
                            <img src="./image/music.svg" class="invert">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Ritesh</div>
                            </div>
                            <div class="playnow">
                                <span>Play now</span>
                                <img src="./image/play.svg" class="invert">
                            </div>
                        </li>`}

    //Attach an event listner to each song
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", elements => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic(e.querySelector(".info").firstElementChild.innerHTML).trim();
        })
    })
    return songs;

}

const playmusic = (track, pause = false) => {
    currentsong.src = `${currFolder}` + track;
    if (!pause) {
        currentsong.play()
        play.src = "./image/pause.svg"
    }
    currentsong.play();
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";

}


async function displayAlbums() {
    let a = await fetch(`/songs`);
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    let cardContainer = document.querySelector(".cardContainer");

    let array = Array.from(anchors)        
    for (let index = 0; index < array.length; index++) {
        const e = array[index];
        
        if (e.href.includes("/songs/")) {
            let folder = e.href.split("/").slice(-2)[0]
            let a = await fetch(`/songs/${folder}/info.json`);
            let response = await a.json();

            cardContainer.innerHTML= cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
                        <img id="hoverplay" src="./image/playButton.svg" alt="">
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h3>${response.title}</h3>
                        <p>${response.description}</p>
                    </div>`

        }
    }

    //Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e => {
        console.log(e);
        e.addEventListener("click", async item => {
            // console.log(item,item.currentTarget.dataset)
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}/`)
        })
    })
}


async function main() {
    //Get the list of all the songs
    await getsongs("songs/ncs/");
    console.log(songs);
    playmusic(songs[0], true)


    //Display all the albums on the page
    displayAlbums()


    //Attach an event listner toplay, next and previous
    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "./image/pause.svg"
        }
        else if(currentsong.currentTime == currentsong.duration){
            play.src = "./image/play.svg"
        }
        else {
            currentsong.pause()
            play.src = "./image/play.svg"
        }
    })

    //Listen for time update event
    currentsong.addEventListener("timeupdate", () => {
        // console.log(currentsong.currentTime, currentsong.duration);
        document.querySelector(".songtime").innerHTML = `
        ${secondsToMinuteSeconds(currentsong.currentTime)}/
        ${secondsToMinuteSeconds(currentsong.duration)}`
        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
    })


    //Add an event listner to seekbar
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentsong.currentTime = ((currentsong.duration) * percent) / 100;
    })

    // Add an event listener to previous
    previous.addEventListener("click", () => {
        currentsong.pause()
        console.log("Previous is clicked")
        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index - 1) >= 0) {
            playmusic(songs[index - 1])
        }
        else{
            playmusic(songs[index])
        }
    })

    // Add an event listener to next
    next.addEventListener("click", () => {
        currentsong.pause()
        console.log("Next is clicked")

        let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
        if ((index + 1) < songs.length) {
            playmusic(songs[index + 1])
        }
        else{
            playmusic(songs[index])
        }
    })

    //Add an event to volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e) => {
        currentsong.volume = parseInt(e.target.value) / 100;
    })


    // Add event listener to mute the track
    document.querySelector(".volume>img,input").addEventListener("click", e=>{ 
        if(e.target.src.includes("volume.svg")){
            e.target.src = e.target.src.replace("volume.svg", "mute.svg")
            currentsong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg", "volume.svg")
            currentsong.volume = .10;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;
        }

    })

    //Add event listner to hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = "0";
    })

    //Add event listner for close button
    document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left = "-100%";
    })


}
main()
