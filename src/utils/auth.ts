import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { User } from "./types";

// dev
const CLIENT_ID_DEV = '1b634143bf4693953f90';
const CLIENT_SECRET_DEV = 'dd4891350db8ea4265143e5d3a140943965f1c76';
 
// product
const CLIENT_ID = '70b402fcf8bd7ec74c79';
const CLIENT_SECRET = '71562b257c5a7c0045bbce10a60118233736c562';


export const useAuthentication = () => {
  const [user, setUser] = useState<User>();
  // 	const user = useContext(useUser);
// const {setUser}=UseUserContent()
	const login = useCallback(() => {
        const token = window.localStorage.getItem('token');
            if(token){
                console.log(token)
                axios.get('https://api.github.com/user', {
					headers: {
						'Authorization': 'token ' + token
					}
				}).then((e:any) => {
					if (e && e.data) {
                        console.log(e)
						setUser({token:token,name:e.data.name});
					}
				}).catch((ex:any) => {
				window.alert('login failed')
					console.error(ex);
					window.localStorage.removeItem('token');
				})
            }else{
            console.log(process.env.NODE_ENV)
            window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.NODE_ENV==='production'?CLIENT_ID:CLIENT_ID_DEV}&scope=repo`;
            }
	}, [])

	useEffect(() => {
            const code = /code=(\w+)/[Symbol.match](window.location.href);
		if (code && code[1]) {
            console.log(process.env.NODE_ENV)
            console.log(code[1])
                axios.post('https://github.com/login/oauth/access_token', {
				client_id: process.env.NODE_ENV==='production'?CLIENT_ID:CLIENT_ID_DEV,
				client_secret: process.env.NODE_ENV==='production'?CLIENT_SECRET:CLIENT_SECRET_DEV,
				code: code[1]
			},
            {
                headers: {
                  "X-GitHub-Api-Version": "2022-11-28",
                  "Access-Control-Allow-Origin":"*",
                  "Access-Control-Allow-Headers":"X-Requested-With"
                },
            }).then(e => {
				if (e.data) {
                    console.log(e.data)
					const token = /access_token=(\w+)/[Symbol.match](e.data);
					if (token && token[1]) {
						window.localStorage.setItem('token', token[1]);
						window.location.href = window.location.href.replace(/[&?]code=\w+/, '');
					}
				}
			}).catch(ex => {
				// window.alert('login error')
				console.error(ex);
			})
		}

	}, []);

	return {user,login};
};