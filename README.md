# AI Paper Digest / AI 论文速递

A bilingual (Chinese/English) AI paper digest website built with Next.js, featuring daily curated research insights.

基于 Next.js 构建的双语（中文/英文）AI 论文速递网站，每日精选研究洞察。

## 项目结构

```
src/
├── app/
│   ├── page.tsx                          # 根路由，重定向到 /zh
│   ├── layout.tsx                        # 根布局
│   └── [locale]/                        # 多语言路由
│       ├── layout.tsx                      # Locale 布局（含语言切换器）
│       ├── page.tsx                      # 双语首页
│       └── daily/
│           └── [roleId]/
│               ├── page.tsx                # 归档页
│               └── music-to-dance/       # 具体主题（静态路径）
│                   └── 2000-01-01/
│                       └── page.tsx     # 日报详情（含双语内容）
├── components/
│   ├── digest/                          # 日报组件库
│   ├── ui/                              # UI 组件
│   └── LanguageSwitcher.tsx             # 语言切换组件
├── data/
│   └── registry.ts                      # 日报注册表（双语）
└── lib/
    └── i18n.ts                         # 国际化配置
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本（静态导出）
npm run build

# 预览构建结果
npm run start
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 语言切换

网站支持中英文双语切换：
- 点击右上角的语言按钮可在中英文之间切换
- URL 会自动更新（`/zh/*` ↔ `/en/*`）
- 导航栏、页脚等所有 UI 元素都会同步切换

## 如何写某一天的日报

创建新日报需要完成以下步骤：

### 1. 更新注册表 `src/data/registry.ts`

在 `registry` 数组中添加新日报的元数据：

```ts
{
  roleId: "your-topic",              // 主题 ID（对应文件夹名）
  roleName: {
    zh: "你的主题研究者",           // 中文主题名
    en: "Your Topic Researcher",      // 英文主题名
  },
  date: "2025-03-02",              // 日期（YYYY-MM-DD）
  title: {
    zh: "中文日报标题",              // 中文标题
    en: "English Daily Digest Title",   // 英文标题
  },
  mustReadCount: 3,                 // 重点关注数量
  worthReadingCount: 5,              // 也值得关注数量
},
```

### 2. 创建日报页面文件

在 `src/app/[locale]/daily/` 下创建对应的文件夹和页面：

```
src/app/[locale]/daily/your-topic/
└── 2025-03-02/
    └── page.tsx
```

### 3. 编写页面内容

参考 [src/app/[locale]/daily/music-to-dance/2000-01-01/page.tsx](src/app/[locale]/daily/music-to-dance/2000-01-01/page.tsx) 的格式：

```tsx
import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

// 双语内容对象
const content = {
  zh: {
    title: "中文日报标题",
    overview: ["要点一", "要点二", "要点三"],
    roleName: "你的主题研究者",
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "论文中文标题",
        description: "中文分析段落...",
        keyPoints: ["要点一", "要点二"],
        paperLink: "Original English Paper Title",
      },
      // ... 更多论文
    ],
    worthReading: [
      {
        num: 4,
        title: "简短标题",
        tag: "标签",
        href: "https://arxiv.org/abs/...",
        description: "一句话描述。",
      },
      // ... 更多
    ],
    observation: "今日观察段落...",
  },
  en: {
    title: "English Daily Digest Title",
    overview: ["Point one", "Point two", "Point three"],
    roleName: "Your Topic Researcher",
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "Paper English Title",
        description: "English analysis paragraph...",
        keyPoints: ["Point 1", "Point 2"],
        paperLink: "Original English Paper Title",
      },
      // ... 更多论文
    ],
    worthReading: [
      {
        num: 4,
        title: "Short Title",
        tag: "Tag",
        href: "https://arxiv.org/abs/...",
        description: "One sentence description.",
      },
      // ... 更多
    ],
    observation: "Today's observation paragraph...",
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    alternates: {
      languages: {
        'zh-CN': `/zh/daily/your-topic/2025-03-02`,
        'en': `/en/daily/your-topic/2025-03-02`,
      }
    }
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout
      locale={locale}
      date="2025-03-02"
      roleId="your-topic"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
      <MustRead>
        {c.papers.map((paper) => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <p>{paper.description}</p>
            <KeyPoints points={paper.keyPoints} />
            <PaperLink href={paper.href} title={paper.paperLink} />
          </Paper>
        ))}
      </MustRead>

      <WorthReading>
        {c.worthReading.map((item) => (
          <NotableItem
            key={item.num}
            num={item.num}
            title={item.title}
            tag={item.tag}
            href={item.href}
          >
            {item.description}
          </NotableItem>
        ))}
      </WorthReading>

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
```

### 4. 测试

```bash
npm run dev
```

访问对应的 URL 查看效果：
- `http://localhost:3000/zh/daily/your-topic/2025-03-02`
- `http://localhost:3000/en/daily/your-topic/2025-03-02`

## 组件说明

### Digest 组件

- `DigestLayout` - 日报布局容器
- `MustRead` - 重点关注区域
- `Paper` - 单篇论文卡片
- `KeyPoints` - 要点列表
- `PaperLink` - 原文链接
- `WorthReading` - 也值得关注区域
- `NotableItem` - 单个条目卡片
- `Observation` - 今日观察区域

### 配置

- `src/lib/i18n.ts` - UI 字符串翻译表
- `src/data/registry.ts` - 日报注册表

## 部署

```bash
npm run build
```

构建完成后，静态文件将生成在 `out/` 目录中，可直接部署到任何静态托管服务（如 Vercel、Netlify、GitHub Pages）。

## License

MIT
