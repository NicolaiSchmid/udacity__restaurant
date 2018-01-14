if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js', {
        scope: '/',
    }).then(() => {
        console.log('Service Worker registered');
    });
}