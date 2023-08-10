import React, { Component, PropTypes } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import apiService from './apiService';
import {
  Grid
} from "@material-ui/core";
import NumberFormat from 'react-number-format';


const numberFormat = (value) =>
  new Intl.NumberFormat('en-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(value);

class App extends Component {
  state = {
    negara: [],
    pelabuhan: [],
    barang: [],
    data_barang: null,
    diskon: 0,
    harga: 0,
    convHarga: '',
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
    
    let harga = event.target.value;
    let normalizeHarga = harga.replaceAll(",", "");
    normalizeHarga = Number(normalizeHarga.replaceAll("Rp ",""))
    console.log(normalizeHarga);
    let convHarga = 'Rp ' + normalizeHarga.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // numberFormat(harga);
    this.setState({ 
      harga: normalizeHarga,
      convHarga: convHarga
    });
    console.log(convHarga);

    let { diskon } = this.state;
    let total = normalizeHarga - (diskon * normalizeHarga / 100);
    let convTotal = 'Rp ' + total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    event.persist();
    this.setState({ 
      // [event.target.name]: event.target.value,
      total: convTotal
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
    let { negara, pelabuhan, barang, data_barang, diskon, harga, convHarga, total } =
      this.state;
    // let convHarga = numberFormat(harga);
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            Negara :
          </Grid>
          <Grid item xs={8} md={8}>
            <Autocomplete
              id="negara"
              options={negara}
              getOptionLabel={(option) => `${option.negara}`}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Negara" />}
              onChange={this.handlePelabuhanChange}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Pelabuhan
          </Grid>
          <Grid item xs={8} md={8}>
            <Autocomplete
              id="pelabuhan"
              options={pelabuhan}
              getOptionLabel={(option) => `${option.name}`}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Pelabuhan" />
              )}
              onChange={this.handleBarangChange}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Barang
          </Grid>
          <Grid item xs={8} md={8}>
            <Autocomplete
              id="barang"
              options={barang}
              getOptionLabel={(option) =>
                `${option.id} (${option.code}-${option.name})`
              }
              sx={{ width: 500 }}
              renderInput={(params) => <TextField {...params} label="Barang" />}
              onChange={this.handleDetailBarangChange}
            />
          </Grid>

          <Grid item xs={4} md={4}></Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="data_barang"
              readonly
              multiline
              rows={4}
              defaultValue={data_barang}
              value={data_barang}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Diskon
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="diskon"
              name="diskon"
              defaultValue={diskon}
              value={`${diskon}%`}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item xs={4} md={4}>
            Harga
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="harga"
              name="harga"
              value={`${convHarga}`}
              onChange={this.handleHargaChange}
            />
            {/* <NumberFormat
              value={harga}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(formattedValue) => <Text>{formattedValue}</Text>} // <--- Don't forget this!
            /> */}
          </Grid>

          <Grid item xs={4} md={4}>
            Total
          </Grid>
          <Grid item xs={8} md={8}>
            <TextField
              id="total"
              name="total"
              defaultValue={total}
              value={`${total}`}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>
        <br />
      </div>
    );
  }
}

export default App