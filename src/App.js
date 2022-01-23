import { useEffect, useState } from 'react';
import './App.css';

let player;
let timerNextVideo = 15;

function App() {
  let [ loopLast, setLoopLast ] = useState(0);
  let [ timerFiveSecond, setTimerFiveSecond ] = useState(0);
  let [ counterTimer, setCounterTimer ] = useState(0);
  let [ autoPlayMusic, setAutoPlayMusic ] = useState(0);
  const [ counter, setCounter ] = useState(0);
  const [ videoData, setVideoData ] = useState(null);
  const [ idVideos ] = useState([
    'mCIv0Kf37Ds', 'LfYfJ6wFrLQ', 'qJKu34SpfhU', 'Mb5ceHlRFcw', '4SBK_trh_S4', 'C4BvgtSskfk', 'f2cB_xGd6K4'
  ]);

  useEffect(() => {
    window.YT.ready(() => {
      player = new window.YT.Player('player', {
        width: 800,
        height: 550,
        videoId: '60QQEpLrEDI',
        autoplay: 0,
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
      loadVideoById();
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

  function loadVideoById() {
    player.loadVideoById(idVideos[counter]);

    if (idVideos.length - 1 === counter) {
      setLoopLast(1);
    }

    if (idVideos.length - 1 <= counter) {
      setCounter(0);
      setCounterTimer(0);
    } else {
      setCounter(counter + 1);
    }
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
    <div className="app" style={{
      animationName: autoPlayMusic && !loopLast ? 'loop' : loopLast ? 'loopLast' : null,
      animationIterationCount: autoPlayMusic && !loopLast ? 'infinite' : loopLast ? '1' : null,
    }}>
      <div className="app-wrapper">
        <div className="title">
          <span
            className="text-dancer"
            style={{
              animationName: autoPlayMusic && !loopLast ? 'textDancer' : null,
            }}
          >{videoData?.video_id}</span>
          <span
            className="text-dancer"
            style={{
              animationName: autoPlayMusic && !loopLast ? 'textDancer' : null,
            }}
          >{videoData?.author}</span>
          <span
            className="text-dancer"
            style={{
              animationName: autoPlayMusic && !loopLast ? 'textDancer' : null,
            }}
          >{videoData?.title}</span>
          <div className="controllers row center-sb">
            <span
              className="text-dancer"
              style={{
                animationName: autoPlayMusic && !loopLast ? 'textDancer' : null,
              }}
            >LoopLast {loopLast}</span>
            <button onClick={() => loadVideoById()} disabled={autoPlayMusic}>loadVideoById</button>
          </div>
        </div>
        <div id="player" />
        <div className="row controllers .center-sa">
          <button onClick={() => playVideo()}>playVideo</button>
          <button onClick={() => pauseVideo()}>pauseVideo</button>
          <button onClick={() => stopVideo()}>stopVideo</button>
        </div>
        <div className="row center-sb">
          <div className="controllers">
            <button onClick={() => mute()}>Mute</button>
            <button onClick={() => unmute()}>UnMute</button>
          </div>
          <button className="autoplay" onClick={() => autoPlay()}>autoPlay {autoPlayMusic}</button>
        </div>
      </div>
    </div>
  );
}

export default App;