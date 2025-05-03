const toggleTheme = document.getElementById("theme-toggle");
const toggleIcon = document.getElementById("toggle-icon");

toggleTheme.addEventListener("click", function () {
	const currentTheme = document.body.className;

	if (currentTheme === "dark") {
		toggleIcon.src = "../assets/images/icon-moon.svg";
		document.body.className = "light";

		return;
	}

	toggleIcon.src = "../assets/images/icon-sun.svg";
	document.body.className = "dark";
});

async function getData(isActive = undefined) {
	const response = await fetch("../data/data.json");
	const data = await response.json();

	if (isActive == "active")
		return data.filter((extensions) => extensions.isActive);
	else if (isActive == "inactive")
		return data.filter((extensions) => !extensions.isActive);
	else return data;
}

function generateNewExtensionHTML({ desc, active, logo, name }) {
	return `
        <article class="extension__item">
          <section class="extension__item-content">
            <section class="extension__item-content-image">
              <img
              src="${logo}"
              alt="Extension logo"
              />
            </section>
            <section class="extension__item-content-info">
              <h2 class="extension__item-content-info-title">${name}</h2>
              <p class="extension__item-content-info-description">${desc}</p>
            </section>
          </section>

          <section class="extension__item-actions">
            <button type="button" class="extension__item-actions-remove">
              Remove
            </button>
            <label class="extension__item-actions-switch">
              <input type="checkbox" ${active ? "checked" : undefined} />
              <span class="slider round"></span>
            </label>
          </section>
        </article>
`;
}

function appendExtensions(extensions) {
	const list = document.getElementById("extensions-list");
	list.innerHTML = "";

	for (const extension of extensions) {
		list.innerHTML += generateNewExtensionHTML({
			desc: extension.description,
			active: extension.isActive,
			logo: extension.logo,
			name: extension.name,
		});
	}
}

async function showData(element) {
	const showDataBtns = document.getElementsByName("show-data-btn");

	const list = document.getElementById("extensions-list");
	if (list.innerHTML)
		showDataBtns.forEach((btn) => {
			btn.classList.remove("active");
		});

	element?.target?.classList?.add("active");

	appendExtensions(await getData(element?.target.dataset.state));
}

(async function () {
	await showData();

	const showDataBtns = document.getElementsByName("show-data-btn");
	showDataBtns.forEach((btn) => {
		btn.addEventListener("click", async (e) => {
			await showData(e);
		});
	});
})();
