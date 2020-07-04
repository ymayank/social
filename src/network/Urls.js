export const ACTIVE_HOST = 'http://13.235.3.38';

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