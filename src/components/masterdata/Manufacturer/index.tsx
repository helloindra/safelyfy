import { Grid, Container, Row, Text, Spacer, Table, Link, Textarea, Button, Card, Loading, Modal, Input } from "@nextui-org/react"
import React, { useState, useEffect } from "react"
import { supabase } from "../../../utils/supabase"
import { Sidemenu } from "../Sidemenu"
import { authUserState } from "../../../core/recoil/auth"
import { useRecoilValue } from "recoil"

export const Manufacturer = () => {
    const authUser = useRecoilValue(authUserState)
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
            key: "website",
            label: "Website",
        },
    ]

    const [submissionStatus, setSubmissionStatus] = useState({
        status: "",
        message: "",
    })

    const [manufacturer, setManufacturer] = useState({
        name: "",
        description: "",
        website: "",
    })

    const handleSetManufacturerData = (event: any) => {
        console.log(event.target.name, event.target.value)
        setManufacturer({ ...manufacturer, [event.target.name]: event.target.value })
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
        const { data, error } = await supabase.from("manufacturer").select("*").eq("workspaceId", authUser.workspaceId)
        if (data) {
            setOriginalData(data)
            let tempData: any = []
            setLoading(false)
            data.forEach((item: any, index: number) => {
                tempData.push({
                    key: index,
                    name: item.data.name,
                    description: item.data.description,
                    website: item.data.website,
                })
            })
            setData(tempData)
        }
        if (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const handleDeleteItemInManufacturer = async () => {
        const key = Number(selection.key)
        const { data, error }: any = await supabase.from("manufacturer").select("*").eq("workspaceId", authUser.workspaceId)
        if (data) {
            const deletedKey = data[key].id
            const { data: DeleteData, error: ErrorData } = await supabase.from("manufacturer").delete().match({ id: deletedKey })
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

    const handleSubmitManufacturer = async () => {
        setLoading(true)
        const { name, description, website } = manufacturer
        const { data, error } = await supabase.from("manufacturer").insert([
            {
                workspaceId: "b8cab7ff-a584-4dac-974f-9555fe096e33",
                data: {
                    name,
                    description,
                    website,
                },
            },
        ])
        if (data) {
            handleFetchingData()
            setManufacturer({
                name: "",
                description: "",
                website: "",
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
                                <Text h3>All Manufacturer</Text>
                            </Grid>
                            <Grid xs={6}>
                                <Container gap={0}>
                                    <Row justify="flex-end">
                                        {selection.isSelected && (
                                            <Button auto bordered color="error" onClick={handleDeleteItemInManufacturer}>
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
                        Manufacturer
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        name="name"
                        spellCheck={false}
                        clearable
                        bordered
                        fullWidth
                        label="Manufacturer Name"
                        onChange={handleSetManufacturerData}
                    />
                    <Textarea
                        name="description"
                        spellCheck={false}
                        bordered
                        label="Description"
                        minRows={2}
                        maxRows={10}
                        onChange={handleSetManufacturerData}
                    />
                    <Input
                        name="website"
                        spellCheck={false}
                        clearable
                        bordered
                        fullWidth
                        label="Website"
                        onChange={handleSetManufacturerData}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={loading} auto flat onClick={() => setOpenSubmission(false)}>
                        Discard
                    </Button>
                    <Button disabled={loading} auto onClick={handleSubmitManufacturer}>
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
