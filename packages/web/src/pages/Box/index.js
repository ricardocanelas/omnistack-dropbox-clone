import React, { Component } from "react";
import { MdInsertDriveFile } from "react-icons/md";
import { distanceInWords } from "date-fns";
import pt from "date-fns/locale/pt";
import Dropzone from "react-dropzone";
import socket from "socket.io-client";
import api from "../../services/api";
import logo from "../../assets/logo.svg";
import "./styles.css";

export default class Box extends Component {

  state = {
    box: {}
  };

  async componentDidMount() {
    this.subscribeToNewFiles();
    const box = this.props.match.params.id;
    const response = await api.get(`boxes/${box}`);

    this.setState({ box: response.data });
  }

  subscribeToNewFiles = () => {
    const url = process.env.REACT_APP_SERVER_API || 'http://localhost:3001'
    const box = this.props.match.params.id;
    const io = socket(url, {'forceNew': true});

    io.emit("connectRoom", box);
    io.on("file", data => {
      this.setState({
        box: {
          ...this.state.box,
          files: [data, ...this.state.box.files]
        }
      });
    });
  };

  handleUpdate = files => {
    files.forEach(file => {
      const data = new FormData();
      const box = this.props.match.params.id;

      data.append("file", file);
      api.post(`boxes/${box}/files`, data);
    });
  };

  render() {
    const { title, files } = this.state.box;

    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>{title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpdate}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag your files or click here</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {files &&
            files.map(file => (
              <li key={file._id}>
                <a
                  className="fileInfo"
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MdInsertDriveFile size={24} color="#A5Cfff" />
                  <strong>{file.title}</strong>
                </a>
                <span>
                  Há{" "}
                  {distanceInWords(file.createdAt, new Date(), { locale: pt })}
                </span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
