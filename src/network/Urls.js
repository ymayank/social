export const ACTIVE_HOST = 'http://localhost:8080';

const Urls = {
    login: 'login',
    signup: 'user/register',
    forgotPassword: 'forgot-password',
    resetPassword: 'reset-password',
    homeListing: 'upload/getSpecFiles',
}

export const urlFor = (service) => {
    if (service) {
      return `${ACTIVE_HOST}/${service}`;
    }
    return undefined;
  };

export default Urls;