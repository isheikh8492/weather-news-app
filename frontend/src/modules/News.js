import React, { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import axios from "axios";
import "../css/modules/News.css";

const News = () => {
  const [newsData, setNewsData] = useState([]);

  const fetchNews = async () => {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=chicago%20AND%20weather&sortBy=relevancy,publishedDate&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
    );
    return response.data.articles;
  };

  useEffect(() => {
    fetchNews().then((articles) => {
      setNewsData(articles.slice(0, 30)); // Fetch first 12 articles
    });
  }, []);

  return (
    <div className="news-container">
      <Carousel className="carousel" cols={2} rows={3} loop showDots={true}>
        {newsData.map((article, index) => (
          <Carousel.Item className="carousel-item" key={index}>
            <div className="carousel-item2">
              <div className="carousel-img">
                <img src={article.urlToImage} alt={article.title} />
              </div>
              <div className="news-vertical-line" />
              <div className="carousel-content">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-source">{article.source.name}</p>
                <p className="article-description">{article.description}</p>
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default News;
