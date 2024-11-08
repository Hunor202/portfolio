// Tábla adatai
// 0 - alap
// 1 - hegy
// 2 - erdő
// 3 - falu
// 4 - farm
// 5 - víz
var table = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

var missionPoints = [0, 0, 0, 0];
var seasonPoints = [0, 0, 0, 0];
var actualSeasonTime = 7;
var actualSeason = 0;
var seasonText = ["Tavasz(AB)", "Nyár(BC)", "Ősz(CD)", "Tél(DA)"];

// Pontok
const missionApoint = document.getElementById("missionAValue");
const missionBpoint = document.getElementById("missionBValue");
const missionCpoint = document.getElementById("missionCValue");
const missionDpoint = document.getElementById("missionDValue");
const springPoint = document.getElementById("springValue");
const summerPoint = document.getElementById("summerValue");
const autumnPoint = document.getElementById("autumnValue");
const winterPoint = document.getElementById("winterValue");
const totalPoint = document.getElementById("totalPoint");
const actualSeasonValue = document.getElementById("actualSeasonValue");
const actualSeasonText = document.getElementById("actualSeason");

// Küldetések
var missionAimg = document.getElementById("missionA");
var missionBimg = document.getElementById("missionB");
var missionCimg = document.getElementById("missionC");
var missionDimg = document.getElementById("missionD");

missionAimg.style.border = '5px solid RGB(111, 255, 28)';
missionBimg.style.border = '5px solid RGB(111, 255, 28)';

// Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Mezők száma és mérete
var rows = 11;
var cols = 11;
var cellSize = canvas.width / cols;
var drawSize = cellSize - 10;

// Aktuális elem canvasa
var canvas2 = document.getElementById("canvas2");
var ctx2 = canvas2.getContext("2d");

// Gombok
var rotateButton = document.getElementById("rotate");
var mirrorButton = document.getElementById("mirror");

// Canvas háttér
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx2.fillStyle = "white";
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

// Canvas inicializálása
function initCanvas() {
    // Alap mezők
    const imBase = new Image();
    imBase.onload = function () {
        for (var i = 0; i < cols; ++i) {
            for (var j = 0; j < rows; ++j) {
                drawBase(i, j);
            }
        }
    };
    imBase.src = "assets/tiles/base_tile.png";

    function drawBase(x, y) { ctx.drawImage(imBase, x * cellSize + 5, y * cellSize + 5, drawSize, drawSize); }

    // Hegyek lehelyezése
    const imMountain = new Image();
    imMountain.onload = drawMountain;
    imMountain.src = "assets/tiles/mountain_tile.png";

    function drawMountain() {
        ctx.drawImage(imMountain, 1 * cellSize + 5, 1 * cellSize + 5, drawSize, drawSize);
        table[1][1] = 1;
        ctx.drawImage(imMountain, 8 * cellSize + 5, 3 * cellSize + 5, drawSize, drawSize);
        table[3][8] = 1;
        ctx.drawImage(imMountain, 3 * cellSize + 5, 5 * cellSize + 5, drawSize, drawSize);
        table[5][3] = 1;
        ctx.drawImage(imMountain, 9 * cellSize + 5, 8 * cellSize + 5, drawSize, drawSize);
        table[8][9] = 1;
        ctx.drawImage(imMountain, 5 * cellSize + 5, 9 * cellSize + 5, drawSize, drawSize);
        table[9][5] = 1;
    }
}


// Lehetséges elemek
const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]

function drawActualPiece() {
    const img = new Image();
    img.onload = function () {
        for (var i = 0; i < 3; ++i) {
            for (var j = 0; j < 3; ++j) {
                if (actualElement.shape[i][j] == 1) draw(j, i);
            }
        }
    }

    switch (actualElement.type) {
        case 'water':
            img.src = "assets/tiles/water_tile.png"
            break;
        case 'forest':
            img.src = "assets/tiles/forest_tile.png"
            break;
        case 'farm':
            img.src = "assets/tiles/farm_tile.png"
            break;
        case 'town':
            img.src = "assets/tiles/town_tile.png"
            break;
    }

    function draw(x, y) { ctx2.drawImage(img, x * cellSize + 5, y * cellSize + 5, drawSize, drawSize); }
    document.getElementById("ACTUALTIME").innerHTML = actualElement.time;
}

// Amig nem kapok egyszerubb megoldast
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        var clonedArray = [];
        for (var i = 0; i < obj.length; i++) {
            clonedArray[i] = deepClone(obj[i]);
        }
        return clonedArray;
    }

    var clonedObj = {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }
    return clonedObj;
}

function drawPiece(a, x, y) {
    // Lehelyezhető az elem?
    for (var i = -1; i < 2; ++i) {
        for (var j = -1; j < 2; ++j) {
            if (a.shape[i + 1][j + 1] == 1 && ((y + i) < 0 || (y + i) > 10 || (x + j) < 0 || (x + j) > 10)) {
                window.alert("Ide nem lehet lehelyezni!");
                return false;
            }
            if (a.shape[i + 1][j + 1] == 1 && table[y + i][x + j] != 0) {
                window.alert("Ide nem lehet lehelyezni!");
                return false;
            }
        }
    }

    const img = new Image();
    img.onload = function () {
        for (var i = -1; i < 2; ++i) {
            for (var j = -1; j < 2; ++j) {
                if (a.shape[i + 1][j + 1] == 1) draw(x + j, y + i);
            }
        }
    }

    var value;
    switch (a.type) {
        case 'water':
            img.src = "assets/tiles/water_tile.png"
            value = 5;
            break;
        case 'forest':
            img.src = "assets/tiles/forest_tile.png"
            value = 2;
            break;
        case 'farm':
            img.src = "assets/tiles/farm_tile.png"
            value = 4;
            break;
        case 'town':
            img.src = "assets/tiles/town_tile.png"
            value = 3;
            break;
    }

    function draw(x, y) {
        ctx.drawImage(img, x * cellSize + 5, y * cellSize + 5, drawSize, drawSize);
        table[y][x] = value;
    }
    return true;
}

canvas.addEventListener("click", function (event) {
    var clickX = event.clientX - canvas.offsetLeft;
    var clickY = event.clientY - canvas.offsetTop;

    // Kattintás helyének koordinátái 11x11-es rácsban
    var x = Math.floor(clickX / cellSize);
    var y = Math.floor(clickY / cellSize);

    // Ellenőrizd, hogy a kattintás a canvas 11x11-es rácsában van-e
    if (x >= 0 && x < 11 && y >= 0 && y < 11) {
        if (drawPiece(actualElement, x, y)) {
            if (actualSeasonTime - actualElement.time > 0) actualSeasonTime -= actualElement.time;
            else if (actualSeasonTime - actualElement.time == 0) {
                if (actualSeason != 3) calculatePoints();
                actualSeason++;
                actualSeasonTime = 7;
            } else {
                if (actualSeason != 3) calculatePoints();
                actualSeason++;
                actualSeasonTime = 7 - actualElement.time;
            }
            actualSeasonText.innerHTML = seasonText[actualSeason];
            actualSeasonValue.innerHTML = actualSeasonTime;
            actualElement = deepClone(elements[Math.floor(Math.random() * 16)]);
            ctx2.clearRect(0, 0, this.width, this.height);
            ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
            drawActualPiece(actualElement);
            if (actualSeason == 4) {
                calculatePoints();
                window.alert("Over!");
                canvas.removeEventListener("click", clickEventHandler);
            }
        }
    }
});

// Forgatás
function rotateMatrix() {
    var rotatedMatrix = [];
    for (var i = 0; i < 3; i++) {
        rotatedMatrix.push([]);
        for (var j = 0; j < 3; j++) {
            rotatedMatrix[i][j] = actualElement.shape[3 - 1 - j][i];
        }
    }
    actualElement.shape = rotatedMatrix;
    actualElement.rotation++;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    drawActualPiece(actualElement);
}
rotateButton.addEventListener("click", function () { rotateMatrix() });

// Tükrözés
function mirrorMatrix() {
    for (var i = 0; i < 3; i++) {
        actualElement.shape[i].reverse();
    }
    actualElement.mirrored != actualElement.mirrored;
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
    drawActualPiece(actualElement);
}
mirrorButton.addEventListener("click", function () { mirrorMatrix() });

// Küldetések
var missions = [treeLine, edgeForest]

function treeLine() {
    var point = 0;
    var longest = 0;
    for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
            var b = false;
            if (table[i][j] == 2) {
                var d = i - 1;
                var actual = 1;
                while (d >= 0 && d <= 10 && table[d][j] == 2) {
                    b = true;
                    --d;
                    ++actual
                }
                if (actual > longest) longest = actual;
            }
        }
    }
    point = longest * 2;
    return point;
}

function edgeForest() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        if (table[0][i] == 2) ++point;
        if (table[10][i] == 2) ++point;
    }
    for (var i = 1; i < 10; ++i) {
        if (table[i][0] == 2) ++point;
        if (table[i][10] == 2) ++point;
    }
    return point;
}

function watering() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
            var b = false;
            if (table[i][j] == 5) {
                var u = i + 1;
                var d = i - 1;
                var r = j + 1;
                var l = j - 1;
                if (u >= 0 && u <= 10 && table[u][j] == 4) b = true;
                if (d >= 0 && d <= 10 && table[d][j] == 4) b = true;
                if (r >= 0 && r <= 10 && table[i][r] == 4) b = true;
                if (l >= 0 && l <= 10 && table[i][l] == 4) b = true;
            }
            if (b) point += 2;
        }
    }
    return point;
}

function wealthyTown() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
            var neighbours = [0];
            if (table[i][j] == 3) {
                var u = i + 1;
                var d = i - 1;
                var r = j + 1;
                var l = j - 1;
                if (u >= 0 && u <= 10 && !neighbours.includes(table[u][j])) neighbours.push(table[u][j]);
                if (d >= 0 && d <= 10 && !neighbours.includes(table[d][j])) neighbours.push(table[d][j]);
                if (r >= 0 && r <= 10 && !neighbours.includes(table[i][r])) neighbours.push(table[i][r]);
                if (l >= 0 && l <= 10 && !neighbours.includes(table[i][l])) neighbours.push(table[i][l]);
                if (neighbours.length >= 4) point += 3;
            }
        }
    }
    return point;
}

function rowOfHouses() {
    point = 0;
    var longest = 0;
    var count = 0;
    for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
            var b = false;
            if (table[i][j] == 3) {
                var r = j + 1;
                var actual = 1;
                while (r >= 0 && r <= 10 && table[i][r] == 3) {
                    b = true;
                    ++r;
                    ++actual
                }
                if (actual > longest) longest = actual;
            }
        }
    }
    for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
            var b = false;
            if (table[i][j] == 3) {
                var r = j + 1;
                var actual = 1;
                while (r >= 0 && r <= 10 && table[i][r] == 3) {
                    b = true;
                    ++r;
                    ++actual
                }
                if (actual == longest) ++count;
            }
        }
    }
    point = longest * count * 2;
    return point;
}

function silos() { //ellenorizni
    var point = 0;
    var a = [true, true, true, true, true, true];
    for (var i = 0; i < 11; ++i) {
        if (table[i][0] == 0) a[0] = false;
        if (table[i][2] == 0) a[1] = false;
        if (table[i][4] == 0) a[2] = false;
        if (table[i][6] == 0) a[3] = false;
        if (table[i][8] == 0) a[4] = false;
        if (table[i][10] == 0) a[5] = false;
    }
    for (var i = 0; i < 6; ++i) {
        if (a[i]) point += 10;
    }
    return point;
}

function sleepyValley() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        var forest = 0;
        for (var j = 0; j < 11; ++j) {
            if (table[i][j] == 2) ++forest;
        }
        if (forest >= 3) point += 4;
    }
    return point;
}

function wateringCanal() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        var farm = 0;
        var water = 0;
        for (var j = 0; j < 11; ++j) {
            if (table[j][i] == 4) ++farm;
            if (table[j][i] == 5) ++water;
        }
        if (farm > 0 && farm == water) point += 4;
    }
    return point;
}

function magiciansValley() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
            if (table[i][j] == 1) {
                var u = i + 1;
                var d = i - 1;
                var r = j + 1;
                var l = j - 1;
                if (u >= 0 && u <= 10 && table[u][j] == 5) point += 3;
                if (d >= 0 && d <= 10 && table[d][j] == 5) point += 3;
                if (r >= 0 && r <= 10 && table[i][r] == 5) point += 3;
                if (l >= 0 && l <= 10 && table[i][l] == 5) point += 3;
            }
        }
    }
    return point;
}

function emptySite() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        for (var j = 0; j < 11; ++j) {
            var b = false;
            if (table[i][j] == 0) {
                var u = i + 1;
                var d = i - 1;
                var r = j + 1;
                var l = j - 1;
                if (u >= 0 && u <= 10 && table[u][j] == 3) b = true;
                if (d >= 0 && d <= 10 && table[d][j] == 3) b = true;
                if (r >= 0 && r <= 10 && table[i][r] == 3) b = true;
                if (l >= 0 && l <= 10 && table[i][l] == 3) b = true;
            }
            if (b) point += 2;
        }
        return point;
    }
}

function borderlands() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        var fullc = true;
        var fullr = true;
        for (var j = 0; j < 11; ++j) {
            if (table[i][j] == 0) fullr = false;
            if (table[j][i] == 0) fullc = false;
        }
        if (fullr) point += 6;
        if (fullc) point += 6;
    }
    return point;
}

function richCountryside() {
    var point = 0;
    for (var i = 0; i < 11; ++i) {
        var actualRow = [0];
        for (var j = 0; j < 11; ++j) {
            if (!actualRow.includes(table[i][j])) actualRow.push(table[i][j]);
        }
        if (actualRow.length >= 6) point += 4;
    }
    return point;
}

var missionList = [treeLine, edgeForest, watering, wealthyTown, rowOfHouses, silos, sleepyValley, wateringCanal, magiciansValley, emptySite, borderlands, richCountryside];

// Pontszamítás és kiíratás
function calculatePoints() {
    switch (actualSeason) {
        case 0:
            seasonPoints[0] += selectedMissions[0]() + selectedMissions[1]();
            missionPoints[0] = selectedMissions[0]();
            missionPoints[1] = selectedMissions[1]();
            missionApoint.innerHTML = missionPoints[0];
            missionBpoint.innerHTML = missionPoints[1];
            springPoint.innerHTML = seasonPoints[0];
            totalPoint.innerHTML = seasonPoints[0];
            missionAimg.style.border = 'none';
            missionCimg.style.border = '5px solid RGB(111, 255, 28)';
            break;
        case 1:
            seasonPoints[1] += selectedMissions[1]() + selectedMissions[2]();
            missionPoints[1] = selectedMissions[1]();
            missionPoints[2] = selectedMissions[2]();
            missionBpoint.innerHTML = missionPoints[1];
            missionCpoint.innerHTML = missionPoints[2];
            summerPoint.innerHTML = seasonPoints[1];
            totalPoint.innerHTML = seasonPoints[0] + seasonPoints[1];
            missionBimg.style.border = 'none';
            missionDimg.style.border = '5px solid RGB(111, 255, 28)';
            break;
        case 2:
            seasonPoints[2] += selectedMissions[2]() + selectedMissions[3]();
            missionPoints[2] = selectedMissions[2]();
            missionPoints[3] = selectedMissions[3]();
            missionCpoint.innerHTML = missionPoints[2];
            missionDpoint.innerHTML = missionPoints[3];
            autumnPoint.innerHTML = seasonPoints[2];
            totalPoint.innerHTML = seasonPoints[0] + seasonPoints[1] + seasonPoints[2];
            missionCimg.style.border = 'none';
            missionAimg.style.border = '5px solid RGB(111, 255, 28)';
            break;
        default:
            seasonPoints[3] += selectedMissions[3]() + selectedMissions[0]();
            missionPoints[3] = selectedMissions[3]();
            missionPoints[0] = selectedMissions[0]();
            missionCpoint.innerHTML = missionPoints[3];
            missionApoint.innerHTML = missionPoints[0];
            winterPoint.innerHTML = seasonPoints[3];
            totalPoint.innerHTML = seasonPoints[0] + seasonPoints[1] + seasonPoints[2] + seasonPoints[3];
            missionAimg.style.border = 'none';
            missionDimg.style.border = 'none';
            break;
    }
}

// Küldetések kiválasztása
var selectedMissions = [];
var randNumebers = []

while (randNumebers.length != 4) {
    var randNum = Math.floor(Math.random() * 11);
    if (!randNumebers.includes(randNum)) randNumebers.push(randNum);
}

selectedMissions.push(missionList[randNumebers[0]]);
missionAimg.src = `assets/missions_hun/Group${randNumebers[0]}.png`;

selectedMissions.push(missionList[randNumebers[1]]);
missionBimg.src = `assets/missions_hun/Group${randNumebers[1]}.png`;

selectedMissions.push(missionList[randNumebers[2]]);
missionCimg.src = `assets/missions_hun/Group${randNumebers[2]}.png`;

selectedMissions.push(missionList[randNumebers[3]]);
missionDimg.src = `assets/missions_hun/Group${randNumebers[3]}.png`;

// Kezdés
initCanvas();
var actualElement = deepClone(elements[Math.floor(Math.random() * 16)]);
drawActualPiece();