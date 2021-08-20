status = "";
object=[];
video="";
object_name = "";
function preload() {
    
}
function setup() {
    canvas = createCanvas(480, 380)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}
function draw() {
    image(video, 0, 0, 480, 380)
    
    console.log("video is live")
    if (status != "") {
        objectdetector.detect(video,gotresult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Found"
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are: " + object.length
            fill("turquoise")
            percent = floor(object[i].confidence*100)
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y)
            noFill()
            stroke("red")
            rect(object[i].x,object[i].y,object[i].width,object[i].height)

            if(object[i].label == object_name){
                video.stop();
                objectdetector.detect(gotresult);
                document.getElementById("status").innerHTML = object_name + "found"
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "found")
                synth.speak(utterThis)
            }
            else{
                document.getElementById("status").innerHTML = object_name + "not found"
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "not found")
                synth.speak(utterThis)
            }
        }
    }
}

function start(){
    objectdetector = ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
    object_name = document.getElementById("name").value;
}

function modelLoaded(){
    console.log("model is loaded")
    status = true;
  
}

function gotresult(error, result) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(result)
        object = result
    }
}