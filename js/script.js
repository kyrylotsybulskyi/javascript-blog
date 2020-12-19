'use strict';

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
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = ''){
  
  /* remove contents of titleList */

  console.log('optTitleListSelector = ', optTitleListSelector);
  const titleList = document.querySelector(optTitleListSelector);
  console.log('titleList = ', titleList);
  titleList.innerHTML = '';

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('customSelector = ', customSelector);
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


function generateTags(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles = ', articles);

  /* START LOOP: for every article: */

  for(let article of articles){
    article.querySelector(optArticleSelector);
    console.log('article = ', article);

    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log('tagsList = ', tagsList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray: ', articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log('tag: ',tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag+'">' + tag + '</a></li>';
      console.log('linkHTML = ', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML + ' ';
      console.log('html = ', html);

    /* END LOOP: for each tag */

    }

    /* insert HTML of all the links into the tags wrapper */

    tagsList.innerHTML = html;
    //const links = article.querySelectorAll(optArticleTagsSelector);
    console.log('tagsList = ', tagsList);
    
    
    
  /* END LOOP: for every article: */
  }
  //console.log('links = ', links);
}

generateTags();

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Link was clicked!!!');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('Href:', href);    

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  console.log('tag:', tag);

  /* find all tag links with class active */

  const tagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('tagsLinks = ', tagsLinks);

  /* START LOOP: for each active tag link */

  for(let tagLink of tagsLinks) {
  
    /* remove class active */

    tagLink.classList.remove('active');
    console.log('tagLink = ', tagLink);

  /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const activeLinks = clickedElement.querySelectorAll('a[href^="#tag-' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let tagLink of activeLinks) {

    /* add class active */
    
    tagLink.classList.add('active');

  /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');
  //console.log('clickedElement = ', clickedElement);
  console.log('tagsLinks = ', tagsLinks);
    
  /* START LOOP: for each link */

  for(let tagLink of tagsLinks){

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */

  }
}

const optArticleAuthorSelector = '.post-author';

addClickListenersToTags();

function generateAuthors(){
  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles = ', articles);

  /* START LOOP: for every article: */

  for(let article of articles){
    article.querySelector(optArticleSelector);
    console.log('article = ', article);

    /* find authors wrapper */

    const authorList = article.querySelector(optArticleAuthorSelector);
    console.log('authorList = ', authorList);

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor: ', articleAuthor);

    /* generate HTML of the link */

    const linkHTML = '<li><a href="' + articleAuthor+'">' + articleAuthor + '</a></li>';

    //console.log('linkHTML = ', linkHTML);
    
    /* add generated code to html variable */
    
    html = html + linkHTML + ' ';
    console.log('html = ', html);
    
    /* insert HTML of all the links into the author wrapper */

    

    authorList.innerHTML = html;    
    //const links = article.querySelectorAll(optArticleTagsSelector);
    console.log('authorList = ', authorList);
        
  /* END LOOP: for every article: */
  }
  //console.log('links = ', links);
}

generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  console.log('Link was clicked!!!');
  console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log('Href:', href);    

  /* make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('', '');
  console.log('author:', author);

  /* find all author links with class active */

  const authorLinks = document.querySelectorAll('a.active[href^="by "]');
  console.log('authorLinks = ', authorLinks);
  
  /* find all author links with "href" attribute equal to the "href" constant */

  const activeLinks = clickedElement.querySelectorAll('a[href^="by ' + href + '"]');

  /* START LOOP: for each found author link */

  for(let authorLink of activeLinks) {

    /* add class active */
    
    authorLink.classList.add('active');

  /* END LOOP: for each found author link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors(){
  /* find all links to authors */

  const authorLinks = document.querySelectorAll('a[href^="by "]');
  //console.log('clickedElement = ', clickedElement);
  console.log('authorLinks = ', authorLinks);
    
  /* START LOOP: for each link */

  for(let authorLink of authorLinks){

    /* add authorClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

  /* END LOOP: for each link */

  }
}

addClickListenersToAuthors();

const optTagsListSelector = '.tags.list';

function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log('articles = ', articles);

  /* START LOOP: for every article: */

  for(let article of articles){
    article.querySelector(optArticleSelector);
    console.log('article = ', article);

    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);
    console.log('tagsList = ', tagsList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log('articleTags: ', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log('articleTagsArray: ', articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){
      console.log('tag: ',tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag+'">' + tag + '</a></li>';
      console.log('linkHTML = ', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML + ' ';
      console.log('html = ', html);

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags objects */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }

    /* END LOOP: for each tag */
    
    }

    /* insert HTML of all the links into the tags wrapper */

    tagsList.innerHTML = html;
    console.log('tagsList = ', tagsList);

  /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */

  for(let tag in allTags){

    /* [NEW] generate code of a link and add it to allTagsHTML */

    allTagsHTML += tag + ' (' + allTags[tag] + ') ';

  /* [NEW] END LOOP: for each tag in allTags: */
    
  }
    
  /* [NEW] add html from allTagsHTML to tagLisst */

  tagList.innerHTML = allTagsHTML + '  ';
}
