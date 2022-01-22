import { useEffect, useState } from 'react';
import './App.css';

let player;
let timerNextVideo = 15;

function App() {
  let [ timerFiveSecond, setTimerFiveSecond ] = useState(0);
  let [ counterTimer, setCounterTimer ] = useState(0);
  let [ autoPlayMusic, setAutoPlayMusic ] = useState(0);
  const [ counter, setCounter ] = useState(0);
  const [ videoData, setVideoData ] = useState(null);
  const [ idVideos ] = useState([
    'mCIv0Kf37Ds', 'LfYfJ6wFrLQ', 'Mb5ceHlRFcw', 'qJKu34SpfhU'
  ]);

  useEffect(() => {
    window.YT.ready(() => {
      player = new window.YT.Player('player', {
        width: 800,
        height: 550,
        videoId: '60QQEpLrEDI',
        autoplay: 1,
        playerVars: {
          autoplay: 0,
          disablekb: 1,
          rel: 1,
          showinfo: 1,
          modestbranding: 1,
          enablejsapi: 1,
          iv_load_policy: 3,
          controls: 1,
          fs: 1,
          loop: 1,
        },
        events: {
          onReady: playVideo,
          onStateChange: onPlayerStateChange,
          onError: onError,
          onApiChange: onApiChange
        }
      });
    });
  }, [ window.YT ]);

  useEffect(() => {
    let interval = setTimeout(() => {

      if (autoPlayMusic) {
        setTimerFiveSecond(timerFiveSecond + 1);
        setCounterTimer(counterTimer + 1);
      }
    }, 1000);
  }, [ counterTimer ]);

  useEffect(() => {
    if (timerFiveSecond === timerNextVideo && autoPlayMusic) {
      setTimerFiveSecond(1);
      loadVideoById(idVideos[counter]);
      setTimeout(() => {
        player.seekTo(counterTimer);
      }, 400);
    }
  }, [ timerFiveSecond ]);

  function onError(error) {
    console.log('Error', error);
  }

  function onApiChange(event) {
    console.log('API Change!');
  }

  function onPlayerStateChange(event) {
    setVideoData(player?.playerInfo?.videoData);
  }

  function stopVideo() {
    player.stopVideo();
  }

  function playVideo() {
    player.playVideo();
  }

  function loadVideoById(id) {
    player.loadVideoById(id);

    if (idVideos.length - 1 <= counter) {
      setAutoPlayMusic(0);
      setCounter(0);
      setCounterTimer(0);
    } else {
      setCounter(counter + 1);
    }
  }

  function nextVideo() {
    player.nextVideo();
  }

  function mute() {
    player.mute();
  }

  function unmute() {
    player.unMute();
  }

  function pauseVideo() {
    player.pauseVideo();
  }

  function autoPlay() {
    autoPlayMusic = !autoPlayMusic;

    if (!autoPlayMusic) {
      stopVideo();
      setAutoPlayMusic(0);
      setCounterTimer(0);
    } else {
      playVideo();
      setAutoPlayMusic(autoPlayMusic ? 1 : 0);
      setCounterTimer(counterTimer + 1);
    }
  }

  return (
    <div className="app">
      <div className="title">
        <span>{videoData?.video_id}</span>
        <span>{videoData?.author}</span>
        <span>{videoData?.title}</span>
      </div>
      <div id="player" />
      <div className="controllers">
        <button onClick={() => playVideo()}>playVideo</button>
        <button onClick={() => pauseVideo()}>pauseVideo</button>
        <button onClick={() => stopVideo()}>stopVideo</button>
      </div>
      <div onClick={() => loadVideoById(idVideos[counter])}>loadVideoById</div>
      <div onClick={() => nextVideo()}>nextVideo</div>
      <div onClick={() => mute()}>Mute</div>
      <div onClick={() => unmute()}>UnMute</div>
      <div onClick={() => autoPlay()}>autoPlay {autoPlayMusic}</div>
    </div>
  );
}

export default App;