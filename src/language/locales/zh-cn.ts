// 这是一个zh-cn示例 三文件的结构保持一致
import type { LocaleMessages } from 'vue-i18n'

const locale: LocaleMessages<any> = {
  message: {
    pageTitle: '中文标题',
    game: '游戏',
    home: '首页',
    payHub: '商店',
    purchurse: '商店',
    gameDetail: '游戏详情',
    uid_check: 'UID驗證',
    user_info: '個人資訊',
    user_name: '名稱',
    switch: '切換',
    pay_method: '支付方式',
    product_list: '商品列表',
    pop_content_new_page: '請在新打開的頁面完成支付',
    cancel: '取消',
    close: '關閉',
    canceled: '已取消',
    pay_failed: '支付失敗',
    pay_success_tip: '支付成功，請在游戲内查收',
    open_game: '打開遊戲',
    continue_buy: '繼續購買',
    continue: '繼續',
    uid_input_placeholder: '請輸入游戲内UID',
    total: '小計',
    uid_empty_error_tip: 'UID不能爲空',
    uid_format_error_tip: 'UID格式错误',
    checkout: '前往結賬',
    uid_check_error: 'UID 找不到，請重新驗證',
    gift_info: '額外贈送{giftValue}%點券',
    mj_gift_info: '包含10-20%加贈點券', // 名将三国的商品信息。只有港澳台，没有韩国，所以不需要多语言
    redemption_code: '兌換碼',
    game_features: '遊戲特色',
    make_up_point: '補點',
    login_game: '登入遊戲',
    find_uid: '找到您的UID',
    service_contact: '如遇問題，可聯係專屬VIP客服企業LINE：',
  },
}

export default locale
