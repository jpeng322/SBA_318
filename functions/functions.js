const fs = require("fs");

function updateFile(path, file) {
    console.log("file updated", path, file)
  fs.writeFileSync(path, "module.exports = " + JSON.stringify(file));
}
  

module.exports = {
    updateFile,
};
