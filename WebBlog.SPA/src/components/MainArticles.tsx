import * as React from 'react'
import { ArticleSummary } from './ArticleSummary';
import { apiGetArticles, apiGetArticlesPaging } from '../apiService';
import { ArticleModel } from '../models/article.model';

interface IMainArticlesProps {
}

interface IMainArticlesState {
    articles: any;
    pageIndex: number;
}

export class MainArticles extends React.Component<IMainArticlesProps, IMainArticlesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            articles: [],
            pageIndex: 1
        }
    }

    loadArticles = (page: number) => {
        apiGetArticlesPaging(page, (response: any) => {
            if (response.target.status == 200) {
                let data = JSON.parse(response.target.responseText);
                this.setState({ articles: data })
            }
        },
            (errors: any) => {
                this.setState({ articles: [] });
            })
    }

    componentWillMount() {
        this.loadArticles(1);
    }

    loadOlder = (e: any) => {
        e.preventDefault();
        let newState = { ...this.state };
        let pageIndex = newState.pageIndex + 1;        
        
        this.loadArticles(pageIndex);
        this.setState(newState)
    }

    loadNewer = (e: any) => {
        e.preventDefault();
        let newState = { ...this.state };
        let pageIndex = newState.pageIndex > 1 ? newState.pageIndex - 1 : 1;

        this.loadArticles(pageIndex);
        this.setState(newState)
    }

    render() {
        return (
            <div>
                <h1 className="my-4">Information technologies
                </h1>

                {this.state.articles && this.state.articles.map((article: any, i: number) => {
                    return (
                        <div key={i}>
                            <ArticleSummary article={article} key={article.articleId} />
                        </div>
                    )
                })}

                <ul className="pagination justify-content-center mb-4">
                    <li className="page-item">
                        <a className="page-link" onClick={(e: any) => { this.loadOlder(e) }}>&larr; Older</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" onClick={(e: any) => { this.loadNewer(e) }}>Newer &rarr;</a>
                    </li>
                </ul>
            </div>
        )
    }
}