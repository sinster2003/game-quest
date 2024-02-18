import { Flex, Input, Select, Text } from "@chakra-ui/react";
import Subheading from "./../components/utils/Subheading";
import Subtext from "../components/utils/Subtext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormInput from "../components/utils/FormInput";
import LandingButton from "../components/utils/LandingButton";
import useFormSchema from "../hooks/useFormSchema";
import login from "../zod/login";
import { useEffect } from "react";
import useToaster from "../hooks/useToaster";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

const Login = () => {
  const [searchParams] = useSearchParams();
  const { register, errors, handleSubmit } = useFormSchema(login, {
    // default value for isOwner selectElement
    isOwner: searchParams.get("role") || "customer"
  });

  const toast = useToaster();
  const navigate = useNavigate();
  const [userLoggedInData, setUserLoggedInData] = useRecoilState(userAtom);

  useEffect(() => {
    if(userLoggedInData?.userId) {
      const role = userLoggedInData?.isOwner ? "owner" : "customer";
      navigate(`/${role}-dashboard`);
    }

    if (Object.keys(errors).length) {
      toast(`${Object.keys(errors)[0]} Error`, Object.values(errors)[0].message, "error");
    }
  }, [errors, userLoggedInData]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/v1/${data?.isOwner}s/login`, data);
      const result = await response.data;
      const loginObject = {userId: result[`${data?.isOwner}Id`], isOwner: result.isOwner}
      localStorage.setItem("user", JSON.stringify(loginObject));
      setUserLoggedInData(loginObject);
      localStorage.removeItem("logged-out");
      toast("Successful Login", "User Logged in successfully", "success");
      navigate(`/${data.isOwner}-dashboard`);
    }
    catch(error) {
      console.log(error);
      toast("Unsuccessful Login", `Error: ${error?.response?.data?.message || error?.response?.statusText}`, "error");
    }
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
        <Link to="/buy-or-sell">
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
