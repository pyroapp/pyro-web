module.exports = {
  path: "/signup",
  method: "get",

  async execute(req, res, web) {
    res.status(200).sendFile(web + '/views/signup.html');
  }
};
