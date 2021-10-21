import Axios from "api/axiosCountry"

const countryDetailApi = {
  getCountryDetail: (name) => {
    return Axios.get(`/name/${name}`);
  },
}

export default countryDetailApi;