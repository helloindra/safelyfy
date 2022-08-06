import React from "react"
import { Grid, Text, Container, Row, Link, Checkbox, Button, Spacer, Input } from "@nextui-org/react"
import { useMediaQuery } from "react-responsive"

export const Setup = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })

    return (
        <Container gap={isDesktop ? 0 : 4} display="flex" alignItems="center" alignContent="center" css={{ height: "100vh" }}>
            <Container fluid css={{ width: 500 }}>
                <Text h1>Workspace setup</Text>
                <Text>Welcome back! Please enter your details.</Text>
                <Spacer y={2} />
                <Input
                    fullWidth
                    clearable
                    label="Workspace name"
                    placeholder="use your company name as workspace name"
                    animated={false}
                    bordered
                />
                <Spacer y={1} />
                <Button css={{ width: "100%" }}>Submit</Button>
                <Spacer y={1} />
                <Row>
                    <Text h6>Why we need this ?</Text>
                    <Spacer x={0.2} />
                    <Link>
                        <Text h6 color="primary">
                            Read here
                        </Text>
                    </Link>
                </Row>
            </Container>
        </Container>
    )
}
