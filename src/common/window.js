

export let $window;
export let $document;
if (process.env.WEBPACK) {
    $window = window;
    window.on = window.addEventListener;
    window.off = window.removeEventListener;
    $document = document;
} else {
    $window = { on: () => {}, off: () => {}};
    $document = {};
}
