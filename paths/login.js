module.exports = {
  path: "/login",
  method: "get",

  async execute(req, res, web) {
    res.status(200).sendFile(web + '/views/login.html');
  }
};
