#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import {
  HUGGING_FACE_DAILY_PAPERS_URL,
  buildArxivUrls,
  buildMarkdownDraft,
  fetchText,
  isValidDigestDate,
  normalizeArxivFeed,
  normalizeHuggingFacePapers,
  selectRelevantCandidates,
} from './digest-lib.mjs'

function readOption(name, fallback) {
  const index = process.argv.indexOf(name)
  return index === -1 ? fallback : process.argv[index + 1] ?? fallback
}

function utcDate() {
  return new Date().toISOString().slice(0, 10)
}

const date = readOption('--date', utcDate())
const limit = Number.parseInt(readOption('--limit', '40'), 10)
const outputDir = resolve(readOption('--output-dir', 'digests'))

if (!isValidDigestDate(date)) {
  console.error('--date must be a valid date in YYYY-MM-DD format')
  process.exitCode = 1
} else if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
  console.error('--limit must be an integer from 1 to 100')
  process.exitCode = 1
} else {
  const sourceErrors = []
  const candidates = []

  for (const [index, url] of buildArxivUrls(Math.min(limit, 25)).entries()) {
    try {
      const feed = await fetchText(url)
      candidates.push(...normalizeArxivFeed(feed))
    } catch (error) {
      sourceErrors.push(`arXiv group ${index + 1}: ${error.message}`)
    }
  }

  try {
    const response = await fetchText(HUGGING_FACE_DAILY_PAPERS_URL)
    candidates.push(...normalizeHuggingFacePapers(JSON.parse(response)))
  } catch (error) {
    sourceErrors.push(`Hugging Face Papers: ${error.message}`)
  }

  const ranked = selectRelevantCandidates(candidates).slice(0, limit)
  const draft = buildMarkdownDraft(date, ranked, sourceErrors)
  const payload = {
    generatedAt: new Date().toISOString(),
    date,
    query: 'Music-to-Dance: audio, music, dance, human motion, pose, video generation, diffusion, temporal synchronization',
    candidates: ranked,
    sourceErrors,
  }

  await mkdir(outputDir, { recursive: true })
  const stem = `music-to-dance-${date}`
  const jsonPath = resolve(outputDir, `${stem}.json`)
  const markdownPath = resolve(outputDir, `${stem}.md`)
  await Promise.all([
    writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`),
    writeFile(markdownPath, draft),
  ])

  console.log(`Wrote ${ranked.length} ranked candidates.`)
  console.log(`JSON: ${jsonPath}`)
  console.log(`Draft: ${markdownPath}`)
  if (sourceErrors.length) {
    console.warn(`Source warnings: ${sourceErrors.join(' | ')}`)
  }
}
