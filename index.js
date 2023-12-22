// console("This is my news");
//0fe0d38f46664935bf2ea9fc85749a3b//
const newsParent = document.getElementById("fetched-news");
async function getNews(){
    const news = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=0fe0d38f46664935bf2ea9fc85749a3b");
    const jsonNEWS = await news.json();
    Object.values(jsonNEWS.articles).forEach((newsInfo)=>{
        const currentNews = document.createElement("div");
        currentNews.classList.add("each-news");
        const img = document.createElement("img");
        img.src=newsInfo.urlToImage;
        const div1 = document.createElement("div");
        div1.textContent = newsInfo.author;
        const div2 = document.createElement("div");
        div2.textContent = newsInfo.title;
        const div3 = document.createElement("div");
        div3.textContent = newsInfo.description;
        const div4 = document.createElement("div");
        div4.textContent = newsInfo.content;
        const div5 = document.createElement("div");
        currentNews.appendChild(img);
        currentNews.appendChild(div1);
        currentNews.appendChild(div2);
        currentNews.appendChild(div3);
        currentNews.appendChild(div4);
        currentNews.appendChild(div5);
        newsParent.appendChild(currentNews);
        console.log(newsInfo.title);
    })
    // console.log(jsonNEWS);
} 
getNews()