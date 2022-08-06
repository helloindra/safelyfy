import React from "react"
import { Grid, Text, Container, Row, Link, Button, Spacer, Input, Loading, Card } from "@nextui-org/react"
import { useRecoilState } from "recoil"
import { authModeState, authUserState } from "../../../core/recoil/auth"
import { useState, useEffect } from "react"
import { supabase } from "../../../utils/supabase"

export const Login = () => {
    const [authMode, setAuthMode] = useRecoilState(authModeState)
    const [authUser, setAuthUser] = useRecoilState(authUserState)
    const [loading, setLoading] = useState(false)
    const [session, setSession] = useState<any>(null)
    const [loginStatus, setLoginStatus] = useState({
        status: "",
        message: "",
    })

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    })

    const handleSetModeToRegister = () => {
        setAuthMode("register")
    }

    const handleSetLoginData = (event: any) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }

    const handleSubmitLogin = async () => {
        setLoading(true)
        const { email, password } = loginData
        const { user, session, error } = await supabase.auth.signIn({
            email,
            password,
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
            if (user.user_metadata.needsetup) {
                setAuthMode("needsetup")
            } else {
                setAuthMode("authenticated")
            }
        }
        if (error) {
            setLoading(false)
            console.error("Error", error)
            setLoginStatus({
                status: "error",
                message: error.message,
            })
            setTimeout(() => {
                setLoginStatus({
                    status: "",
                    message: "",
                })
            }, 12000)
        }
    }

    useEffect(() => {
        setSession(supabase.auth.session())
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    useEffect(() => {
        if (session) {
            setAuthUser({
                id: session.user.id,
                email: session.user.email,
                firstName: session.user.user_metadata.firstName,
                lastName: session.user.user_metadata.lastName,
                jobRole: session.user.user_metadata.jobRole,
                avatar: session.user.user_metadata.avatar,
            })
            setAuthMode("authenticated")
        }
    }, [session])

    return (
        <Grid.Container css={{ height: "100vh" }}>
            <Grid xs={12} md={6} justify="center" alignItems="center">
                <Container fluid css={{ width: 500, minHeight: 300 }}>
                    <Text h1>Log in</Text>
                    <Text>Welcome back! Please enter your details.</Text>
                    <Spacer y={2} />
                    <Input
                        name="email"
                        fullWidth
                        clearable
                        label="Email"
                        placeholder="email@company.something"
                        animated={false}
                        bordered
                        onChange={handleSetLoginData}
                    />
                    <Spacer y={0.5} />
                    <Input.Password
                        name="password"
                        fullWidth
                        label="Password"
                        placeholder="password"
                        animated={false}
                        bordered
                        onChange={handleSetLoginData}
                    />
                    <Spacer y={1} />
                    <Button css={{ width: "100%" }} onClick={handleSubmitLogin}>
                        {loading ? <Loading color="white" size="xs" /> : "Login"}
                    </Button>
                    <Spacer y={1} />
                    {loginStatus.status === "error" && !loading && (
                        <Card variant="flat" css={{ bg: "$red200" }}>
                            <Card.Body css={{ py: 12, px: 24 }}>
                                <Text h6 color="error">
                                    {loginStatus.message}
                                </Text>
                            </Card.Body>
                        </Card>
                    )}
                    <Spacer y={1} />
                    <Row>
                        <Text h6>Don't have an account?</Text>
                        <Spacer x={0.2} />
                        <Link onClick={handleSetModeToRegister}>
                            <Text h6 color="primary">
                                Sign up here
                            </Text>
                        </Link>
                    </Row>
                </Container>
            </Grid>
            <Grid xs={12} md={6} css={{ backgroundColor: "$primary" }}></Grid>
        </Grid.Container>
    )
}
