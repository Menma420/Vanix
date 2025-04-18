import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { pokemonImages } from "../../images";
import Cookies from "universal-cookie";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { User } from "@stream-io/video-react-sdk";
import { useUser } from "../../user-context";
import { useNavigate } from "react-router-dom";

interface FormValues {
    username: string;
    name: string;
}

export const SignIn = () => {

    const cookies = new Cookies();
    const {setUser, setClient} = useUser();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        username: yup.string().required("Username is required").matches(/^[a-zA-Z0-9_.@$]+$/, "Invalid username"),
        name: yup.string().required("Name is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(schema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const { username, name } = data;

            const response = await fetch("https://vanix-g47b.onrender.com/auth/createUser", {  // Ensure the correct endpoint
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    name,
                    image: pokemonImages[Math.floor(Math.random() * pokemonImages.length)],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to sign in");
            }

            const responseData = await response.json();
            console.log(responseData);

            const user: User = {
                id: username,
                name,
            }

            const myClient = new StreamVideoClient({
                apiKey: "8kg95evm8sbv",
                user,
                token: responseData.token,
            })

            setClient(myClient);
            setUser({username, name});

            const expires = new Date();
            expires.setDate(expires.getDate() + 1);

            cookies.set("token", responseData.token, {
                expires,
            });

            cookies.set("username", responseData.username, {
                expires,
            });

            cookies.set("name", responseData.name, {
                expires,
            });

            navigate("/");

        } catch (error) {
            console.error("Sign-in error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="sign-in">
            <h1>Welcome to Vānix</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username: </label>
                    <input type="text" placeholder="John..." {...register("username")} />
                    {errors.username && <p style={{ color: "red" }}>{errors.username.message}</p>}
                </div>
                <div>
                    <label>Name: </label>
                    <input type="text" placeholder="John Doe..." {...register("name")} />
                    {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                </div>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
};
