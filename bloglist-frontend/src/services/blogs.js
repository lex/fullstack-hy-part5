import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const create = async newBlog => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async modifiedBlog => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(
    `${baseUrl}/${modifiedBlog.id}`,
    modifiedBlog,
    config
  );
  return response.data;
};

const remove = async id => {
  const config = { headers: { Authorization: token } };
  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, setToken, create, update, remove };
