// console("This is my news");
//0fe0d38f46664935bf2ea9fc85749a3b//
document.addEventListener("DOMContentLoaded", function() {
    const newsParent = document.getElementById("fetched-news");

    async function getNews() {
        try {
            const response = await fetch("https://newsapi.org/v2/top-headlines?country=in&apiKey=0fe0d38f46664935bf2ea9fc85749a3b");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const jsonNEWS = await response.json();
            jsonNEWS.articles.forEach((newsInfo) => {
                const currentNews = document.createElement("div");
                currentNews.classList.add("each-news");

                const img = document.createElement("img");
                img.src = newsInfo.urlToImage || 'default-image.png'; // Fallback image if urlToImage is null
                img.alt = newsInfo.title;

                const div1 = document.createElement("div");
                div1.textContent = newsInfo.author || 'Unknown author';

                const div2 = document.createElement("div");
                div2.textContent = newsInfo.title;

                const div3 = document.createElement("div");
                div3.textContent = newsInfo.description;

                const div4 = document.createElement("div");
                div4.textContent = newsInfo.content;

                currentNews.appendChild(img);
                currentNews.appendChild(div1);
                currentNews.appendChild(div2);
                currentNews.appendChild(div3);
                currentNews.appendChild(div4);
                newsParent.appendChild(currentNews);
            });
        } catch (error) {
            console.error('Error fetching the news:', error);
        }
    }

    getNews();
});
