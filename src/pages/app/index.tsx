import type { NextPage } from "next"
import { DashboardLayout, DashboardOverview } from "../../components/app"
import { Login, Register, Setup } from "../../components/auth"
import { useRecoilValue } from "recoil"
import { authModeState } from "../../core/recoil/auth"

const HomePage: NextPage = () => {
    const authMode = useRecoilValue(authModeState)

    if (authMode === "authenticated") {
        return (
            <DashboardLayout>
                <DashboardOverview />
            </DashboardLayout>
        )
    } else if (authMode === "register") {
        return <Register />
    }
    return <Login />
}

export default HomePage
