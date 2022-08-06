import { Grid, Container, Row, Link, Text, Spacer, Avatar, User, Button } from "@nextui-org/react"
import { Iconly } from "react-iconly"

export const DashboardOverview = () => {
    return (
        <Grid.Container>
            <Grid
                xs={3}
                css={{
                    bg: "$accents0",
                    padding: 40,
                    borderRight: "2px $accents2 solid",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                }}
            >
                <Container>
                    <Row>
                        <Iconly name="Plus" set="light" primaryColor="#6b7280" />
                        <Spacer x={0.5} />
                        <Text h5 color="secondary">
                            Equipments
                        </Text>
                    </Row>
                    <Spacer y={0.5} />
                    <Row>
                        <Text h2>22</Text>
                    </Row>
                    <Row>
                        <Text h6>Total in your data</Text>
                    </Row>
                </Container>
            </Grid>
            <Grid xs={3} css={{ bg: "$accents0", padding: 40, borderRight: "2px $accents2 solid" }}>
                <Container>
                    <Row>
                        <Iconly name="TimeCircle" set="light" primaryColor="#6b7280" />
                        <Spacer x={0.5} />
                        <Text h5 color="secondary">
                            Close due in
                        </Text>
                    </Row>
                    <Spacer y={0.5} />
                    <Row>
                        <Text h2>4</Text>
                    </Row>
                    <Row>
                        <Text h6>Close to inspection date</Text>
                    </Row>
                </Container>
            </Grid>
            <Grid xs={3} css={{ bg: "$accents0", padding: 40, borderRight: "2px $accents2 solid" }}>
                <Container>
                    <Row>
                        <Iconly name="Paper" set="light" primaryColor="#6b7280" />
                        <Spacer x={0.5} />
                        <Text h5 color="secondary">
                            Invoice
                        </Text>
                    </Row>
                    <Spacer y={0.5} />
                    <Row>
                        <Text h2>82</Text>
                    </Row>
                    <Row>
                        <Text h6>Need to be paid</Text>
                    </Row>
                </Container>
            </Grid>
            <Grid xs={3} css={{ bg: "$accents0", padding: 40, borderTopRightRadius: 8, borderBottomRightRadius: 8 }}>
                <Container>
                    <Row>
                        <Iconly name="Category" set="light" primaryColor="#6b7280" />
                        <Spacer x={0.5} />
                        <Text h5 color="secondary">
                            Equipments
                        </Text>
                    </Row>
                    <Spacer y={0.5} />
                    <Row>
                        <Text h2>44</Text>
                    </Row>
                    <Row>
                        <Text h6>Need to be paid</Text>
                    </Row>
                </Container>
            </Grid>
        </Grid.Container>
    )
}
