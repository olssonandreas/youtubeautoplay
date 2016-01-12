console.log("he");
var playingVideo = false;
var done = false;
var iterator = 0;
var pausedVideo = "";

function fnIsAppleMobile()
{
    if (navigator && navigator.userAgent && navigator.userAgent != null)
    {
        var strUserAgent = navigator.userAgent.toLowerCase();
        var arrMatches = strUserAgent.match(/(iphone|ipod|ipad|android)/);
        if (arrMatches != null)
             return true;
    } // End if (navigator && navigator.userAgent)

    return false;
} // End Function fnIsAppleMobile


window.onYouTubeIframeAPIReady = function() {
    $('.youtube-video').each(function(){
        var getYtID = $(this).data('video-id');
        var getHeight = $(this).data('video-height');
        var getAutoPlay = $(this).data('video-autoplay');
        if(!getHeight || getHeight % 1 !== 0 || getHeight < 200 ){
            getHeight =  "390";
        }

        iterator++;
        $(this).attr('id', 'player'+iterator);
        players.push(createPlayer({
            id: 'player'+iterator,
            height: getHeight,
            width: '100%',
            videoId: getYtID,
            events: {
            'onStateChange': onPlayerStateChange
            }
        }));

    });
    if(players.length === $('.youtube-video').length){
        if(!fnIsAppleMobile()){
            $('.youtube-video').each(function(){
            var that = $(this);
            $(window).scroll(function() {
                if(isElementInViewport(that)){
                    $('.youtube-video').each(function (i) {
                        var getAutoPlay = $(this).data('autoplay');
                        if($(this).attr('id') === $(that).attr('id') && $(this).attr('id') !== pausedVideo && getAutoPlay == "1"){
                            players[i].playVideo();
                            players[i].mute();
                        }else{
                            players[i].stopVideo();
                        }
                    });
                }
            });
        });
        }
    }else{
        console.log("videos not loaded");
    }

}
var players = new Array();
function createPlayer(playerInfo) {
    return new YT.Player(playerInfo.id, {
        height: playerInfo.height,
        width: playerInfo.width,
        videoId: playerInfo.videoId,
        events: {
            'onStateChange': onPlayerStateChange
            }
    });
}

function onPlayerStateChange(event) {
    if(event.data === 2){
        pausedVideo = event.target.f.id;
    }
    if(event.data === 1){
        pausedVideo =  "";
    }
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}

function isElementInViewport(el) {
    if (typeof jQuery === "function" && el instanceof jQuery) { 
    // since im using jquery
        el = el[0];
    }
    var rect = el.getBoundingClientRect();
 return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
        rect.top < (window.innerHeight || document.documentElement.clientHeight);
}
