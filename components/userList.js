function renderUserList() {
    $.ajax({
        url: 'http://localhost:3001/users',
        type: 'GET',
        success: function(users) {
            const userList = $('#user-list');
            users.forEach((contact, index) => {

            const divContact = $('<div class="contact">');
            userList.append(divContact);
            divContact.append(`<div class="index">${index + 1}</div>`);

            const divInfo = $('<div class="info">');
            divContact.append(divInfo);
            divInfo.append(`<p class="name">${contact.name}</p>`);
            divInfo.append(`<p class="phone">${contact.phone}</p>`);
          });
        }
    });
}