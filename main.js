const form = document.querySelector(".js-form");
form.addEventListener("submit", handleSubmit);
const nextBtn = document.querySelector(".js-next");
const prevBtn = document.querySelector(".js-prev");
let resultStats = document.querySelector(".js-result-stats");
const spinner = document.querySelector(".js-spinner");
let totalResults;
let currentPage = 1;
let searchQuery;

const apiKey = "euralEva9ogeSkcZJTx5DlEEn9zx_-BeiwZg_mUXVqY";

// Page button click handler
nextBtn.addEventListener("click", () => {
	currentPage += 1;
	fetchResults(searchQuery);
});

prevBtn.addEventListener("click", () => {
	currentPage -= 1;
	fetchResults(searchQuery);
});

// Hide or show previous and next page buttons
function pagination(totalPages) {
	nextBtn.classList.remove("hidden");
	if (currentPage >= totalPages) {
		nextBtn.classList.add("hidden");
	}

	prevBtn.classList.add("hidden");
	if (currentPage !== 1) {
		prevBtn.classList.remove("hidden");
	}
}

// Fetch results
async function fetchResults(searchQuery) {
	spinner.classList.remove("hidden");
	try {
		const results = await searchUnsplash(searchQuery);
		pagination(results.total_pages);
		spinner.classList.add("hidden");
		displayResults(results);
	} catch (err) {
		alert("Failed to search Unsplash.");
	}
}

// Pass search query to function to be fetched
function handleSubmit(event) {
	event.preventDefault();
	currentPage = 1;

	const inputValue = document.querySelector(".js-search-input").value;
	searchQuery = inputValue.trim();

	spinner.classList.add("hidden");
	fetchResults(searchQuery);
}

// Search Unsplash based on search query
async function searchUnsplash(searchQuery) {
	const endpoint = `https://api.unsplash.com/search/photos?query=${searchQuery}&per_page=30&page=${currentPage}&client_id=${apiKey}`;
	const response = await fetch(endpoint);
	if (!response.ok) {
		throw Error(response.statusText);
	}
	const json = await response.json();
	return json;
}

// Display feched images
function displayResults(json) {
	const searchResults = document.querySelector(".search-results");
	searchResults.textContent = "";
	json.results.forEach((result) => {
		const url = result.urls.small;
		const unsplashLink = result.links.html;
		const photographer = result.user.name;
		const photographerPage = result.user.links.html;
		searchResults.insertAdjacentHTML(
			"beforeend",
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
	totalResults = json.total;
	resultStats.textContent = `About ${totalResults} results found`;
}
