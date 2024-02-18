import Contact from "components/contact"
import Container from "components/container"
import Hero from "components/hero"
import PostBody from "components/post-body"
import { TwoColumn, TwoColumnMain, TwoColumnSidebar } from "components/two-column"
import Image from 'next/image'
import eyecatch from 'images/about.jpg'
import Meta from "components/meta"
//import eyecatch from 'images/about.jpg'

export default function About() {
    return (
        <Container>
            <Meta pageTitle="自己紹介"
                pageDesc="このサイトについて"
                pageImg={eyecatch.src}
                pageImgW={eyecatch.width}
                pageImgH={eyecatch.height}
            />
            <Hero
                title="About"
                subtitle="自己紹介"
            />
            <figure>
                <Image
                    src={eyecatch}
                    alt=""
                    layout="responsive"
                    sizes="(min-width: 1152px) 1152px, 100vw"
                    priority
                    placeholder="blur"
                />
            </figure>
            <TwoColumn>
                <TwoColumnMain>
                    <PostBody>
                        <p>
                            Webエンジニアを目指しているNessieと申します。
                            <br />このWebサイトは、Next.js + microCMS + Vercelを使って構築しています。
                            <br />作成期間は約2ヶ月です。
                            <br />現在、Javascript、React、Next.jsを中心に自己学習を進めています。
                            <br />
                            <br />理系の大学院を卒業後、研究用の試薬ルートセールスを経験し、
                            <br />看護師として精神科病院に勤務。
                            <br />その後IT業界に興味を持ち、ITコンサル系企業にエンジニアとして勤務しています。
                            <br />JavascriptをベースとしたGoogle App Scriptによる開発・kintoneでの開発経験があります。
                            <br />その他には、QliksenseなどのBIツールを用いた開発などを経験してきました。
                            <br />
                            <br />現在の企業に就職する以前から、HTML/CSS、PHP、Javascript等を用いたWebサイト開発をスクールで学んでおり、
                            <br />その時の経験が楽しかったことを思い出し、フロントエンドエンジニアとして活躍したいという思いがあります。
                        </p>
                    </PostBody>
                </TwoColumnMain>

                <TwoColumnSidebar>
                    <Contact />
                </TwoColumnSidebar>
            </TwoColumn>
        </Container>
    )
}