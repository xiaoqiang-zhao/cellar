require('./css-1.css');
require('./css-2.css');
var text = '<div>hello world.</div>';
document.getElementsByTagName('body')[0].innerHTML = text;

exports.model = {
    text: text
};