var longPoller;

self.addEventListener('message', (evt) => {
    console.log("message: ", evt.data)
    const client = evt.source;
    switch (evt.data) {
        case 'startPolling':
            longPoller = self.setInterval(doOnTimer, 5000, client)
            return;
        case 'stopPolling':
            clearInterval(longPoller);
            return;
        default:
            return;
    }

});

function doOnTimer(client) {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            client.postMessage({
                message: data
            });
        });
};



self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
});