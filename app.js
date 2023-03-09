const form = document.querySelector("#SearchForm");
const res = document.querySelector("#abc");
const xyz = document.querySelector("#list");
const rec = document.querySelector("#bin");
var upd;
form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  if (upd) {
    clearTimeout(upd);
  }

  const ctype = form.elements.CoinType.value;
  rec.classList.add("mainClick");
  rec.classList.remove("main");
  // console.log(ctype);
  fetchPrice(ctype);
});

const fetchPrice = async (ctype) => {
  const r = await axios.get(`https://api.coinstats.app/public/v1/coins/${ctype}?currency:INR`);

  // console.log(r);
  const base = r.data.coin.name;
  const target = 'INR';
  const price = r.data.coin.price;
  const volume = r.data.coin.volume;
  const change = r.data.coin.priceChange1d;
  const time = timeConverter(r.data.timestamp);

  var col = "green";
  if (change < 0) {
    col = "red";
  }

  res.innerHTML = `<tr style="background-color:crimson; color:white; font-weight:700">
              <td>Property</td>
              <td>Symbol/Value</td>
            </tr>
            <tr>
              <td>Base</td>
              <td>"${base}"</td>
            </tr>
            <tr>
              <td>Target</td>
              <td>"${target}"</td>
            </tr>
            <tr>
              <td>Price</td>
              <td style="color:#008B8B"><b>${price}</b></td>
            </tr>
            <tr>
              <td>Volume(24hrs)</td>
              <td>${volume}</td>
            </tr>
            <tr>
              <td>Change(24hrs)</td>
              <td style="color:${col};">${change}</td>
            </tr>
//              <tr>
//                <td>Last Update</td>
//                <td>${time}</td>
             </tr>`;

  upd = setTimeout(() => fetchPrice(ctype), 10000);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  }

  xyz.innerHTML = `<h5>(Note : Volume is displayed only for the cryptocurrencies that are actually traded on online exchanges.)</h5>
          <p>
            <h2 align="left">
            <font color="#3A6470" size="5.5">
              <b><u> Params: </u></b>
            </font>
            </h2>
              <table>
                <tr>
                  <td><b>1) Base -</b></td>
                  <td>Base currency code</td>
                </tr>
                <tr>
                  <td><b>2) Target -</b></td>
                  <td>Target currency code</td>
                </tr>
                <tr>
                  <td><b>3) Price -</b></td>
                  <td>Volume-weighted price</td>
                </tr>
                <tr>
                  <td><b>4) Volume -</b></td>
                  <td>Total trade volume for the last 24 hours</td>
                </tr>
                <tr>
                  <td><b>5) Change -</b></td>
                  <td>Past hour price change (Green->+Ve & Red->-Ve)</td>
                </tr>
//                 <tr>
//                   <td><b>6) Last Update -</b></td>
//                   <td>Updated for every 30 seconds..!!</td>
//                 </tr>
              </table>
          </p>`;
};
