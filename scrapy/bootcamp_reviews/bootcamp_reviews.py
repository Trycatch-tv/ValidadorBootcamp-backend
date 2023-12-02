from scrapy import Request, Spider


# Para ejecutar el spider desde la terminal: scrapy crawl bootcamp_reviews -o output.json
class BootcampReviewsSpider(Spider):
    name = "bootcamp_reviews"
    start_urls = [
        "https://www.rottentomatoes.com/m/ghostbusters/reviews?type=user",
    ]

    def parse(self, response):
        for comment in response.css(".audience-review-row"):
            yield {
                "author": comment.css(".audience-reviews__name::text").get(),
                # "rating": comment.css(".Stars::text").get(),
                "comment": comment.css(".audience-reviews__review.js-review-text::text").get(),
            }


if __name__ == "__main__":
    from scrapy.crawler import CrawlerProcess

    process = CrawlerProcess()
    process.crawl(BootcampReviewsSpider)
    process.start()
