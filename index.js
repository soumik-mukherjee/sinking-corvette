function onLoad() {
    console.log('On load');
    const deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        //populateStorage();
        console.log('No device id found!');

        localStorage.setItem('deviceId', uuidv4());
    } else {
        //setStyles();
        console.log('Device id found!', deviceId);
    }

    navigator.serviceWorker.addEventListener('message', event => {
        console.log('Message recieved: ', event.data);
    });
}

// Check that service workers are supported
if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
        onLoad();
        let startPollingButton = document.getElementById('startPolling');
        startPollingButton.addEventListener('click', startPolling)
        let stopPollingButton = document.getElementById('stopPolling');
        stopPollingButton.addEventListener('click', stopPolling)
    });
}

const startPolling = function(e){
    navigator.serviceWorker.controller.postMessage('startPolling');
}

const stopPolling = function(e){
    navigator.serviceWorker.controller.postMessage('stopPolling');
}