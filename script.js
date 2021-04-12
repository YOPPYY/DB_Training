window.addEventListener("load",function(){Disp()});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyD_JLrqVEp5idNbd6g14VE-hiyDTey74a8",
  authDomain: "testproject-85b1a.firebaseapp.com",
  projectId: "testproject-85b1a",
  storageBucket: "testproject-85b1a.appspot.com",
  messagingSenderId: "642824983955",
  appId: "1:642824983955:web:fd2fe1d939a181975ec466",
  measurementId: "G-Y4G736J52F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();

function Send(){
  // Dateオブジェクトを作成
  var date = new Date() ;

  // UNIXタイムスタンプを取得する (ミリ秒単位)
  var a = date.getTime() ;
  var ymd = date.toLocaleDateString(a);
  var t = date.toLocaleTimeString(a);
  var datestr = ymd +" "+ t;
  var browser = navigator.appName;
  var version = navigator.appVersion;

  //送信
  db.collection("access").add({
    date: date,
    datestr: datestr,
    browser: browser,
    version: version,

  })
  .then(function(docRef) {
    console.log("送信成功", docRef.id);
  })
  .catch(function(error) {
    console.error("送信失敗", error);
  });

  var str = "<p>"+ datestr + " " + browser +" "+ version+" "+"</p>";
  document.getElementById("list").insertAdjacentHTML ( 'afterbegin',str);

}

function Disp(){



  //取得
  db.collection("access").get().then((querySnapshot) => {

    querySnapshot.forEach((doc) => {

      var str = "<p>" + doc.get("datestr") + " " +doc.get("browser") +" "+ doc.get("version") +"</p>";
      document.getElementById("list").insertAdjacentHTML ( 'afterend',str);

    });
  });

}
