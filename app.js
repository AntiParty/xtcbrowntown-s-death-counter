const countElement = document.querySelector('#count');

const client = new tmi.Client({
    channels: ['xtcbrowntown', 'antiparty']
});

client.connect();

let count = 0;
let listeningForCount = false;

const users = {};


client.on('message', (channel, tags, message, self) => {
    
    const { username } = tags;

    if (username === 'antiparty' || username === 'xtcbrowntown' &&  message === '!start-count') {
        listeningForCount = true;
    } if (message === '!clear-count'){
        countElement.textContent = 'Waiting for count...';
    } if (message === '!stop-count') {
        listeningForCount = false;
    } if (message === 'end-count') {
        listeningForCount = false;
        count = 0;
    } else if (listeningForCount && message === '!death') {
        count++;
        console.log(count);
        countElement.textContent = 'Boomer has died: ' + count + ' times so far.';
    }
});