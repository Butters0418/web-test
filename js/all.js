(function () {
  // DOM
  const form = document.querySelector('form');
  const submitBtn = document.querySelector('#submit');
  const employeeID = document.querySelector('#employeeID');
  const edmVote = document.querySelector('#edmVote');
  const roadVote = document.querySelector('#roadVote');
  const fullSiteVote = document.querySelector('#fullSiteVote');
  const different = document.querySelector('#different');
  const inputValidate = document.querySelectorAll('.validate');
  const voteCountNum = document.querySelector('.voteCountNum');

  let totalEmployeeID = []; // total employee id
  let totalVotesID = []; // total votes id

  // init
  function init() {
    getEmployeeData();
    getVotesData();
  }
  init();

  // get employee data
  function getEmployeeData() {
    axios.get(getIDUrl).then(function (res) {
      let data = res.data.feed.entry;
      filterEmployeeID(data);
    });
  }

  // filter employee id
  function filterEmployeeID(data) {
    data.forEach(function (item, index) {
      if (index > 1 && index % 2 == 0) {
        totalEmployeeID.push(item.content['$t']);
      }
    });
    console.log(totalEmployeeID);
  }

  // get total votes data
  function getVotesData() {
    axios.get(getUrl).then(function (res) {
      let data = res.data.feed.entry;
      let totalVotesNum = (data.length - 6) / 6;
      voteCountNum.textContent = totalVotesNum;
      filterVotesId(data);
    });
  }

  // filter votes id
  function filterVotesId(data) {
    data.forEach(function (item, index) {
      if (index > 5 && (index - 1) % 6 == 0) {
        totalVotesID.push(item.content['$t']);
      }
    });
    console.log(totalVotesID);
  }

  // form validate
  function submitForm(e) {
    e.preventDefault();
    let formValidate = [...inputValidate].some(function (item) {
      return item.value == '';
    });
    if (formValidate) {
      inputValidate.forEach(function (item) {
        if (item.value == '') {
          item.nextElementSibling.textContent = '此欄位為必填';
        }
      });
      return;
    }
    const employeeIDValue = employeeID.value.toUpperCase().trim();
    if (totalEmployeeID.length !== 0 && totalEmployeeID.indexOf(employeeIDValue) === -1) {
      alert('您似乎沒有投票資格哦~~ ^_^');
      employeeID.nextElementSibling.textContent = '員工編號有誤';
      return;
    }
    if (totalVotesID.length !== 0 && totalVotesID.indexOf(employeeIDValue) !== -1) {
      alert('此員工編號已經投過了');
      employeeID.nextElementSibling.textContent = '此員工編號已經投過';
      return;
    }
    let formData = {
      [inputName[0]]: employeeIDValue,
      [inputName[1]]: edmVote.value,
      [inputName[2]]: roadVote.value,
      [inputName[3]]: fullSiteVote.value,
      [inputName[4]]: different.value,
    };
    submitBtn.classList.add('pointer-none');
    submitBtn.textContent = '表單送出中...';
    $.ajax({
      type: 'POST',
      url: postUrl,
      data: formData,
      contentType: 'application/json',
      dataType: 'jsonp',
      complete: function () {
        alert('投票成功!!感謝您的意見');
        submitBtn.textContent = '已投票成功!';
        form.reset();
        getVotesData();
      },
    });
  }

  // input change listener
  inputValidate.forEach(function (item) {
    item.addEventListener('change', function () {
      if (item.value == '') {
        const name = item.getAttribute('name');
        item.nextElementSibling.textContent = '此欄位為必填';
      } else {
        item.nextElementSibling.textContent = '';
      }
    });
  });

  // listener
  submitBtn.addEventListener('click', submitForm);
})();
