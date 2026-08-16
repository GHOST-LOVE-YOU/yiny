import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildMarkdownDraft,
  isValidDigestDate,
  normalizeArxivFeed,
  normalizeHuggingFacePapers,
  rankCandidates,
  selectRelevantCandidates,
} from '../scripts/digest-lib.mjs'

const arxivFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry>
    <id>http://arxiv.org/abs/2608.12345v2</id>
    <title>  Audio-Driven Human Motion Generation  </title>
    <published>2026-08-16T10:00:00Z</published>
    <summary>\n Generates dance motion from music with temporal alignment.\n</summary>
    <author><name>Ada Lovelace</name></author>
    <author><name>Grace Hopper</name></author>
    <category term="cs.CV" />
  </entry>
</feed>`

test('accepts only real ISO calendar dates for output names', () => {
  assert.equal(isValidDigestDate('2026-08-16'), true)
  assert.equal(isValidDigestDate('2026-02-30'), false)
  assert.equal(isValidDigestDate('../../../tmp/owned'), false)
})

test('normalizes arXiv Atom entries into stable candidates', () => {
  const [paper] = normalizeArxivFeed(arxivFeed)

  assert.deepEqual(paper, {
    source: 'arxiv',
    id: '2608.12345',
    title: 'Audio-Driven Human Motion Generation',
    summary: 'Generates dance motion from music with temporal alignment.',
    authors: ['Ada Lovelace', 'Grace Hopper'],
    publishedAt: '2026-08-16T10:00:00Z',
    categories: ['cs.CV'],
    url: 'https://arxiv.org/abs/2608.12345',
  })
})

test('normalizes supported Hugging Face daily paper response shapes', () => {
  const candidates = normalizeHuggingFacePapers({
    papers: [{
      paper: {
        id: 'hf-paper-id',
        title: 'Music-conditioned Video Diffusion',
        summary: 'A video diffusion model guided by music beats.',
        authors: [{ name: 'Lin Chen' }],
        publishedAt: '2026-08-16T09:00:00Z',
        arxivId: '2608.54321',
      },
    }],
  })

  assert.deepEqual(candidates[0], {
    source: 'huggingface',
    id: '2608.54321',
    title: 'Music-conditioned Video Diffusion',
    summary: 'A video diffusion model guided by music beats.',
    authors: ['Lin Chen'],
    publishedAt: '2026-08-16T09:00:00Z',
    categories: [],
    url: 'https://arxiv.org/abs/2608.54321',
  })
})

test('deduplicates and ranks Music-to-Dance candidates by relevance', () => {
  const ranked = rankCandidates([
    { source: 'arxiv', id: '1', title: 'General Language Model', summary: 'Text only.', authors: [], publishedAt: '2026-08-16T00:00:00Z', categories: [], url: 'https://example.test/1' },
    { source: 'arxiv', id: '2', title: 'Audio-Driven Dance Video Generation', summary: 'Music synchronized human motion with diffusion.', authors: [], publishedAt: '2026-08-16T00:00:00Z', categories: ['cs.CV'], url: 'https://example.test/2' },
    { source: 'huggingface', id: '2', title: 'Audio-Driven Dance Video Generation', summary: 'Music synchronized human motion with diffusion.', authors: [], publishedAt: '2026-08-16T00:00:00Z', categories: [], url: 'https://example.test/2' },
  ])

  assert.equal(ranked.length, 2)
  assert.equal(ranked[0].id, '2')
  assert.ok(ranked[0].score > ranked[1].score)
  assert.deepEqual(ranked[0].sources, ['arxiv', 'huggingface'])
})

test('excludes category-only candidates without a topic keyword match', () => {
  const relevant = selectRelevantCandidates([
    { source: 'arxiv', id: '1', title: 'General Forecasting Method', summary: 'A broad learning method.', authors: [], publishedAt: '2026-08-16T00:00:00Z', categories: ['cs.LG'], url: 'https://example.test/1' },
    { source: 'arxiv', id: '2', title: 'Music-Driven Dance Generation', summary: 'Human motion synchronized to audio.', authors: [], publishedAt: '2026-08-16T00:00:00Z', categories: ['cs.CV'], url: 'https://example.test/2' },
  ])

  assert.deepEqual(relevant.map((candidate) => candidate.id), ['2'])
})

test('renders an auditable bilingual Markdown review draft', () => {
  const markdown = buildMarkdownDraft('2026-08-16', [{
    id: '2608.12345',
    title: 'Audio-Driven Dance Video Generation',
    summary: 'Music synchronized human motion with diffusion.',
    authors: ['Ada Lovelace'],
    publishedAt: '2026-08-16T10:00:00Z',
    categories: ['cs.CV'],
    url: 'https://arxiv.org/abs/2608.12345',
    sources: ['arxiv'],
    score: 12,
    matchedKeywords: ['audio', 'dance', 'video', 'diffusion'],
  }], [])

  assert.match(markdown, /# Music-to-Dance Research Digest - 2026-08-16/)
  assert.match(markdown, /## 候选论文/)
  assert.match(markdown, /Audio-Driven Dance Video Generation/)
  assert.match(markdown, /匹配词：audio, dance, video, diffusion/)
  assert.match(markdown, /需要人工审核；此文件不会发布到站点。/)
})
