window.addEventListener('load',function(){
	updateNews();
})

var api_key = '70c1bd2ae3794e6ab15503c992258e8c';
var main_div = document.getElementById('main');
async function updateNews(){
	var res = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${api_key}`);
	console.log(res);
	var res_json = await res.json();
	console.log(res_json);
	main_div.innerHTML = res_json.articles.map(createArticlesFunc).join('\n');
}

function createArticlesFunc(art){
	return `<div class="article">
		<a href="${art.url}">${art.title}</a>
		<div class="article-img"><img src="${art.urlToImage}" width="150" height="100" /></div>
		<p>${art.description}</p>
	</div>`;
}