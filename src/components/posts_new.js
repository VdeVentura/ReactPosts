import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';

import { createPost } from '../actions/index';

class PostsNew  extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	dangerInput(formGroup) {
		const hasDanger = ( (formGroup.touched && formGroup.invalid) ?' has-danger':'');
		return ('form-group' + hasDanger);
	}

	onSubmit(props) {
		this.props.createPost(props)
			.then(()=> {
				//blog post has been created, navigate the user to the index
				this.context.router.push('/');
			});
	}

	render() {

		const { fields: {title, categories, content },handleSubmit } = this.props;

		return (
			<form onSubmit = { handleSubmit((props)=> this.onSubmit(props)) }>
				<h3>Create A New Post</h3>

				<div className={this.dangerInput(title)}>
					<label>Title</label>
					<input type="text" className="form-control" {...title}/>
					<div className="text-help">{title.touched ? title.error : ''}</div>
				</div>

				<div className={this.dangerInput(categories)}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories}/>
					<div className="text-help">{categories.touched ? categories.error : ''}</div>

				</div>

				<div className={this.dangerInput(content)}>
					<label>Content</label>
					<textarea type="text" className="form-control" {...content}/>
					<div className="text-help">{content.touched ? content.error : ''}</div>

				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		);
	}
}

function validate(values) {
	const errors = {};

	if (!values.title) {
		errors.title = 'Enter a title';
	}

	if (!values.categories) {
		errors.categories = 'Enter at least one category';
	}

	if (!values.content) {
		errors.content = 'provide a content';
	}
	else {
		if (values.content.length < 50) {
			errors.content = 'content should be at least 50 characters';
		}
	}
	return errors;
}


// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
		form: 'PostsNewForm',
		fields: ['title','categories','content'],
		validate
	}, null, { createPost })(PostsNew);
