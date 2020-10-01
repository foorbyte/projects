const drawerEl = document.querySelector('.mdc-drawer');
const drawer = new mdc.drawer.MDCDrawer.attachTo(drawerEl);

// Instantiate MDC Top App Bar (required)
const topAppBarEl = document.querySelector('.mdc-top-app-bar');
const topAppBar = new mdc.topAppBar.MDCTopAppBar.attachTo(topAppBarEl);

topAppBar.setScrollTarget(document.querySelector('.main-content'));
topAppBar.listen('MDCTopAppBar:nav', () => {
drawer.open = !drawer.open;
});


// create a worker whose code is defined in the file passed as parameter
const worker = new Worker("worker.js");

function sendMessageToWorker() {
  worker.postMessage("hello");
}

function askWorkerRecurringTask() {
  worker.postMessage("recurring");
}

// This event is fired when the worker posts a message
// The value of the message is in messageEvent.data
worker.addEventListener("message", function(messageEvent) {
  // Log the received message in the output element
  const log = document.createElement("p");
  log.textContent = messageEvent.data;
  document.querySelector("output").prepend(log);
});

// This event is fired when the worker recieves a message from the main JavaScript
// The value of the message is in messageEvent.data
self.addEventListener("message", function(messageEvent) {
    if (messageEvent.data === "hello") {
      // Post a message back to the main JS
      self.postMessage("Hello to you too !");
    }
  
    if (messageEvent.data === "recurring") {
      for (let i = 0; i < 10; i++) {
        setTimeout(() => self.postMessage(new Date()), i * 1000);
      }
    }
});

import {MDCList} from "@material/list";
const list = MDCList.attachTo(document.querySelector('.mdc-list'));
list.wrapFocus = true;

const listEl = document.querySelector('.mdc-drawer .mdc-list');
const mainContentEl = document.querySelector('.main-content');

listEl.addEventListener('click', (event) => {
  drawer.open = true;
});

document.body.addEventListener('MDCDrawer:closed', () => {
  mainContentEl.querySelector('input, button').focus();
});