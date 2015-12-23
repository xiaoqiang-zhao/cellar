var b = require('./b');
var text = 'hello ' + b.text + '~_~';

document.getElementsByTagName('body')[0].innerHTML = text;

module.exports = {
    text: text
};