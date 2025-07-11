import {View, Text, Button, Alert} from 'react-native'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {useState} from "react";
import {createUser} from "@/lib/appwrite";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({name: "", email: "", password: ""});

    const submit = async () => {
        const {name, email, password} = form;

        if (!name || !email || !password) {
            return alert("Please enter a valid email address and password.");
        }
        setIsSubmitting(true);

        try {
            await createUser({email, password, name});

            router.replace('/');
        } catch (error: any) {
            Alert.alert('Error', error.message || 'An error occurred while signing up.');
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <Text>SignIn</Text>
            <Button title="Sign Up" onPress={() => router.push("//sign-up")}/>

            <CustomInput
                placeholder="Enter your full name"
                value={form.name}
                onChangeText={(text) => setForm((prev) => ({
                    ...prev,
                    name: text
                }))}
                label="Full Name"

            />

            <CustomInput
                placeholder="Enter your email"
                value={form.email}
                onChangeText={(text) => setForm((prev) => ({
                    ...prev,
                    email: text
                }))}
                label="Email"
                keyboardType="email-address"

            />
            <CustomInput
                placeholder="Enter your password"
                value={form.password}
                onChangeText={(text) => setForm((prev) => ({
                    ...prev,
                    password: text
                }))}
                label="Password"
                secureTextEntry={true}

            />
            <CustomButton title="Sign Up" isLoading={isSubmitting} onPress={submit}/>
            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className="base-regular text-gray-100">
                    Already have an account?
                    <Link href="/sign-in" className="base-bold text-primary">Sign In</Link>
                </Text>
            </View>
        </View>
    )
}
export default SignUp
