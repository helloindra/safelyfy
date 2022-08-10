import React from "react"
import { Grid, Link, Text, Spacer, Button } from "@nextui-org/react"
import NextLink from "next/link"
import NextImage from "next/image"
import SafelyfyLogo from "../../../../public/assets/safelyfylogo-dark.svg"

export const Header = () => {
    return (
        <Grid.Container>
            <Grid xs={6} md={4} alignItems="center">
                <NextImage src={SafelyfyLogo} alt="NextUI" width={140} height={50} />
            </Grid>
            <Grid xs={0} md={4} justify="center" alignItems="center">
                <Text h5 size={15} css={{ color: "$accents5" }}>
                    About
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15} css={{ color: "$accents5" }}>
                    Features
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15} css={{ color: "$accents5" }}>
                    Pricing
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15} css={{ color: "$accents5" }}>
                    Resources
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15} css={{ color: "$accents5" }}>
                    Contact
                </Text>
            </Grid>
            <Grid xs={6} md={4} justify="flex-end" alignItems="center">
                <Link>
                    <Text h5 size={15} color="secondary">
                        Sign up
                    </Text>
                </Link>
                <Spacer x={0.5} />
                <NextLink href="/app">
                    <Button auto>Get started</Button>
                </NextLink>
            </Grid>
        </Grid.Container>
    )
}
