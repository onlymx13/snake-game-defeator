var x = 1;
var y = 1;
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
    mycanvas = document.getElementById('mycanvas');
    mycanvas.width = img.width 
    mycanvas.height = img.height;
    var context = mycanvas.getContext('2d');
    context.drawImage(img, 0, 0, img.width, img.height);
    while ([context.getImageData(x,y,1,1).data[0],context.getImageData(x,y,1,1).data[1],context.getImageData(x,y,1,1).data[2]]) {
        x = x%mycanvas.width + 1;
        y = y + x==
    }
}
