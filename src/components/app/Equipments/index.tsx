import { Grid, Container, Row, Link, Text, Spacer, Avatar, User, Button } from "@nextui-org/react"
import { Iconly } from "react-iconly"
import { useState, useEffect } from "react"
import { supabase } from "../../../utils/supabase"

export const Equipments = ({ addButton }: Props) => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const handleFetchEquipmentData = async () => {
        const { data } = await supabase.from("equipments").select("*")
        console.log(data)
    }

    useEffect(() => {
        handleFetchEquipmentData()
    }, [])

    return (
        <Grid.Container>
            <Grid xs={12}>
                <Container gap={0}>
                    <Row justify="space-between" align="center">
                        <Text h4>All Equipments</Text>
                        <Button auto onClick={addButton}>
                            + New Equipment
                        </Button>
                    </Row>
                    <Spacer y={0.5} />

                    <Row></Row>
                </Container>
            </Grid>
        </Grid.Container>
    )
}

interface Props {
    addButton: () => void
}
