const jsonConfig = {
  API_URL: "https://jdinxin.compranoseua.com.br",
  WEBSITE_URL: "https://jdinxin.vercel.app",
  IMG_URL: "https://jdinxin-admin.compranoseua.com.br",

  maillerConfig: {
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true,
    // tls: { rejectUnauthorized: true },
    service: "Gmail",
    auth: {
      user: "noreplyexamplemail@gmail.com",
      pass: "noraplymailpassword",
    },
  },

  languageData: [
    {
      languageId: "portuguese",
      locale: "pt",
      name: "Português",
      icon: "br",
    },
    {
      languageId: "english",
      locale: "en",
      name: "English",
      icon: "us",
    },
  ],

  defaultLanguage: {
    languageId: "portuguese",
    locale: "pt",
    name: "Português",
    icon: "br",
  },
};

if (process.env.NODE_ENV == "development") {
  jsonConfig.API_URL = "http://localhost:5000";
  jsonConfig.WEBSITE_URL = "http://localhost:3000";
  jsonConfig.IMG_URL = "http://localhost:5000";
}

module.exports = jsonConfig;
