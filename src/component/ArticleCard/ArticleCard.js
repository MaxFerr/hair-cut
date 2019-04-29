import React from 'react';
import Article from '../Article/Article.js'

const ArticleCard=({articles,onClickArticle,isAdmIn})=>{
	const ArticleLoop=articles.map((article,i)=>{
		return (
			<Article
			key={i}
			title={article.title}
			secondtitle={article.secondtitle}
			image={article.image}
			text={article.text}
			added={article.added}
			favorite={article.favorite}
			onClickArticle={onClickArticle}
			id={article.m_article_id}
			isAdmIn={isAdmIn}
			/>
			)
	})
	
	return (
		<div>
		{ArticleLoop}
		</div>
		)
	
}

export default ArticleCard;