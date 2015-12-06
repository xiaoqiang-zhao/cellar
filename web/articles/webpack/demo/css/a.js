var b = require('./css.css');
var text = '<div>hello world.</div>';

document.getElementsByTagName('body')[0].innerHTML = text;

exports.model = {
    text: text
};