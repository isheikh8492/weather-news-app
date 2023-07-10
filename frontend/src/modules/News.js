import React, { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import axios from "axios";
import "../css/modules/News.css";
import { getNewsDate } from "../utils/Functions";

const News = ({ data }) => {
  const [newsData, setNewsData] = useState([]);

  const fetchNews = async () => {
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'yyyy-mm-dd' format
    // check if news data exists in local storage
    const cachedNewsData = localStorage.getItem(`newsData_${data.name}`);

    if (cachedNewsData) {
      const { date, articles } = JSON.parse(cachedNewsData);
      // Check if the date stored in local storage matches the current date
      if (date === currentDate) {
        console.log(`news data for ${data.name} loading from local storage`);
        return articles;
      }
    }

    // Fetch news data from API if it doesn't exist in local storage or is outdated
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${data.name}%20AND%20weather&sortBy=publishedDate&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );

    const articles = response.data.articles;
    // save news data to local storage with the current date
    localStorage.setItem(
      `newsData_${data.name}`,
      JSON.stringify({ date: currentDate, articles })
    );

    return articles;
  };

  useEffect(() => {
    fetchNews().then((articles) => {
      setNewsData(articles.slice(0, 30)); // Fetch first 30 articles
    });
  }, [data]); // <---- put data here

  return (
    <div className="news-container">
      <Carousel className="carousel" cols={2} rows={3} loop showDots={true}>
        {newsData.map((article, index) => (
          <Carousel.Item className="carousel-item" key={index}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="article-link"
            >
              <div className="carousel-item2">
                <div className="carousel-img">
                  <img src={article.urlToImage} alt={article.title} />
                </div>
                <div className="news-vertical-line" />
                <div className="carousel-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-source">{article.source.name}</p>
                  <p className="article-description">
                    {article.description.length > 100
                      ? article.description.substring(0, 170) + "..."
                      : article.description}
                  </p>

                  <p className="article-published">
                    {getNewsDate(article.publishedAt)}
                  </p>
                </div>
              </div>
            </a>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default News;
