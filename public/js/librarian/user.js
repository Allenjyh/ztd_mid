class User {
    constructor(){
        this.UserInfo = {
            /*User_num : option.User_num, //String  书号
            price : option.price, //Double  定价(保留两位小数)
            publish_date: option.publish_date, //Date  出版时间
            rack_no: option.rack_no, //String  架位号
            mode: option.mode, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
            stock: option.stock, //Number  库存
            isbn: option.isbn, //Number  条形码
            User_name: option.User_name, //String  书名
            author: option.author, //String  作者
            publisher: option.publisher, //String  出版社
            sort_num: option.sort_num, //String  分类号
            User_size: option.User_size, //String  开本
            stack_room: option.stack_room, //String  库区
            page_num: option.page_num, //Number  页码
            edition: option.edition, //String  版次
            binding: option.binding, //String  装帧
            picture_url: option.picture_url, //Stirng 图片地址
            synopsis: option.synopsis //String  简介*/
        }
    }
    setUser(info){
        this.UserInfo = info
        return this.UserInfo
    }
    getUser(User){
        this.UserInfo = User
        return this.UserInfo
    }
}
class UserList extends  User{
    constructor(UserInfo){
        super(UserInfo)
        this.list = new Array()
    }
    //get(id): User
    getList(list){
        this.list = list
        console.log('初始化书籍列表',this.list)
    }
    get(id){//查询 
        this.list.forEach(res => {
            if(res.phone_num === id){ 
                this.getUser(res)
            }
        })

        console.log('获取其中一本书籍', this.UserInfo)

        return  this.UserInfo

    }
    //post(User): void
    //提交
    post(User){
      
        this.list.push(User)

        console.log('新增书籍后的书籍列表',this.list)

    }
    //put(id,User): void
    //修改
    put(id,UserInfo){
        console.log(arguments)
        let updateUser = this.get(id)
        for(let i in updateUser){ 
            console.log(UserInfo[i])
            if(UserInfo[i]){
                updateUser[i] = UserInfo[i]
            }
        }

        console.log('修改后的书籍信息',updateUser)
    }
    //delete([id,..].join(',')):void
    //删除
    delete(id){
        console.log(this.list)
        id.forEach((item,ele) => {
            this.list.forEach((res,index) => {
                if(res.phone_num === id[ele]){
                    this.list.splice(index,1)
                }
            })
        })
        console.log('删除书籍后的列表', this.list )
    }
    //checkAll(): [User,..]
    //全选
    checkAll(){
        return this,this.list
        console.log('checkAll')
    }
}

/*************--------------**************/

let user = new UserList()

export default user
//获取列表
// User.getList([
//     {
//         User_num : 1, //String  书号
//         price : 13.33, //Double  定价(保留两位小数)
//         publish_date: '2020-05-05', //Date  出版时间
//         rack_no: 'B234', //String  架位号
//         mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
//         stock: 23, //Number  库存
//         isbn: '123767687567', //Number  条形码
//         User_name: '书名', //String  书名
//         author: '书的作者', //String  作者
//         publisher: '出版社', //String  出版社
//         sort_num: '分类号', //String  分类号
//         User_size: 'A4', //String  开本
//         stack_room: 'B1-90', //String  库区
//         page_num: '146', //Number  页码
//         edition: '版次', //String  版次
//         binding: '装帧', //String  装帧
//         picture_url: 'https://**********', //Stirng 图片地址
//         synopsis: '简介' //String  简介
//     },
//     {
//         User_num : 2, //String  书号
//         price : 13.33, //Double  定价(保留两位小数)
//         publish_date: '2020-05-05', //Date  出版时间
//         rack_no: 'B234', //String  架位号
//         mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
//         stock: 23, //Number  库存
//         isbn: '123767687567', //Number  条形码
//         User_name: '书名', //String  书名
//         author: '书的作者', //String  作者
//         publisher: '出版社', //String  出版社
//         sort_num: '分类号', //String  分类号
//         User_size: 'A4', //String  开本
//         stack_room: 'B1-90', //String  库区
//         page_num: '146', //Number  页码
//         edition: '版次', //String  版次
//         binding: '装帧', //String  装帧
//         picture_url: 'https://**********', //Stirng 图片地址
//         synopsis: '简介' //String  简介
//     }
// ])
// //创建一本书
// let User1 = User.setUser({
//     User_num : 3, //String  书号
//     price : 13.33, //Double  定价(保留两位小数)
//     publish_date: '2020-05-05', //Date  出版时间
//     rack_no: 'B234', //String  架位号
//     mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
//     stock: 23, //Number  库存
//     isbn: '123767687567', //Number  条形码
//     User_name: '书名', //String  书名
//     author: '书的作者', //String  作者
//     publisher: '出版社', //String  出版社
//     sort_num: '分类号', //String  分类号
//     User_size: 'A4', //String  开本
//     stack_room: 'B1-90', //String  库区
//     page_num: '146', //Number  页码
//     edition: '版次', //String  版次
//     binding: '装帧', //String  装帧
//     picture_url: 'https://**********', //Stirng 图片地址
//     synopsis: '简介' //String  简介
// })


// User.get(2)

// User.post(User1)

// User.put(1,{
//     price: 23.88
// })

// User.delete(2)
// User.checkAll()



