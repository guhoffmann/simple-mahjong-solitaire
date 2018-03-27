/** global Variables for caching objects
 * mostly used for the filter operations to test elements
 */
var globalFilter = null;
var globalFilter1 = null;
var globalDOMObject = null;

/** inserted sparouter.js
 * main router for the whole game
 */
window.sparouter = (function () {
//window.sparouter = function () {
   
   // put out error message
    function RootingError(message) {
        this.message = message;
        this.toString = function () {
            "The following error occured: " + message;
        };
    }
   
   // make router with new url, stores the old url
   // create an empty pagesListeners object
    function Sparouter(newurl, oldurl) {
        this.newurl = newurl;
        this.oldurl = oldurl;
        this.pagesListeners = {};
    }

    Sparouter.prototype.changePage = function (page) {
        this.allPagesInvisible();
        this.showPage(page);
    };

    Sparouter.prototype.showPage = function (page) {
        this.page(page).style.display = "block";
    };

    Sparouter.prototype.hidePage = function (page) {
        this.page(page).style.display = "none";
    };

    Sparouter.prototype.page = function (page) {
        return window.document.querySelector("div[data-page=" + page + "]");
    };

    Sparouter.prototype.allPagesInvisible = function () {
        var datapages = window.document.querySelectorAll("div[data-page]");
        for (var i = 0; i < datapages.length; i++) {
            datapages[i].style.display = "none";
        }
    };

    Sparouter.prototype.onpage = function (page, callback) {
        this.pagesListeners[page] = callback;
        return this;
    };

    Sparouter.prototype.init = function (callback) {
        this.initpage = callback();
        return this;
    };

    Sparouter.prototype.start = function () {
        var that = this;
        initRouter();
        handleLinks();
        handleBackLinks();

        function initRouter() {
            if (this.initpage)
                window.location.replace("#" + this.initpage());
            else
                loadDefaultPage();
        }

        function loadDefaultPage() {
            var pages = window.document.querySelectorAll("div[data-page]");
            if (pages.length > 0) {
                var hash = pages[0].getAttribute("data-page");
                window.location.replace("#" + hash);
            }
            else
                throw new RootingError("No div[data-page] elements exist in the HTML");
        }
        
        function handleLinks() {
            var aLinks = window.document.querySelectorAll("a[href^='#']");
            for (var i = 0; i < aLinks.length; i++) {
                new FastButton(aLinks[i], function (e) {
                    e.preventDefault();
                    var hash = this.getAttribute("href");
                    var options = this.getAttribute("data-page-options");
                    //var effect = this.getAttribute("data-transition-effect");
                    that.goToHash = hash;
                    that.options = options;
                    //that.transitionEffect = effect;
                    window.location.hash = hash;
                });
            }
        }
        function handleBackLinks() {
            var backbuttons = window.document.querySelectorAll("a[data-back]");
            for (var i = 0; i < backbuttons.length; i++) {
                addBackButtonListener(backbuttons[i]);
            }

            function addBackButtonListener(backButton) {
                new FastButton(backButton, function (e) {
                    e.preventDefault();
                    var options = this.getAttribute("data-page-options");
                    //var effect = this.getAttribute("data-transition-effect");
                    var dataBack = backButton.getAttribute("data-back");
                    if (dataBack !== "") {
                        var dataBackAsInt = parseInt(dataBack);
                        that.options = options;
                        //that.transitionEffect = effect;
                        that.backLinkPressed = true;
                        history.go(dataBackAsInt);
                    }
                });
            }
        }

        window.onhashchange = function (event) {

            event.preventDefault();
            if (wasBackButtonPressed()) {
                // Browser-back
                var index = event.oldURL.indexOf("#");
                if (index !== -1) {
                    var oldHash = event.oldURL.substring(index + 1);
                    var oldpage = window.document.querySelector("div[data-page='" + oldHash + "']");
                    if (oldpage !== null) {
                        that.options = oldpage.getAttribute("data-back-options");
                    }
                }
            }
            that.backLinkPressed = false;
            
            changePageOrCallPageListener(document.location.hash.substring(1));
            
            function defaultChangePageBehaviorOveridden(hash) {
                return that.pagesListeners[hash];
            }
            
            function changePageOrCallPageListener(hash) {
                if (defaultChangePageBehaviorOveridden(hash))
                    callCustomChangePageListener(hash);
                else
                    that.changePage(hash);
            }

            function wasBackButtonPressed() {
                if(that.backLinkPressed === true)
                    return false;
                // in this case, the gotToHash local variable which was saved in the "click"-phase
                // of the rooter is the same as the URL we are going to.
                return document.location.hash !== that.goToHash;
            }

            function callCustomChangePageListener(hash) {
                var callbackfunc = that.pagesListeners[hash];
                var newPage = callbackfunc({hash: hash, effect: null, options: that.options});
                if (newPage)
                    that.changePage(newPage);
            }
        };
    };
    return new Sparouter();

}()); // of window.sparouter = ..
//}; // of window.sparouter = ..

/** called by window.sparouter = ..
 * inserted rest of fastclick.js ;)
 */
var FastButton = function (element, handler, useCapture) {
   
   if (touchDevice) {
      element.addEventListener('touchstart', this, useCapture);
   } else {
      element.addEventListener('click', this, useCapture);
   }
   
   this.handleEvent = function (event) {
      var result = handler.call(element, event);
      return result;
   };
   
}; // of FastButton = ..

/** called by startGame()
 * New Fisher-Yates shuffle to put aside underscore.js!
 */
function shuffleCards() {
    var help;
    for ( var i = (matchingGame.deck.length - 1); i >0; i-- ) {
        j =  Math.round(Math.random() * i);
        help = matchingGame.deck[i];
        matchingGame.deck[i] = matchingGame.deck[j];
        matchingGame.deck[j] = help;
    }
    
} // of shuffleCards()

/**
 * detect touch device
 */
function isTouchDevice() {  
  try {  
    document.createEvent("TouchEvent");  
    return true;  
  } catch (e) {  
    return false;  
  }
   
} // of isTouchDevice()

/** substitute for JQuery .index
 
function getIndex( elm ) { 
    return [...elm.parentNode.children].indexOf(elm)
}*/

function getIndex( par, elm ){ 
   var arr = Array.prototype.slice.call(par); // Now it's an Array.
   return arr.indexOf(elm);
}

/*******************************************************************************
 * main Javascript!
 */
var fullscreen = false;
var touchDevice = isTouchDevice();
var pixRat = window.devicePixelRatio;

/** Fensterinhalt skalieren
 */
function scaleGame() {
    $(".inner").css('transform', 'scale(' + (1.05-0.05*pixRat) + ')');
    $("#gameScene").css('top', Math.round(45-15*pixRat) + 'px');
   console.log("scaled!");
}

function changeFullscreen(par) {
    if (!fullscreen) {
        enterFullscreen(par);
        fullscreen = true;
    } else {
        exitFullscreen();
        fullscreen = false;
    }
}

function enterFullscreen(element) {
    if(element.requestFullscreen) {
        element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if(element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    scaleGame();
}

function exitFullscreen() {
    if(document.exitFullscreen) {
        document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

var matchingGame = matchingGame || {};
matchingGame.version = "18.2.16";
matchingGame.layoutTurtle = "turtle";
matchingGame.layoutFlower = "flower";
matchingGame.layoutSpider = "spider";
matchingGame.layoutCloud = "cloud";
matchingGame.layoutBug = "bug";
matchingGame.layoutFourHills = "fourHills";
matchingGame.deck = [
    'cardZahl1', 'cardZahl1', 'cardZahl1', 'cardZahl1',
    'cardZahl2', 'cardZahl2', 'cardZahl2', 'cardZahl2',
    'cardZahl3', 'cardZahl3', 'cardZahl3', 'cardZahl3',
    'cardZahl4', 'cardZahl4', 'cardZahl4', 'cardZahl4',
    'cardZahl5', 'cardZahl5', 'cardZahl5', 'cardZahl5',
    'cardZahl6', 'cardZahl6', 'cardZahl6', 'cardZahl6',
    'cardZahl7', 'cardZahl7', 'cardZahl7', 'cardZahl7',
    'cardZahl8', 'cardZahl8', 'cardZahl8', 'cardZahl8',
    'cardZahl9', 'cardZahl9', 'cardZahl9', 'cardZahl9',
    'cardBambus1', 'cardBambus1', 'cardBambus1', 'cardBambus1',
    'cardBambus2', 'cardBambus2', 'cardBambus2', 'cardBambus2',
    'cardBambus3', 'cardBambus3', 'cardBambus3', 'cardBambus3',
    'cardBambus4', 'cardBambus4', 'cardBambus4', 'cardBambus4',
    'cardBambus5', 'cardBambus5', 'cardBambus5', 'cardBambus5',
    'cardBambus6', 'cardBambus6', 'cardBambus6', 'cardBambus6',
    'cardBambus7', 'cardBambus7', 'cardBambus7', 'cardBambus7',
    'cardBambus8', 'cardBambus8', 'cardBambus8', 'cardBambus8',
    'cardBambus9', 'cardBambus9', 'cardBambus9', 'cardBambus9',
    'cardMuenze1', 'cardMuenze1', 'cardMuenze1', 'cardMuenze1',
    'cardMuenze2', 'cardMuenze2', 'cardMuenze2', 'cardMuenze2',
    'cardMuenze3', 'cardMuenze3', 'cardMuenze3', 'cardMuenze3',
    'cardMuenze4', 'cardMuenze4', 'cardMuenze4', 'cardMuenze4',
    'cardMuenze5', 'cardMuenze5', 'cardMuenze5', 'cardMuenze5',
    'cardMuenze6', 'cardMuenze6', 'cardMuenze6', 'cardMuenze6',
    'cardMuenze7', 'cardMuenze7', 'cardMuenze7', 'cardMuenze7',
    'cardMuenze8', 'cardMuenze8', 'cardMuenze8', 'cardMuenze8',
    'cardMuenze9', 'cardMuenze9', 'cardMuenze9', 'cardMuenze9',
    'cardNordwind', 'cardNordwind', 'cardNordwind', 'cardNordwind',
    'cardSuedwind', 'cardSuedwind', 'cardSuedwind', 'cardSuedwind',
    'cardOstwind', 'cardOstwind', 'cardOstwind', 'cardOstwind',
    'cardWestwind', 'cardWestwind', 'cardWestwind', 'cardWestwind',
    'cardDracheGruen', 'cardDracheGruen', 'cardDracheGruen', 'cardDracheGruen',
    'cardDracheRot', 'cardDracheRot', 'cardDracheRot', 'cardDracheRot',
    'cardDracheWeiss', 'cardDracheWeiss', 'cardDracheWeiss', 'cardDracheWeiss',
    'cardFruehling', 'cardSommer', 'cardHerbst', 'cardWinter',
    'cardBambus', 'cardPflaume', 'cardOrchidee', 'cardChrysantheme'
];

matchingGame.undoList = [];
matchingGame.selectableCards = {};
matchingGame.matchingCards = {};
matchingGame.resolution = null;

if (navigator.notification) { // true wenn Cordova used
// This is the event that fires when Cordova is fully loaded
    document.addEventListener("deviceready", onDeviceReady, false);
} else {
// This is the event that then the browser window is loaded
    window.onload = onDeviceReady;
}

matchingGame.resolution = null;
matchingGame.resolutions = {
    verysmallscreen: {borderWidthRight: 2,
        borderWidthBelow: 2,
        cardWidth: 38,
        cardHeight: 48,
        shiftValue: 2},
    smallscreen: {borderWidthRight: 3,
        borderWidthBelow: 3,
        cardWidth: 45,
        cardHeight: 59,
        shiftValue: 3},
    bigscreen: {borderWidthRight: 8,
        borderWidthBelow: 7,
        cardWidth: 79,
        cardHeight: 99,
        shiftValue: 4},
    verybigscreen: {borderWidthRight: 12,
        borderWidthBelow: 11,
        cardWidth: 113,
        cardHeight: 140,
        shiftValue: 4}
};

//--------------------------------------------------------------------

function registerMediaQueryListListener() {

   // media queries for choosing size of tiles
   
   // >= 1600x1100
    var verybigScreenMediaQueryList = window.matchMedia("(min-device-width:1600px) and (min-device-height:1100px)");
    
    // 1130x780 - 1599x1129
    var bigScreenMediaQueryList = window.matchMedia("(min-device-width: 1130px) and (max-device-width:1599px) and (min-device-height:780px),(min-device-height:780px) and (max-device-height:1129px) and (min-device-width:1130px)");
    
    // 640x460 - 1129x779
    var smallScreenMediaQueryList = window.matchMedia("(min-device-width:640px) and (max-device-width:1129px) and (min-device-height:460px),(min-device-height:460px) and (max-device-height:779px) and (min-device-width:640px)");
    
    // < 640x460
    var verysmallScreenMediaQueryList = window.matchMedia("(max-device-height:459px), (max-device-width:639px)");
   
     checkAndSetResolution();

    // Listen for orientation changes
    window.addEventListener("orientationchange", function () {
        checkAndSetResolution();
        redrawGame();
    }, false);

    verybigScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.verybigscreen;
            redrawGame();
        }
    });

    bigScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.bigscreen;
            redrawGame();
        }
    });

    smallScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.smallscreen;
            redrawGame();
        }
    });

    verysmallScreenMediaQueryList.addListener(function (mediaquerylist) {
        if (mediaquerylist.matches) {
            matchingGame.resolution = matchingGame.resolutions.verysmallscreen;
            redrawGame();
        }
    });

    function checkAndSetResolution() {
        if (verybigScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.verybigscreen;
        }
        if (bigScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.bigscreen;
        }

        if (smallScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.smallscreen;
        }
        if (verysmallScreenMediaQueryList.matches) {
            matchingGame.resolution = matchingGame.resolutions.verysmallscreen;
        }
    }
} // of registerMediaQueryListListener()

/*******************************************************************************
 * Entry point to the app. It initializes the Ubuntu SDK HTML5 theme
 * and connects events to handlers
 */
function onDeviceReady() {

    var router = sparouter.init(function () {
        return "start";
    }).onpage("game", function (event) {
        if (event.options === "turtle") {
            $("#cards").attr("data-layout", matchingGame.layoutTurtle);
            loadBoardData(matchingGame.turtle);
        }
        if (event.options === "flower") {
            $("#cards").attr("data-layout", matchingGame.layoutFlower);
            loadBoardData(matchingGame.flower);
        }
        if (event.options === "spider") {
            $("#cards").attr("data-layout", matchingGame.layoutSpider);
            loadBoardData(matchingGame.spider);
        }
        if (event.options === "cloud") {
            $("#cards").attr("data-layout", matchingGame.layoutCloud);
            loadBoardData(matchingGame.cloud);
        }
        if (event.options === "bug") {
            $("#cards").attr("data-layout", matchingGame.layoutBug);
            loadBoardData(matchingGame.bug);
        }
        if (event.options === "fourHills") {
            $("#cards").attr("data-layout", matchingGame.layoutFourHills);
            loadBoardData(matchingGame.fourHills);
        }

        if (event.options === "resumeGame")
            ;
        else if (event.options === "resumeFinishedGame")
            // do noting
            ;
        else
            startNewGame();

        router.allPagesInvisible();
        router.page("game").style.display = "table";
    }).onpage("menu", function () {
        router.hidePage("about");
        router.showPage("menu");
    }).onpage("about", function () {
        router.hidePage("menu");
        router.showPage("about");
    }).onpage("gamestatistics", function (event) {
        showStatisticsInPauseScreen();
        router.showPage("gamestatistics");
    }).onpage("gamestatisticswin", function (event) {
        showStatisticsInPauseScreen();
        return "gamestatisticswin";
    }).onpage("gamestatisticslose", function (event) {
        showStatisticsInPauseScreen();
        return "gamestatisticslose";
    }).onpage("start", function (event) {
        hideMessages();
        hideGameButtons();
        return "start";
    });
    router.start();

    function loadBoardData(board) {
        matchingGame.positionX = board.positionX;
        matchingGame.positionY = board.positionY;
        matchingGame.shift = board.shift;
        matchingGame.selectable = board.selectable;
    }

    var version = localStorage.getItem("version");
    if (version !== matchingGame.version) {
        localStorage.setItem("version", matchingGame.version);
    }

    matchingGame.gameState = "startScreen";
    $('#pauseButton').click(function (e) {
        $("#pauseScreen").show();
    });

    $('#undoButton').click(function (e) {
        hideMessages();
        undo();
    });

    $("#activateHints").click(function (e) {
        $("body").toggleClass("hint-on");
    });

    registerMediaQueryListListener();
}

function showInfo() {
   alert("* Testausgaben *\nWindow-Resolution:"+ window.innerWidth + "x" + window.innerHeight + "\n" +
   "Screen-Resolution:"+ window.screen.width + "x" + window.screen.height + "\n" +
   "Game-Resolution: " + document.body.getAttribute("data-resolution") + "\n" +
   "Pixel-Ratio: " + pixRat);
   
}
function hideGameButtons() {
    $("div.game-buttons").hide();
}

/** called after change of format (orientationchange)
 */
function redrawGame() {
    matchingGame.cardWidth = matchingGame.resolution.cardWidth;
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
    matchingGame.cardHeight = matchingGame.resolution.cardHeight;
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;
    var zIndexBase = 8;

    var positionXShadow;
    var positionYShadow;
    var zIndexShadow;

    var shadowShift = matchingGame.cardWidthWithoutBorder * 0.125;
    $(".card").each(function (index) {

        var positionX = matchingGame.cardWidthWithoutBorder * (matchingGame.positionX[index] - 1) - matchingGame.shift[index] * matchingGame.resolution.borderWidthRight;
        var positionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (matchingGame.positionY[index] - 1)) - matchingGame.shift[index] * matchingGame.resolution.borderWidthBelow;
        var zIndex = zIndexBase + matchingGame.shift[index];

        $(this).css({
            "left": positionX,
            "top": positionY,
            "z-index": zIndex
        });

        positionXShadow = positionX - shadowShift;
        positionYShadow = positionY - shadowShift;
        zIndexShadow = zIndex - 1;

        $(".shadow").eq(index).css({
            "left": positionXShadow,
            "top": positionYShadow,
            "z-index": zIndexShadow
        });
    });

    setImageBank();
   //scaleGame();
} // of redrawGame()

/** called once at the start of a new game
 */
function startGame() {

    $("div.game-buttons").show();
    shuffleCards();   
   //scaleGame();

    var numberOfCards = matchingGame.deck.length;
    matchingGame.cardWidth = matchingGame.resolution.cardWidth;
    matchingGame.cardWidthWithoutBorder = matchingGame.cardWidth - matchingGame.resolution.borderWidthRight;
    matchingGame.cardHeight = matchingGame.resolution.cardHeight;
    matchingGame.cardHeightWithoutBorder = matchingGame.cardHeight - matchingGame.resolution.borderWidthBelow;
    var zIndexBase = 8;

    for (var i = 0; i < (numberOfCards - 1); i++) {
        $("#cards").append('<div class="card"></div>');
        $("#cards").append('<div class="shadow"></div>');
    }

    var positionX;
    var cardPositionX;
    var positionY;
    var cardPositionY;
    var shift;
    var cardZIndex;
    var selectable;
    var positionXShadow;
    var positionYShadow;
    var zIndexShadow;
    var pattern;
    var shadowShift = matchingGame.cardWidthWithoutBorder *0.143;
    $(".card").each(function (index) {

        shift = matchingGame.shift[index];
        positionX = matchingGame.positionX[index];
        positionY = matchingGame.positionY[index];
        selectable = matchingGame.selectable[index];
        cardPositionX = matchingGame.cardWidthWithoutBorder * (positionX - 1) -  shift * matchingGame.resolution.borderWidthRight;
        cardPositionY = (matchingGame.cardHeightWithoutBorder + matchingGame.cardHeightWithoutBorder * (positionY - 1)) - shift * matchingGame.resolution.borderWidthBelow;
        cardZIndex = zIndexBase + shift;
        positionXShadow = cardPositionX - shadowShift;
        positionYShadow = cardPositionY - shadowShift;
        zIndexShadow = cardZIndex - 1;

        $(this).css({
            "left": cardPositionX,
            "top": cardPositionY,
            "z-index": cardZIndex
        });
        
        $(".shadow").eq(index).css({
            "left": positionXShadow,
            "top": positionYShadow,
            "z-index": zIndexShadow
        });

        pattern = matchingGame.deck[index];
        $(this).addClass(pattern);
        pattern = getCardPattern(pattern);
        $(this).attr("data-pattern", pattern);
        $(this).attr("data-position-x", positionX);
        $(this).attr("data-position-y", positionY);
        $(this).attr("data-shift", shift);
        $(this).attr("data-selectable", selectable);
        if (selectable) { // new css class for faster touch response
         $(this).addClass("waehlbar");
        }
        // call 'on' 'touchstart' with touch device, else 'click' event
        if (touchDevice) {
            $(this).on('touchstart',selectCard);
        } else {
            $(this).click(selectCard);
        }
    });

    initMatchingCards();
    setImageBank();
    
   scaleGame();

} // of startGame()

/** called from startGame() at the start of a new game
 */
function initMatchingCards() {

   var selectable;
   var pattern;
   var selectableCardsByPattern = [];
   matchingGame.selectableCards = {};
   matchingGame.matchingCards = {};

    $(".card").each(function () {
        selectable = $(this).hasClass("waehlbar");
        if (selectable) {
            pattern = $(this).data("pattern");
            if (matchingGame.selectableCards[pattern] !== undefined) {
                selectableCardsByPattern = matchingGame.selectableCards[pattern];
                selectableCardsByPattern.push($(this));
            } else {
                selectableCardsByPattern = [$(this)];
                matchingGame.selectableCards[pattern] = selectableCardsByPattern;
            }
        }
    });
    updateMatchingCards();
    
} // of initMatchingCards()

/** gives back symbol (Jahreszeiten/Blumen) or value of card
 */

function getCardPattern(cardName) {

    var cardJahreszeiten = ["cardFruehling", "cardSommer", "cardHerbst", "cardWinter"];
    var cardBlumen = ["cardBambus", "cardPflaume", "cardOrchidee", "cardChrysantheme"];

    if (cardJahreszeiten.indexOf(cardName) >= 0) {
        return "cardJahreszeiten";
    } else if (cardBlumen.indexOf(cardName) >= 0) {
        return "cardBlumen";
    }

    return cardName;
    
} // of getCardPattern(...

/** start work on clicked card
 */
function selectCard(e) {
   e.stopPropagation();
   //console.time('selectCard');
   if (!this.classList.contains("waehlbar")) { // faster than !isCardSelectable!!!
    return;                           // css class 'waehlbar' set on start of game
   }

   if (this.classList.contains("card-selected")) {
      this.classList.remove("card-selected");// delete selected from class list, (toggle select)
      return;                              // and quit!
   }

   this.classList.add("card-selected");  // add "selected" attribut to selected card
   var selected = document.querySelectorAll(".card-selected"); // get all "selected" again after card is added (max. 2)
   if (selected.length === 2) { // If 2 selected: pattern equality of card [0], [1] ?
     if ( selected[0].dataset.pattern === selected[1].dataset.pattern ) {
         selected[0].classList.remove("card-selected");
         selected[0].classList.add("card-removed");
         selected[1].classList.remove("card-selected");
         selected[1].classList.add("card-removed");         
         removeTookCards();  // and start removing routine
     } else {
         selected[0].classList.remove("card-selected"); // else remove selection class from card!
         selected[1].classList.remove("card-selected");
     }        
   }
   //console.timeEnd('selectCard');
} // of selectCard(..

/** called by updateSelectableAndMatchingCards(..
 * is card selectable?
 (calls to this function were minimized to gain speed)*/

function isCardSelectable(selectedElement) {
    
    var positionX = selectedElement[0].dataset.positionX;
    var positionY = selectedElement[0].dataset.positionY;
    var shift = selectedElement[0].dataset.shift;
    var numberOfLeftNeighbors = getLeftNeighbours(positionX, positionY, shift).length;
    var numberOfRightNeighbors = getRightNeigbors(positionX, positionY, shift).length;
    var numberOfHigherOverlaps = globalFilter.filter(function () {
         var isHigherOverlap = ((window.getComputedStyle(this).getPropertyValue("visibility") === "visible")
                && (Math.abs(this.dataset.positionY - positionY) < 1)
                && (this.dataset.shift > shift)
                && (Math.abs(this.dataset.positionX - positionX) < 1));
        return isHigherOverlap;
    }).length;
    // true if no neighbors and no overlaps
    return ((numberOfLeftNeighbors === 0 || numberOfRightNeighbors === 0) && numberOfHigherOverlaps === 0);
    
} // of isCardSelectable(..

/** checks for positions of neighbor cards
 */

function getRightNeigbors(positionX, positionY, shift) {
    return globalFilter.filter(function () {
      return ((window.getComputedStyle(this).getPropertyValue("visibility") === "visible")
                && (this.dataset.positionX - positionX === 1)
                && (Math.abs(this.dataset.positionY - positionY) < 1)
                && (this.dataset.shift == shift));
    });
}

function getLeftNeighbours(positionX, positionY, shift) {
    return globalFilter.filter(function () {
         var isNeighbour = ((window.getComputedStyle(this).getPropertyValue("visibility") === "visible")
            && ((this.dataset.positionX - positionX) === -1)
            && (Math.abs(this.dataset.positionY - positionY) < 1)
            && (this.dataset.shift == shift));
        return isNeighbour;
    });
}

function getUnderlayingNeighbours(positionX, positionY, shift) {
    return globalFilter.filter(function () {
        var isUnderlayingNeighbour = ((window.getComputedStyle(this).getPropertyValue("visibility") === "visible")
                && (Math.abs(this.dataset.positionY - positionY) < 1)
                && ((this.dataset.shift - shift) === -1)
                && (Math.abs(this.dataset.positionX - positionX) < 1));
        return isUnderlayingNeighbour;
    });
}

/** called by selectCard(e)
 * remove selected and matching pair of cards
 */
function removeTookCards() {
   var index;
   var removedCards = $(".card-removed");
   var removedCards_new = document.querySelectorAll('.card-removed');

   globalFilter = $(".card");
   globalFilter_new = document.querySelectorAll('.card');
   

   // Nur für 2 Steine Schatten entfernen lohnt keine Schleife
   //index = globalFilter.index(removedCards[0]);
   index = getIndex(globalFilter_new, removedCards_new[0]);
   document.querySelectorAll('.shadow')[index].style.visibility="hidden";
   //index = globalFilter.index(removedCards[1]);
   index = getIndex(globalFilter_new, removedCards_new[1]);
   document.querySelectorAll('.shadow')[index].style.visibility="hidden";

   // removeFromSelectableCards(removedCards);
   removeFromSelectableCards_new(removedCards_new);
   
   matchingGame.undoList.push(removedCards);
   removedCards.css({"visibility": "hidden"});
   removedCards.removeClass("card-removed");
   updateSelectableAndMatchingCards(removedCards);
   if (isWinningGame()) {
      showWinningMessage();
   }
} // of removeTookCards(..

function isWinningGame() {
    return (matchingGame.undoList.length * 2) === matchingGame.deck.length;
}

/** called by updateSelectableAndMatchingCards, removeTookCards
 */
/*
function removeFromSelectableCards(removedCards) {
    var pattern = removedCards[0].dataset.pattern;
    var selectableCardsByPattern = matchingGame.selectableCards[pattern];
    if (selectableCardsByPattern !== undefined) {
        selectableCardsByPattern.forEach(function (matchingCard) {
            //matchingCard.removeClass("card-matching");
            matchingCard[0].classList.remove("card-matching");

        });
    }
    selectableCardsByPattern = removeCardsFromArray(removedCards, selectableCardsByPattern);
    matchingGame.selectableCards[pattern] = selectableCardsByPattern;
    
} // of removeFromSelectableCards
*/
/** called by updateSelectableAndMatchingCards, removeTookCards
 */
function removeFromSelectableCards_new(removedCards_new) {
   var pattern = removedCards_new[0].dataset.pattern;
   var selectableCardsByPattern = matchingGame.selectableCards[pattern];
   if (selectableCardsByPattern !== undefined) {
     selectableCardsByPattern.forEach(function (matchingCard) {
         matchingCard[0].classList.remove("card-matching");
     });
   }
   selectableCardsByPattern = removeCardsFromArray_new(removedCards_new, selectableCardsByPattern);
   matchingGame.selectableCards[pattern] = selectableCardsByPattern;
} // of removeFromSelectableCards

/** called by removeFromSelectableCards
 */
/*
function removeCardsFromArray(cardsToRemove, cards) {
   var positionXCardToRemove;
   var positionYCardToRemove;
   var shiftCardToRemove;
   var positionX;
   var positionY;
   var shift;
   var cardToRemove;
   var resultingCards = [];
   var isCardToRemove;

   if (cards === undefined) {
     return [];
   }
   // Aufruf: cardsToRemove = removedCards, cards = selectableCardsByPattern
   cards.forEach(function (card) {
      positionX = card[0].dataset.positionX;
      positionY = card[0].dataset.positionY;
      shift = card[0].dataset.shift;
      isCardToRemove = false;
      var len = cardsToRemove.length;
      for (var i = 0; i < len; i++) {
         cardToRemove = cardsToRemove[i];
          positionXCardToRemove = cardToRemove.dataset.positionX;
         positionYCardToRemove = cardToRemove.dataset.positionY;
         shiftCardToRemove = cardToRemove.dataset.shift;
         if (positionXCardToRemove === positionX && positionYCardToRemove === positionY && shiftCardToRemove === shift) {
             isCardToRemove = true;
         }
      } // of cardsToRemove.each(...
      if (!isCardToRemove) {
         resultingCards.push(card);
      }
   }); // of cards.forEach(
    return resultingCards;
    
} // of removeCardsFromArray(...
*/

function removeCardsFromArray_new(cardsToRemove, cards) {
   var positionXCardToRemove;
   var positionYCardToRemove;
   var shiftCardToRemove;
   var positionX;
   var positionY;
   var shift;
   var cardToRemove;
   var resultingCards = [];
   var isCardToRemove;

   if (cards === undefined) {
     return [];
   }
   // Aufruf: cardsToRemove = removedCards, cards = selectableCardsByPattern
   cards.forEach(function (card) {
      positionX = card[0].dataset.positionX;
      positionY = card[0].dataset.positionY;
      shift = card[0].dataset.shift;
      isCardToRemove = false;
      var len = cardsToRemove.length;
      for (var i = 0; i < len; i++) {
         cardToRemove = cardsToRemove[i];
          positionXCardToRemove = cardToRemove.dataset.positionX;
         positionYCardToRemove = cardToRemove.dataset.positionY;
         shiftCardToRemove = cardToRemove.dataset.shift;
         if (positionXCardToRemove === positionX && positionYCardToRemove === positionY && shiftCardToRemove === shift) {
             isCardToRemove = true;
         }
      } // of cardsToRemove.each(...
      if (!isCardToRemove) {
         resultingCards.push(card);
      }
   }); // of cards.forEach(
    return resultingCards;
    
} // of removeCardsFromArray_new(...

/** called by undo(), removeTookCards(..
 */
 function updateSelectableAndMatchingCards(removedCards) {
   var neighbours;
   var leftNeighbours;
   var rightNeighbours;
   var underlayingNeighbours;
   var positionX;
   var positionY;
   var shift;
  
   var len = removedCards.length;
   for (var i = 0; i < len; i++) {
      positionX = removedCards[i].dataset.positionX;
      positionY = removedCards[i].dataset.positionY;
      shift = removedCards[i].dataset.shift;
      leftNeighbours = getLeftNeighbours(positionX, positionY, shift);
      rightNeighbours = getRightNeigbors(positionX, positionY, shift);
      underlayingNeighbours = getUnderlayingNeighbours(positionX, positionY, shift);
      var allNeighbours = leftNeighbours.add(rightNeighbours).add(underlayingNeighbours);
      if (neighbours !== undefined) {
         neighbours = neighbours.add(allNeighbours);
      } else {
         neighbours = allNeighbours;
      }
   };

   var selectable;
   var pattern;
   var selectableCardsByPattern;
   neighbours.each(function () {
      
     selectable = isCardSelectable($(this));
     if (!selectable) {
         //removeFromSelectableCards($(this));
         removeFromSelectableCards_new($(this));
         this.classList.remove("waehlbar");
         return;
     }
     this.classList.add("waehlbar");
     pattern = this.dataset.pattern;
     selectableCardsByPattern = matchingGame.selectableCards[pattern];

     if (selectableCardsByPattern === undefined) {
         selectableCardsByPattern = [$(this)];
         matchingGame.selectableCards[pattern] = selectableCardsByPattern;
     } else if (!cardArrayContainsCard(selectableCardsByPattern, this)) {
         selectableCardsByPattern.push($(this));
     }
   });

   updateMatchingCards();
    
} // of updateSelectableAndMatchingCards(..

/** called by initMatchingCards(), updateSelectableAndMatchingCards(..
 */
function updateMatchingCards() {
   var existsMatch = false;
   matchingGame.matchingCards = {};
   for (pattern in matchingGame.selectableCards) {

        selectableCardsByPattern = matchingGame.selectableCards[pattern];
        if (selectableCardsByPattern.length > 1) {
            existsMatch = true;
            matchingGame.matchingCards[pattern] = selectableCardsByPattern;
            //selectableCardsByPattern.forEach(function (matchingCard) {
            var len = selectableCardsByPattern.length;
            for (var i = 0; i < len; i++) {
               matchingCard = selectableCardsByPattern[i];
                //matchingCard.addClass("card-matching");
                matchingCard[0].classList.add("card-matching");
            };
        }
   }

    if (!existsMatch && !isWinningGame()) { // Game lost.
        hideGameButtons();
        $("div#loseMessage").show();
    }
    
} // of updateMatchingCards(...

function cardArrayContainsCard(cards, card) {
    var positionX = card.dataset.positionX;
    var positionY = card.dataset.positionY;
    var shift = card.dataset.shift;
    if (cards === undefined || cards.length === 0) {
        return false;
    }
    var containsCard = false;
    cards.forEach(function (otherCard) {
        if (otherCard[0].dataset.positionX === positionX && otherCard[0].dataset.positionY === positionY && otherCard[0].dataset.shift === shift) {
            containsCard = true;
        }
    });
    return containsCard;
    
} // of cardArrayContainsCard(...

function showWinningMessage() {
    $("div.game-buttons").hide();
    $("div#winningMessage").show();
}
function startNewGame() {
    $("#cards").empty();
    $("#cards").append('<div class="card"></div>');
    $("#cards").append('<div class="shadow"></div>');
    matchingGame.undoList = [];
    hideMessages();
    startGame();
}

function restartGame() {
    hideMessages();
    var numberOfRemovedPatterns = matchingGame.undoList.length;
    for (var i = 0; i < numberOfRemovedPatterns; i++) {
        undo();
    }
}

function hideMessages() {
    $("div#winningMessage").hide();
    $("div#loseMessage").hide();
}

function displayMessages() {
    if (isWinningGame()) {
        $("div#winningMessage").show();
    } else {
        $("div#loseMessage").show();
    }
}

function setImageBank() {

    switch(matchingGame.resolution) {
        case matchingGame.resolutions.verysmallscreen:
            $("body").attr("data-resolution", "verysmallscreen");
            break;
        case matchingGame.resolutions.smallscreen:
            $("body").attr("data-resolution", "smallscreen");
            break;
        case matchingGame.resolutions.bigscreen:
            $("body").attr("data-resolution", "bigscreen");
            break;
        case matchingGame.resolutions.verybigscreen:
            $("body").attr("data-resolution", "verybigscreen");
            break;
    }
} // of setImageBank(...

function undo() {
    if (matchingGame.undoList.length >= 1) {
        var cardsToUndo = matchingGame.undoList[matchingGame.undoList.length-1];
        var pattern = (matchingGame.undoList[matchingGame.undoList.length-1]).data("pattern");

        globalFilter = $(".card");
        cardsToUndo.each(function () {
            matchingGame.selectableCards[pattern].push($(this));
            index = globalFilter.index($(this));
            $(".shadow").eq(index).css({"visibility": "visible"});
        });
        matchingGame.undoList[matchingGame.undoList.length-1].css({"visibility": "visible"});
        updateSelectableAndMatchingCards(cardsToUndo);
        matchingGame.undoList.pop();
    }
} // of undo()
