
var tbody = document.getElementsByClassName('tbody')[0]
var cht =  document.getElementsByClassName('cht')[0]
var wc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker')


//once connection is success
wc.onopen = (event)=>{
    document.getElementsByClassName('err')[0].style.display = 'none'

}


wc.onmessage =  (e)=>{

     let    mydata = JSON.parse(e.data)


    //  console.log(mydata);
 


document.getElementsByClassName('o')[0].innerText = mydata.o
document.getElementsByClassName('l')[0].innerText = mydata.l
document.getElementsByClassName('h')[0].innerText = mydata.h
document.getElementsByClassName('p')[0].innerText = mydata.P


tbody.innerHTML = `
       <tr> 
    <td> Symbol</td>
    <td class='bg-info text-dark'><b> ${mydata.s} </b> </td>
</tr>
    <tr>
    <td> Price change</td>
    <td class='text-danger'>${mydata.p}  </td>
<tr>

<tr>
    <td> Price change percent</td>
    <td class='text-warning'>${mydata.P}%  </td>

    </tr>

<tr>

    <td> Weighted average price</td>
    <td>${mydata.w}%  </td>

    </tr>


    <tr>
    <td> First trade(F)-1</td>
    <td>${mydata.x}  </td>

    </tr>

<tr>
    <td> Last price</td>
    <td>${mydata.c}  </td>
</tr>

<tr>
    <td> Last quantity</td>
    <td>${mydata.Q} </td>
</tr>
<tr>
    <td> Best bid price</td>
    <td class='text-primary'>${mydata.b} </td>
</tr>

<tr>
    <td>Best bid quantity</td>
    <td>${mydata.B} </td>
</tr>

<tr>
    <td>Best ask price</td>
    <td class='text-primary'>${mydata.a} </td>
</tr>

<tr>
    <td>Best ask quantity</td>
    <td>${mydata.A} </td>
</tr>


<tr>
    <td>Open Price</td>
    <td class='text-info'>${mydata.o} </td>
</tr>


<tr>
    <td>High price</td>
    <td class='text-success'>${mydata.h} </td>
</tr>

<tr>
    <td >Low price</td>
    <td class='text-danger'>${mydata.l} </td>
</tr>
<tr>
    <td>Total traded asset volume</td>
    <td>${mydata.v} </td>
</tr>

<tr>
    <td>Total number of trades</td>
    <td>${mydata.n} </td>
</tr>

`

//chart changing data from

myjson.data.datasets[0].data = [mydata.p,mydata.o,mydata.a,mydata.v,mydata.h,mydata.l]

myChart.update();

}

//on getting some error from server side
wc.onerror = (e)=>{

    document.getElementsByClassName('err')[0].style.display = 'block'
    document.getElementsByClassName('err')[0].innerText = 'Due to api maintenancewe are facing some issue please try latar..'

}




//chart js 


const ctx = document.getElementById('myChart').getContext('2d');

var myjson = {
    type: 'line',
    data: {
        labels: ['Price Chnage', 'Open Price', 'Best Ask price', 'Volume', 'High price', 'Low Price'],
        datasets: [{
            label: '# price',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}

const myChart = new Chart(ctx,myjson );
cht.onchange = function(e) {

    myjson.type = cht.value;
    myChart.update();

}

