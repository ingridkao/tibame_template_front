# tibame_template_front
使用vueCli製作

[DEMO](https://tibamef2e.com/chd103/ingrid/koala/)

--- 

[參考cgd103第一組團專](https://tibamef2e.com/cgd103/g1/)

【前台登入資訊】
    - 帳號：charmy101@gmail.com
    - 密碼：charmy101
    - 帳號：charmy111@gmail.com
    - 密碼：charmy111

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
    部署環境：直接寫網址

3. API URL
    - 在開發環境路徑為：http://localhost:8080/api/getProducts.php?order=prod_name&limit=9&page=1
        透過webpack中proxy解決跨域問題
    - 在正式環境路徑為：https://tibamef2e.com/cgd103/g1/api/getProducts.php?order=prod_name&limit=9&page=1

    ```
    const baseURL = process.env.NODE_ENV === 'development' ? '/api': 'https://tibamef2e.com/cgd103/g1/api'

    export default createStore({
        state: {
            baseURL: baseURL
        },
    })
    ```

    vue
    ```
        fetch(`${this.$store.state.baseURL}/getProducts.php?order=prod_name&limit=9&page=1`)
    ```


4. public URL
    
    可以將任何檔案放在public中，所有目錄及檔案透過`npm run build`之後會原封不動的被編譯出來

    在開發環境路徑為：http://localhost:8080/data/products.json
    在正式環境路徑為：https://tibamef2e.com/chd103/ingrid/koala/data/products.json
    

    src/store/index.js
    ```
        const publicURL = process.env.NODE_ENV === 'development' ? '': 'https://tibamef2e.com/chd103/ingrid/koala'

        export default createStore({
            state: {
                publicURL: publicURL,
            },
        })
    ```
    vue
    ```
        fetch(`${this.$store.state.publicURL}/data/products.json`)
    ```
