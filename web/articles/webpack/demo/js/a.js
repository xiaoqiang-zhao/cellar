var b = require('./b');
var text = 'hello ' + b.text + '~_~';

document.getElementsByTagName('body')[0].innerHTML = text;

exports.model = {
    text: text
};