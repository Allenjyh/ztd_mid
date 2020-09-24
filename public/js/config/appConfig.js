import vue from 'vue'
import VueCookies from 'vue-cookies'

const appConfig = {}
/** 应用cookies设置
 * userCookiesKey  -- cookiekey
 * userInfo -- 用户信息 （this.$appConfig.userInfo）
 * **/
appConfig.userCookiesKey = "session_365Mid"
appConfig.userInfo = VueCookies.isKey(appConfig.userCookiesKey) ? VueCookies.get(appConfig.userCookiesKey) : false
vue.prototype.$appConfig = appConfig

export default appConfig
