import React from "react"
import { Container, Spacer, Grid, Row, Text, Button } from "@nextui-org/react"
import { Header } from "../Header"
import NextImage from "next/image"
import Image1 from "../../../../public/assets/images/1.png"
import Image2 from "../../../../public/assets/images/2.png"
import Image3 from "../../../../public/assets/images/3.png"

export const Home = () => {
    return (
        <>
            <Container lg css={{ py: 20 }}>
                <Header />
                <Hero />
                <Features />
            </Container>
            <Brand />
            <CTA />
        </>
    )
}

const Hero = () => {
    return (
        <Container gap={0} css={{ py: 160 }} justify="center">
            <Row justify="center" css={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
                <Text h1 css={{ lineHeight: "3.6rem" }}>
                    Easy way to manage regulated equipments for B2B and B2C
                </Text>
            </Row>
            <Spacer y={1} />
            <Row justify="center">
                <Text>
                    Drive performance and your cross-functional collaboration with easy-to-use dashboard, data visualization and automated
                    insight tools.
                </Text>
            </Row>
            <Spacer y={1} />
            <Row justify="center">
                <Button auto>Try it free</Button>
                <Spacer x={0.5} />
                <Button bordered auto color="secondary">
                    How our platform help business
                </Button>
            </Row>
        </Container>
    )
}

const Features = () => {
    return (
        <Container gap={0} justify="center">
            <Grid.Container>
                <Grid xs={12} md={6}>
                    <Container display="flex" direction="column" justify="center" alignItems="center">
                        <Text h2 weight="bold">
                            Save time by having everything in one platform.
                        </Text>
                        <Text>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </Text>
                    </Container>
                </Grid>
                <Grid xs={12} md={6}>
                    <NextImage src={Image1} width={600} height={370} objectFit="contain" />
                </Grid>
            </Grid.Container>
            <Grid.Container css={{ marginTop: 120 }}>
                <Grid xs={12} md={6}>
                    <NextImage src={Image3} width={600} height={370} objectFit="contain" />
                </Grid>
                <Grid xs={12} md={6}>
                    <Container display="flex" direction="column" justify="center" alignItems="center">
                        <Text h2 weight="bold">
                            Mitigate risks by managing your data, equipments better and faster than before
                        </Text>
                        <Text>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </Text>
                    </Container>
                </Grid>
            </Grid.Container>
            <Grid.Container css={{ marginTop: 120 }}>
                <Grid xs={12} md={6}>
                    <Container display="flex" direction="column" justify="center" alignItems="center">
                        <Text h2 weight="bold">
                            Save time by having everything in one platform
                        </Text>
                        <Text>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
                            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </Text>
                    </Container>
                </Grid>
                <Grid xs={12} md={6}>
                    <NextImage src={Image2} width={600} height={370} objectFit="contain" />
                </Grid>
            </Grid.Container>
        </Container>
    )
}

const Brand = () => {
    return (
        <Grid.Container css={{ bg: "$primary", mt: 160 }}>
            <Container lg gap={0} css={{ py: 60 }} justify="center">
                <Grid.Container>
                    <Grid xs={12} md={6}>
                        <Text h2 color="white">
                            Over 200+ teams and individuals worldwide using safelyfy
                        </Text>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Text color="white">
                            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi
                            optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
                            dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
                            et voluptates repudiandae sint et molestiae non recusandae.
                        </Text>
                    </Grid>
                </Grid.Container>
            </Container>
        </Grid.Container>
    )
}

const CTA = () => {
    return (
        <Grid.Container css={{ bg: "$accents9" }}>
            <Container lg gap={0} css={{ py: 60 }} justify="center">
                <Row>
                    <Text h2 color="white">
                        Are you ready to manage your data 10x faster than before ?
                    </Text>
                </Row>
                <Row>
                    <Text color="white">
                        Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
                        cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
                        repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et
                        voluptates repudiandae sint et molestiae non recusandae.
                    </Text>
                </Row>
            </Container>
        </Grid.Container>
    )
}
