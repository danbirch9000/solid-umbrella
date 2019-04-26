export function clearAuth0LocalStorage() {
  let arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).substring(0, 14) === "com.auth0.auth") {
      arr.push(localStorage.key(i));
    }
  }

  for (let j = 0; j < arr.length; j++) {
    localStorage.removeItem(arr[j]);
  }
}
