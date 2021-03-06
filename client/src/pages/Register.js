import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useUserContext } from "../contexts/userContext";
import {
  useDisclosure,
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/core";
import { SubscriptionsModal } from "../components/";
const Register = (props) => {
  const [formSubscriptions, addSubscriptions] = useState({
    Netflix: {
      name: "Netflix",
      active: false,
      color: "#d13535",
    },
    Hulu: {
      name: "Hulu",
      active: false,
      color: "#f3fdf7",
    },
    Hbomax: {
      name: "HBO",
      active: false,
      color: "#36354b",
    },
    primevideo: {
      name: "Amazon Prime Video",
      active: false,
      color: "#14222e",
    },
    disneyplus: {
      name: "Disney+",
      active: false,
      color: "#6a5ca9",
    },
    Appletv: {
      name: "AppleTV+",
      active: false,
      color: "#f3f3f3",
    },
  });
  const toast = useToast();
  const [, dispatch] = useUserContext();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    services: [],
  });
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser((oldState) => {
      return {
        ...oldState,
        [name]: value,
      };
    });
  };
  const activeSubscriptions = () => {
    let output = [];
    Object.keys(formSubscriptions).forEach((key) => {
      if (formSubscriptions[key].active === true) {
        output.push(formSubscriptions[key].name);
      }
    });
    return output;
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    let response = await fetch(`/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          email: user.email,
          password: user.password,
          services: activeSubscriptions(),
        },
      }),
    });
    await setUser({
      username: "",
      email: "",
      password: "",
      services: [],
    });
    let res = await response.json();
    if (res?.data?.user) {
      dispatch({
        type: "login",
        user: res?.data?.user,
      });
      history.push("/");
    } else {
      toast({
        position: "top",
        title: "Username/Email taken",
        description: "Somebody beat you to it!",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Flex
        width="full"
        align="center"
        justifyContent="center"
        bg="black"
        w="100%"
        h="auto"
        p={4}
        gridArea="main"
        direction="column"
      >
        <SubscriptionsModal
          formSubscriptions={formSubscriptions}
          addSubscriptions={addSubscriptions}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
        <Box textAlign="center">
          <Heading color="purple.300">Register</Heading>
        </Box>
        <Box my={4} textAlign="left" w="50%" minW="360px">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel color="white">Email</FormLabel>
              <Input
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="name@email.com"
                value={user.email}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel color="white">Username</FormLabel>
              <Input
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="create username"
                value={user.username}
              />
            </FormControl>
            <FormControl mt={6}>
              <FormLabel color="white">Password</FormLabel>
              <Input
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="create password"
                value={user.password}
              />
            </FormControl>
            <FormControl mt={6}>
              <Button width="full" onClick={onOpen}>
                Select Subscriptions
              </Button>
            </FormControl>

            <Button width="full" mt={4} type="submit" variantColor="purple">
              Register
            </Button>
          </form>
        </Box>
      </Flex>
    </>
  );
};

export default Register;
