var
  fs = require('fs'),
  path = require('path');

module.exports = (robot, scripts) => {
  scriptsPath = path.resolve(__dirname, 'src')
  if (fs.existsSync(scriptsPath)) {
    fs.readdirSync(scriptsPath).sort().forEach(script => {
      if (scripts == null || (!scripts.include('*') || scripts.includes(script))) {
        robot.loadFile(scriptsPath, script);
      }
    });
  }
};


