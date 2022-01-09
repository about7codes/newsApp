import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/Feed.module.css';
import { Toolbar } from '../../components/toolbar';

const Feed = ({ pageNum, articles}) => {
    const router = useRouter();
    console.log(articles);
    return (
        <div className="page-container">
            <Toolbar />
            <div className={styles.main}>
            {articles.map((article, index) => (
                <div key={index} className={styles.post}>
                <h1 onClick={() => (window.location.href = article.url)}>{article.title}</h1>
                <p>{article.description}</p>
                {!!article.urlToImage && <img src={article.urlToImage} />}
                </div>
            ))}
            </div>
            <div className={styles.paginator}>
                <div
                    className={pageNum === 1 ? styles.disabled : styles.active}
                    onClick={() => {
                    if (pageNum > 1) {
                        router.push(`/feed/${pageNum - 1}`).then(() => window.scrollTo(0, 0));
                    }
                    }}
                >
                    Previous Page
                </div>

                <div>#{pageNum}</div>

                <div
                    className={pageNum === 5 ? styles.disabled : styles.active}
                    onClick={() => {
                    if (pageNum < 5) {
                        router.push(`/feed/${pageNum + 1}`).then(() => window.scrollTo(0, 0));
                    }
                    }}
                >
                    Next Page
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (pageContext) => {
    const pageNum = pageContext.query.pageId;

    if(!pageNum || pageNum < 1 || pageNum > 5) {
        return {
            props: {
                articles: [],
                pageNum: 1,
            }
        }
    }

    const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NEWS_API_KEY}`,
          },
        },
    );
    const data = await res.json();
    const { articles } = data;

    return {
        props: {
            articles,
            pageNum: Number.parseInt(pageNum),
        }
    }
}


export default Feed;
