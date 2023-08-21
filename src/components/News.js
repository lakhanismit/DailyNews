import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from "react-infinite-scroll-component";

// IF NOT WORK THEN CHANGE THE URL 

export class News extends Component {
    static propTypes = {
        country: PropTypes.string.isRequired,
        pageSize: PropTypes.number.isRequired,
        category: PropTypes.string,
    }
    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 9
    }
    capitalizeFirstLetter = (i) => {
        return i.charAt(0).toUpperCase() + i.slice(1)
    }
    constructor(props) {
        super(props)
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        }
        document.title = `Daily News - ${this.capitalizeFirstLetter(this.props.category)} - ${this.props.country.toUpperCase()}`;
    }
    async updateNews() {
        try {
            this.props.setProgress(10)
            const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ee646faa0dd46b4a360d20e117dedc4&page=${this.state.page}&pageSize=${this.props.pageSize}`
            this.setState({ loading: true });
            this.props.setProgress(40)
            let data = await fetch(url)
            this.props.setProgress(70)
            let parsedData = await data.json()
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
            this.props.setProgress(100)
        } catch (error) {
            console.error.message('Error fetching data:', error)
        }
    }


    async componentDidMount() {
        this.updateNews()
        // try {
        //     let url = `///?????///`
        //     this.setState({ loading: true });
        //     let data = await fetch(url)
        //     let parsedData = await data.json()
        //     this.setState({
        //         articles: parsedData.articles,
        //         totalResults: parsedData.totalResults,
        //         loading: false
        //     })
        // } catch (error) {
        //     console.error.message('Error fetching data:', error)
        // }
    }

    handlePrevBtn = async () => {
        // let url = `///?????///`
        // this.setState({ loading: true });
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page - 1 })
        this.updateNews()
    }
    handleNextBtn = async () => {
        // let url = `///?????///`
        // this.setState({ loading: true });
        // let data = await fetch(url)
        // let parsedData = await data.json()
        // this.setState({
        //     page: this.state.page + 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })
        this.setState({ page: this.state.page + 1 })
        this.updateNews()
    }

    // fetchMoreData = async () => {
    //     this.setState({ page: this.state.page + 1 })

    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7ee646faa0dd46b4a360d20e117dedc4&page=${this.state.page}&pageSize=${this.props.pageSize}`
    //     this.setState({ loading: true });
    //     let data = await fetch(url)
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles: this.state.articles.concat(parsedData.articles),
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     })
    // }

    render() {
        return (
            <div className='container my-3'>
                <h1 className='text-center my-4'>Today's Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}

                {/* PERVIOUS AND NEXT BUTTON CODE */}
                
                <div className="row">
                    {!this.state.loading && this.state.articles.map((i) => {
                        return <div className="col-md-4" key={i.url}>
                            <NewsItem
                                title={i.title ? i.title.slice(0, 35) : ""}
                                description={i.description ? i.description.slice(0, 80) : ""}
                                imgUrl={i.urlToImage}
                                newsUrl={i.url}
                                author={i.author ? i.author : 'Unknown'}
                                date={i.publishedAt ? i.publishedAt : 'Unknown'}
                                source={i.source ? i.source.name : 'Unknown'}
                            />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" onClick={this.handlePrevBtn} className="btn btn-sm btn-outline-primary">&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextBtn} className="btn btn-sm btn-outline-primary">Next &raquo;</button>
                </div>

                {/* INFINITE SCROLL CODE */}

                {/* <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={!this.state.articles.length && <Spinner />}    
                >
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((i) => {
                                return <div className="col-md-4" key={i.url}>
                                    <NewsItem
                                        title={i.title ? i.title.slice(0, 35) : ""}
                                        description={i.description ? i.description.slice(0, 80) : ""}
                                        imgUrl={i.urlToImage}
                                        newsUrl={i.url}
                                        author={i.author ? i.author : 'Unknown'}
                                        date={i.publishedAt ? i.publishedAt : 'Unknown'}
                                        source={i.source ? i.source.name : 'Unknown'}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll> */}

            </div>
        )
    }
}

export default News