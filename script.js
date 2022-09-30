
let CurrentStyleTitle = '';

const highlightStylesUrl = "https://unpkg.com/@highlightjs/cdn-assets@11.6.0/styles/";

const highlightStyles = [
  "a11y-dark.min.css",
  "a11y-light.min.css",
  "agate.min.css",
  "an-old-hope.min.css",
  "androidstudio.min.css",
  "arduino-light.min.css",
  "arta.min.css",
  "ascetic.min.css",
  "atom-one-dark-reasonable.min.css",
  "atom-one-dark.min.css",
  "atom-one-light.min.css",
  "brown-paper.min.css",
  "codepen-embed.min.css",
  "color-brewer.min.css",
  "dark.min.css",
  "default.min.css",
  "devibeans.min.css",
  "docco.min.css",
  "far.min.css",
  "felipec.min.css",
  "foundation.min.css",
  "github-dark-dimmed.min.css",
  "github-dark.min.css",
  "github.min.css",
  "gml.min.css",
  "googlecode.min.css",
  "gradient-dark.min.css",
  "gradient-light.min.css",
  "grayscale.min.css",
  "hybrid.min.css",
  "idea.min.css",
  "intellij-light.min.css",
  "ir-black.min.css",
  "isbl-editor-dark.min.css",
  "isbl-editor-light.min.css",
  "kimbie-dark.min.css",
  "kimbie-light.min.css",
  "lightfair.min.css",
  "lioshi.min.css",
  "magula.min.css",
  "mono-blue.min.css",
  "monokai-sublime.min.css",
  "monokai.min.css",
  "night-owl.min.css",
  "nnfx-dark.min.css",
  "nnfx-light.min.css",
  "nord.min.css",
  "obsidian.min.css",
  "panda-syntax-dark.min.css",
  "panda-syntax-light.min.css",
  "paraiso-dark.min.css",
  "paraiso-light.min.css",
  "purebasic.min.css",
  "pojoaque.min.css",
  "qtcreator-dark.min.css",
  "qtcreator-light.min.css",
  "rainbow.min.css",
  "routeros.min.css",
  "school-book.min.css",
  "shades-of-purple.min.css",
  "srcery.min.css",
  "stackoverflow-dark.min.css",
  "stackoverflow-light.min.css",
  "sunburst.min.css",
  "tokyo-night-dark.min.css",
  "tokyo-night-light.min.css",
  "tomorrow-night-blue.min.css",
  "tomorrow-night-bright.min.css",
  "vs.min.css",
  "vs2015.min.css",
  "xcode.min.css",
  "xt256.min.css",
];

function loadStyles(url, styles) {
	// Load styles
	let html = `
	<!-- highlight.js styles (START) -->
	`;
	let styleTitles = [];

	for (let i = 0; i < styles.length; i++) {
		const current = styles[i];
		const name = current.split('.')[0];

		html += `<link rel="alternate stylesheet" title="${name}" href="${url + current}" type="text/css" disabled="disabled">`;

		styleTitles.push(name);
	}

	html += `
	<!-- highlight.js styles (END) -->
	`;

	const head = document.querySelector('head');
	head.innerHTML += html;

	// Style dropdown
	const themeDropdownMenu = document.querySelector('#style-dropdown > .dropdown-menu');
	html = ``;

	for (let i = 0; i < styleTitles.length; i++) {
		const title = styleTitles[i];

		html += `
		<li>
			<a class="dropdown-item" href="javascript:changeHighlightStyle('${title}')">
				${title}
			</a>
		</li>`;
	}

	themeDropdownMenu.innerHTML = html;
	
	return styleTitles;
}

function changeHighlightStyle(title) {
	const currentStyle = document.querySelector(`link[title="${CurrentStyleTitle}"]`);
	const prevStyle = document.querySelector(`link[title="${title}"]`);

	currentStyle?.setAttribute("disabled", "disabled");
	prevStyle.removeAttribute("disabled");

	const themeDropdown = document.querySelector('#style-dropdown > .dropdown-toggle');
	themeDropdown.innerText = title;

	CurrentStyleTitle = title;
}

function convert() {
  const srcTextarea = document.getElementById('src-textarea');
  const resultElement = document.getElementById('result');
	const language = document.getElementById('language').value;

  let hl = undefined;

	if (language !== '') {
		hl = hljs.highlight(srcTextarea.value, {
			language: language,
			ignoreIllegals: true,
		});
	} else {
		hl = hljs.highlightAuto(srcTextarea.value);
	}

  const html = hl2Table(hl);
  resultElement.innerHTML = html;
}

function hl2Table(hl) {
	const indent = document.getElementById('indent-char').value;
  let result = '';

  const hlHtml = document.createElement('pre');
  hlHtml.innerHTML = hl.value;
	
	if (indent !== '') {
		hlHtml.innerHTML = hlHtml.innerHTML.replaceAll('\t', indent);
	}

  const comments = hlHtml.querySelectorAll('span.hljs-comment');
  for (let i = 0; i < comments.length; i++) {
    comments[i].outerHTML = comments[i].outerHTML.replaceAll('\n', '</span>\n<span class="hljs-comment">');
  }

  const lines = hlHtml.innerHTML.split('\n');
  for (let i = 0; i < lines.length; i++) {
    result += `<tr><td class="right">${i + 1}</td><td>${lines[i]}</td></tr>`;
  }

  return `<table class="hljs">${result}</table>`;
}

function copy() {
	const resultElement = document.getElementById("result");
	navigator.clipboard.writeText(resultElement.innerHTML);
}

// ENTRY POINT!
(() => {
	const styleTitles = loadStyles(highlightStylesUrl, highlightStyles);

	setTimeout(() => {
		changeHighlightStyle('default');
	}, 100);
})();

