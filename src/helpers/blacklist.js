import {useApi} from "../helpers/axios";

const userToken = localStorage.getItem("token");
const useBlacklist = async(e) => {
const bodyBl = {
  param: e,
};
const cekBl = await useApi({
  method: "POST",
  api: "blacklist_detail",
  data: bodyBl,
  token: userToken,
});
if (cekBl.ok) {
  return cekBl.data.notes;
}
}

export { useBlacklist };