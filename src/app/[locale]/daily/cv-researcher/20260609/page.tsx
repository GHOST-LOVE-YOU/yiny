import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "计算机视觉研究者",
    title: "角色动画与视频生成：端到端控制的新进展",
    overview: [
      "SCAIL-2 提出端到端角色动画框架，绕过中间表示直接实现运动迁移",
      "HarmoView 通过多视角约束实现身份一致的视频生成",
      "SSR-Merge 解决 LoRA 合并中的参数干扰问题，无需训练即可组合多种生成能力",
      "GaussTrace 为 3D Gaussian Splatting 模型提供来源分析框架"
    ],
    papers: [
    {
        "num": 1,
        "tag": "CV",
        "title": "SCAIL-2: Unifying Controlled Character Animation with End-to-end In-Context Conditioning",
        "description": "Controlled character animation requires transferring motion from a driving sequence to a reference character. Prior works heavily rely on intermediate representations, including pose skeletons to represent motion or masked background to represent environment, which inevitably leads to information lo...",
        "keyPoints": [
            "Controlled character animation requires transferring motion from a driving sequence to a reference c..."
        ],
        "href": "http://arxiv.org/abs/2606.10804v1",
        "paperLink": "SCAIL-2: Unifying Controlled Character Animation w"
    },
    {
        "num": 2,
        "tag": "CV",
        "title": "A Multimodal RGB and Events Dataset for Hand Detection in First-Person View",
        "description": "Existing hand detection algorithms work on images and the detection rate is restricted by the frame rate of the camera. In hand detection applications for moving robotic systems, conventional cameras cause motion blur, especially in darker lighting conditions. We can leverage the use of event-based ...",
        "keyPoints": [
            "Existing hand detection algorithms work on images and the detection rate is restricted by the frame ..."
        ],
        "href": "http://arxiv.org/abs/2606.10790v1",
        "paperLink": "A Multimodal RGB and Events Dataset for Hand Detec"
    },
    {
        "num": 3,
        "tag": "CV",
        "title": "SSR-Merge: Subspace Signal Routing for Training-Free LoRA Merging in Diffusion Models",
        "description": "Low-Rank Adaptation (LoRA) merging can efficiently combine diverse generative capabilities from multiple trained LoRAs for a diffusion model. However, existing LoRA merging techniques often suffer from severe parameter interference, causing destructive collisions in the shared parameter space. To ad...",
        "keyPoints": [
            "Low-Rank Adaptation (LoRA) merging can efficiently combine diverse generative capabilities from mult..."
        ],
        "href": "http://arxiv.org/abs/2606.10617v1",
        "paperLink": "SSR-Merge: Subspace Signal Routing for Training-Fr"
    },
    {
        "num": 4,
        "tag": "CV",
        "title": "GaussTrace: Provenance Analysis of 3D Gaussian Splatting Models with Evidence-based LLM Reasoning",
        "description": "3D Gaussian Splatting (3DGS) is a powerful technique for creating high-fidelity 3D assets. However, the widespread sharing and iterative modification of 3DGS models across digital platforms create pressing challenges for intellectual property protection and forensic traceability. To address this, we...",
        "keyPoints": [
            "3D Gaussian Splatting (3DGS) is a powerful technique for creating high-fidelity 3D assets. However, ..."
        ],
        "href": "http://arxiv.org/abs/2606.10612v1",
        "paperLink": "GaussTrace: Provenance Analysis of 3D Gaussian Spl"
    }
],
    worthReading: [
    {
        "num": 5,
        "title": "HarmoView: Harmonizing Multi-View Constraints for Identity-Consistent Video Generation",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10839v1",
        "description": "Current identity-consistent video generation methods struggle to preserve appearance fidelity under large viewpoint changes. While introducing multi-view reference input offers a natural solution, pro..."
    },
    {
        "num": 6,
        "title": "Earth-OneVision: Extending Remote Sensing Multimodal Large Language Models to More Sensor Modalities and Tasks",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10819v1",
        "description": "RS-MLLMs enable natural-language understanding and spatial reasoning over earth observation imagery. However, existing models support only a narrow range of sensor types and tasks, yielding a fragment..."
    },
    {
        "num": 7,
        "title": "IMPACT: Learning Internal-Model Predictive Control for Forceful Robotic Manipulation",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10818v1",
        "description": "Real-world robotic manipulation tasks often involve forceful interactions with the environment, such as using tools of varying weights, transporting objects with different masses, and performing conta..."
    },
    {
        "num": 8,
        "title": "LIBERO-Occ: Evaluating and Improving Vision-Language-Action Models under Scene-Induced Occlusion via Viewpoint Imagination",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10862v1",
        "description": "Vision-Language-Action (VLA) models achieve strong performance on standard manipulation benchmarks, but most evaluations assume that task-relevant objects are fully visible. This assumption often fail..."
    },
    {
        "num": 9,
        "title": "Vector Map as Language: Toward Unified Remote Sensing Vector Mapping",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10701v1",
        "description": "Remote sensing vector mapping aims to generate structured maps of geospatial entities, such as buildings, roads, and water bodies, from remote sensing imagery. In practice, vector maps usually contain..."
    },
    {
        "num": 10,
        "title": "Improving Text-Instance Alignment Of Foreground Conditioned Out-Painting Via Customized Concept Embedding",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10892v1",
        "description": "To showcase products, merchants often incur substantial costs creating high-quality display images. Foreground Conditioned Outpainting (FCO) meets this demand, allowing users to create desired backgro..."
    }
],
    observation: "本周论文聚焦于视频生成和角色动画领域的技术突破。SCAIL-2 的端到端角色动画方法通过直接拼接驱动视频，避免了传统姿态骨架带来的信息损失；HarmoView 的多视角约束框架解决了身份一致视频生成中的大视角变化问题。这些进展对于音乐驱动舞蹈视频生成具有直接参考价值——特别是端到端运动迁移和身份保持技术。",
  },
  en: {
    roleName: "Computer Vision Researcher",
    title: "Character Animation & Video Generation: New Advances in End-to-End Control",
    overview: [
      "SCAIL-2 proposes end-to-end character animation framework bypassing intermediate representations",
      "HarmoView achieves identity-consistent video generation through multi-view constraints",
      "SSR-Merge solves parameter interference in LoRA merging for training-free capability composition",
      "GaussTrace provides provenance analysis framework for 3D Gaussian Splatting models"
    ],
    papers: [
    {
        "num": 1,
        "tag": "CV",
        "title": "SCAIL-2: Unifying Controlled Character Animation with End-to-end In-Context Conditioning",
        "description": "Controlled character animation requires transferring motion from a driving sequence to a reference character. Prior works heavily rely on intermediate representations, including pose skeletons to represent motion or masked background to represent environment, which inevitably leads to information lo...",
        "keyPoints": [
            "Controlled character animation requires transferring motion from a driving sequence to a reference c..."
        ],
        "href": "http://arxiv.org/abs/2606.10804v1",
        "paperLink": "SCAIL-2: Unifying Controlled Character Animation w"
    },
    {
        "num": 2,
        "tag": "CV",
        "title": "A Multimodal RGB and Events Dataset for Hand Detection in First-Person View",
        "description": "Existing hand detection algorithms work on images and the detection rate is restricted by the frame rate of the camera. In hand detection applications for moving robotic systems, conventional cameras cause motion blur, especially in darker lighting conditions. We can leverage the use of event-based ...",
        "keyPoints": [
            "Existing hand detection algorithms work on images and the detection rate is restricted by the frame ..."
        ],
        "href": "http://arxiv.org/abs/2606.10790v1",
        "paperLink": "A Multimodal RGB and Events Dataset for Hand Detec"
    },
    {
        "num": 3,
        "tag": "CV",
        "title": "SSR-Merge: Subspace Signal Routing for Training-Free LoRA Merging in Diffusion Models",
        "description": "Low-Rank Adaptation (LoRA) merging can efficiently combine diverse generative capabilities from multiple trained LoRAs for a diffusion model. However, existing LoRA merging techniques often suffer from severe parameter interference, causing destructive collisions in the shared parameter space. To ad...",
        "keyPoints": [
            "Low-Rank Adaptation (LoRA) merging can efficiently combine diverse generative capabilities from mult..."
        ],
        "href": "http://arxiv.org/abs/2606.10617v1",
        "paperLink": "SSR-Merge: Subspace Signal Routing for Training-Fr"
    },
    {
        "num": 4,
        "tag": "CV",
        "title": "GaussTrace: Provenance Analysis of 3D Gaussian Splatting Models with Evidence-based LLM Reasoning",
        "description": "3D Gaussian Splatting (3DGS) is a powerful technique for creating high-fidelity 3D assets. However, the widespread sharing and iterative modification of 3DGS models across digital platforms create pressing challenges for intellectual property protection and forensic traceability. To address this, we...",
        "keyPoints": [
            "3D Gaussian Splatting (3DGS) is a powerful technique for creating high-fidelity 3D assets. However, ..."
        ],
        "href": "http://arxiv.org/abs/2606.10612v1",
        "paperLink": "GaussTrace: Provenance Analysis of 3D Gaussian Spl"
    }
],
    worthReading: [
    {
        "num": 5,
        "title": "HarmoView: Harmonizing Multi-View Constraints for Identity-Consistent Video Generation",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10839v1",
        "description": "Current identity-consistent video generation methods struggle to preserve appearance fidelity under large viewpoint changes. While introducing multi-view reference input offers a natural solution, pro..."
    },
    {
        "num": 6,
        "title": "Earth-OneVision: Extending Remote Sensing Multimodal Large Language Models to More Sensor Modalities and Tasks",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10819v1",
        "description": "RS-MLLMs enable natural-language understanding and spatial reasoning over earth observation imagery. However, existing models support only a narrow range of sensor types and tasks, yielding a fragment..."
    },
    {
        "num": 7,
        "title": "IMPACT: Learning Internal-Model Predictive Control for Forceful Robotic Manipulation",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10818v1",
        "description": "Real-world robotic manipulation tasks often involve forceful interactions with the environment, such as using tools of varying weights, transporting objects with different masses, and performing conta..."
    },
    {
        "num": 8,
        "title": "LIBERO-Occ: Evaluating and Improving Vision-Language-Action Models under Scene-Induced Occlusion via Viewpoint Imagination",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10862v1",
        "description": "Vision-Language-Action (VLA) models achieve strong performance on standard manipulation benchmarks, but most evaluations assume that task-relevant objects are fully visible. This assumption often fail..."
    },
    {
        "num": 9,
        "title": "Vector Map as Language: Toward Unified Remote Sensing Vector Mapping",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10701v1",
        "description": "Remote sensing vector mapping aims to generate structured maps of geospatial entities, such as buildings, roads, and water bodies, from remote sensing imagery. In practice, vector maps usually contain..."
    },
    {
        "num": 10,
        "title": "Improving Text-Instance Alignment Of Foreground Conditioned Out-Painting Via Customized Concept Embedding",
        "tag": "CV",
        "href": "http://arxiv.org/abs/2606.10892v1",
        "description": "To showcase products, merchants often incur substantial costs creating high-quality display images. Foreground Conditioned Outpainting (FCO) meets this demand, allowing users to create desired backgro..."
    }
],
    observation: "This week's papers focus on technical breakthroughs in video generation and character animation. SCAIL-2's end-to-end character animation method avoids information loss from traditional pose skeletons by directly concatenating driving videos; HarmoView's multi-view constraint framework addresses large viewpoint changes in identity-consistent video generation. These advances have direct relevance for music-driven dance video generation—particularly end-to-end motion transfer and identity preservation techniques.",
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    alternates: {
      languages: {
        'zh-CN': `/zh/daily/cv-researcher/20260609`,
        'en': `/en/daily/cv-researcher/20260609`,
      },
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout
      locale={locale}
      date="2026-06-09"
      roleId="cv-researcher"
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

      {c.observation ? (
        <Observation>
          <p>{c.observation}</p>
        </Observation>
      ) : null}
    </DigestLayout>
  )
}
