var wavesurfer1 = {};
var myregion = {};
var playtime = [];
var playtime1 = [];
var playtime2 = [];
var duringTime = "";
var totalSec;
var fileElement = document.querySelector("#audio-file");
var myfile1;
var myfile2;
var audioContext = new AudioContext();
var audioContext1 = new AudioContext();
var newBuffering;
var newBuffering2;
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
function creatwave1() {
  return WaveSurfer.create({
    container: "#wave1",
    waveColor: "#ADADAD",
    progressColor: "#400000",
    cursorColor: "#fff",
    height: 114,
    plugins: [
      WaveSurfer.regions.create({}),
      WaveSurfer.timeline.create({ container: "#timeline1", height: 25 }),
    ],
  });
}
function creatwave2() {
  return WaveSurfer.create({
    container: "#wave2",
    waveColor: "#ADADAD",
    progressColor: "#400000",
    cursorColor: "#fff",
    height: 114,
    plugins: [
      WaveSurfer.regions.create({}),
      WaveSurfer.timeline.create({ container: "#timeline2", height: 25 }),
    ],
  });
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
input1.onchange = function (event) {
  myfile1 = event.target.files[0];
  if (!myfile1) {
    return;
  }
  if (!myfile1.type.match("audio.*|video.*")) {
    return;
  }
  wavesurfer1 = creatwave1();
  wavesurfer1.loadBlob(myfile1);
  myregion1 = wavesurfer1.addRegion({
    id: "region1",
    start: 2,
    end: 5,
    loop: false,
    drag: true,
    resize: true,
    color: "rgb(290, 184, 100, 0.2)",
    minLength: 1,
  });
  wavesurfer1.setVolume(0.5);
  RegionToInput1();
  RegionChanged1();
};

input2.onchange = function (event) {
  myfile2 = event.target.files[0];
  if (!myfile2) {
    return;
  }
  if (!myfile2.type.match("audio.*|video.*")) {
    return;
  }
  wavesurfer2 = creatwave2();
  wavesurfer2.loadBlob(myfile2);
  myregion2 = wavesurfer2.addRegion({
    id: "region2",
    start: 2,
    end: 5,
    loop: false,
    drag: true,
    resize: true,
    color: "rgb(290, 184, 100, 0.2)",
    minLength: 1,
  });
  wavesurfer2.setVolume(0.5);

  RegionToInput2();
  RegionChanged2();
};
/////////////////////////////////////////////////////////////////////////////////

////////////////////決定是否撥放音檔(播放中則播放，暫停中則暫停)
function RegionChanged1() {
  wavesurfer1.on("region-update-end", function (region) {
    if (wavesurfer1.isPlaying()) {
      wavesurfer1.pause();
      wavesurfer2.pause();
      myregion1.playLoop();
    }
    RegionToInput1();
  });
}
function RegionChanged2() {
  wavesurfer2.on("region-update-end", function (region) {
    if (wavesurfer2.isPlaying()) {
      wavesurfer1.pause();
      wavesurfer2.pause();
      myregion2.playLoop();
    }
    RegionToInput2();
  });
}
//////////////////////////////////////////////////////////////////

////////////////////////判斷input的時間有沒有問題
startsec1.oninput = function () {
  if (this.value > 60) this.value = 60;
  if (this.value < 0) this.value = 0;
};
startsec2.oninput = function () {
  if (this.value > 60) this.value = 60;
  if (this.value < 0) this.value = 0;
};
///////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////

endsec1.oninput = function () {
  if (this.value > 60) this.value = 60;
  if (this.value < 0 || this.value === "undefined") this.value = 0;
};
endsec2.oninput = function () {
  if (this.value > 60) this.value = 60;
  if (this.value < 0 || this.value === "undefined") this.value = 0;
};

////////////////////////////////////////////////////////////////////
///////////////////////播放/暫停功能
function playpause1() {
  if (wavesurfer1.isPlaying()) {
    wavesurfer1.pause();
  } else myregion1.playLoop();
}
function playpause2() {
  if (wavesurfer2.isPlaying()) {
    wavesurfer2.pause();
  } else myregion2.playLoop();
}

///////////////////////////////////////////////////////////////////////
////////////////input被改變時，把值丟給region
startmin1.onchange = function () {
  changeRegionTime1();
};
startmin2.onchange = function () {
  changeRegionTime2();
};
///////////////////////////////////////////////////////////////
////////////////input被改變時，把值丟給region，如果sec>=60則進位
startsec1.onchange = function () {
  if (this.value >= 60) {
    startsec1.value = parseFloat(startsec1.value) - 60;
    startmin1.value = parseFloat(startmin1.value) + 1;
  }
  changeRegionTime1();
};
startsec2.onchange = function () {
  if (this.value >= 60) {
    startsec2.value = parseFloat(startsec2.value) - 60;
    startmin2.value = parseFloat(startmin2.value) + 1;
  }
  changeRegionTime2();
};
/////////////////////////////////////////////////////////////////
////////////////input被改變時，把值丟給region
endmin1.onchange = function () {
  changeRegionTime1();
};
endmin2.onchange = function () {
  changeRegionTime2();
};
/////////////////////////////////////////////////////////////
////////////////input被改變時，把值丟給region
endsec1.onchange = function () {
  if (this.value >= 60) {
    endsec1.value = parseFloat(endsec1.value) - 60;
    endmin1.value = endmin1.value + 1;
  }
  changeRegionTime1();
};
endsec2.onchange = function () {
  if (this.value >= 60) {
    endsec2.value = parseFloat(endsec2.value) - 60;
    endmin2.value = endmin2.value + 1;
  }
  changeRegionTime2();
};
///////////////////////////////////////////////////////
/////////////把input的值丟給region
function changeRegionTime1() {
  duringTime = wavesurfer1.backend.getDuration();
  var starttime =
    parseFloat(startmin1.value) * 60 + parseFloat(startsec1.value);
  var endtime = parseFloat(endmin1.value) * 60 + parseFloat(endsec1.value);
  if (
    startmin1.value === "" ||
    startsec1.value === "" ||
    endsec1.value === "" ||
    endmin1.value === ""
  ) {
    toastr.error("!Error 指定時間不得為空!");
    starttime = 1;
    endtime = duringTime - 1;
  }

  if (starttime > duringTime || endtime > duringTime) {
    toastr.error("!Error 指定時間點超出歌曲時間!");
    starttime = 1;
    endtime = duringTime - 1;
  }

  if (endtime <= starttime) {
    toastr.error("!Error 開始時間不得超過結束時間!");
    endtime = duringTime - 1;
    endmin1.value = Math.floor(endtime / 60);
    endsec1.value = endtime % 60;
  }

  myregion1.remove();

  myregion1 = wavesurfer1.addRegion({
    id: "region1",
    start: starttime,
    end: endtime,
    loop: false,
    drag: true,
    resize: true,
    color: "rgb(290, 184, 100, 0.2)",
    minLength: 1,
  });

  if (wavesurfer1.isPlaying()) {
    wavesurfer1.pause();
    wavesurfer2.pause();
    myregion1.playLoop();
  } else;
  wavesurfer1.pause();
  wavesurfer2.pause();
}

function changeRegionTime2() {
  duringTime = wavesurfer1.backend.getDuration();
  var starttime =
    parseFloat(startmin2.value) * 60 + parseFloat(startsec2.value);
  var endtime = parseFloat(endmin2.value) * 60 + parseFloat(endsec2.value);
  if (
    startmin2.value === "" ||
    startsec2.value === "" ||
    endsec2.value === "" ||
    endmin2.value === ""
  ) {
    toastr.error("!Error 指定時間不得為空!");
    starttime = 1;
    endtime = duringTime - 1;
  }

  if (starttime > duringTime || endtime > duringTime) {
    toastr.error("!Error 指定時間點超出歌曲時間!");
    starttime = 1;
    endtime = duringTime - 1;
  }

  if (endtime <= starttime) {
    toastr.error("!Error 開始時間不得超過結束時間!");
    endtime = duringTime - 1;
    endmin2.value = Math.floor(endtime / 60);
    endsec2.value = endtime % 60;
  }
  myregion2.remove();

  myregion2 = wavesurfer2.addRegion({
    id: "region2",
    start: starttime,
    end: endtime,
    loop: false,
    drag: true,
    resize: true,
    color: "rgb(290, 184, 100, 0.2)",
    minLength: 1,
  });

  if (wavesurfer2.isPlaying()) {
    wavesurfer1.pause();
    wavesurfer2.pause();
    myregion2.playLoop();
  } else;
  wavesurfer1.pause();
  wavesurfer2.pause();
}
//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function RegionToInput1() {
  var regionStart = myregion1.start;
  var regionEnd = myregion1.end;
  endmin1.value = Math.floor(regionEnd / 60);
  endsec1.value = regionEnd % 60;
  startmin1.value = Math.floor(regionStart / 60);
  startsec1.value = regionStart % 60;
}
function RegionToInput2() {
  var regionStart = myregion2.start;
  var regionEnd = myregion2.end;
  endmin2.value = Math.floor(regionEnd / 60);
  endsec2.value = regionEnd % 60;
  startmin2.value = Math.floor(regionStart / 60);
  startsec2.value = regionStart % 60;
}
//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
toastr.options = {
  closeButton: false, // 顯示關閉按鈕
  debug: false, // 除錯
  newestOnTop: false, // 最新一筆顯示在最上面
  progressBar: true, // 顯示隱藏時間進度條
  positionClass: "toast-top-center", // 位置的類別
  preventDuplicates: false, // 隱藏重覆訊息
  onclick: null, // 當點選提示訊息時，則執行此函式
  showDuration: "300", // 顯示時間(單位: 毫秒)
  hideDuration: "1000", // 隱藏時間(單位: 毫秒)
  timeOut: "5000", // 當超過此設定時間時，則隱藏提示訊息(單位: 毫秒)
  extendedTimeOut: "1000", // 當使用者觸碰到提示訊息時，離開後超過此設定時間則隱藏提示訊息(單位: 毫秒)
  showEasing: "swing", // 顯示動畫時間曲線
  hideEasing: "linear", // 隱藏動畫時間曲線
  showMethod: "fadeIn", // 顯示動畫效果
  hideMethod: "fadeOut", // 隱藏動畫效果
};
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
function gettime() {
  playtime2[0] = roundDecimal(
    parseFloat(startmin1.value) * 60 + parseFloat(startsec1.value),
    3
  );
  playtime2[1] = roundDecimal(
    parseFloat(endmin1.value) * 60 + parseFloat(endsec1.value),
    3
  );
  playtime2[2] = roundDecimal(
    parseFloat(startmin2.value) * 60 + parseFloat(startsec2.value),
    3
  );
  playtime2[3] = roundDecimal(
    parseFloat(endmin2.value) * 60 + parseFloat(endsec2.value),
    3
  );
}

//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function float2int(data) {
  var pcm = new Array(data.length);
  for (var i = 0; i < data.length; i++) pcm[i] = Math.round(data[i] * 32767);
  return pcm;
}
function save(dataURL, fileName) {
  var a = document.createElement("a");
  a.setAttribute("href", dataURL);
  a.setAttribute("download", fileName);

  var event = document.createEvent("MouseEvents");
  event.initEvent("click", true, true);
  a.dispatchEvent(event);
  a.remove();
}

function saveAudio(channelData, sampleRate, fileName) {
  var wave = new RIFFWAVE();
  wave.header.sampleRate = sampleRate;
  wave.header.bitsPerSample = 16;
  wave.Make(float2int(channelData));

  save(wave.dataURI, fileName);
}
/////////////////////////////////////////
//////////////////////////////////////////
function playall() {
  wavesurfer1.pause();
  wavesurfer2.pause();
  myregion1.play();
  wavesurfer1.on("region-out", function (region) {
    wavesurfer1.pause();
    myregion2.play();
    wavesurfer2.on("region-out", function (region) {
      wavesurfer2.pause();
      wavesurfer1.un("region-out");
      wavesurfer2.un("region-out");
    });
  });
}
///////////////////////////////////////////////////
//////////////////////////////////////////////////
volume1.oninput = function () {
  wavesurfer1.setVolume(this.value);
};
volume2.oninput = function () {
  wavesurfer2.setVolume(this.value);
};
///////////////////////////////////////////////////
////////////////////////////////////////////////////
function roundDecimal(val, precision) {
  return (
    Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
    Math.pow(10, precision || 0)
  );
}
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

function download() {
  toastr.success("系統提示", "正在處理中，處理結束會自動下載");
  gettime();
  var reader = new FileReader();
  reader.onload = function (event) {
    arrBuffer = event.target.result;

    audioContext.decodeAudioData(arrBuffer, (buffer) => {
      var channels = 2;
      var rate = buffer.sampleRate;
      var startSec = playtime2[0] * rate;
      var endSec = playtime2[1] * rate;
      var totalSec = endSec - startSec;

      var newAudioContext1 = new AudioContext();

      var newAudioBuffer1 = newAudioContext1.createBuffer(
        channels,
        totalSec,
        rate
      );

      for (var channelI = 0; channelI < channels; channelI++) {
        var nowBuffering = buffer.getChannelData(channelI);
        newBuffering = newAudioBuffer1.getChannelData(channelI);

        for (var i = 0; i <= totalSec; i++) {
          newBuffering[i] = nowBuffering[i + startSec];
        }
      }
      console.log(newBuffering);
    });
  };
  reader.readAsArrayBuffer(myfile1);

  var reader2 = new FileReader();
  reader2.onload = function (event) {
    arrBuffer2 = event.target.result;

    audioContext1.decodeAudioData(arrBuffer2, (buffer1) => {
      var channels = 2;
      var rate = buffer1.sampleRate;
      var startSec2 = playtime2[2] * rate;
      var endSec2 = playtime2[3] * rate;
      var totalSec2 = endSec2 - startSec2;

      var newAudioContext2 = new AudioContext();

      var newAudioBuffer1 = newAudioContext2.createBuffer(
        channels,
        totalSec2,
        rate
      );

      for (var channelI = 0; channelI < channels; channelI++) {
        var nowBuffering2 = buffer1.getChannelData(channelI);
        newBuffering2 = newAudioBuffer1.getChannelData(channelI);

        for (var i = 0; i <= totalSec2; i++) {
          newBuffering2[i] = nowBuffering2[i + startSec2];
        }
      }
      var bufferx = Float32Concat(newBuffering, newBuffering2);
      console.log(bufferx);
      saveAudio(bufferx, rate, "new-audio2.wav");
    });
  };
  reader2.readAsArrayBuffer(myfile2);
}
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
function Float32Concat(first, second) {
  var firstLength = first.length,
    result = new Float32Array(firstLength + second.length);
  result.set(first);
  result.set(second, firstLength);
  return result;
}
