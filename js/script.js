'use strict';

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors';

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */

  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts .active');


  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [IN PROGRESS] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

function generateTitleLinks(customSelector = '') {

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* for each article */

  let html = '';

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for (let article of articles) {
    article.querySelector(optArticleSelector);

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */

    /*titleList.insertAdjacentHTML('afterend', linkHTML);
    // console.log('titleList = ', titleList);*/

    html = html + linkHTML;

  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {

  /* [NEW] create a new variable allTags with an empty object */

  let allTags = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('articles = ', articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    article.querySelector(optArticleSelector);
    // console.log('article = ', article);

    /* find tags wrapper */

    const tagsList = article.querySelector(optArticleTagsSelector);
    //console.log('tagsList = ', tagsList);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    //console.log('articleTags: ', articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    //console.log('articleTagsArray: ', articleTagsArray);

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {
      // console.log('tag: ',tag);

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
       //console.log('linkHTML = ', linkHTML);

      /* add generated code to html variable */

      html = html + linkHTML + ' ';
      // console.log('html = ', html);

      /* [NEW] check if this link is NOT already in allTags */

      if (!allTags.hasOwnProperty(tag)) {

        /* [NEW] add tag to allTags object */

        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
       //console.log('allTags[tag]: ', allTags[tag]);
      // console.log('allTags: ', allTags);

      /* END LOOP: for each tag */

    }


    /* insert HTML of all the links into the tags wrapper */

    tagsList.innerHTML = html;
    // console.log('tagsList = ', tagsList);

    /* END LOOP: for every article: */

  }

  /* [NEW] find list of tags in right column */

  const tagList = document.querySelector('.tags');
  const tagsParams = calculateTagsParams(allTags);
  // console.log('tagsParams: ',tagsParams);
  // console.log('allTags: ',allTags);

  /* [NEW] create variable for all links HTML code */

  let allTagsHTML = '';

  /* [NEW] START LOOP: for each tag in allTags: */

  for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML */


    // console.log('allTags[tag]: ',allTags[tag]);
    // console.log('tag: ',tag);

    //tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);

    const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + ' href="#tag-' + tag + '">' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
    //console.log('tagLinkHTML:', tagLinkHTML);
    //console.log('allTags[tag]', allTags[tag]);


    /* [NEW] END LOOP: for each tag in allTags: */

  }

  /* [NEW] add html from allTagsHTML to tagLisst */

  tagList.innerHTML = allTagsHTML;
  //console.log('allTagsHTML: ',allTagsHTML);
}
generateTags();

function tagClickHandler(event) {

  console.log('test');
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  // console.log('Link was clicked!!!');
  // console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  // console.log('Href:', href);    

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');
  // console.log('tag:', tag);

  /* find all tag links with class active */

  const tagsLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  // console.log('tagsLinks = ', tagsLinks);

  /* START LOOP: for each active tag link */

  for (let tagLink of tagsLinks) {

    /* remove class active */

    tagLink.classList.remove('active');
    // console.log('tagLink = ', tagLink);

    /* END LOOP: for each active tag link */
  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const activeLinks = clickedElement.querySelectorAll('a[href^="#tag-' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of activeLinks) {

    /* add class active */

    tagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags() {
  /* find all links to tags */

  const tagsLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */

  for (let tagLink of tagsLinks) {

    /* add tagClickHandler as event listener for that link */

    tagLink.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */

  }
}

addClickListenersToTags();

function generateAuthorsCloud() {
  
  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('articles = ', articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    article.querySelector(optArticleSelector);
    // console.log('article = ', article);

    /* find authors wrapper */

    const authorsList = article.querySelector(optArticleAuthorSelector);
     console.log('authorsList = ', authorsList);

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    console.log('articleAuthor: ', articleAuthor);

    /* generate HTML of the link */

    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

    let author = articleAuthor;
    //console.log('linkHTML = ', linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML + '(' + allAuthors[author] + ')' + ' ';
    console.log('allAuthors[author]: ', allAuthors[author]);
    /* [NEW] check if this link is NOT already in allAuthors */

    if (!allAuthors.hasOwnProrety(author)) {

      /* [NEW] add tag to allTags object */

      allAuthors[articleAuthor] = 1;

      } else {

        alllAuthors[articleAuthor]++;
      }
    /* insert HTML of all the links into the author wrapper */

    authorList.innerHTML = html;
    console.log('authorList: ', authorList);

    /* [NEW] find list of authors in right column */

    const authorList = document.querySelector('.authors');
    
     /* [NEW] create variable for all links HTML code */

     let allAuthorsHTML = '';

     /* [NEW] START LOOP: for each tag in allTags: */

     for (let author in allAuthors) {

      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      
      const authorLinkHTML = '<li>' + ' href="#author-' + author + '">' + author + '</a></li>';
      allAuthorsHTML += authorLinkHTML;

      /* [NEW] END LOOP: for each author in allAuthors: */
        
     }
      
    /* [NEW] add html from allAthorsHTML to authorList */
      
      authorList.innerHTML = allAuthorsHTML;
      //console.log('authorLink = ', authorLink);
  }
  
  generateAuthorsCloud();
  
  
  
    
    // console.log('allTags: ', allTags);



    
    //const links = article.querySelectorAll(optArticleTagsSelector);
     

    /* END LOOP: for every article: */
  //}
  //// console.log('links = ', links);



}
generateAuthorsCloud();

function generateAuthorForArticle() {

  /* [NEW] create a new variable allAuthors with an empty object */

  let allAuthors = {}, authorsListHTML = '';

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  // console.log('articles = ', articles);

  /* START LOOP: for every article: */

  for (let article of articles) {
    article.querySelector(optArticleSelector);
    // console.log('article = ', article);

    /* find authors wrapper */

    const authorList = article.querySelector(optArticleAuthorSelector);
    // console.log('authorList = ', authorList);

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-author attribute */

    const articleAuthor = article.getAttribute('data-author');
    // console.log('articleAuthor: ', articleAuthor);

    /* generate HTML of the link */


    const linkHTML = '<li>by <a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

    // console.log('linkHTML = ', linkHTML);
    // console.log('allAuthors = ', allAuthors);

    /* add generated code to html variable */

    html = html + linkHTML + ' ';
    // console.log('html = ', html);

    /* [NEW] check if this link is NOT already in allAuthors */
    let author = articleAuthor;

    if (!allAuthors.hasOwnProperty(author)) {
      // console.log('author = ', author);

      /* [NEW] add author to allAuthors object */

      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
      authorsListHTML = authorsListHTML + authorList.innerHTML;
      // console.log('authorsListHTML = ', authorsListHTML);
    }
    // console.log('allAuthors[author]: ',allAuthors[author]);
    /* insert HTML of all the links into the author wrapper */

    authorList.innerHTML = html;



    // console.log('authorList = ', authorList);
    // console.log('authorsListTML = ', authorsListHTML);
    //calculateAuthorsParams(authors);
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of authors in right column */

  const authorsList = document.querySelector(optAuthorsListSelector);

  // console.log('authorsList = ', authorsList);
  /* [NEW] add html from allAuthors to authorsList */

  authorsList.innerHTML = authorsListHTML;


  //// console.log('links = ', links);
}

generateAuthorForArticle();

function authorClickHandler(event) {
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;
  // console.log('Link was clicked!!!');
  // console.log(event);

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  // console.log('Href:', href);    

  /* make a new constant "author" and extract author from the "href" constant */

  const author = href.replace('#author-', '');
  // console.log('author:', author);
  // console.log('authorLinks = ', authorLinks);

  /* find all author links with "href" attribute equal to the "href" constant */

  const activeLinks = clickedElement.querySelectorAll('a[href^="#author-' + href + '"]');

  /* START LOOP: for each found author link */

  for (let authorLink of activeLinks) {

    /* add class active */

    authorLink.classList.add('active');

    /* END LOOP: for each found author link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-author="' + author + '"]');

}

function addClickListenersToAuthors() {
  /* find all links to authors */

  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  //// console.log('clickedElement = ', clickedElement);
  // console.log('authorLinks = ', authorLinks);

  /* START LOOP: for each link */

  for (let authorLink of authorLinks) {

    /* add authorClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);
    // console.log('authorLink = ', authorLink);
    /* END LOOP: for each link */

  }
}

addClickListenersToAuthors();

function calculateTagsParams(tags) {

  let max = 0, min = 99999, tagsParams = { min, max };

  for (let tag in tags) {

    // console.log(tag + ' is used ' + tags[tag] + ' times');
    tagsParams.max = Math.max(tags[tag], tagsParams.max);
    tagsParams.min = Math.min(tags[tag], tagsParams.max);
    // console.log('tags: ', tags);

  }
  //console.log('tagsParams: ',tagsParams);

  return tagsParams;

}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min,
    normalizedMax = params.max - params.min,
    percentage = normalizedCount / normalizedMax,
    classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  //count = classNumber;
  // console.log('params.max: ', params.max);
  // console.log('count: ', count);
  // console.log('normalizedCount: ', normalizedCount);
  return '<a class="' + optCloudClassPrefix + classNumber + '"';
  //// console.log('linkHTML: ', linkHTML);
}

function calculateAuthorsParams(authors) {

  let max = 0, min = 99999, authorsParams = { min, max };

  for (let author in authors) {

    // console.log(author + ' is used ' + authors[author] + ' times');
    authorsParams.max = Math.max(authors[author], authorsParams.max);
    authorsParams.min = Math.min(authors[author], authorsParams.max);
    // console.log('authors: ', authors);

  }
  // console.log('authorsParams: ',authorsParams);

  return authors[author];
}