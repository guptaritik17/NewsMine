import React from 'react';

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source, onBookmark, isBookmarked }) => {
    return (
        <div className="my-3 position-relative">
            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0', bottom: '0', zIndex: '1', padding: '5px' }}>
                    <button className="btn btn-outline-secondary" onClick={onBookmark}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={isBookmarked ? 'currentColor' : 'none'} stroke={isBookmarked ? 'none' : 'currentColor'} className="bi bi-bookmark" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14l-5-3-5 3V1zm4.5 4a.5.5 0 0 0-.5.5v2.634l-1.618-1.054a.5.5 0 1 0-.5.866l2.118 1.382a.5.5 0 0 0 .618 0l2.118-1.382a.5.5 0 1 0-.5-.866L6 8.134V5.5a.5.5 0 0 0-.5-.5z" />
                        </svg>
                    </button>
                </div>
                <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}  </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-primary">Read More</a>
                </div>
            </div>
        </div>
    );
};

export default NewsItem;
