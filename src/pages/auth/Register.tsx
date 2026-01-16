import { Link, useNavigate } from "react-router-dom"
import Button from "../../components/ui/Button.tsx"
import FormDescription from "../../components/ui/FormDescription.tsx"
import FormHeader from "../../components/ui/FormHeader.tsx"
import FormTitle from "../../components/ui/FormTitle.tsx"
import { Group } from "../../components/ui/Group.tsx"
import { Input } from "../../components/ui/Input.tsx"
import { Label } from "../../components/ui/Label.tsx"
import { useState, type FormEvent } from "react"
import Loader from "../../components/ui/Loader.tsx"
import toast from "react-hot-toast"
import type { RegisterForm } from "../../types/user.types.ts"
import { registerUser } from "../../api/user.api.ts"



const Register = () => {

    const [form, setForm] = useState<RegisterForm>({
        name: "",
        email: "",
        password: ""

    })
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await registerUser(form);
            toast.success(data.message);
            navigate("/login");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="w-full sm:max-w-4xl  sm:mx-auto py-15 flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-x-2 gap-2 divide-neutral-300  shadow-input p-5 rounded-lg h-full w-full">
                <div className="hidden  sm:flex items-center justify-center">
                    <img src="/auth_logo.webp" alt="Auth_logo" className="size-72 mx-auto" />
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="h-[50dvh] sm:h-full"
                >
                    <div className="ml-2 ">
                        <FormHeader>
                            <FormTitle className="text-center">Register</FormTitle>
                            <FormDescription className="text-center">Please register to access notes</FormDescription>
                        </FormHeader>
                        <Group>
                            <Label>Name</Label>
                            <Input
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                type='text'
                                placeholder="Enter your name"
                                required
                            />
                        </Group>
                        <Group>
                            <Label>Email</Label>
                            <Input
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                type='email'
                                placeholder="Enter your email"
                                required
                            />
                        </Group>
                        <Group>
                            <Label>Password</Label>
                            <Input
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                type='password'
                                placeholder="*********"
                                required
                            />

                        </Group>

                        <Button className="w-full mt-5 flex items-center justify-center py-2">

                            {loading ? <Loader /> : "Register"}
                        </Button>

                        <p className="text-center font-medium text-neutral-700 my-2">or</p>
                        <Link
                            to={'/login'}
                            className="text-primary font-medium text-sm flex items-center justify-center hover:text-blue-800 transition-all duration-150 ease-linear"
                        >Already have an account? Login</Link>


                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register



