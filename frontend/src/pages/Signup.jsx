import { Flex, Text } from "@chakra-ui/react";
import Subheading from "./../components/utils/Subheading";
import Subtext from "../components/utils/Subtext";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormInput from "../components/utils/FormInput";
import LandingButton from "./../components/utils/LandingButton";
import useFormSchema from "../hooks/useFormSchema";
import signup from "../zod/signup";
import { useEffect } from "react";
import useToaster from "../hooks/useToaster";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";

const Signup = () => {
  const { register, errors, handleSubmit } = useFormSchema(signup);
  const toast = useToaster();
  const [searchParams] = useSearchParams();
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
    console.log(data);
    if(!searchParams.get("role")) {
      navigate("/buy-or-sell");
    }

    try {
      const response = await axios.post(`/api/v1/${searchParams.get("role")}s/signup`, {
        name: data.fullname,
        ...data
      });
      const result = await response.data;
      const signupObject = { userId: result[`${searchParams.get("role")}Id`], isOwner: result.isOwner };
      localStorage.setItem("user", JSON.stringify(signupObject));
      setUserLoggedInData(signupObject);
      toast("Successful Login", result?.message, "success");
      navigate(`/${searchParams.get("role")}-dashboard`)
    }
    catch(error) {
      console.log(error);
      toast("Unsuccessful Login", `Error: ${error?.response?.data?.message || error?.response?.statusText}`, "error");
    }
  };

  return (
    <Flex flexDirection="column" alignItems="center" mt={8}>
      <Subheading text="Join the community" size="4xl" />
      <Subtext
        text="Be part of a adventurous gaming universe in our easy-to-use platform"
        margin={2}
      />
      <Text mt={2} mb={6}>
        Already a member?{" "}
        <Link to="/login">
          <span style={{ color: "#7a6ac3" }}>Login</span>
        </Link>
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDirection="column" gap={6} w={{ base: 300, md: 400 }}>
          <FormInput
            placeholder={"Enter Your Full Name"}
            register={register}
            label={"fullname"}
          />
          <FormInput
            placeholder={"Enter Username"}
            register={register}
            label={"username"}
          />
          <FormInput
            placeholder={"Enter Your Email"}
            register={register}
            label={"email"}
          />
          <FormInput
            placeholder={"Enter Password"}
            register={register}
            label={"password"}
          />
          <FormInput
            placeholder={"Confirm Password"}
            register={register}
            label={"confirmPassword"}
          />
          <LandingButton type="submit" text="Sign Up" w={"full"} />
        </Flex>
      </form>
    </Flex>
  );
};

export default Signup;
