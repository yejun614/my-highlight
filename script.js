
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

  return `<table>${result}</table>`;
}

function copy() {
	const resultElement = document.getElementById("result");
	navigator.clipboard.writeText(resultElement.innerHTML);
}

