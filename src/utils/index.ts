import toast from 'react-hot-toast';




export const successToast = (message: string) => toast.success(message);
export const errorToast = (message: string | null | undefined) =>
  toast.error(message ?? 'Runtime Error!');



export const getAuthFromStorage = () => {
  if (typeof window !== "undefined") {
    let user = JSON.parse(localStorage.getItem("user") ?? "null");
    let token = localStorage.getItem("token");

    if (!user) user = JSON.parse(sessionStorage.getItem("user") ?? "null");
    if (!token) token = sessionStorage.getItem("token");

    const isAuthenticated = !!(token && user);
    return { user, isAuthenticated, token };
  }
  return { user: null, isAuthenticated: false, token: null };
};

export const saveUserToLocalStorage = ({
  user,
  token,
}: {
  user: any;
  token: string;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }
  return;
};
export const saveUserToSessionStorage = ({
  user,
  token,
}: {
  user: any;
  token: string;
}) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
  }
  return;
};

export const removeUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
  }
  return;
};