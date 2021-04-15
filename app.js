let food =[];
let fruit = ["apple", "banana", "apricots", "avocado", "blackberry", "blackcurrant", "blueberry", "breadfruit","cantaloupe","carambola","cherimoya","cherry","clementine","coconut","cranberries","custard apple", "date fruit", "durian", "elderberry", "feijoa", "fig", "gooseberry", "grapefruit","grapes", "grape", "guava", "honeydew melon","jackfruit", "jujube fruit", "jujube", "kiwifruit", "kumquat", "lemon","lime","longan","loquat","lychee","mandarin","manga","mangosteen","mulberries","nectarine","olive", "olives","orange","papaya","passion fruit","peach","peaches","pear","persimmon","pitaya","dragonfruit","pineapple","pitanga","plantain","plums","pomegranate","prickly pear","prune","prunes","pummelo","quince","raspberry","rhubarb","sapodilla","sapote","soursop","strawberry", "strawberries","sugar apple","tamarind","tangerine","watermelon"]
let vegi = ["cloak","amaranth leaves", "arrowroot","artichoke","arugula","asparagus","bamboo shoot","grean beans","beans", "beet","beets","belgian endive","bitter melon", "bok choy","broadbeans","broccoli","broccoli rabe","brussel sprouts","cabbage","red cabbage","carrot","cassava","cauliflower","celeriac","celery","chayote","chicory","collards","collard greens","collard","corn","crookneck","cucumber","daikon","dandelion greens","dandelion","edamame","soybean","soybeans","eggplant","fennel","fiddlehead","ginger","ginger root","horseradish","jicama","kale","kohlrabi","leeks","lettuce","mushrooms","mushroom","mustard green","mustard greens","okra","onion","parsnip","peas","pepper","potato","pumpkin","radicchio","radish","rutabaga","salsify","shallots","shallot","snow peas","sorrel","spaghetti","spinach","squash","sugar snap peas","sweet potato","swiss chard","tomatillo","tomato","turnip","watercress","yam root","zucchini", "yam"]
let grain = ["bread","cereal","tortilla","rolls","pasta","oat","oats","rice","barely","rice","quinoa","millet","popcorn","amaranth","bareley","farro","teff","oatmeal","maize",]
let dairy = ["milk", "bread","yogurt","cheese", "pizza","water","egg","eggs","cream cheese","ice cream","custard","butter"]
let protein = ["chicken", "meat","steak","fish","salmon","shrimp","sausage","beef","pork","bacon","fried chicken","burger"]
let junk = ["candy","chocolate","lolipop","gummy bear","skittles","lemonade","coke","pepsi","cocacola","sprite","dr. pepper","fries","french fries","pizza","apple juice","coffee","grilled cheese","cookie","cake","muffin","chips","chip","syrup","pancakes","waffles","waffle","pancake","ice cream","candy bar","m&ms","m&m's","M&M's","M&Ms","m&m",]

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

let net;
let r;
async function app() {
    console.log('Loading mobilenet..');
  
    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');
  
    // Make a prediction through the model on our image.
    const imgEl = document.getElementById('camera--output');
    const result = await net.classify(imgEl);
    console.log(result);
    r = result[0].className;
    document.getElementById("rightfood").innerHTML = "Is your food a " + result[0].className + "?";
}
// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    tocamera = document.querySelector("#tocamera"),
    Yes = document.querySelector("#Yes"),
    No = document.querySelector("#No"),
    Done = document.querySelector("#Done"),
    spawnmap = document.querySelector("#spawnmap"),
    Manual = document.querySelector('#Manual'),
    Q = document.querySelector("#rightfood");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    app();
    if (Q.style.display == 'none'){
        Q.style.display = 'block';
        Yes.style.display = 'block';
        No.style.display = 'block';
    }
};
Yes.onclick = function(){
    food.push(r);
    alert("Your food has been added!");
    console.log(food);
}
No.onclick = function(){
    alert("Please take the picuture again");
}
Manual.onclick = function(){
    var PMan = prompt("Enter Your Food","");
    if (PMan != null){
        food.push(PMan);
        alert("Your food has been added!");
    }
}
Done.onclick = function(){
    let frut = 0;
    let veg = 0;
    let gran = 0;
    let dar = 0;
    let pro = 0;
    let jun = 0;
    let i;
    let k;
    if (food == 0){
        alert("Please take a picture of some food");
    }
    else{
        for (i=0; i<food.length; i++){
            for (k=0; k<fruit.length; k++){
                if(fruit[k] == food[i]){
                    frut += 1;
                }
            }
            for (k=0; k<vegi.length;k++){
                if(vegi[k] == food[i]){
                    veg +=1;
                }
            }
            for (k=0; k<grain.length;k++){
                if(grain[k] == food[i]){
                    gran += 1;
                }
            }
            for (k=0; k<dairy.length;k++){
                if(dairy[k] == food[i]){
                    dar += 1;
                }
            }
            for(k=0; k<protein.length;k++){
                if(protein[k] == food[i]){
                    pro += 1;
                }
            }
            for(k=0; k<junk.length;k++){
                if(junk[k] == food[i]){
                    jun +=1;
                }
            }
        }
    
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            title: {
                text: "Your Nutritious Scan"
            },
            data: [{
                type: "pie",
                startAngle: 240,
                yValueFormatString: "##0.00\"%\"",
                indexLabel: "{label} {y}",
                dataPoints:[
                    {y: ((frut / food.length) * 100), label: "Fruits"},
                    {y: ((veg / food.length) * 100), label: "Vegitables"},
                    {y: ((gran / food.length) * 100), label: "Grains"},
                    {y: ((dar / food.length) * 100), label: "Dairy"},
                    {y: ((pro / food.length) * 100), label: "Protein / Meat"},
                    {y: ((jun / food.length) * 100), label: "Junk Food"}
                ]
            }]
        
        });
        chart.render();
        document.getElementById("spawnmap").style.display = "block";
        //I want to add another section called junk for junk food
        
        //I want to lastly add icons that indicate what foods are missing and what foods there are too much of
        frut = ((frut / food.length) * 100);
        let vegs = veg;
        veg = ((veg / food.length) * 100);
        let grans = gran;
        gran = ((gran / food.length) * 100);
        let dars = dar;
        dar = ((dar / food.length) * 100);
        let pros = pro;
        pro = ((pro / food.length) * 100);
        let juns = jun;
        jun = ((jun / food.length) * 100);
        if (frut < 15){
            document.getElementById("LF").style.display = "block";
        }
        if ((veg < 25) && (vegs < 2)){
            document.getElementById("LV").style.display = "block";
        }
        if (gran < 20){
            document.getElementById("LG").style.display = "block";
        }
        if(dars < 1){
            document.getElementById("LD").style.display = "block";
        }
        if(pro < 20){
            document.getElementById("LPM").style.display = "block";
        }
        if(juns > 1){
            document.getElementById("LJ").style.display = "block";
        }
        if((grans >= 1) && (vegs >= 1) && (pros >= 1)){
            document.getElementById("WN").style.display = "block";
        }
    }
}

spawnmap.onclick = function(){
  const status = document.querySelector('#status');
  const mapLink = document.querySelector('#map-link');
  document.getElementById("map-link").style.display = "block";
  document.getElementById("status").style.display = "block";

  mapLink.href = '';
  mapLink.textContent = '';

  function success(position) {
    const latitude  = position.coords.latitude;
    const longitude = position.coords.longitude;

    status.textContent = '';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Latitude: ${latitude} °, Longitude: ${longitude} °`;
    console.log(latitude);
    console.log(longitude);
    document.getElementById("map-link").style.display = "none";
    function initMap() {

        // pick center coordinates for your map
        var myMapCenter = {lat: latitude, lng: longitude};

        var map = new google.maps.Map(document.getElementById('map'), {
            center: myMapCenter,
            zoom: 14
        });
    
    
        function markStore(storeInfo){
    
            // Create a marker and set its position.
            var marker = new google.maps.Marker({
                map: map,
                position: storeInfo.location,
                title: storeInfo.name
            });
    
            // show store info when marker is clicked
            marker.addListener('click', function(){
                showStoreInfo(storeInfo);
            });
        }
    
        // show store info in text box
        function showStoreInfo(storeInfo){
            var info_div = document.getElementById('info_div');
            info_div.innerHTML = 'Store name: '
                + storeInfo.name
                + '<br>Hours: ' + storeInfo.hours;
        }
    
        var stores = [
            {
                name: 'Krogers',
                location: {lat: 40.065087, lng: -83.025381},
                hours: '8AM to 10PM'
            },
            {
                name: 'Store 2',
                location: {lat: 40.790091, lng: -73.968285},
                hours: '9AM to 9PM'
            }
        ];
    
        stores.forEach(function(store){
            markStore(store);
        });
    }
    initMap();
  }

  function error() {
    status.textContent = 'Unable to retrieve your location';
  }

  if(!navigator.geolocation) {
    status.textContent = 'Geolocation is not supported by your browser';
  } else {
    status.textContent = 'Locating…';
    navigator.geolocation.getCurrentPosition(success, error);
  }
}
marker.addListener('click', function(){
    showStoreInfo(storeInfo);
});