var scraperjs = require("scraperjs");
scraperjs.StaticScraper.create("http://78.73.30.113/mha/knark/knark.html")
  .scrape(function ($) {
    return $(".title a")
      .map(function () {
        return $(this).text();
      })
      .get();
  })
  .then(function (news) {
    console.log(news);
  });
