import { Grid, Container, Row, Text, Spacer, Table, Link, Textarea, Button, Card, Loading, Modal, Input } from "@nextui-org/react"
import React, { useState, useEffect } from "react"
import { supabase } from "../../../utils/supabase"
import { Sidemenu } from "../Sidemenu"
export const EquipmentCategory = () => {
    const [openSubmission, setOpenSubmission] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selection, setSelection] = useState({
        key: 0,
        isSelected: false,
    })
    const [data, setData] = useState([])
    const [originalData, setOriginalData] = useState<any>([])
    const columns = [
        {
            key: "name",
            label: "Name",
        },
        {
            key: "description",
            label: "Description",
        },
        {
            key: "parentCategory",
            label: "Parent Category",
        },
        {
            key: "defaultSchedule",
            label: "Default Schedule",
        },
    ]

    const [submissionStatus, setSubmissionStatus] = useState({
        status: "",
        message: "",
    })

    const [equipmentCategory, setEquipmentCategory] = useState({
        name: "",
        description: "",
        parentCategory: 0,
        defaultSchedule: 1,
    })

    const handleSetEquipmentCategoryData = (event: any) => {
        console.log(event.target.name, event.target.value)
        setEquipmentCategory({ ...equipmentCategory, [event.target.name]: event.target.value })
    }

    const handleSelection = (selection: any) => {
        if (selection.size != 0) {
            setSelection({
                key: Number(selection.currentKey),
                isSelected: true,
            })
        } else {
            setSelection({
                key: 0,
                isSelected: false,
            })
        }
    }

    const handleFetchingData = async () => {
        setLoading(true)
        const { data, error } = await supabase.from("equipment-category").select("*")
        if (data) {
            setOriginalData(data)
            let tempData: any = []
            setLoading(false)
            data.forEach((item: any, index: number) => {
                const cat = originalData.find((cat: any) => cat.id == item.parentCategory)
                console.log("originalData", originalData, cat)
                if (cat) {
                    tempData.push({
                        key: index,
                        name: item.name,
                        description: item.description,
                        parentCategory: cat.name,
                        defaultSchedule: `${item.defaultSchedule} months`,
                    })
                } else {
                    tempData.push({
                        key: index,
                        name: item.name,
                        description: item.description,
                        parentCategory: item.parentCategory,
                        defaultSchedule: `${item.defaultSchedule} months`,
                    })
                }
                setData(tempData)
            })
        }
        if (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const handleDeleteItemInEquipmentCategory = async () => {
        const key = Number(selection.key)
        const { data, error }: any = await supabase.from("equipment-category").select("*")
        if (data) {
            const deletedKey = data[key].id
            const { data: DeleteData, error: ErrorData } = await supabase.from("equipment-category").delete().match({ id: deletedKey })
            if (DeleteData) {
                handleFetchingData()
            }
            if (ErrorData) {
                console.error(error)
            }
        }
        if (error) {
            console.error(error)
        }
    }

    const handleSubmitEquipmentCategory = async () => {
        setLoading(true)
        console.log(equipmentCategory)
        const { name, description, parentCategory, defaultSchedule } = equipmentCategory
        const { data, error } = await supabase
            .from("equipment-category")
            .insert([{ workspaceId: "b8cab7ff-a584-4dac-974f-9555fe096e33", name, description, parentCategory, defaultSchedule }])
        if (data) {
            handleFetchingData()
            setEquipmentCategory({
                name: "",
                description: "",
                parentCategory: 0,
                defaultSchedule: 0,
            })
            setLoading(false)
            setSubmissionStatus({
                status: "success",
                message: "Equipment Category submitted successfully",
            })
            setTimeout(() => {
                setSubmissionStatus({
                    status: "",
                    message: "",
                })
                setOpenSubmission(false)
            }, 2000)
        }
        if (error) {
            console.log(error)
            setLoading(false)
            setSubmissionStatus({
                status: "error",
                message: error.message,
            })
            setTimeout(() => {
                setSubmissionStatus({
                    status: "",
                    message: "",
                })
            }, 12000)
        }
    }

    useEffect(() => {
        handleFetchingData()
    }, [])

    return (
        <Container gap={0}>
            <Row align="baseline">
                <Text h2>Master Data</Text>
            </Row>
            <Grid.Container css={{ my: 50 }}>
                <Grid md={2} css={{ borderRight: "2px $accents0 solid", minHeight: 20 }}>
                    <Sidemenu />
                </Grid>
                <Grid md={10} css={{ px: 40 }}>
                    <Container gap={0}>
                        <Row justify="space-between" align="center">
                            <Grid xs={6}>
                                <Text h3>All Equipment Category</Text>
                            </Grid>
                            <Grid xs={6}>
                                <Container gap={0}>
                                    <Row justify="flex-end">
                                        {selection.isSelected && (
                                            <Button auto bordered color="error" onClick={handleDeleteItemInEquipmentCategory}>
                                                Delete
                                            </Button>
                                        )}
                                        <Spacer x={0.5} />
                                        <Button auto onClick={() => setOpenSubmission(true)}>
                                            New +
                                        </Button>
                                    </Row>
                                </Container>
                            </Grid>
                        </Row>
                        <Spacer y={1} />
                        <Table
                            showSelectionCheckboxes
                            sticked
                            bordered
                            shadow={false}
                            selectionMode="single"
                            onSelectionChange={handleSelection}
                            css={{
                                height: "auto",
                                minWidth: "100%",
                            }}
                        >
                            <Table.Header columns={columns}>
                                {(column: any) => <Table.Column key={column.key}>{column.label}</Table.Column>}
                            </Table.Header>
                            <Table.Body items={data}>
                                {(item: any) => (
                                    <Table.Row key={item.key}>{(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}</Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                    </Container>
                </Grid>
            </Grid.Container>

            {/* Modal for Submission */}
            <Modal
                width="500px"
                css={{ p: 20 }}
                closeButton
                preventClose
                aria-labelledby="modal-title"
                open={openSubmission}
                onClose={() => setOpenSubmission(false)}
            >
                <Modal.Header>
                    <Text id="modal-title" h4>
                        Add new equipment category
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        name="name"
                        spellCheck={false}
                        clearable
                        bordered
                        fullWidth
                        label="Equipment Category Name"
                        onChange={handleSetEquipmentCategoryData}
                    />
                    <Textarea
                        name="description"
                        spellCheck={false}
                        bordered
                        label="Description"
                        minRows={2}
                        maxRows={10}
                        onChange={handleSetEquipmentCategoryData}
                    />
                    <Text>Parent Category</Text>
                    <Spacer y={0} />
                    <select name="parentCategory" onChange={handleSetEquipmentCategoryData}>
                        <option value={0} selected>
                            No Parent
                        </option>
                        {originalData.map(({ id, name }: any) => {
                            return <option value={id}>{name}</option>
                        })}
                    </select>
                    <Text>Default Schedule</Text>
                    <Spacer y={0} />
                    <select name="defaultSchedule" onChange={handleSetEquipmentCategoryData}>
                        <option value={6} selected>
                            6 monthly
                        </option>
                        <option value={12}>12 monthly</option>
                        <option value={18}>18 monthly</option>
                        <option value={24}>24 monthly</option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={loading} auto flat onClick={() => setOpenSubmission(false)}>
                        Discard
                    </Button>
                    <Button disabled={loading} auto onClick={handleSubmitEquipmentCategory}>
                        {loading ? <Loading size="xs" color="primary" /> : "Submit"}
                    </Button>
                    {submissionStatus.status === "success" && !loading && (
                        <Card variant="flat" css={{ bg: "$green200" }}>
                            <Card.Body css={{ py: 12, px: 24 }}>
                                <Text h6 css={{ color: "$green800", textAlign: "center" }}>
                                    {submissionStatus.message}
                                </Text>
                            </Card.Body>
                        </Card>
                    )}
                    {submissionStatus.status === "error" && !loading && (
                        <Card variant="flat" css={{ bg: "$red200" }}>
                            <Card.Body css={{ py: 12, px: 24 }}>
                                <Text h6 css={{ color: "$red800", textAlign: "center" }}>
                                    {submissionStatus.message}
                                </Text>
                            </Card.Body>
                        </Card>
                    )}
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
