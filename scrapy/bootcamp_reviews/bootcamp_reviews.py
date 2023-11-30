import scrapy

class BootcampReviewsSpider(scrapy.Spider):
    name = "bootcamp_reviews"

    def start_requests(self):
        url = self.settings.get("TARGET_URL")
        yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        for review in response.css(".review"):
            item = BootcampReviewItem()

            item["author"] = review.css(".author::text").get()
            item["date"] = review.css(".date::text").get()
            item["rating"] = review.css(".rating::text").get()
            item["review"] = review.css(".review-text::text").get()

            yield item

class BootcampReviewItem(scrapy.Item):
    author = scrapy.Field()
    date = scrapy.Field()
    rating = scrapy.Field()
    review = scrapy.Field()