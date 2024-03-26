export const isUserLogged = (): boolean => {
    const token = localStorage.getItem("token");
    return !!token;
}