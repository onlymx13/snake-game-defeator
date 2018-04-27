var x;
var y;
var dir;
Array.prototype.random = function() {
    return this[Math.floor((Math.random() * this.length))];
}

function main() {
    img = document.getElementById('myImage');
    file = document.querySelector('input[type=file]').files[0];
    reader = new FileReader();
    reader.addEventListener("load", function() {
        img.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
    setTimeout(function(){
    mycanvas = document.getElementById('mycanvas');
    mycanvas.width = img.width;
    mycanvas.height = img.height;
    var context = mycanvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);
    var array = [];
    for (x = 1; x <= mycanvas.width; x++) {
        for (y = 1; y <= mycanvas.height; y++) {
            var data = context.getImageData(x, y, 1, 1).data;
            if ([data[0], data[1], data[2]] == [150, 150, 150]) {
                array.push([x, y]);
            }
        }
    }
    var bluePixel = context.createImageData(1, 1);
    bluePixel.data = [0, 113, 255, 255];
    while ([context.getImageData(x, y, 1, 1).data[0], context.getImageData(x, y, 1, 1).data[1], context.getImageData(x, y, 1, 1).data[2]] != [0, 115, 58]) {
        context.drawImage(img, 0, 0, img.width, img.height);
        var x = array.random()[0];
        var y = array.random()[1];
        dir = {
            horizontal: 1,
            vertical: 0
        };
        while ([context.getImageData(x, y, 1, 1).data[0], context.getImageData(x, y, 1, 1).data[1], context.getImageData(x, y, 1, 1).data[2]] != [255, 255, 255]) {
            x += 1;
        }
        while ([context.getImageData(x, y, 1, 1).data[0], context.getImageData(x, y, 1, 1).data[1], context.getImageData(x, y, 1, 1).data[2]] == [255, 255, 255]) {
            move(1);
        }
        if ([context.getImageData(x, y, 1, 1).data[0], context.getImageData(x, y, 1, 1).data[1], context.getImageData(x, y, 1, 1).data[2]] == [237, 54, 36]) {
            continue;
        }
        var flag = true;
        do {
            var storedx = x;
            var storedy = y;
            bounce();
            move(3);
            if ([context.getImageData(x, y, 1, 1).data[0], context.getImageData(x, y, 1, 1).data[1], context.getImageData(x, y, 1, 1).data[2]] == [255, 255, 255]) {
                break;
            }
            x = storedx;
            y = storedy;
            move(-3);
        } while (true);
        context.putImageData(bluePixel, x, y);
    }
}
               },200);
function move(num) {
    if (num >= 0) {
        for (var i = 0; i < num; i++) {
            x += dir.horizontal;
            y += dir.vertical;
        }
    } else {
        for (var i = 0; i < num; i++) {
            x -= dir.horizontal;
            y -= dir.vertical;
        }
    }
}

function bounce() {
    if (dir.horizontal) {
        dir.horizontal = 0;
    } else {
        dir.horizontal = 2 * Math.floor(2 * Math.random()) - 1;
    }
    if (dir.vertical) {
        dir.vertical = 0;
    } else {
        dir.vertical = 2 * Math.floor(2 * Math.random()) - 1;
    }
}
