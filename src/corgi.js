module.exports = (robot) => {
  robot.respond(/hello/, (res) => {
    return res.reply("hello!");
  });

  robot.hear(/orly/, (res) => {
    return res.send("yarly");
  });
};
