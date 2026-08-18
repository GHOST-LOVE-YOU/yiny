export const MUSIC_TO_DANCE_KEYWORDS = [
  'audio',
  'music',
  'dance',
  'motion',
  'human motion',
  'pose',
  'video generation',
  'video diffusion',
  'diffusion',
  'temporal',
  'synchronization',
]

export function isValidDigestDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

function cleanText(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function decodeXml(value = '') {
  return cleanText(value)
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function getTagValue(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'))
  return match ? decodeXml(match[1]) : ''
}

function entryBlocks(feed) {
  return [...feed.matchAll(/<entry(?:\s[^>]*)?>([\s\S]*?)<\/entry>/gi)].map((match) => match[1])
}

function asArray(value) {
  return Array.isArray(value) ? value : []
}

function firstString(...values) {
  return values.find((value) => typeof value === 'string' && value.trim())?.trim() ?? ''
}

function normalizeHuggingFaceItem(item) {
  const paper = item?.paper ?? item
  const arxivId = firstString(paper?.arxivId, paper?.arxiv_id, paper?.id)
  const id = arxivId.replace(/^arXiv:/i, '').replace(/v\d+$/i, '')
  const url = firstString(
    paper?.url,
    paper?.paperUrl,
    paper?.arxivUrl,
    id ? `https://arxiv.org/abs/${id}` : '',
  )

  return {
    source: 'huggingface',
    id: id || firstString(paper?.id, paper?.slug, paper?.title),
    title: firstString(paper?.title, paper?.paper?.title),
    summary: firstString(paper?.summary, paper?.abstract, paper?.paper?.summary),
    authors: asArray(paper?.authors).map((author) => typeof author === 'string' ? author : author?.name).filter(Boolean),
    publishedAt: firstString(paper?.publishedAt, paper?.published_at, paper?.date, paper?.createdAt),
    categories: asArray(paper?.categories).map((category) => typeof category === 'string' ? category : category?.name).filter(Boolean),
    url,
  }
}

export function normalizeArxivFeed(feed) {
  return entryBlocks(feed).map((entry) => {
    const versionedId = getTagValue(entry, 'id').split('/abs/').pop() ?? ''
    const id = versionedId.replace(/v\d+$/i, '')
    const categories = [...entry.matchAll(/<category\s+[^>]*term=["']([^"']+)["'][^>]*\/?\s*>/gi)]
      .map((match) => match[1])

    return {
      source: 'arxiv',
      id,
      title: getTagValue(entry, 'title'),
      summary: getTagValue(entry, 'summary'),
      authors: [...entry.matchAll(/<author(?:\s[^>]*)?>([\s\S]*?)<\/author>/gi)]
        .map((match) => getTagValue(match[1], 'name'))
        .filter(Boolean),
      publishedAt: getTagValue(entry, 'published'),
      categories,
      url: `https://arxiv.org/abs/${id}`,
    }
  }).filter((candidate) => candidate.id && candidate.title)
}

export function normalizeHuggingFacePapers(payload) {
  const papers = asArray(payload?.papers).length ? payload.papers : asArray(payload)
  return papers
    .map(normalizeHuggingFaceItem)
    .filter((candidate) => candidate.id && candidate.title)
}

export function scoreCandidate(candidate, keywords = MUSIC_TO_DANCE_KEYWORDS) {
  const haystack = `${candidate.title} ${candidate.summary}`.toLowerCase()
  const matchedKeywords = keywords.filter((keyword) => haystack.includes(keyword))
  const title = candidate.title.toLowerCase()
  const titleBonus = matchedKeywords.filter((keyword) => title.includes(keyword)).length
  const categoryBonus = candidate.categories?.some((category) => ['cs.CV', 'cs.LG', 'cs.SD', 'eess.AS'].includes(category)) ? 1 : 0

  return {
    ...candidate,
    score: matchedKeywords.length * 2 + titleBonus + categoryBonus,
    matchedKeywords,
  }
}

export function rankCandidates(candidates, keywords = MUSIC_TO_DANCE_KEYWORDS) {
  const deduplicated = new Map()

  for (const candidate of candidates) {
    const key = candidate.id.toLowerCase()
    const existing = deduplicated.get(key)
    if (existing) {
      existing.sources = [...new Set([...existing.sources, candidate.source])].sort()
      if (candidate.summary.length > existing.summary.length) existing.summary = candidate.summary
      if (candidate.authors.length > existing.authors.length) existing.authors = candidate.authors
      if (candidate.categories.length > existing.categories.length) existing.categories = candidate.categories
      continue
    }

    deduplicated.set(key, {
      ...candidate,
      sources: [candidate.source],
      authors: candidate.authors ?? [],
      categories: candidate.categories ?? [],
    })
  }

  return [...deduplicated.values()]
    .map((candidate) => scoreCandidate(candidate, keywords))
    .sort((left, right) => right.score - left.score || right.publishedAt.localeCompare(left.publishedAt) || left.title.localeCompare(right.title))
}

export function selectRelevantCandidates(candidates, keywords = MUSIC_TO_DANCE_KEYWORDS) {
  return rankCandidates(candidates, keywords)
    .filter((candidate) => candidate.matchedKeywords.length > 0)
}

function truncateSummary(summary, limit = 460) {
  if (summary.length <= limit) return summary
  return `${summary.slice(0, limit - 1).trimEnd()}…`
}

export function buildMarkdownDraft(date, candidates, sourceErrors) {
  const lines = [
    `# Music-to-Dance Research Digest - ${date}`,
    '',
    '> 需要人工审核；此文件不会发布到站点。',
    '',
    '## 候选论文',
    '',
  ]

  if (!candidates.length) {
    lines.push('本次未找到匹配候选。请检查来源连通性或扩大查询范围。', '')
  }

  for (const [index, candidate] of candidates.entries()) {
    lines.push(`### ${index + 1}. ${candidate.title}`, '')
    lines.push(`- 链接：${candidate.url}`)
    lines.push(`- 来源：${candidate.sources.join(', ')}`)
    lines.push(`- 相关性：${candidate.score}`)
    lines.push(`- 匹配词：${candidate.matchedKeywords.join(', ') || '无'}`)
    if (candidate.authors.length) lines.push(`- 作者：${candidate.authors.join(', ')}`)
    if (candidate.categories.length) lines.push(`- 分类：${candidate.categories.join(', ')}`)
    if (candidate.publishedAt) lines.push(`- 发布：${candidate.publishedAt}`)
    lines.push(`- 摘要：${truncateSummary(candidate.summary || '该来源未提供摘要。')}`, '')
  }

  lines.push('## 编审检查', '', '- [ ] 选择重点关注论文', '- [ ] 补充中文标题与技术解读', '- [ ] 确认原文链接和发布日期', '- [ ] 手动创建日报页面并更新 registry', '')

  if (sourceErrors.length) {
    lines.push('## 来源告警', '')
    for (const error of sourceErrors) lines.push(`- ${error}`)
    lines.push('')
  }

  return lines.join('\n')
}

export async function fetchText(url, {
  timeoutMs = 20_000,
  retries = 2,
  retryDelayMs = 3_500,
  fetchImpl = fetch,
  sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay)),
} = {}) {
  let lastError

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        headers: { 'user-agent': 'yiny-digest-collector/1.1 (local review tool)' },
        signal: AbortSignal.timeout(timeoutMs),
      })
      if (response.ok) return response.text()

      lastError = new Error(`${response.status} ${response.statusText}`)
      if (![429, 500, 502, 503, 504].includes(response.status)) throw lastError
    } catch (error) {
      lastError = error
      if (attempt === retries) throw error
    }

    await sleep(retryDelayMs * (attempt + 1))
  }

  throw lastError
}

export const ARXIV_CS_CATEGORY_GROUPS = [
  ['cs.AI', 'cs.CV'],
  ['cs.LG', 'cs.SD'],
  ['cs.CL', 'cs.RO'],
  ['cs.HC', 'cs.MM', 'cs.GR'],
]

export function buildArxivUrl(limit, categories = ARXIV_CS_CATEGORY_GROUPS) {
  const categoryQuery = `(${categories.map(category => `cat:${category}`).join(' OR ')})`
  const topicQuery = '(all:music OR all:dance OR all:audio OR all:pose OR all:"human motion" OR all:"motion generation" OR all:"video generation" OR all:rhythm)'
  const query = `${categoryQuery} AND ${topicQuery}`
  const params = new URLSearchParams({
    search_query: query,
    start: '0',
    max_results: String(limit),
    sortBy: 'submittedDate',
    sortOrder: 'descending',
  })
  return `https://export.arxiv.org/api/query?${params}`
}

export function buildArxivUrls(limit, groups = ARXIV_CS_CATEGORY_GROUPS) {
  return groups.map(categories => buildArxivUrl(limit, categories))
}

export const HUGGING_FACE_DAILY_PAPERS_URL = 'https://huggingface.co/api/daily_papers'
