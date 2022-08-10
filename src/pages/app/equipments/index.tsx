import type { NextPage } from "next"
import { DashboardLayout, Equipments, NewEquipments } from "../../../components/app"
import { Login, Register, Setup } from "../../../components/auth"
import { useRecoilValue } from "recoil"
import { authModeState } from "../../../core/recoil/auth"
import { useState } from "react"

const HomePage: NextPage = () => {
    const [addMode, setAddMode] = useState(false)
    const authMode = useRecoilValue(authModeState)

    if (authMode === "authenticated") {
        return (
            <DashboardLayout>
                {addMode ? <NewEquipments submitButton={() => setAddMode(false)} /> : <Equipments addButton={() => setAddMode(true)} />}
            </DashboardLayout>
        )
    } else if (authMode === "register") {
        return <Register />
    }
    return <Login />
}

export default HomePage
