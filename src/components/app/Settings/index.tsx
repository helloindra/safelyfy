import { Grid, Container, Row, Link, Text, Spacer, Input, Avatar, Button, Card, Loading } from "@nextui-org/react"
import { Iconly } from "react-iconly"
import { useRecoilState } from "recoil"
import { authUserState } from "../../../core/recoil/auth"
import React, { useState, useRef } from "react"
import { supabase } from "../../../utils/supabase"

export const Settings = () => {
    const fileInput = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)
    const [authUser, setAuthUser] = useRecoilState(authUserState)
    const [profileData, setProfileData] = useState({
        firstName: authUser.firstName,
        lastName: authUser.lastName,
        jobRole: authUser.jobRole,
        avatar: authUser.avatar,
    })

    const [editStatus, setEditStatus] = useState({
        status: "",
        message: "",
    })

    const handleSetProfileData = (event: any) => {
        setProfileData({ ...profileData, [event.target.name]: event.target.value })
    }

    const handleUpdateProfile = async () => {
        setLoading(true)
        const { firstName, lastName, jobRole, avatar } = profileData
        const { user, error } = await supabase.auth.update({
            data: { firstName, lastName, jobRole, avatar },
        })
        if (user) {
            setLoading(false)
            setAuthUser({
                id: user.id,
                email: user.email,
                firstName: user.user_metadata.firstName,
                lastName: user.user_metadata.lastName,
                jobRole: user.user_metadata.jobRole,
                avatar: user.user_metadata.avatar,
            })
            setEditStatus({
                status: "success",
                message: "Profile updated successfully",
            })
            setTimeout(() => {
                setEditStatus({
                    status: "",
                    message: "",
                })
            }, 12000)
        }
    }

    const handleSetAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as any
        const file = files[0]
        console.log(file)
    }

    return (
        <Container gap={0}>
            <input type="file" ref={fileInput} hidden onChange={handleSetAvatar} />
            <Row align="center">
                <Iconly name="Setting" set="light" size="large" />
                <Spacer x={0.5} />
                <Text h2>Settings</Text>
            </Row>
            <Grid.Container css={{ my: 50 }}>
                <Grid md={2} css={{ borderRight: "2px $accents0 solid", minHeight: 400 }}>
                    <Container gap={0}>
                        <Text h5>Edit Profile</Text>
                    </Container>
                </Grid>
                <Grid md={5} css={{ px: 40 }}>
                    <Container gap={0}>
                        <Text h5>Settings</Text>
                        <Spacer y={1.5} />
                        <Row align="center">
                            <Avatar size="xl" src={authUser.avatar} zoomed />
                            <Spacer x={0.5} />
                            <Button auto bordered color="secondary" onClick={() => fileInput.current?.click()}>
                                Change Avatar
                            </Button>
                        </Row>
                        <Spacer y={1} />
                        <Container gap={0}>
                            <Row>
                                <Input
                                    value={authUser.firstName}
                                    name="firstName"
                                    fullWidth
                                    clearable
                                    label="First Name"
                                    animated={false}
                                    bordered
                                    onChange={handleSetProfileData}
                                />
                                <Spacer x={1} />
                                <Input
                                    value={authUser.lastName}
                                    name="lastName"
                                    fullWidth
                                    clearable
                                    label="Last Name"
                                    animated={false}
                                    bordered
                                    onChange={handleSetProfileData}
                                />
                            </Row>
                            <Spacer y={0.5} />
                            <Input
                                value={authUser.jobRole}
                                name="jobRole"
                                fullWidth
                                clearable
                                label="Job Role"
                                animated={false}
                                bordered
                                onChange={handleSetProfileData}
                            />
                        </Container>
                        <Spacer y={1} />
                        <Row>
                            <Button auto onClick={handleUpdateProfile}>
                                {loading ? <Loading color="white" size="xs" /> : "Save"}
                            </Button>
                            <Spacer x={0.5} />
                            <Button auto bordered color="secondary">
                                Discard
                            </Button>
                        </Row>
                        <Spacer y={1} />
                        {editStatus.status === "success" && !loading && (
                            <Card variant="flat" css={{ bg: "$green200" }}>
                                <Card.Body css={{ py: 12, px: 24 }}>
                                    <Text h6 css={{ color: "$green800" }}>
                                        {editStatus.message}
                                    </Text>
                                </Card.Body>
                            </Card>
                        )}
                    </Container>
                </Grid>
                <Grid md={6}></Grid>
            </Grid.Container>
        </Container>
    )
}
