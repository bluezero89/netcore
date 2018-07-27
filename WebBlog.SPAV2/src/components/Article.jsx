import * as React from 'react';
import { BaseUrl } from './../base.url'
import { apiGetArticleById, apiCreateComment, apiGetCommentsByArticleById } from '../apiService';
import { SocialNetworkShare } from './SocialNetworkShare'

export class Article extends React.Component {
	constructor(props) {
		super(props);

		const retrievedUserProfile = localStorage.getItem('userProfile');

		this.state = {
			article: undefined,
			commentText: '',
			userProfile: retrievedUserProfile ? JSON.parse(retrievedUserProfile) : undefined,
			comments: []
		}
	}

	loadArticle = (articleId) => {
		apiGetArticleById(articleId, (response) => {
			if (response.target.status == 200) {
				let data = JSON.parse(response.target.responseText);
				this.setState({ article: data })
			}
		},
			(errors) => {
				this.setState({ article: undefined });
			})
	}

	componentWillMount() {
		const articleId = this.props.match.params.articleId ? this.props.match.params.articleId : 0;
		this.loadArticle(Number(articleId));
		this.loadComments(Number(articleId));
	}

	decodeHtml = (html) => {
		var txt = document.createElement("textarea");
		txt.innerHTML = html;
		return txt.value;
	}

	handleTextChange = (event) => {
		this.setState({ commentText: event.target.value });
	}

	createComment = (e) => {
		e.preventDefault();

		let comment = {
			"createdBy": this.state.userProfile ? this.state.userProfile.email : '',
			"content": this.state.commentText,
			"parentId": -1,
			"createdDate": Date.now,
			"isDeleted": false,
			"isApproved": false,
			"articleId": this.state.article.articleId
		};

		apiCreateComment(comment, (response) => {
			if (response.target.status == 200) {
				let data = JSON.parse(response.target.responseText);
				if (data.success) {
					this.setState({ commentText: '' });
					this.loadComments(this.state.article.articleId);
				}
			}

		},
			(errors) => {

			})
	}


	loadComments = (articleId) => {
		apiGetCommentsByArticleById(articleId, (response) => {
			if (response.target.status == 200) {
				let data = JSON.parse(response.target.responseText);
				this.setState({ comments: data })
			}
		},
			(errors) => {
				this.setState({ comments: undefined });
			})
	}

	render() {
		let shareUrl = BaseUrl.ARTICLE_URL + "/" + this.props.match.params.articleId ? this.props.match.params.articleId : 0;
		let mediaFile = this.state.article?this.state.article.image:'';
		let title = this.state.article?this.state.article.Title:'WebBlog'
		return (
			<div>

				<h1 className="mt-4">{this.state.article ? this.state.article.title : ''}</h1>

				<p className="lead">
					<span>	by <a href="#">{this.state.article ? this.state.article.createdBy : ''}</a>
					</span>
				</p>
				<hr />

				<p>Posted on {this.state.article ? this.state.article.createdDate : ''}</p>

				<hr />
				
				<div className="row">
					<div className="col-xs-12 text-right">
						<SocialNetworkShare mediaFile={mediaFile} title={title} />
					</div>
				</div>

				<hr />
				<div dangerouslySetInnerHTML={{ __html: this.state.article ? this.state.article.fullContent : '' }} />
				<hr />
				{
					(() => {
						if (this.state.userProfile) {
							return (
								<div className="card my-4">
									<h5 className="card-header">Leave a Comment:</h5>
									<div className="card-body">
										<form>
											<div className="form-group">
												{/* <textarea className="form-control"></textarea> */}
												<textarea rows={5}
													value={this.state.commentText ? this.state.commentText : ""}
													onChange={evt => this.handleTextChange(evt)}
													className="form-control" placeholder="Push your comment..."></textarea>
											</div>
											<button type="button" className="btn btn-primary" onClick={(e) => this.createComment(e)}>Submit</button>
										</form>
									</div>
								</div>
							)
						}

					})()
				}

				{
					this.state.comments && this.state.comments.map((comment, index) => {
						// return <Comment comment={comment} key={index} />;
						return (
							<div className="media mb-4" key={index}>
								<img className="d-flex mr-3 rounded-circle user-avatar" src="/images/unknown-user.png" alt="" />
								<div className="media-body">
									<h5 className="mt-0">{comment.createdBy ? comment.createdBy : ''}</h5>
									{comment.content ? comment.content : ''}
								</div>
							</div>
						)
					})
				}

				{/* <div className="media mb-4">
					<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
					<div className="media-body">
						<h5 className="mt-0">Commenter Name</h5>
						Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.

                    <div className="media mt-4">
							<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
							<div className="media-body">
								<h5 className="mt-0">Commenter Name</h5>
								Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                      </div>
						</div>

						<div className="media mt-4">
							<img className="d-flex mr-3 rounded-circle" src="http://placehold.it/50x50" alt="" />
							<div className="media-body">
								<h5 className="mt-0">Commenter Name</h5>
								Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                      </div>
						</div>

					</div>
				</div> */}
			</div>
		)
	}
}