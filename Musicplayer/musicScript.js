let prev=document.querySelector('#pre');
let play=document.querySelector('#play');
let next=document.querySelector('#next');
let volume_show=document.querySelector('#volume_show');
let title=document.querySelector('#title');
let recent_volume=document.querySelector('#volume');
let slider=document.querySelector('#duration_slider');
let show_duration=document.querySelector('#show_duration');
let track_image=document.querySelector('#track_image');
let auto_play=document.querySelector('#auto');
let total=document.querySelector('#total');
let present=document.querySelector('#present');
let artist=document.querySelector('#artist');


let timer;
let autoplay=0;

let index_no=0
let playing_song=false;


let track=document.createElement('audio');

let all_Song = [
    {
		name: "SVP Title Song",
		path: "music/TitleSvp.mp3",
		img: "images/image2.jpg",
		singer: "Thaman"
	},
	{
		name: "Ma Ma Mahesha",
		path: "music/MaMaMahesha.mp3",
		img: "images/image1.jpg",
		singer: "Thaman"
	},
	{
		name: "Vikram Title Song",
		path: "music/Vikram.mp3",
		img: "images/image4.jpg",
		singer: "Anirudh"
	},
    {
		name: "Once Upon A Time",
		path: "music/OnceUpon.mp3",
		img: "images/image3.jpg",
		singer: "Anirudh"
	}
];

function load_track(index_no){
    clearInterval(timer);
    reset_slider();
    track.src=all_Song[index_no].path;
    title.innerHTML=all_Song[index_no].name;
    track_image.src=all_Song[index_no].img;
    artist.innerHTML=all_Song[index_no].singer;
    track.load();
    total.innerHTML=all_Song.length;
    present.innerHTML=index_no+1;
    timer=setInterval(range_slider,1000);
}

load_track(index_no);

function justplay(){
    if(playing_song==false){
        playSong();
    }else{
        pauseSong();
    }
}

function playSong(){
    track.play();
    playing_song=true;
    play.innerHTML='<i class="fa fa-pause"></i>';
}

function pauseSong(){
    track.pause();
    playing_song=false;
    play.innerHTML='<i class="fa fa-play"></i>';
}

function next_song(){
    if(index_no<all_Song.length-1){
        index_no+=1;
        load_track(index_no);
        playSong();
    }else{
        index_no=0;
        load_track(index_no);
        playSong();
    }
}

function previous_song(){
    if(index_no>0){
        index_no-=1;
        load_track(index_no);
        playSong();
    }else{
        index_no=all_Song.length-1;
        load_track(index_no);
        playSong();
    }
}

function volume_change(){
    volume_show.innerHTML=recent_volume.value;
    track.volume=recent_volume.value/100;
}

function autoplay_switch(){
    if(autoplay==1){
        autoplay=0;
        auto_play.style.background=rgba(255,255,255,0.2);
    }else{
        autoplay=1;
        auto_play.style.background='#FF8A65';
    }
}
function mute_sound(){
    track.volume=0;
    volume.value=0;
    volume_show.innerHTML=0;
}

function change_duration(){
    slider_position=track.duration *(slider.value/100);
    track.currentTime=slider_position;
}

function reset_slider(){
    slider.value=0;
}
function range_slider(){
    let position=0;

    if(!isNaN(track.duration)){
        position=track.currentTime * (100/track.duration);
        slider.value=position;
    }
    if(track.ended){
        play.innerHTML='<i class="fa fa-play"><i>'
        if(auto_play==1){
            index_no+=1;
            load_track(index_no);
            playSong();
        }
    }
}