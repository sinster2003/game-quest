import { Flex, Input, Select, Text } from "@chakra-ui/react";
import Subheading from "./../components/utils/Subheading";
import Subtext from "../components/utils/Subtext";
import { Link } from "react-router-dom";
import FormInput from "../components/utils/FormInput";
import LandingButton from "../components/utils/LandingButton";
import useFormSchema from "../hooks/useFormSchema";
import login from "../zod/login";
import { useEffect, useState } from "react";

const Login = () => {
  const { register, errors, handleSubmit } = useFormSchema(login);

  useEffect(() => {
    if (Object.keys(errors).length) {
      console.log(Object.values(errors)[0].message);
    }
  }, [errors]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Flex flexDirection="column" alignItems="center" mt={10}>
      <Subheading text="Welcome Back" size="4xl" />
      <Subtext
        text="Delve into the adventurous gaming universe in our easy-to-use platform"
        margin={2}
        center="center"
      />
      <Text mt={2} mb={8}>
        New To GameQuest?{" "}
        <Link to="/signup">
          <span style={{ color: "#7a6ac3" }}>Sign Up</span>
        </Link>
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" gap={6} w={{ base: 300, md: 400 }}>
          <FormInput
            placeholder={"Enter Username"}
            register={register}
            label={"username"}
          />
          <FormInput
            placeholder={"Enter Password"}
            register={register}
            label={"password"}
          />
          <Select
            variant="filled"
            focusBorderColor="purple.shadowLight"
            bg="#2d2a39"
            _hover={{}}
            {...register("isOwner")}
          >
            <option style={{ backgroundColor: "#2d2a39" }} value="customer">
              Customer
            </option>
            <option style={{ backgroundColor: "#2d2a39" }} value="owner">
              Owner
            </option>
          </Select>
          <LandingButton type="submit" text="Login" w={"full"} />
        </Flex>
      </form>
    </Flex>
  );
};

export default Login;
