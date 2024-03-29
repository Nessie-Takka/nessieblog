import Container from "components/container"
import ConvertBody from "components/convert-body"
import PostBody from "components/post-body"
import PostCategories from "components/post-categories"
import PostHeader from "components/post-header"
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "components/two-column"
import { getAllSlugs, getPostBySlug } from "lib/api"
import Image from 'next/image'
import { extractText } from "lib/extract-text"
import Meta from "components/meta"
import { eyecatchLocal } from "lib/constants"
import { prevNextPost } from "lib/prev-next-post"
import Pagination from "components/pagenation"
//ADD
import { load } from "cheerio"
import hljs from "highlight.js"
import "highlight.js/styles/github-dark.css"

export default function Post({
    title,
    publish,
    content,
    eyecatch,
    categories,
    description,
    prevPost,
    nextPost
}) {
    return (
        <Container>
            <Meta
                pageTitle={title}
                pageDesc={description}
                pageImg={eyecatch.url}
                pageImgW={eyecatch.width}
                pageImgH={eyecatch.height}
            />
            <article>
                <PostHeader title={title} subtitle="ブログ記事" publish={publish} />
                <figure>
                    {<Image
                        src={eyecatch.url}
                        key={eyecatch.url}
                        alt=""
                        layout="responsive"
                        width={eyecatch.width}
                        height={eyecatch.height}
                        sizes="(min-width: 1152px) 1152px, 100vw"
                        priority
                    />}
                </figure>

                <TwoColumn>
                    <TwoColumnMain>
                        <PostBody>
                            <ConvertBody contentHTML={content} />
                        </PostBody>
                    </TwoColumnMain>
                    <TwoColumnSidebar>
                        <PostCategories categories={categories} />
                    </TwoColumnSidebar>
                </TwoColumn>
                <Pagination
                    prevText={prevPost.title}
                    prevUrl={`/blog/${prevPost.slug}`}
                    nextText={nextPost.title}
                    nextUrl={`/blog/${nextPost.slug}`}
                />
            </article>
        </Container>
    )
}

export async function getStaticPaths() {
    const allSlugs = await getAllSlugs()

    return {
        paths: allSlugs.map(({ slug }) => `/blog/${slug}`),
        fallback: false,
    }
}


export async function getStaticProps(context) {
    const slug = context.params.slug
    const post = await getPostBySlug(slug)
    const description = extractText(post.content)
    const eyecatch = post.eyecatch ?? eyecatchLocal
    const allSlugs = await getAllSlugs()
    const [prevPost, nextPost] = prevNextPost(allSlugs, slug)

    //ADD
    const $ = load(post.content);
    $('pre code').each((_, elm) => {
        const result = hljs.highlightAuto($(elm).text())
        $(elm).html(result.value)
        $(elm).addClass('hljs')
        $(elm).addClass('language-' + result.language)
        $(elm).attr('data-lang', result.language)
        $(elm).attr('data-light', result.language)
        $(elm).attr('data-dark', result.language)
    })

    post.content = $.html();
    //ADD

    return {
        props: {
            title: post.title,
            publish: post.publishDate,
            content: post.content,
            eyecatch: eyecatch,
            categories: post.categories,
            description: description,
            prevPost: prevPost,
            nextPost: nextPost,
        },
    }
}