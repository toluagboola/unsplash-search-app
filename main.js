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
	} catch(err) {
		console.log(err);
		alert('Failed to search Unsplash');
	}
}

async function searchUnsplash(searchQuery) {
	const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&client_id=${apiKey}`;
	const response = await fetch(endpoint);
	if (!response.ok) {
		throw Error(response.statusText);
	}
	const json = await response.json();
	return json;
}