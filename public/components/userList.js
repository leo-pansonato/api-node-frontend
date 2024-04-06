function renderClientsList() {
    $(".conteudo").append(`<div id="clients-list"></div>`);
    const clientsList = $('#clients-list');
    clientsList.empty();
    
    $.ajax({
        url: 'http://localhost:3001/clients',
        type: 'GET',
        success: function(clients) {
            clients.forEach((client, index) => {

            const itemList = `
            <div class="client" data-uid="${client.id}">
              <div class="index">${index + 1}</div>
              <div class="info">
                <p class="name py-0 my-0">${client.Nome}</p>
                <div class="d-flex flex-row gap-3">
                  <p class="phone py-0 my-0"><i class="fa-solid fa-location-dot mx-1"></i>${client.Endereco}</p>
                  <p class="phone py-0 my-0"><i class="fa-thin fa-rings-wedding mx-1"></i>${client.Casado == true ? "Casado" : "Solteiro"}</p>
                  <p class="phone py-0 my-0"><i class="fa-regular fa-money-bill mx-1"></i>R$${client.Renda}</p>
                </div>
              </div>
              <div class="actions">
                <a tabindex="0" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-placement="left"><i class="fa fa-ellipsis-v"></i></a>
              </div>
            </div>
            `;

            clientsList.append(itemList);
            //popover
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
            popoverTriggerList.map(function (popoverTriggerEl) {
              return new bootstrap.Popover(popoverTriggerEl, {
                html: true,
                content: `
                <div class="d-flex flex-column gap-2">
                  <a class="btn btn-outline-primary px-5 border-0 text-start" id="btn-detalhes">Detalhes</a>
                  <a class="btn btn-outline-primary px-5 border-0" id="btn-editar">Editar</a>
                  <hr class="my-1">
                  <a class="btn btn-outline-danger px-5 border-0" id="btn-excluir">Excluir</a>
                </div>`
              });
            });
          });
        }
    });
}

//clique do botao excluir
$(document).on('click', '#btn-excluir', function() {
    //pega o id da lista mais perto
    const uid = $(this).closest('.client').data('uid');
    console.log(uid);

    $.ajax({
        url: `http://localhost:3001/clients/${uid}`,
        type: 'DELETE',
        success: function() {
            renderClientsList();
        }
    });
});