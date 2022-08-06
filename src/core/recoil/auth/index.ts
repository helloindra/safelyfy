import { atom } from "recoil"

export const authModeState = atom<"login" | "register" | "needsetup" | "authenticated">({
    key: "textState", // unique ID (with respect to other atoms/selectors)
    default: "login", // default value (aka initial value)
})

export const authUserState = atom<any>({
    key: "authUserState",
    default: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        needsetup: false,
    },
})
