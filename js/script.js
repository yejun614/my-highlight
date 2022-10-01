
let IsTableFrame = true;
let CurrentStyleTitle = '';

const highlightStylesUrl = "css/styles/";

const highlightStyles = [
  "a11y-dark.css",
  "a11y-light.css",
  "agate.css",
  "an-old-hope.css",
  "androidstudio.css",
  "arduino-light.css",
  "arta.css",
  "ascetic.css",
  "atom-one-dark-reasonable.css",
  "atom-one-dark.css",
  "atom-one-light.css",
  "brown-paper.css",
  "codepen-embed.css",
  "color-brewer.css",
  "dark.css",
  "default.css",
  "devibeans.css",
  "docco.css",
  "far.css",
  "felipec.css",
  "foundation.css",
  "github-dark-dimmed.css",
  "github-dark.css",
  "github.css",
  "gml.css",
  "googlecode.css",
  "gradient-dark.css",
  "gradient-light.css",
  "grayscale.css",
  "hybrid.css",
  "idea.css",
  "intellij-light.css",
  "ir-black.css",
  "isbl-editor-dark.css",
  "isbl-editor-light.css",
  "kimbie-dark.css",
  "kimbie-light.css",
  "lightfair.css",
  "lioshi.css",
  "magula.css",
  "mono-blue.css",
  "monokai-sublime.css",
  "monokai.css",
  "night-owl.css",
  "nnfx-dark.css",
  "nnfx-light.css",
  "nord.css",
  "obsidian.css",
  "panda-syntax-dark.css",
  "panda-syntax-light.css",
  "paraiso-dark.css",
  "paraiso-light.css",
  "purebasic.css",
  "pojoaque.css",
  "qtcreator-dark.css",
  "qtcreator-light.css",
  "rainbow.css",
  "routeros.css",
  "school-book.css",
  "shades-of-purple.css",
  "srcery.css",
  "stackoverflow-dark.css",
  "stackoverflow-light.css",
  "sunburst.css",
  "tokyo-night-dark.css",
  "tokyo-night-light.css",
  "tomorrow-night-blue.css",
  "tomorrow-night-bright.css",
  "vs.css",
  "vs2015.css",
  "xcode.css",
  "xt256.css",
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

function setFrame(isTableFrame) {
  IsTableFrame = isTableFrame;

  const frameDropdown = document.querySelector('#frame-dropdown > .dropdown-toggle');
  frameDropdown.innerText = isTableFrame ? 'Table + Line number' : 'Just code';

  const result = document.getElementById('result');
  if (result.innerHTML.trim() !== '') {
    convert();
  }
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

  const html = IsTableFrame ? hl2Table(hl) : hl.value;
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

  return `<table>${result}</table>`;
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
    setFrame(true);
	}, 100);
})();

