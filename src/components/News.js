import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

// IF NOT WORK THEN CHANGE THE URL 

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (i) => {
        return i.charAt(0).toUpperCase() + i.slice(1)
    }

    const updateNews = async () => {
        try {
            props.setProgress(10)
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
            setLoading(true)
            props.setProgress(40)
            let data = await fetch(url)
            props.setProgress(70)
            let parsedData = await data.json()
            setArticles(parsedData.articles)
            setTotalResults(parsedData.totalResults)
            setLoading(false)
            props.setProgress(100)
        } catch (error) {
            console.error.message('Error fetching data:', error)
        }
    }
    
    useEffect(() => {
        document.title = `Daily News - ${capitalizeFirstLetter(props.category)} - ${props.country.toUpperCase()}`;
        updateNews() // eslint-disable-line
    }, [])


    // const handlePrevBtn = async () => {
    //     setPage(page - 1)
    //     updateNews()
    // }
    // const handleNextBtn = async () => {
    //     setPage(page + 1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`
        setPage(page + 1)
        setLoading(true)
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    return (
        <div className='container my-3'>
            <h1 className='text-center my-4'>Today's Top {capitalizeFirstLetter(props.category)} Headlines</h1>

            {/* PERVIOUS AND NEXT BUTTON CODE */}

            {/* {loading && <Spinner />}
            <div className="row">
                {!loading && articles.map((i) => {
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
                <button disabled={page <= 1} type="button" onClick={handlePrevBtn} className="btn btn-sm btn-outline-primary">&laquo; Previous</button>
                <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" onClick={handleNextBtn} className="btn btn-sm btn-outline-primary">Next &raquo;</button>
            </div> */}

            {/* INFINITE SCROLL CODE */}

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((i) => {
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
            </InfiniteScroll>

        </div>
    )
}

News.propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string,
}
News.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 9
}

export default News