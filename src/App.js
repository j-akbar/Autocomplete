import React, { Component, PropTypes } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import apiService from './apiService';

class App extends Component {
  state = {
    negara: [],
    pelabuhan: [],
    barang: [],
    data_barang: null,
    diskon: 0,
    harga: 0,
    total: 0,
  };

  async componentDidMount() {
    await apiService
      .fetchNegaras()
      .then((res) => {
        console.log("data res" +JSON.stringify(res.data));
        this.setState({
          negara: res.data,
        });
        return res;
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        alert(JSON.stringify(err.message));
      });
  }

  handlePelabuhanChange = async (event, val, ref) => {
    if (val) {
      await apiService
      .fetchPelabuhans(val.id)
      .then((res) => {
        console.log("data res" +JSON.stringify(res.data));
        this.setState({
          pelabuhan: res.data,
        });
        return res;
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        alert(JSON.stringify(err.message));
      });
    }
  };

  handleBarangChange = async (event, val, ref) => {
    if (val) {
      await apiService
      .fetchBarangs(val.id)
      .then((res) => {
        console.log("data res" +JSON.stringify(res.data));
        this.setState({
          barang: res.data,
        });
        return res;
      })
      .catch((err) => {
        console.log(JSON.stringify(err.message));
        alert(JSON.stringify(err.message));
      });
    }
  };

  handleDetailBarangChange = async (event, val, ref) => {
    if (val) {
      this.setState({
        data_barang: val.description,
        diskon: val.tarif,
      });
    }
  };

  handleChange = (event) => {
    event.persist();
    this.setState({ [event.target.name]: event.target.value });
  };

  handleHargaChange = (event) => {
    let { diskon, harga } = this.state;
    let total = harga - (diskon * harga / 100);
    event.persist();
    this.setState({ 
      [event.target.name]: event.target.value,
      total: total
     });
  };

 getPelabuhan = async (Id) => {
  await apiService
  .fetchPelabuhans(Id)
  .then((res) => {
    console.log("data res" +JSON.stringify(res.data));
    this.setState({
      negara: res.data,
    });
    return res;
  })
  .catch((err) => {
    console.log(JSON.stringify(err.message));
    alert(JSON.stringify(err.message));
  });
 }

  render() {
    let { negara, pelabuhan, barang, data_barang, diskon, harga, total } = this.state;
    return (
      <div>
        Negara :
        <Autocomplete
          id="negara"
          options={negara}
          getOptionLabel={(option) => `${option.negara}`}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Negara" />}
          onChange={this.handlePelabuhanChange}
        />
        <br />
        Pelabuhan :
        <Autocomplete
          id="pelabuhan"
          options={pelabuhan}
          getOptionLabel={(option) => `${option.name}`}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Pelabuhan" />}
          onChange={this.handleBarangChange}
        />
        Barang :
        <Autocomplete
          id="barang"
          options={barang}
          getOptionLabel={(option) => `${option.id} (${option.code}-${option.name})`}
          sx={{ width: 500 }}
          renderInput={(params) => <TextField {...params} label="Barang" />}
          onChange={this.handleDetailBarangChange}
        />
        <TextField
          id="data_barang"
          label="Multiline"
          readonly
          multiline
          rows={4}
          defaultValue={data_barang}
          value={data_barang}
        />
        <br />
        Diskon
        <TextField
          id="diskon"
          name="diskon"
          defaultValue={diskon}
          value={`${diskon}%`}
          onChange={this.handleChange}
        />
        <br />
        Harga
        <TextField
          id="harga"
          name="harga"
          defaultValue={harga}
          value={`${harga}`}
          onChange={this.handleHargaChange}
        />
        <br />
        Total
        <TextField
          id="total"
          name="total"
          defaultValue={total}
          value={`${total}`}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App