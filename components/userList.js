function renderUserList() {
    const userList = $('#user-list');
    userList.empty();
    
    $.ajax({
        url: 'http://localhost:3001/users',
        type: 'GET',
        success: function(users) {
            users.forEach((contact, index) => {

            const itemList = `
            <div class="contact">
              <div class="index">${index + 1}</div>
              <div class="info">
                <p class="name">${contact.name}</p>
                <p class="phone">${contact.phone}</p>
              </div>
              <div class="actions">
                <i class="fa fa-ellipsis-v"></i>
              </div>
            </div>
            `;

            userList.append(itemList);
          });
        }
    });
}

