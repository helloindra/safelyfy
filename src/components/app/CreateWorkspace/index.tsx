import { supabase } from "../../../utils/supabase"
import { Container, Row, Text, Input, Spacer, Button, Card, Loading } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { uuid } from "uuidv4"
import { useRecoilState } from "recoil"
import { authUserState, authModeState } from "../../../core/recoil/auth"
import { useRouter } from "next/router"

export const CreateWorkspace = () => {
    const router = useRouter()
    const [authUser, setAuthUser] = useRecoilState(authUserState)
    const [authMode, setAuthMode] = useRecoilState(authModeState)
    const generatedId = uuid()
    const [loading, setLoading] = useState(false)
    const [workspaceData, setWorkspaceData] = useState<any>({
        id: generatedId,
        name: "",
    })

    console.log(authUser)

    const handleCreateWorkspace = async () => {
        setLoading(true)
        console.log("create workspace", workspaceData, authUser)
        const { data, error } = await supabase
            .from("workspaces")
            .insert([{ name: workspaceData.name, uuid: workspaceData.id, owner: authUser.id }])
        if (data) {
            const { user, error } = await supabase.auth.update({
                data: { hasWorkspace: true },
            })
            if (user) {
                setLoading(false)
                setAuthMode("authenticated")
                setAuthUser({ ...authUser, hasWorkspace: true })
                router.push("/app")
            }
        }
    }

    return (
        <Container display="flex" justify="center" alignItems="center" fluid gap={0} css={{ bg: "$accents0", minHeight: "100vh" }}>
            <Row justify="center">
                <Card variant="bordered" css={{ width: 500, padding: 40 }}>
                    <Card.Body>
                        <Text h4>Create workspace</Text>
                        <Spacer y={0.6} />
                        <Text>
                            Hey there, please create a new workspace for your app, we suggest you to use company name as workspace name.
                        </Text>
                        <Spacer y={1.5} />
                        <Input
                            disabled={loading}
                            animated={false}
                            fullWidth
                            bordered
                            label="Workspace name"
                            placeholder="Something company"
                            onChange={(e) => setWorkspaceData({ ...workspaceData, name: e.target.value })}
                        />
                        <Spacer y={0.6} />
                        <Button disabled={loading} onClick={handleCreateWorkspace}>
                            {loading ? <Loading size="xs" /> : "Create workspace"}
                        </Button>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}
