module.exports = {
  path: "/",
  method: "get",

  async execute(req, res, web) {
    res.status(200).sendFile(web + '/views/landing.html');
  }
};
