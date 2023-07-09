import React, { useEffect, useState } from "react";
import Carousel from "react-grid-carousel";
import axios from "axios";
import "../css/modules/News.css";

const News = ({ data }) => {
  const [newsData, setNewsData] = useState([]);

  const fetchNews = async () => {
    // check if news data exists in local storage
    const cachedNewsData = localStorage.getItem(`newsData_${data.name}`);
    if (cachedNewsData) {
      console.log(`news data for ${data.name} loading from local storage`);
      return JSON.parse(cachedNewsData);
    } else {
      // if not, fetch it from API
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${data.name}%20AND%20weather&sortBy=relevancy,publishedDate&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      const articles = response.data.articles;
      // save news data to local storage
      localStorage.setItem(`newsData_${data.name}`, JSON.stringify(articles));
      return articles;
    }
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
