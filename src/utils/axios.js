import axios from "axios";

const api = axios.create({
	baseURL: "https://dbf8-180-244-167-238.ngrok-free.app",
});

export default api;
