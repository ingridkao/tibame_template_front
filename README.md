# tibame_template_front

[參考cgd103第一組團專](https://tibamef2e.com/cgd103/g1/)
【前台登入資訊】
    帳號：charmy101@gmail.com
    密碼：charmy101
    帳號：charmy111@gmail.com
    密碼：charmy111
[前台git](https://github.com/bear320/cgd103_g1/tree/dev)



## tempate功能
1. 使用者登入登出
2. 第三方登入登出
3. 將使用者資訊存在vuex
4. 取得商品列表

## 說明
1. API
    使用fetch的方式

2. 跨域
    開發環境：於vue.config.js設定
    ```
        devServer: {
            proxy: {
                '/api': {
                    target: 'https://tibamef2e.com/cgd103/g1/api/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/api': ''
                    }
                }
            }
        }
    ```
    部署環境：