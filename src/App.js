import React, {Component} from 'react';
import axios from 'axios';
import {Container, Row, Col, Form, Button, Table} from 'react-bootstrap';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      dataAPI: [],
      edit:false,
      dataPost: {
        id: 0,
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "",
        tanggal_lahir: ""
      }
    };
 
    this.handleHapus=this.handleHapus.bind(this);
    this.inputData=this.inputData.bind(this);
    this.handleSimpan=this.handleSimpan.bind(this);
    this.getDataId = this.getDataId.bind(this);
    this.clearData = this.clearData.bind(this);

  }

  componentDidMount(){this.reloadData()};
  
  reloadData(){axios.get(`http://localhost:3004/data-karyawan`).then(res=> {this.setState({dataAPI: res.data, edit:false})})};

  handleHapus(e){axios.delete(`http://localhost:3004/data-karyawan/${e.target.value}`).then(()=>{this.reloadData()})};

  inputData(e){
    let dataSementara = {...this.state.dataPost};
    if(this.state.edit ===false){dataSementara['id'] = new Date().getTime();}
    dataSementara[e.target.name] = e.target.value;
    this.setState({dataPost: dataSementara})
  };

  handleSimpan(e){
    e.preventDefault();
    if(this.state.edit === false){
      axios.post(`http://localhost:3004/data-karyawan`, this.state.dataPost)
      .then(()=>{
        this.reloadData();
        this.clearData();
      })
    }else{
      axios.put(`http://localhost:3004/data-karyawan/${this.state.dataPost.id}`, this.state.dataPost)
      .then(()=>{
        this.reloadData();
        this.clearData();
      })
    }
    alert('Data Tersimpan')

  };

  getDataId = (e) => {
    axios
    .get(`http://localhost:3004/data-karyawan/${e.target.value}`)
    .then(res =>{
      this.setState({
        dataPost: res.data,
        edit: true
      })
    })
  };

  clearData= ()=>{
    let newDataPost = {...this.state.dataPost};
    newDataPost['id'] = '';
    newDataPost['nama_karyawan'] = '';
    newDataPost['jabatan'] = '';
    newDataPost['tanggal_lahir'] = '';
    newDataPost['jenis_kelamin'] = '';
    this.setState({
        dataPost: newDataPost
      })
  };



  render(){
    return(
      <>
       <Container fluid>
       <br/>
        <Row>
          
          <Col >
            <center><h3>Daftar Karyawan</h3></center>
          </Col>
          
        </Row>
      <br/>
        <Row>
            <Col md='5' style={{backgroundColor: '#e9ecef', padding: '1.3rem', marginLeft: '1rem'}}>
              <center><h5>Tambah / Edit List Karyawan</h5></center>
              <br/>
              <Form>
                <Form.Label>Nama Karyawan</Form.Label>
                <Form.Control type='text' placeholder='Nama Lengkap' onChange={this.inputData} name='nama_karyawan' value={this.state.dataPost.nama_karyawan}/>
                <br/>
                
                <Form.Label>Jabatan</Form.Label>
                <Form.Control type='text' placeholder='CEO, Manajer, Seketaris....' onChange={this.inputData} name='jabatan' value={this.state.dataPost.jabatan}/>
                <br/>
                
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Select onChange={this.inputData} name='jenis_kelamin' value={this.state.dataPost.jenis_kelamin}>
                  <option value='#'>--Pilih--</option>
                  <option value='Laki-Laki'>Laki-Laki</option>
                  <option value='Perempuan'>Perempuan</option>
                </Form.Select>
                <br/>
                
                <Form.Label >Tanggal Lahir</Form.Label>
                <Form.Control type='date' onChange={this.inputData} name='tanggal_lahir' value={this.state.dataPost.tanggal_lahir}/>
                <br/>
                
                <Button variant='success' type='submit' onClick={this.handleSimpan}>Simpan</Button>

              </Form>
            </Col>
            <Col>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Nama Karyawan</th>
                    <th>Jabatan</th>
                    <th>Jenis Kelamin</th>
                    <th>Tanggal Lahir</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {this.state.dataAPI.map((data, index)=>{
                  return(
                    <tbody key={index}>
                      <tr>
                        <td>{data.nama_karyawan}</td>
                        <td>{data.jabatan}</td>
                        <td>{data.jenis_kelamin}</td>
                        <td>{data.tanggal_lahir}</td>
                        <td>
                          <Row>
                          <Col>
                          <Button value={data.id} variant='danger' onClick={this.handleHapus}>Hapus</Button>
                          </Col>
                          <Col>
                          <Button value={data.id} variant='warning' onClick={this.getDataId}>Edit</Button>
                          </Col>
                          </Row>
                        </td>
                      </tr>
                    </tbody>

                    )
                })}
                

              </Table>
            </Col>
        </Row>
       </Container>
      </>
      )
  }



}

export default App;
