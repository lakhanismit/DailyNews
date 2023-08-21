import React from 'react'

const NewsItem = (props) => {
    let { title, description, imgUrl, newsUrl, author, date, source } = props
    return (
        <>
            <div className="card mb-3">
                <div className='d-flex justify-content-flex-end position-absolute' style={{ left: 10 }}>
                    <span className="badge rounded-pill bg-danger mt-2">{source}</span>
                </div>
                <img src={!imgUrl ? 'https://images.wsj.net/im-834253/social' : imgUrl} style={{ height: "200px" }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text mt-2 text-danger fw-bold">By {author} on {new Date(date).toGMTString()} </p>
                    <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-danger">Read More</a>
                </div>
            </div>
        </>
    )
}

export default NewsItem