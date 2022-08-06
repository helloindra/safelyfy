import React from "react"
import { Grid, Link, Text, Spacer, Button } from "@nextui-org/react"
import NextLink from "next/link"

export const Header = () => {
    return (
        <Grid.Container>
            <Grid xs={6} md={4} alignItems="center">
                <Text h5>Safelyfy</Text>
            </Grid>
            <Grid xs={0} md={4} justify="center" alignItems="center">
                <Text h5 size={15}>
                    About
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15}>
                    Features
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15}>
                    Pricing
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15}>
                    Resources
                </Text>
                <Spacer x={1.5} />
                <Text h5 size={15}>
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
