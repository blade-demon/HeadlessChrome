var nodejieba = require("nodejieba");
nodejieba.load();
var result = nodejieba.cut("南京市长江大桥");
console.log(result);
//["南京市","长江大桥"]