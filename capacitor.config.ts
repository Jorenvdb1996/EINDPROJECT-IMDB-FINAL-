import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'imdb.thomasmore.eindproject',
  appName: 'imdb',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    // Onderstaande lijn genereert een linting fout
    // Hier is niets aan te doen, behalve deze te negeren.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ['phone', 'google.com','facebook.com','twitter.com'],
    },
  }
};

export default config;
