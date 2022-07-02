import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();
function AuthContextProvider(props) {
  // set default to undefined
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [userinfo, setUserInfo] = useState(undefined);
  const [firstName, setFirstName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    getLoggedIn();
  }, []);

  async function getLoggedIn() {
    const url = "https://zendeskclone-ed.herokuapp.com/users/loggedIn";

    fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ token: Cookies.get("token") }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log("LoggedIn:", data.status);
        if (data.status === true) {
          setUserInfo(data.user);
          setLoggedIn(data.status);
          setFirstName(data.user.fname);
          setUserRole(data.user.role);
        }
      });
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        setLoggedIn,
        firstName,
        userRole,
        setUserInfo,
        setFirstName,
        setUserRole,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
