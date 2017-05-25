package com.euroschoolapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.microsoft.codepush.react.CodePush;
import com.bugsnag.BugsnagReactNative;
import im.shimo.react.cookie.CookieManagerPackage;
import cl.json.RNSharePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.facebook.react.modules.network.ReactCookieJarContainer;
import com.facebook.stetho.Stetho;
import okhttp3.OkHttpClient;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.stetho.okhttp3.StethoInterceptor;
import java.util.concurrent.TimeUnit;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new CodePush(BuildConfig.CODEPUSH_KEY, getApplicationContext(), BuildConfig.DEBUG),
            BugsnagReactNative.getPackage(),
            new CookieManagerPackage(),
            new RNSharePackage(),
            new LinearGradientPackage(),
            new VectorIconsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();

    Stetho.initializeWithDefaults(this);
    OkHttpClient client = new OkHttpClient.Builder() .connectTimeout(0, TimeUnit.MILLISECONDS) .readTimeout(0, TimeUnit.MILLISECONDS) .writeTimeout(0, TimeUnit.MILLISECONDS) .cookieJar(new ReactCookieJarContainer()) .addNetworkInterceptor(new StethoInterceptor()) .build();
    OkHttpClientProvider.replaceOkHttpClient(client);
    SoLoader.init(this, /* native exopackage */ false);
  }

}
