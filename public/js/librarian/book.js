class Book {
    constructor(){
        this.bookInfo = {
            /*book_num : option.book_num, //String  书号
            price : option.price, //Double  定价(保留两位小数)
            publish_date: option.publish_date, //Date  出版时间
            rack_no: option.rack_no, //String  架位号
            mode: option.mode, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
            stock: option.stock, //Number  库存
            isbn: option.isbn, //Number  条形码
            book_name: option.book_name, //String  书名
            author: option.author, //String  作者
            publisher: option.publisher, //String  出版社
            sort_num: option.sort_num, //String  分类号
            book_size: option.book_size, //String  开本
            stack_room: option.stack_room, //String  库区
            page_num: option.page_num, //Number  页码
            edition: option.edition, //String  版次
            binding: option.binding, //String  装帧
            picture_url: option.picture_url, //Stirng 图片地址
            synopsis: option.synopsis //String  简介*/
        }
    }
    setBook(info){
        this.bookInfo = info
        return this.bookInfo
    }
    getBook(book){
        this.bookInfo = book
        return this.bookInfo
    }
}
class BookList extends  Book{
    constructor(bookInfo){
        super(bookInfo)
        this.list = new Array()
    }
    //get(id): book
    getList(list){
        this.list = list
        console.log('初始化书籍列表',this.list)
    }
    get(id){//查询 
        this.list.forEach(res => {
            if(res.isbn === id){ 
                this.getBook(res)
            }
        })

        console.log('获取其中一本书籍', this.bookInfo)

        return  this.bookInfo

    }
    //post(book): void
    //提交
    post(book){
      
        this.list.push(book)

        console.log('新增书籍后的书籍列表',this.list)

    }
    //put(id,book): void
    //修改
    put(id,boonInfo){
        console.log(arguments)
        let updateBook = this.get(id)
        for(let i in updateBook){ 
            console.log(boonInfo[i])
            if(boonInfo[i]){
                updateBook[i] = boonInfo[i]
            }
        }

        console.log('修改后的书籍信息',updateBook)
    }
    //delete([id,..].join(',')):void
    //删除
    delete(id){
        console.log(this.list)
        id.forEach((item,ele) => {
            this.list.forEach((res,index) => {
                if(res.id === id[ele]){
                    this.list.splice(index,1)
                }
            })
        })
        console.log('删除书籍后的列表', this.list )
    }
    //checkAll(): [book,..]
    //全选
    checkAll(){
        return this,this.list
        console.log('checkAll')
    }
}

/*************--------------**************/

let book = new BookList()

export default book
//获取列表
// book.getList([
//     {
//         book_num : 1, //String  书号
//         price : 13.33, //Double  定价(保留两位小数)
//         publish_date: '2020-05-05', //Date  出版时间
//         rack_no: 'B234', //String  架位号
//         mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
//         stock: 23, //Number  库存
//         isbn: '123767687567', //Number  条形码
//         book_name: '书名', //String  书名
//         author: '书的作者', //String  作者
//         publisher: '出版社', //String  出版社
//         sort_num: '分类号', //String  分类号
//         book_size: 'A4', //String  开本
//         stack_room: 'B1-90', //String  库区
//         page_num: '146', //Number  页码
//         edition: '版次', //String  版次
//         binding: '装帧', //String  装帧
//         picture_url: 'https://**********', //Stirng 图片地址
//         synopsis: '简介' //String  简介
//     },
//     {
//         book_num : 2, //String  书号
//         price : 13.33, //Double  定价(保留两位小数)
//         publish_date: '2020-05-05', //Date  出版时间
//         rack_no: 'B234', //String  架位号
//         mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
//         stock: 23, //Number  库存
//         isbn: '123767687567', //Number  条形码
//         book_name: '书名', //String  书名
//         author: '书的作者', //String  作者
//         publisher: '出版社', //String  出版社
//         sort_num: '分类号', //String  分类号
//         book_size: 'A4', //String  开本
//         stack_room: 'B1-90', //String  库区
//         page_num: '146', //Number  页码
//         edition: '版次', //String  版次
//         binding: '装帧', //String  装帧
//         picture_url: 'https://**********', //Stirng 图片地址
//         synopsis: '简介' //String  简介
//     }
// ])
// //创建一本书
// let book1 = book.setBook({
//     book_num : 3, //String  书号
//     price : 13.33, //Double  定价(保留两位小数)
//     publish_date: '2020-05-05', //Date  出版时间
//     rack_no: 'B234', //String  架位号
//     mode: 1, //Number  1:幼儿模式 2:少年模式 3:青少年模式 4:成人模式
//     stock: 23, //Number  库存
//     isbn: '123767687567', //Number  条形码
//     book_name: '书名', //String  书名
//     author: '书的作者', //String  作者
//     publisher: '出版社', //String  出版社
//     sort_num: '分类号', //String  分类号
//     book_size: 'A4', //String  开本
//     stack_room: 'B1-90', //String  库区
//     page_num: '146', //Number  页码
//     edition: '版次', //String  版次
//     binding: '装帧', //String  装帧
//     picture_url: 'https://**********', //Stirng 图片地址
//     synopsis: '简介' //String  简介
// })


// book.get(2)

// book.post(book1)

// book.put(1,{
//     price: 23.88
// })

// book.delete(2)
// book.checkAll()



