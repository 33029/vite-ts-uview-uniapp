<script setup lang="ts">
import {  onLaunch,onShow,onHide} from "@dcloudio/uni-app";

const { darkMode, statusBarHeight, menuButtonBounding } = storeToRefs(
  useAppStore()
);
onLaunch(() => {
  // #ifdef MP-WEIXIN || MP-QQ
  const systemInfo = uni.getSystemInfoSync();
  darkMode.value = systemInfo?.theme === "dark";
  statusBarHeight.value = systemInfo!.statusBarHeight || 44;
  menuButtonBounding.value = uni.getMenuButtonBoundingClientRect();
  uni.onThemeChange(
    (res: UniApp.OnThemeChangeCallbackResult) =>
      (darkMode.value = res.theme === "dark")
  );
  // #endif

  // #ifdef H5
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  darkMode.value = colorScheme.matches;
  colorScheme.addEventListener(
    "change",
    (e: MediaQueryListEvent) => (darkMode.value = e.matches)
  );

  statusBarHeight.value = 0;
  menuButtonBounding.value = {
    width: 87,
    height: 32,
    left: 281,
    top: 4,
    right: 368,
    bottom: 36
  };
  // #endif

  // #ifdef MP-WEIXIN || MP-QQ
  const updateManager = uni.getUpdateManager();
  updateManager.onCheckForUpdate(function(res) {
    console.log("版本更新", res.hasUpdate);
  });
  updateManager.onUpdateReady(function() {
    uni.showModal({
      title: "更新检测", // 此处可自定义提示标题
      content: "检测到新版本，是否重启小程序？", // 此处可自定义提示消息内容
      success: function(res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate();
        }
      }
    });
  });
  updateManager.onUpdateFailed(function() {
    // 新的版本下载失败
    uni.showModal({
      title: "更新提示",
      content: "新版本下载失败",
      showCancel: false
    });
  });
  // #endif
});

onShow(() => {});
onHide(() => {});
</script>



<style lang="scss">
@import "uview-plus/index.scss";

page {
  background: #f2f3f8;
}

::-webkit-scrollbar {
  display: none;
}

:-moz-scrollbar {
  display: none;
}
</style>