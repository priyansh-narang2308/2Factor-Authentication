import axios from "axios";

export default axios.create({
  baseURL: `https://twofa-auth-hjr1.onrender.com/api`,
});
