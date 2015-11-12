(function(define){
  define(function(require){
    return "umd2";
  });
})(
typeof define === 'function' && define.amd ? define.bind(null, "umd2") : function (factory) { module.exports = factory(require); }
)