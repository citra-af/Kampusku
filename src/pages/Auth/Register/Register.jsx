import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  toastSuccess,
  toastError,
} from "@/Utils/Helpers/ToastHelpers";

import {
  getAllUsers,
  storeUser,
} from "@/Apis/UserApi";

import Input from "@/Pages/Auth/Components/Input";
import Label from "@/Pages/Auth/Components/Label";
import Button from "@/Pages/Auth/Components/Button";
import Link from "@/Pages/Auth/Components/Link";
import Card from "@/Pages/Auth/Components/Card";
import Heading from "@/Pages/Auth/Components/Heading";
import Form from "@/Pages/Auth/Components/Form";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "mahasiswa",
    permission: [
      "dashboard.page",
    ],
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await getAllUsers();

      const exists = res.data.find(
        (user) => user.email === form.email
      );

      if (exists) {
        toastError("Email sudah terdaftar");
        return;
      }

      await storeUser(form);

      toastSuccess("Registrasi berhasil");

      navigate("/");
    } catch (error) {
      console.error(error);
      toastError("Registrasi gagal");
    }
  };

  return (
    <Card className="max-w-md w-full">
      <Heading as="h2">
        Registrasi
      </Heading>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Nama</Label>

          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Masukkan nama"
            required
          />
        </div>

        <div>
          <Label>Email</Label>

          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div>
          <Label>Password</Label>

          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Masukkan password"
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full"
        >
          Daftar
        </Button>
      </Form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Sudah punya akun?
        <Link
          href="/"
          className="ml-1"
        >
          Login
        </Link>
      </p>
    </Card>
  );
};

export default Register;