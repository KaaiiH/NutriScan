// let net;
// let food =[];
// const classifier = knnClassifier.create();
// async function app() {
//   console.log('Loading mobilenet..');

//   // Load the model.
//   net = await mobilenet.load();
//   console.log('Successfully loaded model');

//   // Make a prediction through the model on our image.
//   const imgEl = document.getElementById('canvas');
//   const result = await net.classify(imgEl);
//   console.log(result);
//   console.log(result[0].className);
//   console.log(result[1].className);
//   console.log(result[2].className);


//   document.getElementById("food").innerHTML = "is your food a " + result[0].className + "?";
// }

// const fileInput = document.getElementById('file-input');
// fileInput.addEventListener('change', (e) => doSomethingWithFiles(e.target.files));

// const player = document.getElementById('player');
// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');
// const captureButton = document.getElementById('capture');

// const constraints = {
//     video: {facingMode: "environment" }, audio: false ,
// };
// // gets video frame to the canvas.
// captureButton.addEventListener('click', () => {
//  // tensorflow camera api
//   context.drawImage(player, 0, 0, canvas.width, canvas.height);
//   app();
  
// });
// // will stop all video stream
// //     player.srcObject.getVideoTracks().forEach(track => track.stop());
// // });
// // attach the video stream to the video element
// navigator.mediaDevices.getUserMedia(constraints)
// .then((stream) => {
//   player.srcObject = stream;
// });
