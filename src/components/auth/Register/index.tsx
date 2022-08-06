import React from "react"
import { Grid, Text, Container, Row, Link, Checkbox, Button, Spacer, Input, Card, Loading } from "@nextui-org/react"
import { useMediaQuery } from "react-responsive"
import { useRecoilState } from "recoil"
import { authModeState, authUserState } from "../../../core/recoil/auth"
import { useState } from "react"
import { supabase } from "../../../utils/supabase"

export const Register = () => {
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" })
    const [authMode, setAuthMode] = useRecoilState(authModeState)
    const [authUser, setAuthUser] = useRecoilState(authUserState)
    const [loading, setLoading] = useState(false)
    const [signupStatus, setSignupStatus] = useState({
        status: "",
        message: "",
    })
    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        jobRole: "",
        password: "",
        confirmPassword: "",
        termsaccepted: false,
    })

    const handleSetSignupData = (event: any) => {
        setSignupData({ ...signupData, [event.target.name]: event.target.value })
    }

    const handleSetModeToLogin = () => {
        setAuthMode("login")
    }

    const handleSubmitSignup = async () => {
        setLoading(true)
        const { firstName, lastName, email, jobRole, password, confirmPassword, termsaccepted } = signupData

        //check if all fields are filled
        if (!firstName || !lastName || !email || !jobRole || !password || !confirmPassword) {
            setLoading(false)
            setSignupStatus({
                status: "error",
                message: "Please fill in all fields",
            })
            setTimeout(() => {
                setSignupStatus({
                    status: "",
                    message: "",
                })
            }, 12000)
        }

        //check if terms is checked
        if (!termsaccepted) {
            setLoading(false)
            setSignupStatus({
                status: "error",
                message: "Please accept the terms and conditions",
            })
            setTimeout(() => {
                setSignupStatus({
                    status: "",
                    message: "",
                })
            }, 12000)
        }

        //check if password and confirm password match
        if (password === confirmPassword && termsaccepted) {
            const { user, session, error } = await supabase.auth.signUp(
                {
                    email,
                    password,
                },
                {
                    data: {
                        firstName,
                        lastName,
                        jobRole,
                        termsaccepted,
                        avatar: "",
                    },
                }
            )
            if (user) {
                console.log("User created", user)
                setLoading(false)
                setSignupStatus({
                    status: "success",
                    message: "User created, we have sent you an email to confirm your account",
                })
                setTimeout(() => {
                    setSignupStatus({
                        status: "",
                        message: "",
                    })
                }, 12000)
                // setAuthUser({
                //     id: user.id,
                //     email: user.email,
                //     firstName: user.firstName,
                //     lastName: user.lastName,
                //     jobRole: user.jobRole,
                //     avatar: user.avatar,
                //     terms: user.terms,
                //     needsetup: user.needsetup,
                // })
            }
            if (error) {
                setLoading(false)
                console.error("Error", error)
                setSignupStatus({
                    status: "error",
                    message: error.message,
                })
                setTimeout(() => {
                    setSignupStatus({
                        status: "",
                        message: "",
                    })
                }, 12000)
            }
        } else {
            setLoading(false)
            setSignupStatus({
                status: "error",
                message: "Your passwords do not match",
            })
            setTimeout(() => {
                setSignupStatus({
                    status: "",
                    message: "",
                })
            }, 12000)
        }
    }

    return (
        <Grid.Container css={{ height: "100vh" }} gap={isDesktop ? 0 : 8}>
            <Grid xs={12} md={6} justify="center" alignItems="center">
                <Container fluid css={{ width: 500, minHeight: 300 }}>
                    <Text h1>Sign up</Text>
                    <Text>Welcome back! Please enter your details.</Text>
                    <Spacer y={2} />
                    <Row>
                        <Input
                            name="firstName"
                            fullWidth
                            label="First name"
                            placeholder="John"
                            animated={false}
                            bordered
                            onChange={handleSetSignupData}
                        />
                        <Spacer x={1} />
                        <Input
                            name="lastName"
                            fullWidth
                            label="Last name"
                            placeholder="Doe"
                            animated={false}
                            bordered
                            onChange={handleSetSignupData}
                        />
                    </Row>
                    <Spacer y={0.5} />
                    <Input
                        name="jobRole"
                        fullWidth
                        label="Job Role"
                        placeholder="CEO, CTO, Manager, Owner, ..."
                        animated={false}
                        bordered
                        onChange={handleSetSignupData}
                    />
                    <Spacer y={0.5} />
                    <Input
                        name="email"
                        fullWidth
                        label="Email"
                        placeholder="email@company.something"
                        animated={false}
                        bordered
                        onChange={handleSetSignupData}
                    />
                    <Spacer y={0.5} />
                    <Input.Password
                        name="password"
                        fullWidth
                        label="Password"
                        placeholder="password"
                        animated={false}
                        bordered
                        onChange={handleSetSignupData}
                    />
                    <Spacer y={0.5} />
                    <Input.Password
                        name="confirmPassword"
                        fullWidth
                        label="Confirm password"
                        placeholder="confirm password"
                        animated={false}
                        bordered
                        onChange={handleSetSignupData}
                    />
                    <Spacer y={1} />
                    <Checkbox size="xs" onChange={(e) => setSignupData({ ...signupData, termsaccepted: e })}>
                        I agree with safelyfy terms of services
                    </Checkbox>
                    <Spacer y={1} />
                    <Button css={{ width: "100%" }} onClick={handleSubmitSignup}>
                        {loading ? <Loading color="white" size="xs" /> : "Sign up"}
                    </Button>
                    <Spacer y={1} />
                    {signupStatus.status === "error" && !loading && (
                        <Card variant="flat" css={{ bg: "$red200" }}>
                            <Card.Body css={{ py: 12, px: 24 }}>
                                <Text h6 color="error">
                                    {signupStatus.message}
                                </Text>
                            </Card.Body>
                        </Card>
                    )}
                    {signupStatus.status === "success" && !loading && (
                        <Card variant="flat" css={{ bg: "$green200" }}>
                            <Card.Body css={{ py: 12, px: 24 }}>
                                <Text h6 css={{ color: "$green800" }}>
                                    {signupStatus.message}
                                </Text>
                            </Card.Body>
                        </Card>
                    )}
                    <Spacer y={1} />
                    <Row>
                        <Text h6>Have an account ?</Text>
                        <Spacer x={0.2} />
                        <Link onClick={handleSetModeToLogin}>
                            <Text h6 color="primary">
                                Log in here
                            </Text>
                        </Link>
                    </Row>
                </Container>
            </Grid>
            <Grid xs={0} md={6} css={{ backgroundColor: "$primary" }}></Grid>
        </Grid.Container>
    )
}
