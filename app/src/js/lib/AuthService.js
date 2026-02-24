export class AuthService {

  constructor(feedbackService, axiosService) {
    this.feedbackService = feedbackService;
    this.axiosService = axiosService;
  }

  register(data) {
    return new Promise((resolve, reject) => {
      this.feedbackService.startLoading();
      console.log('Registering user with data', data, window.axios);
      const axios = this.axiosService.createInstance();
      axios.post('/api/auth/register', data)
        .then(response => {
          this.feedbackService.positiveFeedback(response.data.message || 'User registered successfully');
          this.axiosService.updateToken(response.data.token);
          resolve();
        })
        .catch(error => {
          const { message, errors } = error.response.data;
          this.feedbackService.negativeFeedback(message);
          reject(errors);
        })
        .finally(() => {
          this.feedbackService.stopLoading();
        });
    })
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.feedbackService.startLoading();
      console.log('Logging in user with data', data, window.axios);
      const axios = this.axiosService.createInstance();
      axios.post('/api/auth/login', data)
        .then(response => {
          this.feedbackService.positiveFeedback(response.data.message || 'User logged in successfully');
          this.axiosService.updateToken(response.data.token);
          resolve();
        })
        .catch(error => {
          const { message, errors } = error.response.data;
          this.feedbackService.negativeFeedback(message);
          reject(errors);
        })
        .finally(() => {
          this.feedbackService.stopLoading();
        });
    })
  }

  logout() {
    return new Promise((resolve, reject) => {
      this.feedbackService.startLoading();
      console.log('Logging out user');
      const axios = this.axiosService.createInstance();
      axios.get('/api/auth/logout')
        .then(response => {
          this.feedbackService.positiveFeedback(response.data.message || 'User logged out successfully');
          //this.axiosService.removeToken();
          resolve();
        })
        .catch(error => {
          const { message, errors } = error.response.data;
          this.feedbackService.negativeFeedback(message);
          reject(errors);
        })
        .finally(() => {
          this.feedbackService.stopLoading();
        });
    })
  }

  sendForgotPassword(email) {
    return new Promise((resolve, reject) => {
      this.feedbackService.startLoading();
      console.log('Sending forgot password email', email);
      const axios = this.axiosService.createInstance();
      axios.post('/api/auth/forgot-password', { email })
        .then(response => {
          this.feedbackService.positiveFeedback(response.data.message || 'Password reset email sent successfully');
          resolve();
        })
        .catch(error => {
          const { message, errors } = error.response.data;
          this.feedbackService.negativeFeedback(message);
          reject(errors);
        })
        .finally(() => {
          this.feedbackService.stopLoading();
        });
    })
  }

  resendConfirmationEmail() {
    return new Promise((resolve, reject) => {
      this.feedbackService.startLoading();
      console.log('Resending confirmation email');
      const axios = this.axiosService.createInstance();
      axios.post('/api/auth/email/resend-verification')
        .then(response => {
          this.feedbackService.positiveFeedback(response.data.message || 'Verification email sent successfully');
          resolve();
        })
        .catch(error => {
          const { message, errors } = error.response.data;
          this.feedbackService.negativeFeedback(message);
          reject(errors);
        })
        .finally(() => {
          this.feedbackService.stopLoading();
        });
    })
  }
}

