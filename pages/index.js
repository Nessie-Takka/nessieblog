import Hero from "components/hero"
import Container from "components/container"
import Meta from "components/meta"
import Posts from "components/posts"
import Pagination from "components/pagenation"
import { getAllPosts } from "lib/api"
import { getPlaiceholder } from "plaiceholder"
import { eyecatchLocal } from "lib/constants"

export default function Home({ posts }) {
  return (
    <Container>
      <Meta pageTitle="TOP" />
      <Hero
        title="Nessie"
        subtitle="ポートフォリオサイト"
        imageOn
      />
      <Posts posts={posts} />
      <Pagination nextUrl="/blog" nextText="More Posts" />
    </Container>
  )
}

export async function getStaticProps() {
  const posts = await getAllPosts(6)

  for (const post of posts) {
    if (!post.hasOwnProperty('eyecatch')) {
      post.eyecatch = eyecatchLocal
    }
    const { base64 } = await getPlaiceholder(post.eyecatch.url)
    post.eyecatch.blurDataURL = base64
  }

  return {
    props: {
      posts: posts,
    },
  }
}