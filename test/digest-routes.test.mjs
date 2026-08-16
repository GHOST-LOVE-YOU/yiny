import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const repoRoot = new URL('../', import.meta.url)
const digestPath = new URL(
  'src/app/[locale]/daily/music-to-dance/2026-07-29/page.tsx',
  repoRoot,
)

async function read(relativePath) {
  return readFile(new URL(relativePath, repoRoot), 'utf8')
}

test('2026-07-29 music-to-dance digest selects complete zh and en content', async () => {
  const source = await readFile(digestPath, 'utf8')

  assert.match(source, /const content = \{[\s\S]*?zh: \{/)
  assert.match(source, /\n  en: \{/)
  assert.match(source, /export async function generateMetadata/)
  assert.match(source, /const c = content\[locale\]/)
  assert.match(source, /roleName=\{c\.roleName\}/)
  assert.match(source, /overview=\{c\.overview\}/)
  assert.match(source, /c\.papers\.map/)
  assert.match(source, /c\.worthReading\.map/)
  assert.match(source, /\{c\.observation\}/)
})

test('legacy music_to_dance routes re-export their canonical digest pages', async () => {
  const dates = ['2025-06-17', '2026-06-16', '2026-06-23', '2026-07-20']

  for (const date of dates) {
    const source = await read(
      `src/app/[locale]/daily/music_to_dance/${date}/page.tsx`,
    )
    assert.match(
      source,
      new RegExp(
        `export \\{ default, generateMetadata, generateStaticParams \\} from '../../music-to-dance/${date}/page'`,
      ),
    )
  }
})
