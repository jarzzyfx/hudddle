import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

interface RegisterProps {
  view: "register" | "login"; // Specific types
  setView: (view: "register" | "login") => void; // Specific types
}

const Register: React.FC<RegisterProps> = ({ view, setView }) => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const RegisterHuddleAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    const { fullname, email, password } = formData;

    if (!fullname || !email || !password) return;

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        formData
      );
      console.log("Registration successful:", response.data);
      setView("login"); // Redirect to login view upon successful registration
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={RegisterHuddleAccount}
      className="min-w-[500px] h-auto flex flex-col gap-4 pr-6"
    >
      <div className="flex flex-col gap-2">
        <h2>Your Full Name</h2>
        <Input
          type="text"
          name="fullname"
          placeholder="John Doe"
          value={formData.fullname}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Your Email</h2>
        <Input
          type="email"
          name="email"
          placeholder="johndoe@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2>Your Password</h2>
        <Input
          type="password"
          name="password"
          placeholder="demopass"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" className="w-full">
        Open a huddle account
      </Button>
    </form>
  );
};

export default Register;
