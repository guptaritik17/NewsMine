import React, { useEffect, useState } from 'react';
import NewsItem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = ({ country = 'in', pageSize = 8, category = 'general', apiKey, setProgress, searchQuery }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [bookmarkedArticles, setBookmarkedArticles] = useState(() => {
        const savedBookmarks = localStorage.getItem('bookmarkedArticles');
        return savedBookmarks ? JSON.parse(savedBookmarks) : [];
    });
    const [showBookmarks, setShowBookmarks] = useState(false);

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        setProgress(30);
        let parsedData = await data.json();
        setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setProgress(100);
    };

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(category)} - NewsMine`;
        updateNews();
        // eslint-disable-next-line
    }, [category, country, apiKey, pageSize]);

    const fetchMoreData = async () => {
        const nextPage = page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setPage(nextPage);
        setArticles([...articles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults);
    };

    const handleBookmark = (article) => {
        setBookmarkedArticles((prev) => {
            const isBookmarked = prev.some((item) => item.url === article.url);
            const updatedBookmarks = isBookmarked
                ? prev.filter((item) => item.url !== article.url)
                : [...prev, article];
            localStorage.setItem('bookmarkedArticles', JSON.stringify(updatedBookmarks));
            return updatedBookmarks;
        });
    };

    const toggleShowBookmarks = () => {
        setShowBookmarks(!showBookmarks);
    };

    const filteredArticles = articles.filter((article) => {
        const title = article.title ? article.title.toLowerCase() : '';
        const description = article.description ? article.description.toLowerCase() : '';
        return !searchQuery || title.includes(searchQuery.toLowerCase()) || description.includes(searchQuery.toLowerCase());
    });

    return (
        <>
            <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>
                NewsMine - Top {capitalizeFirstLetter(category)} Headlines
            </h1>
            <div className="text-center mb-3 fixed-bottom">
                <button className="btn btn-dark" onClick={toggleShowBookmarks}>
                    {showBookmarks ? 'View News Feed' : 'View Bookmarks'}
                </button>
            </div>
            {loading && <Spinner />}
            {!showBookmarks ? (
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {filteredArticles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title ? element.title : ''}
                                        description={element.description ? element.description : ''}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source ? element.source.name : ''}
                                        onBookmark={() => handleBookmark(element)}
                                        isBookmarked={bookmarkedArticles.some((item) => item.url === element.url)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </InfiniteScroll>
            ) : (
                <div className="container">
                    <h2 className="text-center">
                        {bookmarkedArticles.length > 0 ? 'Bookmarked Articles' : 'No Bookmarked Articles Found'}
                    </h2>
                    {bookmarkedArticles.length > 0 && (
                        <div className="row">
                            {bookmarkedArticles.map((article) => (
                                <div className="col-md-4" key={article.url}>
                                    <NewsItem
                                        title={article.title}
                                        description={article.description}
                                        imageUrl={article.urlToImage}
                                        newsUrl={article.url}
                                        author={article.author}
                                        date={article.publishedAt}
                                        source={article.source ? article.source.name : ''}
                                        onBookmark={() => handleBookmark(article)}
                                        isBookmarked={true}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired,
    setProgress: PropTypes.func.isRequired,
    searchQuery: PropTypes.string,
};

export default News;
