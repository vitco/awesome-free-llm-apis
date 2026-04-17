#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data.json'), 'utf8'));

const HEADER = `<div align="center">
\t<br>
\t<img src="media/awesome-free-llm-apis.png" width="500" alt="Awesome Free LLM APIs">
\t<br>
\t<br>
\t<a href="https://awesome.re">
\t\t<img src="https://awesome.re/badge-flat2.svg" alt="Awesome">
\t</a>
\t<br>
\t<br>
\t<p>LLM APIs with permanent free tiers for text inference.</p>
\t<br>
\t<br>
</div>`;

function buildTable(models) {
	const lines = [];
	lines.push('| Model Name | Context | Max Output | Modality | Rate Limit |');
	lines.push('|---|---|---|---|---|');
	for (const m of models) {
		lines.push(`| ${m.name} | ${m.context} | ${m.maxOutput} | ${m.modality} | ${m.rateLimit} |`);
	}
	return lines.join('\n');
}

function buildProviderSection(provider) {
	const desc = provider.footnoteRef != null
		? `${provider.description} [^${provider.footnoteRef}]`
		: provider.description;
	const parts = [
		`### [${provider.name}](${provider.url}) ${provider.flag}`,
		'',
		desc,
	];
	if (provider.baseUrl != null) {
		parts.push('', `Base URL: \`${provider.baseUrl}\``);
	}
	parts.push('', buildTable(provider.models));
	return parts.join('\n');
}

const providerAPIs = data.providers
	.filter(p => p.category === 'provider_api')
	.sort((a, b) => a.name.localeCompare(b.name));

const inferenceProviders = data.providers
	.filter(p => p.category === 'inference_provider')
	.sort((a, b) => a.name.localeCompare(b.name));

const glossaryRows = data.glossary
	.map(g => `| **${g.abbreviation}** | ${g.meaning} |`)
	.join('\n');

const footnoteLines = data.footnotes
	.sort((a, b) => a.id - b.id)
	.map(f => `[^${f.id}]: ${f.text}`)
	.join('\n');

const parts = [
	HEADER,
	'',
	'## Contents',
	'',
	'- [Provider APIs](#provider-apis)',
	'- [Inference providers](#inference-providers)',
	'',
	'## Provider APIs',
	'',
	'APIs run by the companies that train or fine-tune the models themselves.',
	'',
	providerAPIs.map(buildProviderSection).join('\n\n'),
	'',
	'## Inference providers',
	'',
	'Third-party platforms that host open-weight models from various sources.',
	'',
	inferenceProviders.map(buildProviderSection).join('\n\n'),
	'',
	'## Contributing',
	'',
	'Know a free tier that\'s missing? [Open a PR](contributing.md). Include the provider, endpoint, rate limits (link to their docs), and a few notable models. Trial credits and time-limited promos don\'t count.',
	'',
	'## Glossary',
	'',
	'| Abbreviation | Meaning |',
	'|---|---|',
	glossaryRows,
	'',
	'## Notes',
	'',
	'- All endpoints are OpenAI SDK-compatible unless noted.',
	'- Each link points to the provider\'s API key page.',
	'',
	footnoteLines,
	'',
];

const output = parts.join('\n');
fs.writeFileSync(path.join(ROOT, 'README.md'), output);
console.log('README.md generated successfully.');
