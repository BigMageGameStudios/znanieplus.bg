import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'bg.znanieplus.app',
  appName: 'Знание плюс',
  webDir: 'dist/capacitor',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
    hostname: "znanaieplus"
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false
    }
  },
};

export default config;
