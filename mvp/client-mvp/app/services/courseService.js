import axios from 'axios'

export default class courseService {
  static fetchCourses = () => {
    return axios.get(`http://0.0.0.0:3001`)
    .then(response => {
      return response.data;
    });
  }
}
