export const fakeLoginApi = (username, password, userTypeTryingToLogin) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { 
      if (username === 'Admin' && password === '123qwel@#' && userTypeTryingToLogin === 'admin') {
        resolve('ADMIN');
      } else if (username === 'Padrão' && password === '123qwe123' && userTypeTryingToLogin === 'default') {
        resolve('PADRAO');
      } else {
        reject('Credenciais inválidas');
      }
    }, 1000);
  });
};