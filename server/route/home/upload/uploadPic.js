const multer = require('multer');
const moment = require('moment');

  var timestamp = '';
  var timepath = moment().format('YYYY-MM-DD');
  // 配置上传文件的存放位置
  var destination = '/public/upload/' + timepath;
  // var destination = path.join(__dirname, 'public', 'upload', timepath) 
  var filename = '';
  
  var storage = multer.diskStorage({
      //这里destination是一个字符串
      destination: '.' + destination,
      filename: function(req, file, cb) {
        
        //自定义设置文件的名字
        timestamp = new Date().getTime();
        let filenameArr = file.originalname.split('.');
        let picSuffix = filenameArr[filenameArr.length - 1];
        filename = 'goods-' + timestamp + '.' + picSuffix;
        cb(null, filename)
      }
  });
  
  var upload = multer({
      storage: storage
  });
}