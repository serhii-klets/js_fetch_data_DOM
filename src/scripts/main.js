'use strict';

// write your code here
const listUrl = `https://
mate-academy.github.io/phone-catalogue-static/api/phones.json`;
const detailsUrl = `https://
mate-academy.github.io/phone-catalogue-static/api/phones/`;

function getPhones() {
  return fetch(listUrl)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => {
          return Promise.reject(new Error(`${response.status}:
          ${response.statusText}`));
        }, 5000);
      }

      return response.json();
    });
}

function getPhonesDetails(arrayOfIds) {
  const arr = arrayOfIds.map(phoneId => {
    return fetch(`${detailsUrl}/${phoneId}.json`)
      .then(response => {
        if (!response.ok) {
          throw Error(`${response.status} - ${response.statusText}`);
        }

        return response.json();
      });
  });

  return new Promise((resolve, reject) => {
    resolve(arr);
    reject(new Error('Something went wrong'));
  });
}

getPhones()
  .then(result => {
    const table = document.createElement('table');
    let i = 1;
    const arrPhonesId = result.map(el => {
      table.insertAdjacentHTML('beforeend', `
        <tr>
          <td style="border: 1px solid blue;">${i++}</td>
          <td style="border: 1px solid blue;">${el.id}</td>
        </tr>
      `);

      return el.id;
    });

    document.body.append(table);

    getPhonesDetails(arrPhonesId)
      .then(arrDetails => {
        arrDetails.forEach(element => {
          element.then(res => res);
        });
      })
      .catch();
  })
  .catch();
