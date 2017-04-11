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

    var x = Math.pow(1+interest,payment);
    var monthly = (principal * x * interest) / (x-1);

    /**
     * isFinite() 检测数组元素是否有界
     * toFixed() 四舍五入指定小数位数
     */
    if(isFinite(monthly)) //如果monthly有界
    {
        payment.innerHTML = monthly.toFixed(2);
        total.innerHTML = (monthly * payments).toFixed(2);
        totalinterest.innerHTML = ((monthly * payments) - principal).toFixed(2);

        save(amount.value,apr.value,years.value,zipcode.value);
    }
}

function save(amount, apr, years, zipcode) {
    //如果浏览器支持这个特性就执行
    if(window.localStorage) //localStorage是HTML5的新特性，用来本地存储数据，比cookies存储的空间更大(cookies 每条4K，localStorage是5M)
    {
        localStorage.loan_amount = amount;
        localStorage.loan_apr = apr;
        localStorage.loan_years = years;
        localStorage.loan_zipcode  = zipcode;
    }
    else {
        alert("浏览器不支持localStorage特性，无法保存用户的数据");
    }
}

window.onload = function () {
    if(window.localStorage && window.localStorage.loan_amount)//如果浏览器支持并且本地数据存在，加载数据
    {
        document.getElementById("amount").value = localStorage.loan_amount;
        document.getElementById("apr").value = localStorage.loan_apr;
        document.getElementById("years").value = localStorage.loan_years;
        document.getElementById("zipcode").value = localStorage.loan_zipcode;
    }
}