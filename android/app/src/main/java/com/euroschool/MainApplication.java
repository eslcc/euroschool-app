package com.euroschool;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.stetho.Stetho;
import com.facebook.stetho.okhttp3.StethoInterceptor;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.github.yamill.orientation.OrientationPackage;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;

// from package.json

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.asList(
              new MainReactPackage(),
            new ReactNativeRestartPackage(),
            new OrientationPackage(),
            new ReactMaterialKitPackage()
      );
    }
  };

  public void onCreate() {
     super.onCreate();
     Stetho.initializeWithDefaults(this);
     OkHttpClient client = new OkHttpClient.Builder()
     .connectTimeout(0, TimeUnit.MILLISECONDS)
     .readTimeout(0, TimeUnit.MILLISECONDS)
     .writeTimeout(0, TimeUnit.MILLISECONDS)
     .cookieJar(new ReactCookieJarContainer())
     .addNetworkInterceptor(new StethoInterceptor())
     .build();
     OkHttpClientProvider.replaceOkHttpClient(client);
}

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
