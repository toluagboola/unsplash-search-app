const form = document.querySelector('.js-form');
form.addEventListener('submit', handleSubmit);

const apiKey = "euralEva9ogeSkcZJTx5DlEEn9zx_-BeiwZg_mUXVqY";

async function handleSubmit(event) {
	event.preventDefault();
	const inputValue = document.querySelector('.js-search-input').value;
	const searchQuery = inputValue.trim();
	console.log(searchQuery);

	try {
		const results = await searchUnsplash(searchQuery);
		console.log(results);
		displayResults(results);
	} catch(err) {
		console.log(err);
		alert('Failed to search Unsplash');
	}
}

async function searchUnsplash(searchQuery) {
	const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&client_id=${apiKey}`;
	const response = await fetch(endpoint);
	if (!response.ok) {
		throw Error(response.statusText);
	}
	const json = await response.json();
	return json;
}

function displayResults(json) {
	const searchResults = document.querySelector('.search-results');
	searchResults.textContent = '';
	json.results.forEach(result => {
		const url = result.urls.small;
		const unsplashLink = result.links.html;
		const photographer = result.user.name;
		const photographerPage = result.user.links.html;
		searchResults.insertAdjacentHTML(
			'beforeend',
			`<div>
				<a href="${unsplashLink}" target="_blank">
					<div class="result-item" style="background-image: url(${url});"></div>
				</a>
				<p class="photographer-name">
					<a href="${photographerPage}" target="_blank" style="color: black; text-decoration: none;">Photo by ${photographer}</a>
				</p>
			</div>`
		);	
	});
};