import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
        let { title, description, imgUrl, newsUrl } = this.props
        return (
            <>
                <div className="card mb-3" style={{ width: "18rem" }}>
                    <img src={!imgUrl ? 'https://images.wsj.net/im-834253/social' : imgUrl} style={{ height: "180px" }} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <a href={newsUrl} target='_blank' className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </>
        )
    }
}

export default NewsItem