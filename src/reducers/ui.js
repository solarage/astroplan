const initialState = {
  appTitle: 'Astroplan',
  signInBtnTitle: 'SignIn',
  registerBtnTitle: 'Register',
  signOutBtnTitle: 'SignOut',
  defaultFormText: 'Enter your request to the Universe',
  removeBtnTitle: 'Delete',
  authFormWarning: 'Please fill out all required fields'
};

const ui = (state = initialState) => state;

export default ui;
