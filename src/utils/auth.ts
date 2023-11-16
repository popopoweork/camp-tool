import { useEffect, useCallback, useState, useContext } from "react";
import axios from "axios";
import useUser from "./use-user";
import { UpdateUser } from "./use-user";

// dev
const CLIENT_ID_DEV = "1b634143bf4693953f90";
const CLIENT_SECRET_DEV = "dd4891350db8ea4265143e5d3a140943965f1c76";

// product
const CLIENT_ID = "70b402fcf8bd7ec74c79";
const CLIENT_SECRET = "71562b257c5a7c0045bbce10a60118233736c562";


export const useAuthentication = () => {
  const user = useContext(useUser);
  const update = useContext(UpdateUser);
  // 	const user = useContext(useUser);
  // const {setUser}=UseUserContent()
  const login = useCallback(() => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${
      process.env.NODE_ENV === "production" ? CLIENT_ID : CLIENT_ID_DEV
    }&scope=repo`;
  }, []);

  useEffect(() => {
    const code = /code=(\w+)/[Symbol.match](window.location.href);
    if (code && code[1]) {
      axios
        .post(
          `https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id=${process.env.NODE_ENV === "production"
		  ? CLIENT_ID
		  : CLIENT_ID_DEV}&client_secret=${process.env.NODE_ENV === "production"
		  ? CLIENT_SECRET
		  : CLIENT_SECRET_DEV}&code=${encodeURIComponent(code[1])}`,
          {
              client_id:
                process.env.NODE_ENV === "production"
                  ? CLIENT_ID
                  : CLIENT_ID_DEV,
              client_secret:
                process.env.NODE_ENV === "production"
                  ? CLIENT_SECRET
                  : CLIENT_SECRET_DEV,
              code: code[1],
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
              "X-GitHub-Api-Version": "2022-11-28",
              "Access-Control-Allow-Origin": "*",
			  "Access-Control-Allow-Headers": "*",
			  "Access-Control-Allow-Methods": "*",
		},
          }
        )
        .then((e) => {
          if (e.data?.access_token) {
            console.log(e.data);
              window.localStorage.setItem("token", e.data.access_token);
              window.location.href = window.location.href.replace(
                /[&?]code=\w+/,
                ""
              );
          }
        })
        .catch((ex) => {
        //   window.alert('login error')
          console.error(ex);
        });
    } else if (!user) {
      const token = window.localStorage.getItem("token");
      console.log(token);
      if (token) {
        axios
          .get("https://api.github.com/user", {
            headers: {
              Authorization: "token " + token,
            },
          })
          .then((e) => {
            if (e && e.data) {
              update({ token: token, name: e.data.name });
            }
          })
          .catch((ex) => {
            console.error(ex);
            window.localStorage.removeItem("token");
          });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.href, user]);

  return { user, login };
};
