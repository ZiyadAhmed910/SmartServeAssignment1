//Intializing html
let html = `<tr>
                            <th>Subcategory</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th data-order="desc">Popularity</th>
                        </tr>`;
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function () {
  const object = JSON.parse(arryinJSON(this.responseText));
  // html += `<p>${myArr.products[0].subcategory}</p>`
  for (var j = 0; j < object.products.length; j++) {
    html += `<tr>
                                <td>${object.products[j].subcategory}</td>
                                <td>${object.products[j].title}</td>
                                <td>${object.products[j].price}</td>
                                <td>${object.products[j].popularity}</td>
                            </tr>`;
    console.log(object.products[j].subcategory);
  }
  document.getElementById("itemary").innerHTML = html;
};
xmlhttp.open(
  "GET",
  "https://s3.amazonaws.com/open-to-cors/assignment.json",
  true
);
xmlhttp.send();

//function to convert JSON file into readable JSON format
function arryinJSON(jsontext) {
  let tempstr = "";
  var liststart = 0;
  var liststartpnt = 0;
  var lists = 0;
  var listendpnt = 0;
  var openbracket = 0;
  for (var k = 0; k < jsontext.length; k++) {
    if (jsontext[k] == "{") {
      if (lists == 1) {
        openbracket = 1;
      }
      if (liststartpnt == 1) {
        tempstr += "[";
        lists = 1;
      } else {
        tempstr += jsontext[k];
      }
      liststartpnt += 1;
      if (listendpnt == 1) {
        listendpnt = 0;
      }
    } else if (jsontext[k] == "}") {
      if (listendpnt == 1) {
        tempstr += "]";
        listendpnt = 0;
      } else {
        if (openbracket == 1) openbracket = 0;
        tempstr += jsontext[k];
        listendpnt = 1;
      }
    } else if (jsontext[k] == ",") {
      tempstr += jsontext[k];
      if (listendpnt == 1) {
        listendpnt = 0;
      }
    } else {
      if (lists != 1 || openbracket == 1) {
        tempstr += jsontext[k];
      }
    }
  }
  return tempstr;
}
