import React from "react";

const NewsList = ({activeItem,articles,result,term}) => {

  return (
    <div className="ui grid container">
    <div className="row">
        <div className="eight wide column">
        <h3 className="ui dividing header" data-testid="category">{activeItem.toUpperCase()}</h3>
        {articles.map((article) => {
            return (    
            <div className="ui card">
              <div className="image">
                <img src={article.urlToImage} alt="news"/>
              </div>
              <div className="content">
                <a href={article.url} class="header">{article.title}</a>
                <div className="meta">
                  <span className="date">{article.publishedAt }</span>
                </div>
                <div className="description">
                 {article.description}
                </div>
              </div>

            </div>

          );
        })}
          
        </div>
        <div className="six wide column">

        <div className="card">
        <div className="ui comments">
       
        <h3 className="ui dividing header">Search result of {term.toUpperCase()}</h3> 
          {result.length > 0 ?
             result.map((article) => {
              return (
                <div className="comment" key={article.source.title}>
                
                  <div className="content">
                    <div className="author">{article.title}</div>
                    <div className="text">{article.description}</div>
                    
                  </div>
                </div>
              );
            }): null
          }
           
        </div>
      </div>

    </div>
     
    </div>
  </div>
  
  );
};

export default NewsList;
