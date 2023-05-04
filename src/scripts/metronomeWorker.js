let intervalId; // reference to the setInterval invocation
let interval = 100;

onmessage = (event) => {
  if(event.data.command){
    switch(event.data.command){
      case "play": {
        intervalId = setInterval(() => {
          postMessage("tick");
        }, interval);
        
        break;
      }
      case "stop": {
        clearInterval(intervalId);
        intervalId = null;
        
        break;
      }
      default:
        console.log("Invalid command name");
    }
  }

  if (event.data.interval) {
    interval = event.data.interval;

    if(intervalId){
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        postMessage("tick");
      }, interval);
    }
  }
};