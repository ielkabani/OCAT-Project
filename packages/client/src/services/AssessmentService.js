import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    try {
      // Choose the correct method, url, and data to send
      // in a request to the express packages/api/src/routes/assessment.js
      // NOTE: the http.config file automatically adds /api to the front of your url
      // console.log(assessment);
      return Axios.post(`/assessment/`, { assessment })
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList(filters = {}) {
    // try {
    // Choose the correct method, url, and data to send
    // in a request to the express packages/api/src/routes/assessment.js
    // NOTE: the http.config file automatically adds /api to the front of your url

    return Axios.get(`/assessment/`, { params: filters })
      .then(response => response.data.data); // expects { assessments, totalPages }
  //  }
  //  catch (err) {
  //    throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
  //  }
  }

  static delete(id) {
    return Axios.delete(`/assessment/${id}`);
  }
}
