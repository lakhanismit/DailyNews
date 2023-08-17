import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    constructor() {
        super()
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1
        }
    }

    async componentDidMount() {
        let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0bc7a1e62eb84f05a1161d475704ba5e&page=1&pageSize=35";
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults, 
        })
    }

    handlePrevBtn = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0bc7a1e62eb84f05a1161d475704ba5e&page=${this.state.page - 1}&pageSize=35`;
        let data = await fetch(url)
        let parseData = await data.json()
        this.setState({
            page: this.state.page - 1,
            articles: parseData.articles,
        })
    }
    handleNextBtn = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 35)) {
            
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=0bc7a1e62eb84f05a1161d475704ba5e&page=${this.state.page + 1}&pageSize=35`;
            let data = await fetch(url)
            let parseData = await data.json()
            this.setState({
                page: this.state.page + 1,
                articles: parseData.articles,
            })
        }
    }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center mb-3'>Today's Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((i) => {
                        return <div className="col-md-4" key={i.url}>
                            <NewsItem title={i.title ? i.title.slice(0, 35) : ""} description={i.description ? i.description.slice(0, 80) : ""} imgUrl={i.urlToImage} newsUrl={i.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevBtn} className="btn btn-sm btn-outline-primary">&laquo; Previous</button>
                    <button type="button" onClick={this.handleNextBtn} className="btn btn-sm btn-outline-primary">Next &raquo;</button>
                </div>
            </div>
        )
    }
}

export default News