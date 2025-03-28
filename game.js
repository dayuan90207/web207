var dbName = 'usersDB',     // 數據庫名 
     daVer = 1,              // 數據庫版本號 
     db = '',                // 用於數據庫對象 
     dbData = [];            // 用於臨時存放數據的數組 
 
 
 // 連接數據庫 
 function openDB(){ 
     var request = indexedDB.open(dbName, daVer); 
    request.onsuccess = function(e){ 
         db = e.target.result; 
         console.log('連接數據庫成功'); 
         // 數據庫連接成功後渲染表格 
         vm.getData(); 
     } 
     request.onerror = function(){ 
         console.log('連接數據庫失敗'); 
     } 
    request.onupgradeneeded = function(e){ 
         db = e.target.result; 
         // 如果不存在Users對象倉庫則創建 
         if(!db.objectStoreNames.contains('Users')){ 
            var store = db.createObjectStore('Users',{keyPath: 'id', autoIncrement: true}); 
            var idx = store.createIndex('index','username',{unique: false}) 
         } 
     } 
 } 
 
 
 /** 
  * 保存數據 
 * @param {Object} data 要保存到數據庫的數據對象 
  */ 
 function saveData(data){ 
    var tx = db.transaction('Users','readwrite'); 
     var store = tx.objectStore('Users'); 
     var req = store.put(data); 
     req.onsuccess = function(){ 
         console.log('成功保存id為'+this.result+'的數據'); 
    } 
 } 

 
 /** 
  * 刪除單條數據 
  * @param {int} id 要刪除的數據主鍵 
  */ 
 function deleteOneData(id){ 
     var tx = db.transaction('Users','readwrite'); 
     var store = tx.objectStore('Users'); 
     var req = store.delete(id); 
     req.onsuccess = function(){ 
         // 刪除數據成功之後重新渲染表格 
        vm.getData(); 
     } 
 } 

 
 /** 
  * 檢索全部數據 
  * @param {function} callback 回調函數 
  */ 
 function searchData(callback){ 
    var tx = db.transaction('Users','readonly'); 
     var store = tx.objectStore('Users'); 
     var range = IDBKeyRange.lowerBound(1); 
     var req = store.openCursor(range,'next'); 
     // 每次檢索重新清空存放數據數組 
     dbData = [];  
     req.onsuccess = function(){ 
         var cursor = this.result; 
         if(cursor){ 
             // 把檢索到的值push到數組中 
             dbData.push(cursor.value); 
             cursor.continue(); 
         }else{ 
             // 數據檢索完成後執行回調函數 
             callback && callback(); 
         } 
     } 
 } 
