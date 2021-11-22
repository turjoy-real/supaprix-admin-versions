import * as authActions from "./store/actions/auth";
import store from "./dist/store/main";

const auth = new Auth();

document.querySelector(".logout").addEventListener("click", (e) => {
  auth.logOut();
});

const isAuth = !!store.getState().auth.token;
const didTryAutoLogin = store.getState().auth.didTryAutoLogin;

const tryLogin = async () => {
  const userData = await localStorage.getItem("userData");
  if (!userData) {
    // props.navigation.navigate('Auth');
    dispatch(authActions.setDidTryAL());
    return;
  }
  const transformedData = JSON.parse(userData);
  const { token, userId, expiryDate } = transformedData;
  const expirationDate = new Date(expiryDate);

  if (expirationDate <= new Date() || !token || !userId) {
    // props.navigation.navigate('Auth');
    dispatch(authActions.setDidTryAL());
    return;
  }

  const expirationTime = expirationDate.getTime() - new Date().getTime();

  // props.navigation.navigate('Shop');
  dispatch(authActions.authenticate(userId, token, expirationTime));
};

// if (isAuth) {
//   window.location.replace("/dashboard.html");
// } else if (!isAuth && didTryAutoLogin) {
//   window.location.replace("/");
// } else if (!isAuth && !didTryAutoLogin) {
//   tryLogin();
// }
