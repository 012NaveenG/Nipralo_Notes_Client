import axios from "axios"
import { type LoginForm } from "../types/user.types.ts"
const loginUser = async (form: LoginForm) => {
    await axios.post('/api/v1/users/login', form)

}

export { loginUser }