define("test", ['add'], function(add){
  return function(a){
    return add(a, 2);
  };
});