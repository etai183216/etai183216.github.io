var wavesurfer1 = {};
var myregion = {};
var playtime = [];
var playtime1 = [];
var playtime2 = [];
var duringTime = "";
var myfile = {};
var arrBuffer;
var source;
var audioContext = new AudioContext();
var fileElement = document.querySelector("#audio-file");
////////////////////////////////建立wavesurfer本體
function creatwave1() {
  return WaveSurfer.create({
    container: "#wave",
    waveColor: "#ADADAD",
    progressColor: "#400000",
    cursorColor: "#fff",
    height: 200,
    plugins: [
      WaveSurfer.regions.create({}),
      WaveSurfer.timeline.create({ container: "#timeline1", height: 25 }),
    ],
  });
}
////////建立input file改變時的事件
file1.onchange = function (event) {
  myfile = event.target.files[0];
  if (!myfile) {
    return;
  }
  if (!myfile.type.match("audio.*|video.*")) {
    return;
  }
  wavesurfer1 = creatwave1();
  wavesurfer1.loadBlob(myfile);
  /////////////////////////////建立regios
  myregion = wavesurfer1.addRegion({
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

  ///////////////////建立時把region的時間丟給input
  RegionToInput();
  ///////////////////建立完成時決定要不要播放
  RegionChanged();
};

////////////////////決定是否撥放音檔(播放中則播放，暫停中則暫停)
function RegionChanged() {
  wavesurfer1.on("region-update-end", function (region) {
    if (wavesurfer1.isPlaying()) {
      myregion.playLoop();
    }
    RegionToInput();
  });
}
////////////////////////判斷input的時間有沒有問題
startsec.oninput = function () {
  if (this.value > 60) this.value = 60;
  if (this.value < 0) this.value = 0;
};
//////////////////////同上
endsec.oninput = function () {
  if (this.value > 60) this.value = 60;
  if (this.value < 0 || this.value === "undefined") this.value = 0;
};

///////////////////////播放/暫停功能
function playpause() {
  if (wavesurfer1.isPlaying()) {
    wavesurfer1.pause();
  } else myregion.playLoop();
}

////////////////input被改變時，把值丟給region
startmin.onchange = function () {
  changeRegionTime();
};

////////////////input被改變時，把值丟給region，如果sec>=60則進位
startsec.onchange = function () {
  if (this.value >= 60) {
    startsec.value = parseFloat(startsec.value) - 60;
    startmin.value = parseFloat(startmin.value) + 1;
  }
  changeRegionTime();
};

////////////////input被改變時，把值丟給region
endmin.onchange = function () {
  changeRegionTime();
};

////////////////input被改變時，把值丟給region
endsec.onchange = function () {
  if (this.value >= 60) {
    endsec.value = parseFloat(endsec.value) - 60;
    endmin.value = endmin.value + 1;
  }
  changeRegionTime();
};
/////////////把input的值丟給region
function changeRegionTime() {
  duringTime = wavesurfer1.backend.getDuration();
  var starttime = parseFloat(startmin.value) * 60 + parseFloat(startsec.value);
  var endtime = parseFloat(endmin.value) * 60 + parseFloat(endsec.value);
  if (
    startmin.value === "" ||
    startsec.value === "" ||
    endsec.value === "" ||
    endmin.value === ""
  ) {
    toastr.error("!Error 指定時間不得為空!");
    starttime = 1;
    endtime = duringTime - 1;
    console.log(duringTime);
  }

  if (starttime > duringTime || endtime > duringTime) {
    toastr.error("!Error 指定時間點超出歌曲時間!");
    starttime = 1;
    endtime = duringTime - 1;
    console.log(duringTime);
  }

  if (endtime <= starttime) {
    toastr.error("!Error 開始時間不得超過結束時間!");
    endtime = duringTime - 1;
    console.log(endtime);
    endmin.value = Math.floor(endtime / 60);
    endsec.value = endtime % 60;
  }

  myregion.remove();

  myregion = wavesurfer1.addRegion({
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
    myregion.playLoop();
  } else;
  wavesurfer1.pause();
}

function RegionToInput() {
  var regionStart = myregion.start;
  var regionEnd = myregion.end;
  endmin.value = Math.floor(regionEnd / 60);
  endsec.value = regionEnd % 60;
  startmin.value = Math.floor(regionStart / 60);
  startsec.value = regionStart % 60;
}

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

function gettime() {
  playtime2[0] = roundDecimal(
    parseFloat(startmin.value) * 60 + parseFloat(startsec.value),
    3
  );
  playtime2[1] = roundDecimal(
    parseFloat(endmin.value) * 60 + parseFloat(endsec.value),
    3
  );
  // playtime = myregion.element.title.split("-");
  // playtime1 = [];
  // for (i = 0; i <= playtime.length - 1; i++) {
  // 	playtime1[i * 2] = playtime[i].split(":")[0];
  // 	playtime1[i * 2 + 1] = playtime[i].split(":")[1];
  // }
  // for (i = 0; i <= playtime1.length / 2 - 1; i++) {
  // 	playtime2[i] =
  // 		parseFloat(playtime1[i * 2] * 60) + parseFloat(playtime1[i * 2 + 1]);
  // }
}

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

function download() {
  gettime();
  toastr.success("系統提示", "正在處理中，處理結束會自動下載");
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
      var newBuffering;

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
      saveAudio(newBuffering, rate, "new-audio.wav");
    });
  };
  reader.readAsArrayBuffer(myfile);
}

function roundDecimal(val, precision) {
  return (
    Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
    Math.pow(10, precision || 0)
  );
}

volume1.oninput = function () {
  wavesurfer1.setVolume(this.value);
};
