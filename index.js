const express = require('express')
const app =  express();
const bodyparser=require('body-parser')
const port = process.env.PORT || 3200;
const cors = require('cors'); 
const { NativeError, set } = require('mongoose');
const barCode=require('jsbarcode')
app.use(cors());
app.use(bodyparser.json());
//excercise 1
//date difference

app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/dateTime.html');
});

app.get('/dateTime', (req,res)=>{
   // console.log('dateTime')
  // console.log(req.body)
    console.log('Calculating date difference:')
   
    var date1 = req.query.date1; 
    var date2 = req.query.date2;
    var d1 = new Date(date1)
    var d2 = new Date(date2)
    console.log(d1,d2);
    let l1 = d1.getFullYear();
    let l2 = d2.getFullYear();
    //console.log(l1,l2)
    l1 = (l1 / 4) - (l1 / 100) + (l1 / 400);
    l2 = (l2 / 4) - (l2 / 100) + (l2 / 400);
   // console.log(d2.getFullYear()-d1.getFullYear())
    var year = Math.abs(d2.getFullYear() - d1.getFullYear());
   // console.log(year)
    var months = Math.abs(d2.getMonth() - d1.getMonth());
    var days = Math.abs(d2.getDate() - d1.getDate()) + Math.round(l2-l1);
    var hours = Math.abs(d2.getHours() - d1.getHours());
    var minutes = Math.abs(d2.getMinutes() - d1.getMinutes())
    var seconds = Math.abs(d2.getSeconds() - d1.getSeconds());
    res_array=[year.toString().concat(" years"),months.toString().concat(" months"),days.toString().concat(" days"),hours.toString().concat(" hours"),minutes.toString().concat(" minutes"), seconds.toString().concat(" seconds")];
  	//result string
    var res_string=res_array.toString();
    // make it json format
    res.json({'resDate':res_string})
  
});
//set operations
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/set.html');
});
app.get('/set',(req,res) => {
  var a1=req.query.a1;
  var a2=req.query.a2;
  var op=req.query.op;
  var intersection=[],union=[],ab=[],ba=[];
  console.log(a1,a2,op)
  if(op=="intersection"){
    intersection = a1.filter(x => a2.includes(x));
    final=intersection
    res.json({'setRes':final})
  }
  if(op=="union"){
    var obj = {};
  for (var i = a1.length-1; i >= 0; -- i)
     obj[a1[i]] = a1[i];
  for (var i = a2.length-1; i >= 0; -- i)
     obj[a2[i]] = a2[i];
  
  for (var k in obj) {
    //if (obj.hasOwnProperty(k))  // <-- optional
      union.push(obj[k]);
  }
  res.json({'setRes':union})
  }
  if(op="a-b"){
    ab=a1.filter(x => !a2.includes(x))
    final=ab;
    res.json({'setRes':final})
  }
  if(op=="b-a"){
    ba=a2.filter(x=> !a1.includes(x) )
    final=ba;
    res.json({'setRes':ba})
  }
  
});

//matrix 
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/matrix.html');
});
app.get('/matrix',(req,res)=>{
  var matrix=req.query.mat;
  var mat_op = req.query.op;
  var n=req.query.n
  var row=Math.sqrt(n)
  var col=Math.sqrt(n)
  console.log(matrix,mat_op,n)
  let matrix1=[]
	let res_mat=[]
	
	let k=0
	for(let i=0;i<row;i++)
	{		
		matrix1[i]=[]
		res_mat[i]=[]
	}
	for(let i=0;i<row;i++)
		for(let j=0;j<col;j++)
			matrix1[i][j]=matrix[k++]

	//console.log(matrix1)
	//console.log(matrix,row,col,mat_op)
	if(mat_op=="transpose")
	{
		for(let i=0;i<col;i++)
			for(let j=0;j<row;j++)
				res_mat[i][j]=matrix1[j][i]
		res.json({"matrixResult":res_mat})

	}
  if(mat_op=="lower-left"){
    for(let i=0;i<row;i++){
      for(let  j=0;j<col;j++){
        if(j<i){
          res_mat[i][j]=matrix1[i][j]
        }
        else{
          res_mat[i][j]='0'
        }
      }
    }
    res.json({"matrixResult":res_mat})
  }
  if(mat_op=="lower-right"){
    for(let i=0;i<row;i++){
      for(j=0;j<col;j++){
        if(j>=1 && i+j > n-1){
          res_mat[i][j]=matrix1[i][j]
        }
        else{
          res_mat[i][j]='0'
        }
      }
    }
    res.json({"matrixResult":res_mat})
  }
  if(mat_op=="upper-left"){
    for(let i=0;i<row;i++){
      for(let j=0;j<col;j++){
        if(j>i){
          res_mat[i][j]=matrix1[i][j]
        }
        else{
          res_mat[i][j]='0'
        }
      }
    }
    res.json({"matrixResult":res_mat})
  }
  if(mat_op=="upper-right"){
    for(let i=0;i<row;i++){
      for(let j=0;j<col;j++){
        if(j<=1 && i+j <n-1){
          res_mat[i][j]=matrix1[i][j]
        }
        else{
          res_mat[i][j]='0'
        }
      }
    }
    res.json({"matrixResult":res_mat})
  }
})
//figures to words
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/figuresToWords.html');
});
app.get('/figureToWords',(req,res)=>{
  var n = req.query.n;
  var a = ['','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  var b = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']
  if (n === n.length > 9) return 'overflow';
  var no = ('000000000' + n).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!no) return; 
  var str = '';
  str += (no[1] != 0) ? (a[no[1]] || b[no[1][0]] + ' ' + a[no[1][1]]) + ' crore ' : '';
  str += (no[2] != 0) ? (a[no[2]] || b[no[2][0]] + ' ' + a[no[2][1]]) + ' lakh ' : '';
  str += (no[3] != 0) ? (a[no[3]] || b[no[3][0]] + ' ' + a[no[3][1]]) + ' thousand ' : '';
  str += (no[4] != 0) ? (a[no[4]] || b[no[4][0]] + ' ' + a[no[4][1]]) + ' hundred ' : '';
  str += (no[5] != 0) ? ((str != '') ? 'and ' : '') + (a[no[5]] || b[no[5][0]] + ' ' + a[no[5][1]]) + ' only ' : '';
  console.log(str)
  res.json({'resWord':str})
})
//rsa
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/rsa.html');
});
app.get('/rsa',(req,res)=>{
  var str = req.query.msg;
  console.log(str)
 // var primes=[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  var p=Math.floor(Math.random() * 100);
  var q=Math.floor(Math.random() * 100);
  var m = Math.floor(Math.random() * 10);
  var n = p*q;
  var phi=(p-1)*(q-1);
  var e=rel_prime(phi);
  var c=encrypt(n,e,m);
  console.log(c)
  var d=calculate_d(phi,e);
  console.log(d)
  res.json({'rsa':c})
})
function rel_prime(phi){
   var rel=5;
   while (gcd(phi,rel)!=1)
      rel++;
   return rel;
}
function gcd (a, b){
   var r;
   while (b>0){
      r=a%b;
      a=b;
      b=r;
   }
   return a;
}
function encrypt(N, e, M){
   var r,i=0,prod=1,rem_mod=0;
   while (e>0){
      r=e % 2;
      if (i++==0)
         rem_mod=M % N;
      else
         rem_mod=Math.pow(rem_mod,2) % N;
      if (r==1){
         prod*=rem_mod;
         prod=prod % N;
      }
      e=parseInt(e/2);
   }
   return prod;
}
function calculate_d(phi,e)
{
   var x,y,x1,x2,y1,y2,temp,r,orig_phi;
   orig_phi=phi;
   x2=1;x1=0;y2=0;y1=1;
   while (e>0){
      temp=parseInt(phi/e);
      r=phi-temp*e;
      x=x2-temp*x1;
      y=y2-temp*y1;
      phi=e;e=r;
      x2=x1;x1=x;
      y2=y1;y1=y;
      if (phi==1){
         y2+=orig_phi;
         break;
      }
   }
   return y2;
}

function decrypt(c, d, N)
{
   var r,i=0,prod=1,rem_mod=0;
   while (d>0){
      r=d % 2;
      if (i++==0)
         rem_mod=c % N;
      else
         rem_mod=Math.pow(rem_mod,2) % N;
      if (r==1){
         prod*=rem_mod;
         prod=prod % N;
      }
      d=parseInt(d/2);
   }
   return prod;
}
//md5
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/md5.html');
});
app.get('/md5',(req,res)=>{
  var str= req.query.md5;
  console.log(str)
  res.json({'md5':calcMD5(str)})
})
function calcMD5(s){
  var x= str2blks_MD5(s);
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  for(var i = 0; i < x.length; i += 16) 
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = ffMD4(a, b, c, d, x[i+ 0], 3 );
    d = ffMD4(d, a, b, c, x[i+ 1], 7 );
    c = ffMD4(c, d, a, b, x[i+ 2], 11);
    b = ffMD4(b, c, d, a, x[i+ 3], 19);
    a = ffMD4(a, b, c, d, x[i+ 4], 3 );
    d = ffMD4(d, a, b, c, x[i+ 5], 7 );
    c = ffMD4(c, d, a, b, x[i+ 6], 11);
    b = ffMD4(b, c, d, a, x[i+ 7], 19);
    a = ffMD4(a, b, c, d, x[i+ 8], 3 );
    d = ffMD4(d, a, b, c, x[i+ 9], 7 );
    c = ffMD4(c, d, a, b, x[i+10], 11);
    b = ffMD4(b, c, d, a, x[i+11], 19);
    a = ffMD4(a, b, c, d, x[i+12], 3 );
    d = ffMD4(d, a, b, c, x[i+13], 7 );
    c = ffMD4(c, d, a, b, x[i+14], 11);
    b = ffMD4(b, c, d, a, x[i+15], 19);

    a = ggMD4(a, b, c, d, x[i+ 0], 3 );
    d = ggMD4(d, a, b, c, x[i+ 4], 5 );
    c = ggMD4(c, d, a, b, x[i+ 8], 9 );
    b = ggMD4(b, c, d, a, x[i+12], 13);
    a = ggMD4(a, b, c, d, x[i+ 1], 3 );
    d = ggMD4(d, a, b, c, x[i+ 5], 5 );
    c = ggMD4(c, d, a, b, x[i+ 9], 9 );
    b = ggMD4(b, c, d, a, x[i+13], 13);
    a = ggMD4(a, b, c, d, x[i+ 2], 3 );
    d = ggMD4(d, a, b, c, x[i+ 6], 5 );
    c = ggMD4(c, d, a, b, x[i+10], 9 );
    b = ggMD4(b, c, d, a, x[i+14], 13);
    a = ggMD4(a, b, c, d, x[i+ 3], 3 );
    d = ggMD4(d, a, b, c, x[i+ 7], 5 );
    c = ggMD4(c, d, a, b, x[i+11], 9 );
    b = ggMD4(b, c, d, a, x[i+15], 13);

    a = hhMD4(a, b, c, d, x[i+ 0], 3 );
    d = hhMD4(d, a, b, c, x[i+ 8], 9 );
    c = hhMD4(c, d, a, b, x[i+ 4], 11);
    b = hhMD4(b, c, d, a, x[i+12], 15);
    a = hhMD4(a, b, c, d, x[i+ 2], 3 );
    d = hhMD4(d, a, b, c, x[i+10], 9 );
    c = hhMD4(c, d, a, b, x[i+ 6], 11);
    b = hhMD4(b, c, d, a, x[i+14], 15);
    a = hhMD4(a, b, c, d, x[i+ 1], 3 );
    d = hhMD4(d, a, b, c, x[i+ 9], 9 );
    c = hhMD4(c, d, a, b, x[i+ 5], 11);
    b = hhMD4(b, c, d, a, x[i+13], 15);
    a = hhMD4(a, b, c, d, x[i+ 3], 3 );
    d = hhMD4(d, a, b, c, x[i+11], 9 );
    c = hhMD4(c, d, a, b, x[i+ 7], 11);
    b = hhMD4(b, c, d, a, x[i+15], 15);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);

  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
function cmn(q, a, b, x, s, t) 
{
  return add(rol(add(add(a, q), add(x, t)), s), b);
}
function ffMD4(a, b, c, d, x, s) 
{
  return cmn((b & c) | ((~b) & d), a, 0, x, s, 0);
}
function ggMD4(a, b, c, d, x, s) 
{
  return cmn((b & c) | (b & d) | (c & d), a, 0, x, s, 1518500249);
}
function hhMD4(a, b, c, d, x, s) 
{
  return cmn(b ^ c ^ d, a, 0, x, s, 1859775393);
}
	
var hex_chr = "0123456789abcdef";
function rhex(num)
{
  var str = "";
  for(var j = 0; j <= 3; j++)
    str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
           hex_chr.charAt((num >> (j * 8)) & 0x0F);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 * MD5 here is not a typo - this function is borrowed from the MD5 code.
 */
function str2blks_MD5(str)
{
  var nblk = ((str.length + 8) >> 6) + 1;
  var blks = new Array(nblk * 16);
  for(var i = 0; i < nblk * 16; i++) blks[i] = 0;
  for(i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally 
 * to work around bugs in some JS interpreters.
 */
function add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}
//otp
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/otp.html');
});
app.get('/otp',(req,res)=>{
  var n = req.query.n;
  var size = req.query.size
  var chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var otp = randomString(size,chars)
  res.json({'otp':otp})
})
function randomString(length, chars) {
  var result=''
  for (var i = Number(length); i > 0; --i){
    result += chars[Math.floor(Math.random() * chars.length)];
  } 
  return result;
}
//qrCode
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/qrCode.html');
});
app.get('/qr',(req,res) => {
	let str=req.query.str;
  console.log(str)
	const max=100
	const min=1
	const n=Math.floor(Math.random() * (max - min) + min);
	var res_str=""
	var s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	for(let i=0;i<5;i++)
	{
		let index=Math.floor(Math.random()*(s.length));
		res_str+=s[index]
	}
	res_str+="_"+n+"_OR.png"
	const generateQR = async text => {
  	try {
    await qrCode.toFile("F:/SOA/js_lab/qrCode.html"+res_str, str);
  	} 
  	catch (err)
  	 {
    console.error(err)
  	}

	}
	generateQR(str)
	res.json({"qrRes":res_str})
});
//bar
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/barCode.html');
});
app.get('/bar',(req,res)=>{
  var str=req.query.str;
  var barCode= new barCode(); 
var result=barCode("#barcode", str);
console.log(result)
res.json({'barRes':result})
})
//captcha
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/captcha.html');
});
//app.use('/captcha.jpg', express.static(__dirname + '/captcha.jpg'));
app.get('/captcha',(req,res)=>{
  var str = req.query.str;
  console.log(str)
  res.json({'captcha':drawCaptcha()})
})
function drawCaptcha(){
  var a = Math.ceil(Math.random() * 10)+ '';
  var b = Math.ceil(Math.random() * 10)+ '';       
  var c = Math.ceil(Math.random() * 10)+ '';  
  var d = Math.ceil(Math.random() * 10)+ '';  
  var e = Math.ceil(Math.random() * 10)+ '';  
  var f = Math.ceil(Math.random() * 10)+ '';  
  var g = Math.ceil(Math.random() * 10)+ '';  
  var code = a + ' ' + b + ' ' + ' ' + c + ' ' + d + ' ' + e + ' '+ f + ' ' + g;
  return code;
}
//log1
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/captcha.html');
});
//excersise 2
app.get('/natLog',(req,res)=>{
  var n = req.query.n;
  var nx = 1000.0;
  var output =  nx * ((n ** (1/nx)) - 1);
  res.json({'natLogRes':output})
})
function power(base,exp){
  if(exp < 0){
    if(base == 0){
        return -0; // Error!!
    }
    return 1 / (base * power(base, (-exp) - 1))
  }
  if(exp == 0)
    return 1
  if(exp == 1)
    return base
  return base * Math.pow(base, exp - 1)
}
app.get('/antiLog',(req,res)=>{
  var n = req.query.n;
  var x=Math.pow(10,n);
  res.json({'antiLogRes':x})
})
app.get('/log',(req,res)=>{
  var x = req.query.n;
  var base =10;
  var n = 1000.0;
  var noutput =  n * ((x ** (1/n)) - 1);
  var baseOutput = n * ((base ** (1/n)) - 1);
  var op = noutput / baseOutput;
  res.json({'logRes':op})
})
//log2
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/log2.html');
});
app.get('/gcd',(req,res)=>{
  var n1= req.query.n1;
  var n2=req.query.n2;
  var gcd=1
  for(let i=1; i <= n1 && i <= n2; ++i)
  {
      // Checks if i is factor of both integers
      if(n1%i==0 && n2%i==0){
        gcd=i;
      }   
  }
  res.json({'gcdRes':gcd})
})
app.get('/lcm',(req,res)=>{
  var n1= req.query.n1;
  var n2=req.query.n2;
  var lcm=1;
  let max = (n1>n2)?n1:n2;
  while(1){
    if((max % n1 == 0) &&(max % n2 == 0) ){
      lcm=max;
      break;
    }
    ++max;
  }
  res.json({'lcmRes':lcm})
})
app.get('/nthRoot',(req,res)=>{
  var n= req.query.n;
  var r=req.query.r;
  res.json({'nthRes':Math.pow(n,(1/r))})
})
app.get('/squareRoot',(req,res)=>{
  var n= req.query.n;
  res.json({'squareRes':Math.pow(n,0.5)})
})  
app.get('/cubeRoot',(req,res)=>{
  var n = req.query.n;
  res.json({'cubeRes':Math.pow(n,0.33333)})
})
//log3
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/log3.html');
});
var PI=3.1415926535897932384650288;
var TERMS = 7;
function fact(n) {
  return  n<= 0? 1: n * fact(n-1);
}
app.get('/trig',(req,res)=>{
  var deg=req.query.n;
  var op=req.query.op;
  var result=1;
  if(op=="sin"){
   result=sine(deg)
  }
  if(op=="cos"){
    result=cosine(deg)
  }
  if(op=="tan"){
    result=tangent(deg)
  }
  if(op=="cosec"){
    result=cosec(deg)
  }
  if(op=="sec"){
    result=secant(deg)
  }
  if(op=="cot"){
    result=cot(deg)
  }
  if(op=="arcSin"){
    result=arcSine(deg)
  }
  if(op=="arcCos"){
    result=Math.acos(deg)
  }
  if(op=="arcTan"){
    result=Math.atan(deg)
  }
  res.json({'trig':result})
})
var result=1;
function sine(deg){
  var deg = deg % 360 // make it less than 360
  
    var rad = deg * PI / 180
    var sin = 0
    var i=0
    for(i=0;i<TERMS;i++){ // That's Taylor series!!
        sin = sin + power(-1, i) * Math.pow(rad, 2 * i + 1) / fact(2 * i + 1)
    }
   result=sin;
    return result
}
function cosec(deg){
  var deg = deg % 360 // make it less than 360
  
    var rad = deg * PI / 180
    var sin = 0
    var i=0
    for(i=0;i<TERMS;i++){ // That's Taylor series!!
        sin = sin + power(-1, i) * power(rad, 2 * i + 1) / fact(2 * i + 1)
    }
   result=1/sin;
    return result
}
function cosine(deg) {
  var deg = deg % 360 // make it less than 360
  var rad = deg * PI / 180
  var cos = 0
  var i=0
  for(i=0;i<TERMS;i++){ // That's also Taylor series!!
      cos += power(-1, i) * power(rad, 2 * i) / fact(2 * i)
  }
  result=cos
  return result
}
function secant(deg) {
  var deg = deg % 360 // make it less than 360
  var rad = deg * PI / 180
  var cos = 0
  var i=0
  for(i=0;i<TERMS;i++){ // That's also Taylor series!!
      cos += power(-1, i) * power(rad, 2 * i) / fact(2 * i)
  }
  result=1/cos
  return result
}
function tangent(x){
  
    // To store value of the expansion 
    var sum = 0
    var terms = 6
    var x = x % 360; // make it less than 360
    x = x * PI / 180
    for(var i=1;i<=terms;i++){// i in range(1, terms + 1): 
  
        // This loops here calculate Bernoulli number 
        // which is further used to get the coefficient 
        // in the expansion of tan x 
        var B = 0; 
        var Bn = 2 * i; 
        for(var k=0;k<=Bn;k++){// k in range(Bn + 1): 
            var temp = 0; 
            for(var r=0;r<=k;r++){// r in range(0, k + 1): 
                temp = temp + Math.pow(-1, r) * fact(k) * Math.pow(r, Bn) / (fact(r) * fact(k - r)); 
            }  
            B = B + temp / ((k + 1)); 
        } 
        sum = sum + Math.pow(-4, i) * (1 - Math.pow(4, i)) * B * Math.pow(x, 2 * i - 1) / fact(2 * i); 
    }
    // Print the value of expansion 
    result=sum.toPrecision(9)
    
    return result;
}
function cot(x){
  
  // To store value of the expansion 
  var sum = 0
  var terms = 6
  var x = x % 360; // make it less than 360
  x = x * PI / 180
  for(var i=1;i<=terms;i++){// i in range(1, terms + 1): 

      // This loops here calculate Bernoulli number 
      // which is further used to get the coefficient 
      // in the expansion of tan x 
      var B = 0; 
      var Bn = 2 * i; 
      for(var k=0;k<=Bn;k++){// k in range(Bn + 1): 
          var temp = 0; 
          for(var r=0;r<=k;r++){// r in range(0, k + 1): 
              temp = temp + Math.pow(-1, r) * fact(k) * Math.pow(r, Bn) / (fact(r) * fact(k - r)); 
          }  
          B = B + temp / ((k + 1)); 
      } 
      sum = sum + Math.pow(-4, i) * (1 - Math.pow(4, i)) * B * Math.pow(x, 2 * i - 1) / fact(2 * i); 
  }
  // Print the value of expansion 
  result=1/sum.toPrecision(9)
  
  return result;
}
function arcSine(x){ 
  var n = 8
  var Sum = parseFloat(x)
  var e = 2
  var o = 1
  var p = 1
  for(var i=2;i<=n;i++){// i in range(2, n + 1): 
      // The power to which 'x' is raised 
      p += 2
      Sum += (o / e) * (Math.pow(x, p) / p) 
      // Numerator value 
      o = o * (o + 2) 
      // Denomina  tor value 
      e = e * (e + 2) 
  }
  console.log(Sum);
  result=Sum.toPrecision(9)
  return result; 
}
//stat
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/stat.html');
});

app.get('/stat',(req,res)=>{
  var n = req.query.n;
  var arr = new Array(n)
  arr = req.query.a;
  var opr= req.query.op;
  console.log(arr,n,opr)
  var result = 1;
  if(opr=="Variance"){
    var i = stdDev(arr)
    result=Math.pow(i,2)
  }
  if(opr=="Standard Deviation"){
    result= stdDev(arr)
  }
  res.json({'stat':result})
})
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/stat.html');
});

app.get('/linear',(req,res)=>{
  var list1=req.query.c1
  var list2=req.query.c2
  console.log(list1,list2)
  var sumx,sumy,sumx2,sumxy;
  var r=0.0
  var m,c,meanx,meany;
  sumx=sumy=sumx2=sumxy=0
  n=list1.length
		for(let i=0;i<n;i++)
		{
			sumx+=list1[i]
			sumy+=list2[i]
			sumx2+=(list1[i]*list1[i])
			sumxy+=(list1[i]*list2[i])
		}
		m=(n*sumxy-sumx*sumy)/(n*sumx2-sumx*sumx)
		meanx=sumx/n
		meany=sumy/n
		c=meany-m*meanx
		m=m.toFixed(3)
		c=c.toFixed(3)
		// m=Math.round(m)
		// c=Math.round(c)
		res_str="y="+m+"x+("+c+")"
		var slope=m
		var intercept=c
		res.json({"linear":res_str,"slope":slope,"intercept":intercept})
  //res.json({'linearRes':list1})
})
function stdDev(a){
  var sum = 0;
  for(let i=0;i< a.length;i++){
    sum+=a[i]
  }
  console.log(sum)
  var mean = sum/a.length;
  console.log(mean)
  var arr1 = new Array(a.length)
  for(let i=0;i< arr1.length;i++){
    arr1[i]= Math.pow(a[i]-mean,2) 
  }
  console.log(arr1)
  var sum1=0;
  for(let i=0;i<arr1.length;i++){
    sum1+=arr1[i];
  }
  console.log(sum1)
  var mean1= sum1/arr1.length;
  console.log(mean1)
  console.log(Math.sqrt(mean1))
  return Math.sqrt(mean1)
}
//electrical calculator
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/elecCalc.html');
});
app.get('/amperes',(req,res)=>{
  var v= req.query.v;
  var w = req.query.w;
  console.log(w/v)
  res.json({'amperes':w/v})
})
app.get('/volts',(req,res)=>{
  var a=req.query.a;
  var w = req.query.w;
  console.log(w/a)
  res.json({'volts':w/a})
})
app.get('/watts',(req,res)=>{
  var a=req.query.a;
  var v= req.query.v;
  console.log(a*v)
  res.json({'watts':a*v})
})
app.get('/joules',(req,res)=>{
  var s=req.query.s;
  var w= req.query.w;
  console.log(s*w)
  res.json({'joules':s*w})
})
//excercise 3
//huffman
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/huffman.html');
});

app.get('/huffman',(req,res)=>{
	var data=req.query.str
	//Huffman coding is a compression algorithm that represents a string sequence in binary  
	let map;
class Node {  
    constructor(value, char, left, right) {  
        this.val  =value; // number of character occurrences  
        this.char  =char; // character to be encoded  
        this.left = left;  
        this.right = right;  
    }  
}

class huffmanTree{  
    constructor(str){  
        //The first step is to count the frequency of characters  
        let hash = {};  
        for(let i = 0; i < str.length; i++){  
            hash[str[i]] = ~~hash[str[i]] + 1;  
        }  
        this.hash = hash;  
  
        //Constructing Huffman tree  
        this.huffmanTree = this.getHuffmanTree();  
  
        map = this.getHuffmanCode(this.huffmanTree);  
        //Look at the cross reference table, that is, what is the binary encoding of each character  
        //console.log(map);  
  
        //Final binary encoding  
        this.binaryStr = this.getBinaryStr(map, str);  
    }  
  
    //Constructing Huffman tree  
    getHuffmanTree(){  
        //The number of occurrences of each character is node.val , tectonic forest  
        let forest = []  
        for(let char in this.hash){  
            let node = new Node(this.hash[char], char); 
            forest.push(node);  
        }  
  
        //When there is only one node left in the forest, the merging process is finished and the tree is generated  
        let allNodes = []; // stores the merged nodes, because any node in the forest cannot be deleted, otherwise. Left. Right will not find the node  
        while(forest.length !== 1){  
            //Find the two smallest trees in the forest and merge them  
            forest.sort((a, b) => {  
                return a.val - b.val;  
            });  
  
            let node = new Node(forest[0].val + forest[1].val, '');  
            allNodes.push(forest[0]);  
            allNodes.push(forest[1]);  
            node.left  = allNodes[ allNodes.length  -2]; // the left subtree places words with low frequency  
            node.right  = allNodes[ allNodes.length  -1]; // the right subtree places the word frequency high  
  
            //Delete the two smallest trees  
            forest = forest.slice(2);  
            //Added tree join  
            forest.push(node);  
        }  
  
        //Generated Huffman tree  
        return forest[0];  
    }  
  
    //Traverse the Huffman tree and return a table of original characters and binary codes  
    getHuffmanCode(tree){  
        let hash = {}; // cross reference table
        let traversal = (node, curPath) => {  
            if (!node.length && !node.right) return;  
            if (node.left && !node.left.left && !node.left.right){  
                hash[node.left.char] = curPath + '0';  
            }  
            if (node.right && !node.right.left && !node.right.right){  
                hash[node.right.char] = curPath + '1';  
            }  
            //Traverse to the left and add 0 to the path  
            if(node.left){  
                traversal(node.left, curPath + '0');  
            }  
            //Go right and add 1 to the path  
            if(node.right){  
                traversal(node.right, curPath + '1');  
            }  
        };  
        traversal(tree, '');  
        return hash;  
    }  
  
    //Returns the final compressed binary string  
    getBinaryStr(map, originStr){  
        let result = '';  
        for(let i = 0; i < originStr.length; i++){  
            result += map[originStr[i]];  
        }  
        return result;  
    }  
}

let tree = new huffmanTree(data)  
console.log(map)
console.log(tree.binaryStr)
res.json({"enc":tree.binaryStr})
})
//run length
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/runLength.html');
});
app.get('/runLength',(req,res)=>{
  var data=req.query.str;
  i=0
	n=data.length
	res_str=""
	res_arr=[]
	k=0
	while(i<n)
	{
		count=1
		while(i<n-1 && data[i]==data[i+1])
		{
			count+=1
			i+=1
		}
		i+=1
		res_arr[k++]=data[i-1]
		res_arr[k++]=String(count)


	}
	var res_str=res_arr.join('')
  res.json({'runLengthRes':res_str})
})
//lzw
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/lzw.html');
});
app.get('/lzw',(req,res)=>{
 
  // LZW-compress a string
//LZW Compression/Decompression for Strings
var LZW = {
  compress: function (uncompressed) {

      // Build the dictionary.
      var i = 256,
          dictionary = {},
          c,
          wc,
          w = "",
          result = [],
          dictSize = 256;

      while (i--) dictionary[String.fromCharCode(i)] = i;

      for (i = 0; i < uncompressed.length; i++) {
          c = uncompressed.charAt(i);
          wc = w + c;
          //Do not use dictionary[wc] because javascript arrays 
          //will return values for array['pop'], array['push'] etc
          // if (dictionary[wc]) {
          if (dictionary.hasOwnProperty(wc)) {
              w = wc;
          } else {
              result.push(dictionary[w]);
              // Add wc to the dictionary.
              dictionary[wc] = dictSize++;
              w = String(c);
          }
      }

      // Output the code for w.
      if (w !== "") result.push(dictionary[w]);

      return result;
  },

  decompress: function (compressed) {

      // Build the dictionary.
      var i = 256,
          dictionary = [],
          k,
          entry = "",
          dictSize = 256;

      while (i--) dictionary[i] = String.fromCharCode(i);


      var w = String.fromCharCode(compressed[0]);
      var result = w;
      for (i = 1; i < compressed.length; i += 1) {
          k = compressed[i];
          if (dictionary[k]) {
              entry = dictionary[k];
          } else {
              if (k === dictSize) {
                  entry = w + w.charAt(0);
              } else {
                  return null;
              }
          }

          result += entry;

          // Add w+entry[0] to the dictionary.
          dictionary[dictSize++] = w + entry.charAt(0);

          w = entry;
      }
      return result;
  }
};
var data=req.query.str;
var enc=LZW.compress(data)
var dec=LZW.decompress(enc)
	res.json({"result":enc,"dec":dec})
})

//lzUTF8
app.get('/js_lab/index.js',(req,res) => {
	res.sendFile('F:/SOA/js_lab/lzw.html');
});

app.get('/lzUtf8',(req,res)=>{
  var input = req.query.str;
  var literal=input
  
  res.json({'lzUtf8Res':literal})
})
app.listen(port , () => {
    console.log('App running at port',port);
})


