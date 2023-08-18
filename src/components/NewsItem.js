import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl, author, date, source } = this.props
        return (
            <>
                <div className="card mb-3">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'20%'}}>{source}</span>
                    <img src={!imgUrl ? 'https://images.wsj.net/im-834253/social' : imgUrl} style={{ height: "200px" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text mt-2"><small className="text-body-secondary">By {author} on {new Date(date).toGMTString()} </small></p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem