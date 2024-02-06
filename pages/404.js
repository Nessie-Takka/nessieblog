import Meta from "components/meta";
import Container from "components/container";
import Hero from "components/hero";

export default function NotFoundPage() {
    return(
        <Container>
            <Meta pageTitle="404 - Page Not Found" />
            <Hero title="404" subtitle="お探しのページは見つかりませんでした。"/>
        </Container>
    )
}