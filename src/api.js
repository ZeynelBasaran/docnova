import axios from "axios";

const BASE_URL = "https://api-dev.docnova.ai";

// Axios Api
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: false, 
  timeout: 10000, 
});

// İstek öncesi interceptor
api.interceptors.request.use(
  (config) => {
    // İstek gönderilmeden önce yapılacak işlemler Token ekleme vs.
    console.log(config)
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Yanıt sonrası interceptor
api.interceptors.response.use(
  (response) => {
    // Başarılı yanıtları doğrudan döndür
    return response;
  },
  (error) => {
    // Hata yönetimi
    if (error.response) {
      // Sunucudan hata yanıtı alındı
      console.error('API Hatası:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config.url,
        data: error.response.data,
      });
      
      // Özel hata işleme
      if (error.response.status === 401) {
        // Yetkilendirme hatası
        console.error('Yetkilendirme hatası: Lütfen giriş yapın');
        // Örnek: Kullanıcıyı login sayfasına yönlendir
        // window.location.href = '/login';
      } else if (error.response.status === 403) {
        // Erişim reddedildi
        console.error('Erişim reddedildi: Bu işlem için yetkiniz yok');
      } else if (error.response.status === 404) {
        // Kaynak bulunamadı
        console.error('İstenen kaynak bulunamadı');
      } else if (error.response.status >= 500) {
        // Sunucu hatası
        console.error('Sunucu hatası: Lütfen daha sonra tekrar deneyin');
      }
    } else if (error.request) {
      // İstek yapıldı ancak yanıt alınamadı
      console.error('Sunucudan yanıt alınamadı:', error.request);
    } else {
      // İstek oluşturulurken hata oluştu
      console.error('İstek oluşturulurken hata:', error.message);
    }
    
    // Hata nesnesini fırlatmaya devam et
    return Promise.reject(error);
  }
);

// 🔹 GET İsteği
export const getData = (endpoint, params = {}, config = {}) => 
  api.get(endpoint, {
    params,
    ...config,
    headers: {
      ...api.defaults.headers.common,
      ...(config.headers || {}),
    },
  }).then(response => response.data);

// 🔹 POST İsteği
export const postData = (endpoint, data = {}, config = {}) => 
  api.post(endpoint, data, {
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...api.defaults.headers.common,
      ...(config.headers || {}),
    },
  }).then(response => response.data);

