import axios from "axios";

export function GetCat() {
  return axios.get("http://localhost:4000/api/cat");
}

export function GetPath() {
  return axios.get("http://localhost:4000/api/cat/path");
}

export function GetById(id: number) {
  return axios.get(`http://localhost:4000/api/cat/${id}`);
}

export function GetImage(name: any) {
  return axios.get(`http://localhost:4000/api/file/${name}`);
}

export function CreateCat(data: any) {
  var formData: any = new FormData();

  formData.append("files", data.fileUrl);
  formData.append("name", data.name);
  formData.append("age", data.age);
  formData.append("fileName", data.fileName);

  return axios.post("http://localhost:4000/api/cat", {
    formData,
  });
}

export function DelCat(id: number) {
  return axios.delete(`http://localhost:4000/api/cat/${id}`);
}
