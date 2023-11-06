import { jwtDecode } from "jwt-decode";
type Payload = {
  username: string;
  email: string;
  role: string;
}

function getAuthData(): Payload {
  const tokentest = localStorage.getItem("token");
  try {
    const decoded: Payload = jwtDecode(tokentest!);
    return decoded;
  } catch (err) {
    return {
      username: "",
      email: "",
      role: "",
    };
  }
}

function getUsername(): string {
  return getAuthData().username;
}

function getEmail(): string {
  return getAuthData().email;
}

function getRole(): string {
  return getAuthData().role;
}

export {
  getAuthData,
  getUsername,
  getEmail,
  getRole
};