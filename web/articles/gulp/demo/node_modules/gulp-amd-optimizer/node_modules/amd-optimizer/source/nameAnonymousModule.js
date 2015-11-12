var B = require('recast').types.builders;
var path = require('path');

module.exports = function(defineCall, filename){
  if(defineCall.type === 'CallExpression'){
    if(defineCall.arguments[0].type == 'Literal'){
      return defineCall.arguments[0].value
    }else{
      if(defineCall.callee.name == 'define'){
        defineCall.arguments.unshift(B.literal(filename));
      }
      return filename;
    }
  }else if(defineCall.type === 'Identifier' && defineCall.parent.type === 'ConditionalExpression'){
    defineCall.parent['consequent'] = B.callExpression(
      B.memberExpression(
        B.identifier('define'),
        B.identifier('bind'),
        false
      ),
      [
        B.literal(null),
        B.literal(filename)
      ]
    )
    return filename;
  }
};