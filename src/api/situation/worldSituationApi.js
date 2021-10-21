import Axios from "api/axiosCovid"

const worldSituationApi = {
    getSituation: () => {
        return Axios.get("/summary");
    },
    getByCountry: (slug) => {
        return Axios.get(`/country/${slug}`);
    },
}

export default worldSituationApi;