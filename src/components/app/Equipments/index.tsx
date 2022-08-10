import { Grid, Modal, Container, Row, Text, Spacer, Table, Button } from "@nextui-org/react"
import { Iconly } from "react-iconly"
import { useState, useEffect } from "react"
import { supabase } from "../../../utils/supabase"
import { useRecoilValue } from "recoil"
import { authUserState } from "../../../core/recoil/auth"

export const Equipments = ({ addButton }: Props) => {
    const [showModal, setShowModal] = useState(false)
    const authUser = useRecoilValue(authUserState)
    const [loading, setLoading] = useState(true)
    const [equipmentOriginalData, setEquipmentOriginalData] = useState<any>([])
    const [equipmentData, setEquipmentData] = useState<any>([])
    const [selection, setSelection] = useState({
        key: 0,
        isSelected: false,
    })

    console.log(equipmentOriginalData)

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
    const columns = [
        {
            key: "ownerNumber",
            label: "Owner Number",
        },
        {
            key: "vendorNumber",
            label: "Vendor Number",
        },
        {
            key: "company",
            label: "Company",
        },
        {
            key: "costCenter",
            label: "Cost Center",
        },
        {
            key: "serialNumber",
            label: "Serial Number",
        },
        {
            key: "chipId",
            label: "Chip Id",
        },
        {
            key: "inspectionDate",
            label: "Inspection Date",
        },
    ]

    const handleFetchEquipmentData = async () => {
        let tempData: any = []
        const { data } = await supabase.from("equipments").select("*").eq("workspaceId", authUser.workspaceId)
        if (data) {
            setEquipmentOriginalData(data)
            data.forEach((item: any, index: number) => {
                tempData.push({
                    key: index,
                    ownerNumber: item.ownerNumber,
                    vendorNumber: item.vendorNumber,
                    company: item.company,
                    costCenter: item.costCenter,
                    serialNumber: item.serialNumber,
                    chipId: item.chipId,
                    inspectionDate: item.inspectionDate,
                })
            })
            setEquipmentData(tempData)
        }
    }

    const handleDeleteItemInLocation = async () => {
        const key = Number(selection.key)
        const { data, error }: any = await supabase.from("equipments").select("*").eq("workspaceId", authUser.workspaceId)
        if (data) {
            const deletedKey = data[key].id
            const { data: DeleteData, error: ErrorData } = await supabase.from("equipments").delete().match({ id: deletedKey })
            if (DeleteData) {
                handleFetchEquipmentData()
                setSelection({
                    key: 0,
                    isSelected: false,
                })
            }
            if (ErrorData) {
                console.error(error)
            }
        }
        if (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        handleFetchEquipmentData()
    }, [])

    return (
        <Grid.Container>
            <Grid xs={12}>
                <Container gap={0}>
                    <Row justify="space-between" align="center">
                        <Row>
                            <Text h4>All Equipments</Text>
                        </Row>
                        <Row justify="flex-end">
                            {selection.isSelected && (
                                <>
                                    <Button auto bordered color="error" onClick={handleDeleteItemInLocation}>
                                        Delete
                                    </Button>
                                    <Spacer x={0.5} />
                                    <Button auto bordered onClick={() => setShowModal(true)}>
                                        Show details
                                    </Button>
                                </>
                            )}
                            <Spacer x={0.5} />
                            <Button auto onClick={addButton}>
                                + New Equipment
                            </Button>
                        </Row>
                    </Row>
                    <Spacer y={2} />
                    <Table
                        showSelectionCheckboxes
                        sticked
                        bordered
                        shadow={false}
                        onSelectionChange={handleSelection}
                        selectionMode="single"
                        css={{ height: "auto", width: "100%" }}
                    >
                        <Table.Header columns={columns}>
                            {(column: any) => <Table.Column key={column.key}>{column.label}</Table.Column>}
                        </Table.Header>
                        <Table.Body items={equipmentData}>
                            {(item: any) => (
                                <Table.Row key={item.key}>{(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}</Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                </Container>
            </Grid>
            {equipmentOriginalData.length > 0 && (
                <Modal
                    preventClose
                    width="600px"
                    closeButton
                    aria-labelledby="modal-title"
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <Modal.Header>
                        <Text b id="modal-title" size={18}>
                            Equipment Details
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid.Container gap={2}>
                            <Grid xs={12}>
                                <Container>
                                    <Text>
                                        Owner Number : <Text b>{equipmentOriginalData[selection.key].ownerNumber}</Text>
                                    </Text>
                                    <Text>
                                        Serial Number : <Text b>{equipmentOriginalData[selection.key].serialNumber}</Text>
                                    </Text>
                                    <Text>
                                        Vendor Number : <Text b>{equipmentOriginalData[selection.key].vendorNumber}</Text>
                                    </Text>
                                    <Text>
                                        Manufacturer : <Text b>{equipmentOriginalData[selection.key].manufacturer}</Text>
                                    </Text>
                                    <Text>
                                        Location : <Text b>{equipmentOriginalData[selection.key].location}</Text>
                                    </Text>
                                    <Text>
                                        Chip Id : <Text b>{equipmentOriginalData[selection.key].chipId}</Text>
                                    </Text>
                                    <Text>
                                        Company : <Text b>{equipmentOriginalData[selection.key].company}</Text>
                                    </Text>
                                    <Text>
                                        Equipment Category : <Text b>{equipmentOriginalData[selection.key].equipmentCategory}</Text>
                                    </Text>
                                    <Text>
                                        Equipment Status : <Text b>{equipmentOriginalData[selection.key].equipmentStatus}</Text>
                                    </Text>
                                    <Text>
                                        Description : <Text b>{equipmentOriginalData[selection.key].description}</Text>
                                    </Text>
                                    <Text>
                                        Inspection Date : <Text b>{equipmentOriginalData[selection.key].inspectionDate}</Text>
                                    </Text>
                                    <Row>
                                        <Text>
                                            Capacity : <Text b>{equipmentOriginalData[selection.key].capacity.capacity1}</Text>
                                        </Text>
                                        <Spacer x={0.5} />
                                        <Text>
                                            Capacity : <Text b>{equipmentOriginalData[selection.key].capacity.capacity2}</Text>
                                        </Text>
                                        <Spacer x={0.5} />
                                        <Text>
                                            Capacity : <Text b>{equipmentOriginalData[selection.key].capacity.capacity3}</Text>
                                        </Text>
                                        <Spacer x={0.5} />
                                        <Text>
                                            Capacity : <Text b>{equipmentOriginalData[selection.key].capacity.capacityUnit}</Text>
                                        </Text>
                                    </Row>
                                </Container>
                            </Grid>
                        </Grid.Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </Grid.Container>
    )
}

interface Props {
    addButton: () => void
}
