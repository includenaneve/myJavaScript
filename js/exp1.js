function calculate() {
    var amount = document.getElementById("amount");
    var apr = document.getElementById("apr");
    var years = document.getElementById("years");
    var zipcode = document.getElementById("zipcode");
    var payment = document.getElementById("payment");
    var total = document.getElementById("total");
    var totalinterest = document.getElementById("totalinterest");


    var principal = parseFloat(amount.value);
    var interest = parseFloat(apr.value) / 100 / 12;
    var payments = parseFloat(years.value) * 12;

    var x = Math.pow(1 + interest, payments);
    var monthly = (principal * x * interest) / (x - 1);
    // console.log(principal,interest,monthly);
    /**
     * isFinite() 检测数组元素是否有界
     * toFixed() 四舍五入指定小数位数
     */
    if (isFinite(monthly)) // monthly不是Nan、Infinity、-Infinity的时候返回true(infinity是正无穷)
    {
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);
        save(amount.value, apr.value, years.value, zipcode.value);
    }
    else {
        payment.innerHTML = "1";
        total.innerHTML ="2";
        totalinterest.innerHTML = "3";
    }
}

function save(amount, apr, years, zipcode) {
    //如果浏览器支持这个特性就执行
    if (window.localStorage) //localStorage是HTML5的新特性，用来本地存储数据，比cookies存储的空间更大(cookies 每条4K，localStorage是5M)
    {
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode = zipcode;
    }
    else {
        alert("浏览器不支持localStorage特性，无法保存用户的数据");
    }
}

window.onload = function () {
    if (window.localStorage && window.localStorage.loan_amount)//如果浏览器支持并且本地数据存在，加载数据
    {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
}

function getLenders(amount,apr,years,zipcode) {
    if(!window.XMLHttpRequest)return; //如果浏览器不支持XMLhttpRequest对象，quit
    var ad = document.getElementById("lenders");
    if(!ad) return;

    //将用户的输入数据进行URL编码，并作为查询参数附加到URL里
    var url = "getLenders.php" +
            "?amt=" + encodeURIComponent(amount)+
            "&apr=" + encodeURIComponent(apr)+
            "&yrs=" + encodeURIComponent(years)+
            "&zip" + encodeURIComponent(zipcode);
    //通过XMLHttpRequest对象来提取返回数据
    var req = new XMLHttpRequest(); //发起一个新的请求
    req.open('GET',url);        //通过url发起一个HTTP GET 请求
    req.send(null);         //不带任何正文发送该请求

    req.onreadystatechange = function () {
        if(req.readyState == 4 && req.status == 200)
        {//代码运行到这里代表我们得到了一个合法而且完整的HTTP响应
            var response = req.responseText;
            var lenders = JSON.parse(response);
            var list = "";
            for(var i = 0;i<lenders.length;i++)
            {
                list += "<li><a href='"+ lenders[i].url + "'>"+lenders[i].name + "</a>";
            }
            ad.innerHTML = "<ul>"+list+"</ul>";
        }
    }

}