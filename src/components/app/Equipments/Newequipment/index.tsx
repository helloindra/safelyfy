import { Grid, Container, Row, Link, Text, Spacer, Card, Input, Button, Textarea } from "@nextui-org/react"
import { Iconly } from "react-iconly"
import { useState, useEffect } from "react"
import { supabase } from "../../../../utils/supabase"

export const NewEquipments = () => {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [locationData, setLocationData] = useState<any>([])
    const [manufacturerData, setManufacturerData] = useState<any>([])
    const [equipmentData, setEquipmentData] = useState<any>([])
    const [equipmentCategoryData, setEquipmentCategoryData] = useState<any>([])
    const [submissionStatus, setSubmissionStatus] = useState({
        status: "",
        message: "",
    })

    const [equipment, setEquipment] = useState({
        ownerNumber: "",
        costCenter: "",
        location: 0,
        serialNumber: "",
        equipmentCategory: 0,
        chipId: "",
        equipmentStatus: "",
        vendorNumber: "",
        checklistId: 0,
        company: "",
        manufacturer: 0,
        inspectionDate: "",
        capacity1: 0,
        capacity2: 0,
        capacity3: 0,
        capacityUnit: "ton",
        description: "",
    })

    const handleSetEquipmentData = (event: any) => {
        console.log(event.target.name, event.target.value)
        setEquipment({ ...equipment, [event.target.name]: event.target.value })
    }

    const handleSubmitEquipment = async () => {
        const {
            ownerNumber,
            costCenter,
            location,
            serialNumber,
            equipmentCategory,
            chipId,
            equipmentStatus,
            vendorNumber,
            checklistId,
            company,
            manufacturer,
            inspectionDate,
            capacity1,
            capacity2,
            capacity3,
            capacityUnit,
            description,
        } = equipment
        console.log(equipment)
        // const { data, error } = await supabase.from("equipments").insert([
        //     {
        //         workspaceId: "b8cab7ff-a584-4dac-974f-9555fe096e33",
        //         ownerNumber,
        //         costCenter,
        //         serialNumber,
        //         chipId,
        //         equipmentStatus,
        //         vendorNumber,
        //         location: 1,
        //         equipmentCategory: Number(equipmentCategory),
        //         checklistId: Number(checklistId),
        //         company: Number(company),
        //         manufacturer: Number(manufacturer),
        //         inspectionDate,
        //         capacity: {
        //             capacity1,
        //             capacity2,
        //             capacity3,
        //             capacityUnit,
        //         },
        //         description,
        //     },
        // ])
        // console.log(data, error)
    }

    const handleFetchEquipmentData = async () => {
        const { data } = await supabase.from("equipments").select("*")
        setEquipmentData(data)
    }

    const handleFetchEquipmentCategoryData = async () => {
        const { data } = await supabase.from("equipment-category").select("*")
        setEquipmentCategoryData(data)
    }

    const handleFetchManufacturerData = async () => {
        const { data } = await supabase.from("manufacturer").select("*")
        setManufacturerData(data)
    }

    const handleFetchLocationsData = async () => {
        const { data } = await supabase.from("location").select("*")
        setLocationData(data)
    }

    useEffect(() => {
        handleFetchManufacturerData()
        handleFetchEquipmentCategoryData()
        handleFetchLocationsData()
        handleFetchEquipmentData()
    }, [])

    return (
        <Grid.Container>
            <Grid xs={12}>
                <Container gap={0} display="flex" justify="center">
                    <Spacer y={2} />
                    <Card variant="bordered" css={{ p: 32, maxW: "800px" }}>
                        <Card.Body css={{ py: 44 }}>
                            <Text h4>Add new Equipment</Text>
                            <Spacer y={1} />
                            <Container gap={0}>
                                <Row>
                                    <Input
                                        animated={false}
                                        name="ownerNumber"
                                        spellCheck={false}
                                        bordered
                                        fullWidth
                                        label="Owner Number"
                                        onChange={handleSetEquipmentData}
                                    />
                                    <Spacer x={1.5} />
                                    <Input
                                        name="costCenter"
                                        spellCheck={false}
                                        bordered
                                        fullWidth
                                        animated={false}
                                        label="Cost Center"
                                        onChange={handleSetEquipmentData}
                                    />
                                </Row>
                                <Spacer y={1} />
                                <Row>
                                    <Container gap={0}>
                                        <Text
                                            size={13.3}
                                            css={{
                                                lineHeight: "1.5",
                                                letterSpacing: "0.005em",
                                            }}
                                        >
                                            Location
                                        </Text>
                                        <Spacer y={0.3} />
                                        <select name="location" onChange={handleSetEquipmentData}>
                                            <option value={9999}>Choose one</option>
                                            {locationData.map((item: any) => {
                                                console.log(item)
                                                return <option value={item.id}>{item.data.name}</option>
                                            })}
                                        </select>
                                    </Container>
                                    <Spacer x={1.5} />
                                    <Input
                                        name="serialNumber"
                                        spellCheck={false}
                                        bordered
                                        fullWidth
                                        animated={false}
                                        label="Serial No."
                                        onChange={handleSetEquipmentData}
                                    />
                                </Row>
                                <Spacer y={1} />
                                <Row>
                                    <Container gap={0}>
                                        <Text
                                            size={13.3}
                                            css={{
                                                letterSpacing: "0.005em",
                                            }}
                                        >
                                            Equipment Category
                                        </Text>
                                        <Spacer y={0.3} />
                                        <select name="equipmentCategory" onChange={handleSetEquipmentData}>
                                            <option value={9999}>Choose one</option>
                                            {equipmentCategoryData.map((item: any) => {
                                                return <option value={item.id}>{item.name}</option>
                                            })}
                                        </select>
                                    </Container>
                                    <Spacer x={1.5} />
                                    <Input
                                        name="chipId"
                                        spellCheck={false}
                                        bordered
                                        fullWidth
                                        animated={false}
                                        label="Chip Id"
                                        onChange={handleSetEquipmentData}
                                    />
                                </Row>
                                <Spacer y={1} />
                                <Row>
                                    <Container gap={0}>
                                        <Text
                                            size={13.3}
                                            css={{
                                                letterSpacing: "0.005em",
                                            }}
                                        >
                                            Equipment Status
                                        </Text>
                                        <Spacer y={0.3} />
                                        <select name="equipmentStatus" onChange={handleSetEquipmentData}>
                                            <option value="Choose one">Choose one</option>
                                            <option value="Pending Report">Pending Report</option>
                                            <option value="Unsafe">Unsafe</option>
                                        </select>
                                    </Container>
                                    <Spacer x={1.5} />
                                    <Input
                                        name="vendorNumber"
                                        spellCheck={false}
                                        bordered
                                        fullWidth
                                        animated={false}
                                        label="Vendor No."
                                        onChange={handleSetEquipmentData}
                                    />
                                </Row>
                                <Spacer y={1} />
                                <Row>
                                    <Container gap={0}>
                                        <Text
                                            size={13.3}
                                            css={{
                                                letterSpacing: "0.005em",
                                            }}
                                        >
                                            Checklist Id
                                        </Text>
                                        <Spacer y={0.3} />
                                        <select name="checklistId" onChange={handleSetEquipmentData}>
                                            <option value={9999}>Choose one</option>
                                            <option value={0}>0</option>
                                            <option value={1}>1</option>
                                        </select>
                                    </Container>
                                    <Spacer x={1.5} />
                                    <Input
                                        name="company"
                                        spellCheck={false}
                                        bordered
                                        fullWidth
                                        animated={false}
                                        label="Company"
                                        onChange={handleSetEquipmentData}
                                    />
                                </Row>
                                <Spacer y={1} />
                                <Row>
                                    <Container gap={0}>
                                        <Text
                                            size={13.3}
                                            css={{
                                                letterSpacing: "0.005em",
                                            }}
                                        >
                                            Manufacturer
                                        </Text>
                                        <Spacer y={0.3} />
                                        <select name="manufacturer" onChange={handleSetEquipmentData}>
                                            <option value={9999}>Choose one</option>
                                            {manufacturerData.map((item: any) => {
                                                return <option value={item.id}>{item.data.name}</option>
                                            })}
                                        </select>
                                    </Container>
                                    <Spacer x={1.5} />
                                    <Input
                                        type="date"
                                        name="inspectionDate"
                                        spellCheck={false}
                                        bordered
                                        fullWidth
                                        animated={false}
                                        label="Inspection Date"
                                        onChange={(e) => setEquipment({ ...equipment, inspectionDate: e.target.value })}
                                    />
                                </Row>
                                <Spacer y={1} />
                                <Row>
                                    <Container gap={0}>
                                        <Row>
                                            <Input
                                                type="number"
                                                name="capacity1"
                                                spellCheck={false}
                                                bordered
                                                fullWidth
                                                animated={false}
                                                label="Capacity 1"
                                                onChange={handleSetEquipmentData}
                                            />
                                            <Spacer x={1} />
                                            <Input
                                                type="number"
                                                name="capacity2"
                                                spellCheck={false}
                                                bordered
                                                fullWidth
                                                animated={false}
                                                label="Capacity 2"
                                                onChange={handleSetEquipmentData}
                                            />
                                            <Spacer x={1} />
                                            <Input
                                                type="number"
                                                name="capacity3"
                                                spellCheck={false}
                                                bordered
                                                fullWidth
                                                animated={false}
                                                label="Capacity 3"
                                                onChange={handleSetEquipmentData}
                                            />
                                        </Row>
                                    </Container>
                                    <Spacer x={1.5} />
                                    <Container gap={0}>
                                        <Text
                                            size={13.3}
                                            css={{
                                                letterSpacing: "0.005em",
                                            }}
                                        >
                                            Capacity Unit
                                        </Text>
                                        <Spacer y={0.3} />
                                        <select name="capacityUnit" onChange={handleSetEquipmentData}>
                                            <option value={9999}>Choose one</option>
                                            <option value={0}>Ton</option>
                                            <option value={1}>Kg</option>
                                        </select>
                                    </Container>
                                </Row>
                                <Spacer y={1} />
                                <Row>
                                    <Container gap={0}>
                                        <Row>
                                            <Textarea
                                                name="description"
                                                spellCheck={false}
                                                bordered
                                                fullWidth
                                                animated={false}
                                                minRows={3}
                                                placeholder="Description"
                                                label="Description"
                                                onChange={handleSetEquipmentData}
                                            />
                                        </Row>
                                    </Container>
                                </Row>
                                <Spacer y={1} />
                                <Row justify="flex-end">
                                    <Button auto onClick={handleSubmitEquipment}>
                                        Submit Equipment
                                    </Button>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Container>
            </Grid>
        </Grid.Container>
    )
}
