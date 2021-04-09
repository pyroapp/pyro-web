module.exports = {
  path: "/channels/:guildId/",
  method: "get",

  async execute(req, res, web) {
    res.status(200).sendFile(web + '/views/app.html');
  }
};
