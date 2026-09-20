// Sidebar Navigation Toggle Logic
function updateNavToggleBtn(isVisible) {
	const btn = document.getElementById('nav-toggle-btn');
	if (btn) {
		btn.innerHTML = isVisible ? '✖ Hide Nav' : '☰ Navigation';
	}
}

function toggleSidebarNav() {
	const sidebar = document.getElementById('sidebar');
	if (!sidebar) return;
	const isInactive = sidebar.classList.contains('inactive');
	if (isInactive) {
		sidebar.classList.remove('inactive');
		localStorage.setItem('sidebarVisible', 'true');
		updateNavToggleBtn(true);
	} else {
		sidebar.classList.add('inactive');
		localStorage.setItem('sidebarVisible', 'false');
		updateNavToggleBtn(false);
	}
}

// Theme switcher logic
function updateThemeButton(theme) {
	const btn = document.getElementById('theme-toggle-btn');
	if (btn) {
		btn.innerHTML = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
	}
}

function toggleTheme() {
	const current = document.documentElement.getAttribute('data-theme') || 'dark';
	const next = current === 'dark' ? 'light' : 'dark';
	document.documentElement.setAttribute('data-theme', next);
	localStorage.setItem('theme', next);
	updateThemeButton(next);
}

// Initialize theme & navigation states on DOM load
document.addEventListener('DOMContentLoaded', () => {
	const current = document.documentElement.getAttribute('data-theme') || 'dark';
	updateThemeButton(current);

	const sidebar = document.getElementById('sidebar');
	if (sidebar) {
		const savedState = localStorage.getItem('sidebarVisible');
		if (savedState === 'false') {
			sidebar.classList.add('inactive');
			updateNavToggleBtn(false);
		} else {
			updateNavToggleBtn(!sidebar.classList.contains('inactive'));
		}
	}
});

// Copy repo URL helper
function copyRepoUrl() {
	const url = "https://pizzasdu83.github.io/smtrepo/";
	navigator.clipboard.writeText(url).then(() => {
		const btn = document.querySelector('.copy-btn');
		const origText = btn.innerText;
		btn.innerText = "Copied!";
		btn.style.background = "#34c759";
		setTimeout(() => {
			btn.innerText = origText;
			btn.style.background = "#007aff";
		}, 2000);
	}).catch(err => {
		alert("Repo URL: " + url);
	});
}

// Interactive tweak search filter
function filterTweaks() {
	const input = document.getElementById('query').value.toLowerCase();
	const cards = document.querySelectorAll('.tweak-card');
	
	cards.forEach(card => {
		const text = card.innerText.toLowerCase();
		if (text.includes(input)) {
			card.style.display = "";
		} else {
			card.style.display = "none";
		}
	});
}

// Image Lightbox Modal for Full View
document.addEventListener('DOMContentLoaded', () => {
	const modal = document.createElement('div');
	modal.id = 'img-modal';
	modal.style.cssText = 'display:none; position:fixed; z-index:99999; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.88); align-items:center; justify-content:center; cursor:zoom-out; -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); padding:16px; box-sizing:border-box;';
	modal.innerHTML = '<img id="modal-img" style="max-width:90%; max-height:90%; border-radius:12px; box-shadow:0 10px 40px rgba(0,0,0,0.5); transition:transform 0.2s;" />';
	document.body.appendChild(modal);

	const modalImg = document.getElementById('modal-img');
	document.querySelectorAll('.image-container img').forEach(img => {
		img.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			modalImg.src = img.src;
			modal.style.display = 'flex';
		});
	});

	modal.addEventListener('click', () => {
		modal.style.display = 'none';
	});
});