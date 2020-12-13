'use strict'

function titleClickHandler(){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
}
    /* [DONE] add class 'active' to the clicked link */
    
    console.log('clickedElement:', clickedElement);    
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('Href:', articleSelector);    
    
    
    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);
    
    /* [IN PROGRESS] add class 'active' to the correct article */

    console.log('targetArticle:', targetArticle);    
    targetArticle.classList.add('active');
  }
  
  

const optArticleSelector ='.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */

  console.log('optTitleListSelector = ', optTitleListSelector);
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList = ', titleList);
  titleList.innerHTML = '';

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles = ', articles);
  for(let article of articles){
      article.querySelector(optArticleSelector);
      console.log('article = ', article);
  
     
    
    /* get the article id */

    const articleId = article.getAttribute('id');
    console.log('articleId = ', articleId);

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log('articleTitle = ', articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId +'"><span>' + articleTitle + '</span></a></li>';
    console.log('linkHTML = ', linkHTML);

    /* insert link into titleList */

    /*titleList.insertAdjacentHTML('afterend', linkHTML);
    console.log('titleList = ', titleList);*/
    
    html = html + linkHTML;
    console.log('html = ', titleList);

    
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
    console.log('links = ', links);
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();