import React from 'react'
import axios, { post } from 'axios';



class ImageFileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      imgSrc:null,
      productInfo:"",
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e) {
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
      this.setState({productInfo:response.data})
    })
  }
  onChange(e) {
    const lfile = e.target.files[0];
    this.setState({ file: lfile })
   
  const lreader = new FileReader();
  const lurl = lreader.readAsDataURL(lfile);

   lreader.onloadend = function (e) {
      this.setState({
          imgSrc: [lreader.result]
      })
    }.bind(this);
  console.log(lurl) //
  }
  fileUpload(file) {
    const url = 'http://bookmystuff-docker-app-bullseye.apps.cluster.infosysadmcoe.com/';
    const formData = new FormData();
    formData.append('file', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }

  render() {
    console.log("imgSrc:",this.state.imgSrc)
    console.log("file:",this.state.file)
    return (
      <div>
      <form onSubmit={this.onFormSubmit}>
        <h1>Image File Upload</h1>
        <div>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Search</button>
        </div>
        </form>
      <div className="image-div">
       <span> {this.state.productInfo}   </span>    
      </div>
      <div className="image-div">
        <img src={this.state.imgSrc} />       
      </div>
      </div>
    )
  }
}



export default ImageFileUpload