import axios from "axios";

// const API_BASE_URL = 'https://financed.4netps.co.id/ujian';
const API_BASE_URL =
  process.env.REACT_APP_BASE_URL ||
  "https://financed.4netps.co.id/ujian";

const tokenStr = "";

class ApiService {
  fetchNegaras() {
    return axios.get(API_BASE_URL + "/negaras", {
      // headers: { Authorization: `Bearer ${tokenStr}` },
    });
  }

  fetchPelabuhans(Id) {
    let negara = 
    {
      where: {negaraId:Id}
    }
    return axios.get(API_BASE_URL + "/pelabuhans?filter="+JSON.stringify(negara), {
      // headers: { Authorization: `Bearer ${tokenStr}` },
    });
  }

  fetchBarangs(Id) {
    let barang = 
    {
      where: {pelabuhanId:Id}
    }
    return axios.get(API_BASE_URL + "/barangs?filter="+JSON.stringify(barang), {
      // headers: { Authorization: `Bearer ${tokenStr}` },
    });
  }
}

export default new ApiService();
