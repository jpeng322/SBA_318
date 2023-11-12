const fs = require("fs");

function updateFile(path, file) {
  fs.writeFileSync(path, "module.exports = " + JSON.stringify(file));
}
  

module.exports = {
    updateFile,
};
