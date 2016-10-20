/*global Webappbackbone, $*/
var circles = [];
var canvas = document.getElementById('BingoCanvas'),
    canvasCtx = canvas.getContext('2d'); // get canvas context
var dataApp = {};
var selectedWords = [];
var SpacesArray = [
                    [90, 280],
                    [200, 280],
                    [300, 280],
                    [420, 280],
                    [520, 280],
                    [90, 400],
                    [200, 400],
                    [300, 400],
                    [420, 400],
                    [520, 400],
                    [90, 500],
                    [200, 500],
                    [420, 500],
                    [520, 500],
                    [90, 620],
                    [200, 620],
                    [300, 620],
                    [420, 620],
                    [520, 620],
                    [90, 720],
                    [200, 720],
                    [300, 720],
                    [420, 720],
                    [520, 720]
                ];

window.Webappbackbone = {
    init: function () {
        'use strict';
        var _this = this;
        $.ajax({
            url:'https://spreadsheets.google.com/feeds/list/1del7hEh2-3tEplcZuhqkeJ_X_y1TFVc52jA_cJf42O8/od6/public/basic?alt=json',
            dataType: "json",
            success: function(data) {
                dataApp = data;
                var AnswersNum = dataApp.feed.entry.length;
                var SpacesNum = SpacesArray.length;
                var i = 0;
                for (i = 0; i < SpacesNum; i++ ) {
                    var choice = Math.floor(Math.random() * AnswersNum);

                    // render to canvas 
                    canvasCtx.font = "14px Verdana";
                    canvasCtx.fillStyle = "#333";
                    canvasCtx.textAlign = "center";
                    var text = dataApp.feed.entry[choice].title['$t'];
                    selectedWords.push(text);
                }
                Webappbackbone.drawBoard();
            }
        });
    },
    drawBoard: function() {
        
        // draw image on canvas
        var imgBkg = new Image();   // Create new img element
        imgBkg.addEventListener("load", function() {
            canvasCtx .drawImage(imgBkg, 0, 0);

            // pick random 24
            var AnswersNum = dataApp.feed.entry.length;
            var SpacesNum = SpacesArray.length;
            var i = 0;
            for (i = 0; i < SpacesNum; i++ ) {
                
                canvasCtx.fillText(selectedWords[i], SpacesArray[i][0], SpacesArray[i][1], 110);
            

                
            
            }
            if(circles.length > 0){
                for (i = 0; i < circles.length; i++) {
                    canvasCtx.fill(circles[i], "nonzero")
                    canvasCtx.stroke(circles[i], "nonzero");
                }
            }

        }, false);
        imgBkg.src = 'images/bingo-board.svg';
    },
    Circle: function(x, y, radius) {
        var c = new Path2D();
        c.arc(x, y, radius, 0, Math.PI * 2);
        return c;
    },
    clickHandler: function (e) {
        var r = $('#BingoCanvas')[0].getBoundingClientRect(),
            x = e.clientX - r.left,
            y = e.clientY - r.top,
            hasCircle = false,
            i;


        for (i = circles.length - 1; i >= 0; --i) {
            if (canvasCtx.isPointInPath(circles[i], x, y, 'nonzero')) {
                circles.splice(i, 1);
                hasCircle = true;
            }
        }

        if(!hasCircle) {
            circles.push(Webappbackbone.Circle( x, y, 20));
        }

        console.log(circles);

        Webappbackbone.drawBoard();
    }

};

$(document).ready(function () {
    'use strict';
    // start app
    Webappbackbone.init();
    canvas.addEventListener('click', Webappbackbone.clickHandler, false);
});
