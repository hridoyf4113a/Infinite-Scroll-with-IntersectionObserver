import axios from "axios";

const FetchingData = async () => {
  const res = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1/comments"
  );
  return res;
};

export default FetchingData;
