import React from "react"
import { Grid, Container, Row, Link, Text, Spacer, Avatar, User, Button } from "@nextui-org/react"
import { Iconly } from "react-iconly"
import SafelyfyLogoLight from "../../../../public/assets/safelyfylogo-light.svg"
import { NextSeo } from "next-seo"
import { useRecoilValue } from "recoil"
import { authModeState, authUserState } from "../../../core/recoil/auth"
import { useEffect } from "react"
import { useRouter } from "next/router"
import NextImage from "next/image"
import NextLink from "next/link"

export const DashboardLayout = ({ title = "Safelyfy", description, withHeader = true, children }: Props) => {
    const router = useRouter()
    const authMode = useRecoilValue(authModeState)
    const authUser = useRecoilValue(authUserState)

    useEffect(() => {
        if (authMode !== "authenticated") {
            router.push("/")
        }
    }, [])

    return (
        <>
            <NextSeo title={title} description={description} />
            <Grid.Container>
                <Grid md={2} css={{ bg: "$accents9", height: "100vh", position: "sticky", top: 0 }}>
                    <Container
                        justify="space-between"
                        alignItems="flex-start"
                        display="flex"
                        direction="column"
                        gap={0}
                        css={{ padding: 40 }}
                    >
                        <Container>
                            <NextImage src={SafelyfyLogoLight} alt="NextUI" width={140} height={50} />
                            <Spacer y={2} />
                            <NextLink href="/app">
                                <Link>
                                    <Row>
                                        <Iconly name="Chart" set="light" primaryColor="#fff" />
                                        <Spacer x={0.5} />
                                        <Text color="white">Dashboard</Text>
                                    </Row>
                                </Link>
                            </NextLink>
                            <Spacer y={1} />
                            <Link>
                                <Row>
                                    <Iconly name="EditSquare" set="light" primaryColor="#64748b" />
                                    <Spacer x={0.5} />
                                    <Text color="secondary">Inspection</Text>
                                </Row>
                            </Link>
                            <Spacer y={1} />
                            <NextLink href="/app/equipments">
                                <Link>
                                    <Row>
                                        <Iconly name="TickSquare" set="light" primaryColor="#fff" />
                                        <Spacer x={0.5} />
                                        <Text color="white">Equipments</Text>
                                    </Row>
                                </Link>
                            </NextLink>
                            <Spacer y={1} />
                            <NextLink href="/app/masterdata">
                                <Link>
                                    <Row>
                                        <Iconly name="Graph" set="light" primaryColor="#fff" />
                                        <Spacer x={0.5} />
                                        <Text color="white">Master Data</Text>
                                    </Row>
                                </Link>
                            </NextLink>
                            <Spacer y={2} />
                            {/* <Link > */}
                            <Row>
                                <Iconly name="Buy" set="light" primaryColor="#64748b" />
                                <Spacer x={0.5} />
                                <Text color="secondary">Store</Text>
                            </Row>
                            {/* </Link> */}
                            <Spacer y={1} />
                            {/* <Link> */}
                            <Row>
                                <Iconly name="TwoUsers" set="light" primaryColor="#64748b" />
                                <Spacer x={0.5} />
                                <Text color="secondary">Inspectors</Text>
                            </Row>
                            {/* </Link> */}
                        </Container>
                        <Container>
                            <Link>
                                <Row>
                                    <Iconly name="Message" set="light" primaryColor="#64748b" />
                                    <Spacer x={0.5} />
                                    <Text color="secondary">Contact us</Text>
                                </Row>
                            </Link>
                            <Spacer y={1} />
                            <NextLink href="/app/settings">
                                <Link>
                                    <Row>
                                        <Iconly name="Setting" set="light" primaryColor="#fff" />
                                        <Spacer x={0.5} />
                                        <Text color="white">Settings</Text>
                                    </Row>
                                </Link>
                            </NextLink>
                            <Spacer y={1} />
                            <Link>
                                <Row>
                                    <Iconly name="Logout" set="light" primaryColor="#fff" />
                                    <Spacer x={0.5} />
                                    <Text color="white">Logout</Text>
                                </Row>
                            </Link>
                        </Container>
                    </Container>
                </Grid>
                <Grid md={10} css={{ py: 40, px: 80, minH: "100vh", overflow: "auto" }} direction="column">
                    {withHeader && (
                        <Grid.Container>
                            <Grid md={6} direction="column">
                                <Text h2 css={{ width: "fit-content" }}>
                                    Welcome back, Indra
                                </Text>
                                <Text size={15}>Here's overview of your dashboard</Text>
                            </Grid>
                            <Grid md={6}>
                                <Container gap={0}>
                                    <Row align="center" justify="flex-end">
                                        <Link color="secondary">
                                            <Iconly name="Search" set="light" />
                                        </Link>
                                        <Spacer x={1} />
                                        <Link color="secondary">
                                            <Iconly name="Notification" set="light" />
                                        </Link>
                                        <Spacer x={0.5} />
                                        <User src={authUser.avatar} name={`${authUser.firstName} ${authUser.lastName}`} />
                                    </Row>
                                </Container>
                            </Grid>
                        </Grid.Container>
                    )}
                    <Container gap={0} css={{ my: withHeader ? 40 : 0 }}>
                        {children}
                    </Container>
                </Grid>
            </Grid.Container>
        </>
    )
}

interface Props {
    title?: string
    description?: string
    withHeader?: boolean
    children: React.ReactNode
}
